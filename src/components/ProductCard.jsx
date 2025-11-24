import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useApp();

  const handleProductClick = () => {
    if (product.code) {
      navigate(`/product/${product.code}`);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.code) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.code,
          name: product.product_name,
          image: product.image_url,
          price: 0, // OpenFoodFacts doesn't provide price
          quantity: 1
        }
      });
    }
  };

  const getNutritionColor = (grade) => {
    switch (grade?.toUpperCase()) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-lime-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'E': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div
      onClick={handleProductClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48 bg-gray-200">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        {product.nutrition_grades && (
          <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getNutritionColor(product.nutrition_grades)}`}>
            {product.nutrition_grades.toUpperCase()}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.product_name || 'Unknown Product'}
        </h3>
        
        {product.categories && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">
            {product.categories.split(',').slice(0, 2).join(', ')}
          </p>
        )}

        {product.ingredients_text && (
          <p className="text-gray-700 text-sm mb-3 line-clamp-2">
            {product.ingredients_text}
          </p>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            Add to Cart
          </button>
          
          {product.brands && (
            <span className="text-sm text-gray-500">
              {product.brands.split(',').slice(0, 1).join(', ')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;