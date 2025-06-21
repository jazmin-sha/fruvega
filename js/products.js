(function () {
  const pricesData = {
    products: [
      {
        id: "P001",
        name: "Dehydrated Garlic Powder",
        category: "Spices",
        weights: [75, 250],
        prices: {
          USA: {
            75: { amount: 2.99, currency: "USD", original: 3.99 },
            250: { amount: 2.99, currency: "USD", original: 3.99 },
          },
          India: {
            75: { amount: 110.0, currency: "INR", original: 155.0 },
            250: { amount: 218.0, currency: "INR", original: 155.0 },
          },
          CAD: {
            75: { amount: 2.5, currency: "CAD", original: 3.0 },
            250: { amount: 2.5, currency: "CAD", original: 3.0 },
          },
        },
        amazonLinks: {
          India: {
            75: "https://amzn.in/d/5haeXjx",
            250: "https://amzn.in/d/gD5BVJl",
          },
          USA: {
            75: "https://amazon.com/us-garlic-75",
            250: "https://amazon.com/us-garlic-250",
          },
        },
        image: "img/gallery/product1F.jpg",
        detailsPage: "product-details-no-sidebar.html",
      },
      {
        id: "P002",
        name: "Vacuum Fried Banana Chips",
        category: "Chips",
        weights: [100],
        prices: {
          USA: {
            100: { amount: 1.99, currency: "USD", original: 2.5 },
          },
          India: {
            100: { amount: 99.0, currency: "INR", original: 140.0 },
          },
          CAD: {
            100: { amount: 1.75, currency: "CAD", original: 2.0 },
          },
        },
        amazonLinks: {
          India: {
            100: "https://www.amazon.in/dp/B0F73L7MRS?ref_=cm_sw_r_cp_ud_dp_VFKYQQTM3AY263TZ13A9",
          },
          USA: { 100: "https://www.amazon.com/dp/B0F73L7MRS" },
        },
        image: "img/gallery/product2F.jpg",
        detailsPage: "product-details-banana-chips.html",
      },
      {
        id: "P003",
        name: "Dehydrated Ginger Powder",
        category: "Spices",
        weights: [75, 250],
        prices: {
          USA: {
            75: { amount: 3.49, currency: "USD", original: 4.0 },
            250: { amount: 9.99, currency: "USD", original: 12.0 },
          },
          India: {
            75: { amount: 168.0, currency: "INR", original: 280.0 },
            250: { amount: 499.0, currency: "INR", original: 600.0 },
          },
          CAD: {
            75: { amount: 2.8, currency: "CAD", original: 3.5 },
            250: { amount: 7.5, currency: "CAD", original: 9.0 },
          },
        },
        amazonLinks: {
          India: {
            75: "https://amzn.in/d/gXUfT5K",
            250: "https://amzn.in/d/39Bjl7M",
          },
          USA: {
            75: "https://www.amazon.com/dp/B0F73L7MRS",
            250: "https://www.amazon.com/dp/B0F73L7MRS",
          },
        },
        image: "img/gallery/product3F.jpg",
        detailsPage: "product-details-ginger-powder.html",
      },
      {
        id: "P004",
        name: "Green Chilli Powder",
        category: "Spices",
        weights: [75, 250],
        prices: {
          USA: {
            75: { amount: 3.49, currency: "USD", original: 4.0 },
            250: { amount: 3.49, currency: "USD", original: 4.0 },
          },
          India: {
            75: { amount: 199.0, currency: "INR", original: 280.0 },
            250: { amount: 499.0, currency: "INR", original: 600.0 },
          },
          CAD: {
            75: { amount: 2.8, currency: "CAD", original: 3.5 },
            250: { amount: 7.5, currency: "CAD", original: 9.0 },
          },
        },
        amazonLinks: {
          India: {
            75: "https://amzn.in/d/4yRV545",
            250: "https://amzn.in/d/1zZjzcG",
          },
          USA: {
            75: "https://amzn.in/d/4yRV545",
            250: "https://amzn.in/d/1zZjzcG",
          },
        },
        image: "img/gallery/product4F.jpg",
        detailsPage: "product-details-chilli-powder.html",
      },
      {
        id: "P005",
        name: "Dehydrated Cassava Chunks",
        category: "Vegetables",
        weights: [250, 500],
        prices: {
          USA: {
            100: { amount: 3.49, currency: "USD", original: 4.0 },
            250: { amount: 9.99, currency: "USD", original: 12.0 },
          },
          India: {
            100: {
              amount: 200.0,
              currency: "INR",
              original: 240.0,
            },
            250: { amount: 499.0, currency: "INR", original: 600.0 },
          },
          CAD: {
            100: { amount: 2.8, currency: "CAD", original: 3.5 },
            250: { amount: 7.5, currency: "CAD", original: 9.0 },
          },
        },
        amazonLinks: {
          India: {
            100: "https://www.amazon.com/cassava-chunks-100g",
            250: "https://www.amazon.com/cassava-chunks-250g",
          },
          USA: {
            100: "https://www.amazon.com/cassava-chunks-100g",
            250: "https://www.amazon.com/cassava-chunks-250g",
          },
        },
        image: "img/gallery/product5F.jpg",
        detailsPage: "product-details-cassava-chips.html",
      },
      {
        id: "P006",
        name: "Dehydrated Red Onion Sliced",
        category: "Vegetables",
        weights: [250, 500],
        prices: {
          USA: {
            100: { amount: 3.49, currency: "USD", original: 4.0 },
            250: { amount: 9.99, currency: "USD", original: 12.0 },
          },
          India: {
            100: {
              amount: 200.0,
              currency: "INR",
              original: 240.0,
            },
            250: { amount: 499.0, currency: "INR", original: 600.0 },
          },
          CAD: {
            100: { amount: 2.8, currency: "CAD", original: 3.5 },
            250: { amount: 7.5, currency: "CAD", original: 9.0 },
          },
        },
        amazonLinks: {
          India: {
            100: "https://www.amazon.in/red-onion-100g",
            250: "https://www.amazon.in/red-onion-250g",
          },
          USA: {
            100: "https://www.amazon.com/red-onion-100g",
            250: "https://www.amazon.com/red-onion-250g",
          },
        },
        image: "img/gallery/product6F.jpg",
        detailsPage: "product-details-onion-dehydtrated.html",
      },
    ],
  };
  const currencySymbols = {
    USD: "$",
    INR: "₹",
    CAD: "CA$",
  };

  Object.freeze(pricesData);
  Object.freeze(pricesData.products);
  pricesData.products.forEach(Object.freeze);
  Object.freeze(currencySymbols);

  if (typeof window !== "undefined") {
    window.MyApp = window.MyApp || {};
    if (!window.MyApp.pricesData) {
      window.MyApp.pricesData = pricesData;
    }
    if (!window.MyApp.currencySymbols) {
      window.MyApp.currencySymbols = currencySymbols;
    }
  }
})();
