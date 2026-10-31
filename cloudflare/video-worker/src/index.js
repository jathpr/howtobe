const VIDEO_KEY = 'awareness/demo_be.mp4';
const VIDEO_PATH = `/${VIDEO_KEY}`;
const ALLOWED_ORIGINS = new Set([
	'https://jathpr.github.io',
	'http://localhost:4321',
]);

function corsHeaders(origin) {
	const headers = new Headers();

	if (ALLOWED_ORIGINS.has(origin)) {
		headers.set('Access-Control-Allow-Origin', origin);
		headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
		headers.set('Access-Control-Allow-Headers', 'Range, If-Range, If-None-Match');
		headers.set('Access-Control-Expose-Headers', 'Accept-Ranges, Content-Length, Content-Range, ETag');
		headers.set('Access-Control-Max-Age', '86400');
		headers.set('Vary', 'Origin');
	}

	return headers;
}

function errorResponse(message, status, headers) {
	headers.set('Content-Type', 'text/plain; charset=utf-8');
	headers.set('Cache-Control', 'no-store');
	return new Response(message, { status, headers });
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const origin = request.headers.get('Origin') ?? '';
		const headers = corsHeaders(origin);

		if (url.pathname !== VIDEO_PATH) {
			return errorResponse('Not found', 404, headers);
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers });
		}

		if (request.method !== 'GET' && request.method !== 'HEAD') {
			headers.set('Allow', 'GET, HEAD, OPTIONS');
			return errorResponse('Method not allowed', 405, headers);
		}

		const object =
			request.method === 'HEAD'
				? await env.MEDIA.head(VIDEO_KEY)
				: await env.MEDIA.get(
						VIDEO_KEY,
						request.headers.has('Range') ? { range: request.headers } : undefined,
					);

		if (!object) {
			return errorResponse('Video not found', 404, headers);
		}

		object.writeHttpMetadata(headers);
		headers.set('Content-Type', 'video/mp4');
		headers.set('Accept-Ranges', 'bytes');
		headers.set('Cache-Control', 'public, max-age=3600');
		headers.set('X-Content-Type-Options', 'nosniff');
		headers.set('ETag', object.httpEtag);

		if (request.method === 'HEAD') {
			headers.set('Content-Length', String(object.size));
			return new Response(null, { status: 200, headers });
		}

		if ('body' in object && object.range) {
			const { offset, length } = object.range;
			headers.set('Content-Length', String(length));
			headers.set('Content-Range', `bytes ${offset}-${offset + length - 1}/${object.size}`);
			return new Response(object.body, { status: 206, headers });
		}

		headers.set('Content-Length', String(object.size));
		return new Response('body' in object ? object.body : null, { status: 200, headers });
	},
};
