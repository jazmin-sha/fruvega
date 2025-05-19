export default {
    async fetch(request) {
        const countryCode = request.headers.get('CF-IPCountry') || 'US';
        const response = await fetch(request);
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('text/html')) {
            const html = await response.text();
            const injected = html.replace(
                '</head>',
                `<script>window.__COUNTRY__ = '${countryCode}';</script></head>`
            );
            return new Response(injected, {
                status: response.status,
                headers: { 'Content-Type': 'text/html' }
            });
        }

        return response;
    }
};
