// Wrap everything in an IIFE to avoid global scope pollution
(function () {
    // Currency symbol mapping
    const currencySymbols = {
        USD: '$',
        INR: '₹',
        CAD: 'CA$'
    };

    const pricesData = {
        products: [
            {
                id: 'P001',
                name: 'Dehydrated Garlic Powder',
                prices: {
                    USA: { amount: 2.99, currency: 'USD', original: 3.99 },
                    India: { amount: 118.0, currency: 'INR', original: 155.0 },
                    CAD: { amount: 2.5, currency: 'CAD', original: 3.0 }
                }
            },
            {
                id: 'P002',
                name: 'Vacuum Fried Banana Chips',
                prices: {
                    USA: { amount: 1.99, currency: 'USD', original: 2.5 },
                    India: { amount: 99.0, currency: 'INR', original: 140.0 },
                    CAD: { amount: 1.75, currency: 'CAD', original: 2.0 }
                }
            },
            {
                id: 'P003',
                name: 'Dehydrated Ginger Powder',
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 168.0, currency: 'INR', original: 280.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                }
            },
            {
                id: 'P004',
                name: 'Green Chilli Powder',
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 199.0, currency: 'INR', original: 280.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                }
            },
            {
                id: 'P005',
                name: 'Dehydrated Cassava Chunks',
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 200.0, currency: 'INR', original: 240.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                }
            },
            {
                id: 'P006',
                name: 'Dehydrated Red Onion Sliced',
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 200.0, currency: 'INR', original: 240.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                }
            },
            {
                id: 'P007',
                name: 'Dehydrated Ginger Powder',
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 243.0, currency: 'INR', original: 355.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                }
            }
        ]
    };

    async function detectCountryCode() {
        try {
            const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
            const text = await res.text();
            const lines = text.split('\n');
            const data = {};
            lines.forEach((line) => {
                const [key, value] = line.split('=');
                if (key && value) data[key] = value;
            });
            return data.loc || 'US';
        } catch (err) {
            console.error('Geo detection failed, defaulting to US');
            return 'US';
        }
    }

    async function processProductPrices() {
        const countryCode = await detectCountryCode();

        const countryMap = {
            US: 'USA',
            IN: 'India',
            CA: 'CAD'
        };

        const countryKey = countryMap[countryCode] || 'USA';

        let html = document.documentElement.innerHTML;

        for (const product of pricesData.products) {
            const priceInfo =
                product.prices[countryKey] || product.prices['USA'];
            const symbol = currencySymbols[priceInfo.currency];
            const currentPrice = `${symbol}${priceInfo.amount.toFixed(2)}`;
            const originalPrice = priceInfo.original
                ? `${symbol}${priceInfo.original.toFixed(2)}`
                : '';

            html = html
                .replaceAll(`{{price_${product.id}}}`, currentPrice)
                .replaceAll(`{{original_price_${product.id}}}`, originalPrice);
        }

        document.documentElement.innerHTML = html;
    }

    window.addEventListener('load', processProductPrices);
})();
