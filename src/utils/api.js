const BASE_URL = 'https://world.openfoodfacts.org';

export const api = {
  // Search products by name
  searchProducts: async (query, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(query)}&page=${page}&json=true&page_size=24`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/category/${encodeURIComponent(category)}.json?page=${page}&page_size=24`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get product by barcode
  getProductByBarcode: async (barcode) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/v0/product/${barcode}.json`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product by barcode:', error);
      throw error;
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/categories.json`
      );
      const data = await response.json();
      return data.tags || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }
};