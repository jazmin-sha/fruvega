const prices = {
    products: [
        {
            id: 'P001',
            name: 'Fresh Apples',
            prices: {
                USA: {
                    amount: 2.99,
                    currency: 'USD'
                },
                India: {
                    amount: 180.0,
                    currency: 'INR'
                },
                UK: {
                    amount: 2.5,
                    currency: 'GBP'
                }
            }
        },
        {
            id: 'P002',
            name: 'Organic Bananas',
            prices: {
                USA: {
                    amount: 1.99,
                    currency: 'USD'
                },
                India: {
                    amount: 120.0,
                    currency: 'INR'
                },
                UK: {
                    amount: 1.75,
                    currency: 'GBP'
                }
            }
        },
        {
            id: 'P003',
            name: 'Fresh Oranges',
            prices: {
                USA: {
                    amount: 3.49,
                    currency: 'USD'
                },
                India: {
                    amount: 200.0,
                    currency: 'INR'
                },
                UK: {
                    amount: 2.8,
                    currency: 'GBP'
                }
            }
        }
    ]
};

export default prices;
