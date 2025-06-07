(function () {
    const { pricesData, currencySymbols } = window.MyApp;

    async function detectCountryCode() {
        try {
            const res = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
            const data = Object.fromEntries(
                (await res.text())
                    .split('\n')
                    .map((line) => line.split('='))
                    .filter(([key, value]) => key && value)
            );
            return data.loc || 'US';
        } catch {
            console.error('Geo detection failed, defaulting to US');
            return 'US';
        }
    }

    function getPriceInfo(product, countryKey, weight) {
        let price =
            (product.prices[countryKey] &&
                product.prices[countryKey][weight]) ||
            (product.prices['USA'] && product.prices['USA'][weight]);
        if (price) {
            price = { ...price, productName: product.name };
        }
        return price;
    }

    function formatPrice(priceInfo) {
        if (!priceInfo)
            return {
                currentPrice: '',
                originalPrice: '',
                symbol: '',
                productName: ''
            };
        const symbol = currencySymbols[priceInfo.currency] || '';
        return {
            symbol,
            currentPrice: `${symbol}${priceInfo.amount.toFixed(2)}`,
            originalPrice: priceInfo.original
                ? `${symbol}${priceInfo.original.toFixed(2)}`
                : '',
            productName: priceInfo.productName || ''
        };
    }

    function updateProductDisplay(
        container,
        product,
        countryKey,
        isListView = false
    ) {
        const weight = product.weights[0];
        const priceInfo = getPriceInfo(product, countryKey, weight);
        const { currentPrice, originalPrice } = formatPrice(priceInfo);

        const productHTML = `
        <div class="${
            isListView ? 'col-lg-12' : 'col-xl-3 col-lg-4 col-sm-6 col-6'
        }">
          <div class="ltn__product-item ltn__product-item-3 ${
              isListView ? '' : 'text-center'
          }">
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
              ${
                  isListView && product.description
                      ? `<div class="product-brief"><p>${product.description}</p></div>`
                      : ''
              }
            </div>
          </div>
        </div>
      `;

        container.innerHTML += productHTML;
    }

    function renderProducts(products, countryKey) {
        const gridRows = document.querySelectorAll(
            '.ltn__product-grid-view .row'
        );
        const listRows = document.querySelectorAll(
            '.ltn__product-list-view .row'
        );

        [
            { rows: gridRows, isListView: false },
            { rows: listRows, isListView: true }
        ].forEach(({ rows, isListView }) => {
            rows.forEach((row) => {
                row.innerHTML = '';
                products.forEach((product) =>
                    updateProductDisplay(row, product, countryKey, isListView)
                );
            });
        });
    }

    function renderCategoryFilter(products) {
        const filter = document.querySelector(
            '.ltn__shop-options select.nice-select'
        );
        if (!filter) return;

        filter.innerHTML = '';
        const allOpt = new Option('All', 'All');
        filter.appendChild(allOpt);

        [...new Set(products.map((p) => p.category))].forEach((cat) => {
            filter.appendChild(new Option(cat, cat));
        });

        if (window.jQuery && $(filter).hasClass('nice-select')) {
            $(filter).niceSelect('update');
        }
    }

    async function processProductPrices() {
        const countryCode = window.__COUNTRY__ || (await detectCountryCode());
        const countryMap = { US: 'USA', IN: 'India', CA: 'CAD' };
        const countryKey = countryMap[countryCode] || 'USA';

        const isShopGrid =
            window.location.pathname.includes('/shop-grid') ||
            window.location.pathname.includes('shop-grid.html');
        if (isShopGrid) {
            renderCategoryFilter(pricesData.products);
            renderProducts(pricesData.products, countryKey);

            const filter = document.querySelector(
                '.ltn__shop-options select.nice-select'
            );
            if (filter) {
                filter.onchange = () => {
                    const selected = filter.value;
                    const filtered =
                        selected === 'All'
                            ? pricesData.products
                            : pricesData.products.filter(
                                  (p) => p.category === selected
                              );
                    renderProducts(filtered, countryKey);
                };
            }
            return;
        }

        function getProductIdFromUrl() {
            const isLocal = ['localhost', '127.0.0.1'].includes(
                location.hostname
            );
            const filename = window.location.pathname.split('/').pop();

            const map = isLocal
                ? {
                      'product-details-no-sidebar.html': 'P001',
                      'product-details-banana-chips.html': 'P002',
                      'product-details-ginger-powder.html': 'P003',
                      'product-details-chilli-powder.html': 'P004',
                      'product-details-cassava-chips.html': 'P005',
                      'product-details-onion-dehydtrated.html': 'P006'
                  }
                : {
                      '/product-details-no-sidebar': 'P001',
                      '/product-details-banana-chips': 'P002',
                      '/product-details-ginger-powder': 'P003',
                      '/product-details-chilli-powder': 'P004',
                      '/product-details-cassava-chips': 'P005',
                      '/product-details-onion-dehydtrated': 'P006'
                  };

            return map[isLocal ? filename : `/${filename}`];
        }

        const productId = getProductIdFromUrl();
        if (!productId) return;

        const product = pricesData.products.find((p) => p.id === productId);
        if (!product) return;

        const titleElem = document.getElementById('product-title');
        const linkElem = document.getElementById('product-title-link');
        if (titleElem && linkElem) {
            linkElem.textContent = product.name;
            linkElem.href = product.detailsPage;
        } else if (titleElem) {
            titleElem.textContent = product.name;
        }

        const weightsDiv = document.querySelector('.button-container');
        let currentWeight = product.weights[0];

        function setProductWeight(weight) {
            currentWeight = weight;
            const priceInfo = getPriceInfo(product, countryKey, weight);
            const { currentPrice, originalPrice, productName } =
                formatPrice(priceInfo);
            const link = product.amazonLinks[countryKey][weight] || '#';

            const amazonBtn = document.querySelector('.amazon-button');
            if (amazonBtn) {
                amazonBtn.href = link;
                amazonBtn.target = '_blank';
            }

            if (weightsDiv) {
                [...weightsDiv.children].forEach((btn) => {
                    const isSelected = btn.textContent === `${weight} g`;
                    btn.classList.toggle('plain', isSelected);
                    btn.classList.toggle('dashed', !isSelected);
                });
            }

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

        if (weightsDiv) {
            weightsDiv.innerHTML = '';
            product.weights.forEach((weight) => {
                const btn = document.createElement('button');
                btn.className = 'button dashed';
                btn.textContent = `${weight} g`;
                btn.onclick = () => setProductWeight(weight);
                weightsDiv.appendChild(btn);
            });
        }

        setProductWeight(currentWeight);

        const shareBtn = document.querySelector('.share-button');
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const linkToCopy =
                    product.amazonLinks[countryKey][currentWeight] || '#';
                navigator.clipboard.writeText(linkToCopy).then(() => {
                    const shareText = document.getElementById('share-text');
                    if (shareText) {
                        shareText.textContent = 'Copied!';
                        setTimeout(
                            () => (shareText.textContent = 'Share'),
                            2000
                        );
                    }
                });
            });
        }
    }

    window.addEventListener('load', processProductPrices);
})();
