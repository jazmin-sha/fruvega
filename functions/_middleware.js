export async function onRequest({ request, next }) {
    const countryCode = request.headers.get('CF-IPCountry') || 'US';

    const response = await next();
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('text/html')) {
        const html = await response.text();
        const injectedHtml = html.replace(
            '</head>',
            `<script>window.__COUNTRY__ = '${countryCode}';</script></head>`
        );

        return new Response(injectedHtml, {
            status: response.status,
            headers: response.headers
        });
    }

    return response;
}
