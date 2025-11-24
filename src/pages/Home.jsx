import React, { useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useProducts } from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';
import FilterSort from '../components/FilterSort';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';


const Home = () => {
  const { state } = useApp();
  const { products, loading, categories, fetchProducts, loadMore, hasMore } = useProducts();

  useEffect(() => {
    fetchProducts(true);
  }, [state.searchQuery, state.barcodeQuery, state.selectedCategory]);

  useEffect(() => {
    if (state.page > 1) {
      fetchProducts(false);
    }
  }, [state.page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    if (hasMore) {
      loadMore();
    }
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    // <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ">
      <div className="max-w-9xl mx-auto px-4 py-8  ">
        <header className="text-center mb-8 mx-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
            Food Product Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover nutritional information about various food products
          </p>
        </header>

        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <SearchBar />
          </div>

          <div className="w-full md:w-auto">
            <FilterSort categories={categories} />
          </div>
        </div>

        {products.length === 0 && !loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No products found. Try adjusting your search criteria.
            </p>
            <div className="mt-6">
              <button
                onClick={() => fetchProducts(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              >
                Retry Search
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product, index) => (
                <ProductCard key={product.code || index} product={product} />
              ))}
            </div>

            {loading && (
              <div className="flex justify-center my-6">
                <LoadingSpinner />
              </div>
            )}
            
            {!loading && hasMore && products.length > 0 && (
              <div className="text-center">
                <button
                  onClick={loadMore}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                >
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </div>
    // </div>
  );
};

export default Home;
