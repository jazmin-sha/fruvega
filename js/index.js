(function () {
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
                category: 'Spices',
                weights: [75, 250],
                prices: {
                    USA: { amount: 2.99, currency: 'USD', original: 3.99 },
                    India: { amount: 118.0, currency: 'INR', original: 155.0 },
                    CAD: { amount: 2.5, currency: 'CAD', original: 3.0 }
                },
                amazonLinks: {
                    India: {
                        75: 'https://amzn.in/d/5haeXjx',
                        250: 'https://amzn.in/d/gD5BVJl'
                    },
                    USA: {
                        75: 'https://amazon.com/us-garlic-75',
                        250: 'https://amazon.com/us-garlic-250'
                    }
                },
                image: 'img/gallery/product1F.jpg',
                detailsPage: 'product-details-no-sidebar.html'
            },
            {
                id: 'P002',
                name: 'Vacuum Fried Banana Chips',
                category: 'Chips',
                weights: [100],
                prices: {
                    USA: { amount: 1.99, currency: 'USD', original: 2.5 },
                    India: { amount: 99.0, currency: 'INR', original: 140.0 },
                    CAD: { amount: 1.75, currency: 'CAD', original: 2.0 }
                },
                amazonLinks: {
                    India: {
                        100: 'https://www.amazon.in/dp/B0F73L7MRS?ref_=cm_sw_r_cp_ud_dp_VFKYQQTM3AY263TZ13A9'
                    },
                    USA: { 100: 'https://www.amazon.com/dp/B0F73L7MRS' }
                },
                image: 'img/gallery/product2F.jpg',
                detailsPage: 'product-details-banana-chips.html'
            },
            {
                id: 'P003',
                name: 'Dehydrated Ginger Powder',
                category: 'Spices',
                weights: [75, 250],
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 168.0, currency: 'INR', original: 280.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                },
                amazonLinks: {
                    India: {
                        75: 'https://amzn.in/d/gXUfT5K',
                        250: 'https://amzn.in/d/39Bjl7M'
                    },
                    USA: {
                        75: 'https://www.amazon.com/dp/B0F73L7MRS',
                        250: 'https://www.amazon.com/dp/B0F73L7MRS'
                    }
                },
                image: 'img/gallery/product3F.jpg',
                detailsPage: 'product-details-ginger-powder.html'
            },
            {
                id: 'P004',
                name: 'Green Chilli Powder',
                category: 'Spices',
                weights: [75, 250],
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 199.0, currency: 'INR', original: 280.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                },
                amazonLinks: {
                    India: {
                        75: 'https://amzn.in/d/4yRV545',
                        250: 'https://amzn.in/d/1zZjzcG'
                    },
                    USA: {
                        75: 'https://amzn.in/d/4yRV545',
                        250: 'https://amzn.in/d/1zZjzcG'
                    }
                },
                image: 'img/gallery/product4F.jpg',
                detailsPage: 'product-details-chilli-powder.html'
            },
            {
                id: 'P005',
                name: 'Dehydrated Cassava Chunks',
                category: 'Chips',
                weights: [100, 250],
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 200.0, currency: 'INR', original: 240.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                },
                amazonLinks: {
                    India: {
                        100: 'https://www.amazon.com/cassava-chunks-100g',
                        250: 'https://www.amazon.com/cassava-chunks-250g'
                    },
                    USA: {
                        100: 'https://www.amazon.com/cassava-chunks-100g',
                        250: 'https://www.amazon.com/cassava-chunks-250g'
                    }
                },
                image: 'img/gallery/product5F.jpg',
                detailsPage: 'product-details-cassava-chips.html'
            },
            {
                id: 'P006',
                name: 'Dehydrated Red Onion Sliced',
                category: 'Vegetables',
                weights: [100, 250],
                prices: {
                    USA: { amount: 3.49, currency: 'USD', original: 4.0 },
                    India: { amount: 200.0, currency: 'INR', original: 240.0 },
                    CAD: { amount: 2.8, currency: 'CAD', original: 3.5 }
                },
                amazonLinks: {
                    India: {
                        100: 'https://www.amazon.in/red-onion-100g',
                        250: 'https://www.amazon.in/red-onion-250g'
                    },
                    USA: {
                        100: 'https://www.amazon.com/red-onion-100g',
                        250: 'https://www.amazon.com/red-onion-250g'
                    }
                },
                image: 'img/gallery/product6F.jpg',
                detailsPage: 'product-details-onion-dehydtrated.html'
            }
        ]
    };

    window.pricesData = pricesData;

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

    function renderProducts(products, countryKey) {
        const gridRows = document.querySelectorAll(
            '.ltn__product-grid-view .row'
        );
        if (gridRows.length) {
            gridRows.forEach((row) => {
                row.innerHTML = '';
                products.forEach((product) => {
                    const priceInfo =
                        product.prices[countryKey] || product.prices['USA'];
                    const symbol = currencySymbols[priceInfo.currency];
                    const currentPrice = `${symbol}${priceInfo.amount.toFixed(
                        2
                    )}`;
                    const originalPrice = priceInfo.original
                        ? `${symbol}${priceInfo.original.toFixed(2)}`
                        : '';
                    row.innerHTML += `
                    <div class="col-xl-3 col-lg-4 col-sm-6 col-6">
                      <div class="ltn__product-item ltn__product-item-3 text-center">
                        <div class="product-img">
                          <a href="${product.detailsPage}"><img src="${product.image}" alt="${product.name}"/></a>
                        </div>
                        <div class="product-info">
                          <div class="product-ratting"></div>
                          <h2 class="product-title">
                            <a href="${product.detailsPage}">${product.name}</a>
                          </h2>
                          <div class="product-price">
                          <span class="price" data-product="${product.id}">${currentPrice}</span>
                            <del class="price" data-product="${product.id}">${originalPrice}</del>
                            </div>
                          </div>
                          <div class="product-category">
                            <small>${product.category}</small>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                });
            });
        }

        const listRows = document.querySelectorAll(
            '.ltn__product-list-view .row'
        );
        if (listRows.length) {
            listRows.forEach((row) => {
                row.innerHTML = '';
                products.forEach((product) => {
                    const priceInfo =
                        product.prices[countryKey] || product.prices['USA'];
                    const symbol = currencySymbols[priceInfo.currency];
                    const currentPrice = `${symbol}${priceInfo.amount.toFixed(
                        2
                    )}`;
                    const originalPrice = priceInfo.original
                        ? `${symbol}${priceInfo.original.toFixed(2)}`
                        : '';
                    row.innerHTML += `
                    <div class="col-lg-12">
                      <div class="ltn__product-item ltn__product-item-3">
                        <div class="product-img">
                          <a href="${product.detailsPage}"><img src="${
                        product.image
                    }" alt="${product.name}"/></a>
                        </div>
                        <div class="product-info">
                          <h2 class="product-title">
                            <a href="${product.detailsPage}">${product.name}</a>
                          </h2>
                          <div class="product-price">
                            <span class="price" data-product="${
                                product.id
                            }">${currentPrice}</span>
                            <del class="price" data-product="${
                                product.id
                            }">${originalPrice}</del>
                          </div>
                          <div class="product-category">
                            <small>${product.category}</small>
                          </div>
                          <div class="product-brief">
                            <p>${product.description || ''}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    `;
                });
            });
        }
    }

    function renderCategoryFilter(products) {
        const filter = document.querySelector(
            '.ltn__shop-options select.nice-select'
        );
        if (filter) {
            filter.innerHTML = '';
            const allOpt = document.createElement('option');
            allOpt.value = 'All';
            allOpt.textContent = 'All';
            filter.appendChild(allOpt);
            const categories = [...new Set(products.map((p) => p.category))];
            categories.forEach((cat) => {
                const opt = document.createElement('option');
                opt.value = cat;
                opt.textContent = cat;
                filter.appendChild(opt);
            });
            if (window.jQuery && $(filter).hasClass('nice-select')) {
                $(filter).niceSelect('update');
            }
        }
    }

    async function processProductPrices() {
        const countryCode = window.__COUNTRY__ || (await detectCountryCode());
        const countryMap = { US: 'USA', IN: 'India', CA: 'CAD' };
        const countryKey = countryMap[countryCode] || 'USA';

        if (window.location.pathname.includes('/shop-grid')) {
            renderCategoryFilter(pricesData.products);
            const filter = document.querySelector(
                '.ltn__shop-options select.nice-select'
            );

            renderProducts(pricesData.products, countryKey);

            if (filter) {
                filter.onchange = function () {
                    let selected = this.value;
                    let filtered;
                    if (selected === 'All') {
                        filtered = pricesData.products;
                    } else {
                        filtered = pricesData.products.filter(
                            (p) => p.category === selected
                        );
                    }
                    renderProducts(filtered, countryKey);
                };
            }
            return;
        }
        function getProductIdFromUrl() {
            // Example: product-details-banana-chips.html → P002
            const path = window.location.pathname;
            const file = path.substring(path.lastIndexOf('/') + 1);
            // Map filename to productId
            const map = {
                '/product-details-banana-chips': 'P002',
                '/product-details-no-sidebar': 'P001',
                '/product-details-ginger-powder': 'P003',
                '/product-details-chilli-powder': 'P004',
                '/product-details-cassava-chips': 'P005',
                '/product-details-onion-dehydtrated': 'P006'
            };
            console.log(
                `Product ID not found for URL: ${window.location.pathname}`
            );
            console.log(`Using map: ${map[file]}`);
            return map[file] || null;
        }

        const productId = getProductIdFromUrl();

        if (productId) {
            const product = pricesData.products.find((p) => p.id === productId);
            if (product) {
                const titleElem = document.getElementById('product-title');
                const linkElem = document.getElementById('product-title-link');
                if (titleElem && linkElem) {
                    linkElem.textContent = product.name;
                    linkElem.href = product.detailsPage;
                }
                const weightsDiv = document.querySelector('.button-container');
                let currentWeight = product.weights[0];

                function setProductWeight(weight) {
                    currentWeight = weight;
                    const link = product.amazonLinks[countryKey][weight] || '#';
                    const amazonBtn = document.querySelector('.amazon-button');
                    if (amazonBtn) {
                        amazonBtn.href = link;
                        amazonBtn.target = '_blank';
                    }
                    if (weightsDiv) {
                        Array.from(weightsDiv.children).forEach((btn) => {
                            btn.classList.toggle(
                                'plain',
                                btn.textContent === weight + ' g'
                            );
                            btn.classList.toggle(
                                'dashed',
                                btn.textContent !== weight + ' g'
                            );
                        });
                    }
                }

                if (weightsDiv) {
                    weightsDiv.innerHTML = '';
                    product.weights.forEach((weight) => {
                        const btn = document.createElement('button');
                        btn.className = 'button dashed';
                        btn.textContent = weight + ' g';
                        btn.onclick = () => setProductWeight(weight);
                        weightsDiv.appendChild(btn);
                    });
                }

                // Set default weight
                setProductWeight(product.weights[0], countryKey);

                // Share button logic (only copy, does NOT redirect)
                const shareBtn = document.querySelector('.share-button');
                if (shareBtn) {
                    shareBtn.addEventListener('click', (event) => {
                        event.preventDefault();
                        const linkToCopy =
                            product.amazonLinks[countryKey][currentWeight] ||
                            '#';
                        const shareText = document.getElementById('share-text');
                        navigator.clipboard.writeText(linkToCopy).then(() => {
                            if (shareText) {
                                shareText.textContent = 'Copied!';
                                setTimeout(() => {
                                    shareText.textContent = 'Share';
                                }, 2000);
                            }
                        });
                    });
                }
            }
        }

        // Default: Replace price placeholders in HTML
        let html = document.documentElement.innerHTML;
        for (const product of pricesData.products) {
            const priceInfo =
                product.prices[countryKey] || product.prices['USA'];
            const symbol = currencySymbols[priceInfo.currency];
            const currentPrice = `${symbol}${priceInfo.amount.toFixed(2)}`;
            const originalPrice = priceInfo.original
                ? `${symbol}${priceInfo.original.toFixed(2)}`
                : '';
            const productName = product.name;

            // Update all price placeholders for this product
            document
                .querySelectorAll(`.price[data-product="${product.id}"]`)
                .forEach((span) => {
                    span.textContent = currentPrice;
                });
            document
                .querySelectorAll(
                    `#product-title[data-product="${product.id}"]`
                )
                .forEach((span) => {
                    span.textContent = productName;
                });
            document
                .querySelectorAll(
                    `.original_price[data-product="${product.id}"]`
                )
                .forEach((span) => {
                    span.textContent = originalPrice;
                });
        }
        // document.documentElement.innerHTML = html;
    }

    window.addEventListener('load', processProductPrices);
})();
