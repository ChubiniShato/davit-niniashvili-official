// MOCK DATA for "Drop Zone" logic
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "DN15: SIGNATURE JERSEY",
        price: 120.00,
        status: "AVAILABLE",
        image: "/shop_placeholder_fallback.svg"
    },
    {
        id: 2,
        name: "TRAINING KIT / BLACK",
        price: 85.00,
        status: "LIMITED",
        image: "/shop_placeholder_fallback.svg"
    },
    {
        id: 3,
        name: "MATCH BALL / SIGNED",
        price: 250.00,
        status: "SOLD_OUT",
        image: "/shop_placeholder_fallback.svg"
    }
];

// Switch to true to use real backend
const USE_REAL_API = false;

export const getProducts = async () => {
    if (!USE_REAL_API) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(MOCK_PRODUCTS), 800); // Simulate network latency
        });
    }
    // Real API call would go here
    // const response = await fetch('/api/products');
    // return response.json();
};
