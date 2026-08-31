// =====================================================
// api/products.js
// All data-fetching functions for the DummyJSON API
// =====================================================

// Base API URL (no key is required)
const BASE_URL = 'https://dummyjson.com/products';

// Shared function that sends a fetch request and checks its result
// Used by all other functions to avoid repeating code
async function request(url) {
  const response = await fetch(url);

  // Throw a clear error when the request fails, such as with a 404 or 500
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }

  // Convert the response from JSON to a JavaScript object
  return response.json();
}

// Fetch all products
// Returns: { products: [...], total, skip, limit }
export async function fetchProducts() {
  return request(BASE_URL);
}

// Fetch the category list
export async function fetchCategories() {
  return request(`${BASE_URL}/categories`);
}

// Fetch one product by its ID
export async function fetchProductById(id) {
  return request(`${BASE_URL}/${id}`);
}