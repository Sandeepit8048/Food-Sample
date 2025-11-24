import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../utils/api';

export function useProducts() {
  const { state, dispatch } = useApp();
  const { searchQuery, selectedCategory, sortBy, sortOrder, page, hasMore } = state;

  useEffect(() => {
    fetchProducts(1, true);
  }, [searchQuery, selectedCategory, sortBy, sortOrder]);

  const fetchProducts = async (pageNum = page, reset = false) => {
    if (!hasMore && !reset) return;

    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      let data;
      if (searchQuery) {
        data = await api.searchProducts(searchQuery, pageNum);
      } else if (selectedCategory) {
        data = await api.getProductsByCategory(selectedCategory, pageNum);
      } else {
        data = await api.searchProducts('', pageNum);
      }

      const products = data.products || [];

      if (reset) {
        dispatch({ type: 'SET_PRODUCTS', payload: products });
      } else {
        dispatch({ type: 'ADD_PRODUCTS', payload: products });
      }

      dispatch({ type: 'SET_HAS_MORE', payload: products.length > 0 });
      dispatch({ type: 'SET_PAGE', payload: pageNum });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const loadMore = () => {
    if (!state.loading && hasMore) {
      fetchProducts(page + 1, false);
    }
  };

  const sortedProducts = [...state.products].sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'name':
        aValue = a.product_name || '';
        bValue = b.product_name || '';
        break;
      case 'nutrition':
        aValue = a.nutrition_grades || '';
        bValue = b.nutrition_grades || '';
        break;
      default:
        return 0;
    }

    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  return {
    products: sortedProducts,
    loading: state.loading,
    error: state.error,
    hasMore: state.hasMore,
    loadMore,
    fetchProducts
  };
}