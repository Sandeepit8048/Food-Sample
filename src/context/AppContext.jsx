import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  hasMore: true,
  cart: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload, loading: false, error: null };
    case 'ADD_PRODUCTS':
      return { ...state, products: [...state.products, ...action.payload], loading: false, error: null };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload, page: 1 };
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload, page: 1 };
    case 'SET_SORT':
      return { ...state, sortBy: action.payload.sortBy, sortOrder: action.payload.sortOrder, page: 1 };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}