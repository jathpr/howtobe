import assert from 'node:assert/strict';
import test from 'node:test';
import worker from './index.js';

function createObject({ body = 'video-data', size = 10, range } = {}) {
	return {
		size,
		range,
		httpEtag: '"video-etag"',
		writeHttpMetadata(headers) {
			headers.set('Content-Type', 'video/mp4');
		},
		body: new ReadableStream({
			start(controller) {
				controller.enqueue(new TextEncoder().encode(body));
				controller.close();
			},
		}),
	};
}

test('streams only the configured video path', async () => {
	let getCalls = 0;
	const response = await worker.fetch(
		new Request('https://video.example/other.mp4'),
		{
			MEDIA: {
				async get() {
					getCalls += 1;
					return createObject();
				},
			},
		},
	);

	assert.equal(response.status, 404);
	assert.equal(getCalls, 0);
});

test('passes byte ranges to R2 and returns a partial response', async () => {
	let receivedRange;
	const response = await worker.fetch(
		new Request('https://video.example/awareness/demo_be.mp4', {
			headers: { Origin: 'https://jathpr.github.io', Range: 'bytes=2-5' },
		}),
		{
			MEDIA: {
				async get(_key, options) {
					receivedRange = options.range.get('Range');
					return createObject({
						body: 'data',
						size: 10,
						range: { offset: 2, length: 4 },
					});
				},
			},
		},
	);

	assert.equal(receivedRange, 'bytes=2-5');
	assert.equal(response.status, 206);
	assert.equal(response.headers.get('Content-Range'), 'bytes 2-5/10');
	assert.equal(response.headers.get('Content-Length'), '4');
	assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://jathpr.github.io');
	assert.equal(await response.text(), 'data');
});

test('returns metadata for HEAD without reading the video body', async () => {
	let headCalls = 0;
	let getCalls = 0;
	const response = await worker.fetch(
		new Request('https://video.example/awareness/demo_be.mp4', { method: 'HEAD' }),
		{
			MEDIA: {
				async head() {
					headCalls += 1;
					return createObject({ size: 123 });
				},
				async get() {
					getCalls += 1;
					return createObject();
				},
			},
		},
	);

	assert.equal(response.status, 200);
	assert.equal(response.headers.get('Content-Length'), '123');
	assert.equal(headCalls, 1);
	assert.equal(getCalls, 0);
	assert.equal(await response.text(), '');
});

test('rejects write methods', async () => {
	const response = await worker.fetch(
		new Request('https://video.example/awareness/demo_be.mp4', { method: 'PUT' }),
		{ MEDIA: {} },
	);

	assert.equal(response.status, 405);
	assert.equal(response.headers.get('Allow'), 'GET, HEAD, OPTIONS');
});
