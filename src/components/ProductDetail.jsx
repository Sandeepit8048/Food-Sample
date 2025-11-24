import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';
import { useApp } from '../context/AppContext';

const ProductDetail = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await api.getProductByBarcode(barcode);
        
        if (data.status === 1) {
          setProduct(data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (barcode) {
      fetchProduct();
    } else {
      setError('Invalid product barcode');
      setLoading(false);
    }
  }, [barcode]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({
        type: 'ADD_TO_CART',
        payload: {
          id: product.code,
          name: product.product_name || 'Unknown Product',
          image: product.image_url,
          price: 0,
          quantity: 1,
          nutritionGrade: product.nutrition_grades
        }
      });
      
      
      alert('Product added to cart!');
    }
  };

  const getNutritionColor = (grade) => {
    if (!grade) return 'bg-gray-500';
    
    switch (grade.toUpperCase()) {
      case 'A': return 'bg-green-500';
      case 'B': return 'bg-lime-500';
      case 'C': return 'bg-yellow-500';
      case 'D': return 'bg-orange-500';
      case 'E': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getNutritionTextColor = (grade) => {
    if (!grade) return 'text-gray-500';
    
    switch (grade.toUpperCase()) {
      case 'A': return 'text-green-500';
      case 'B': return 'text-lime-500';
      case 'C': return 'text-yellow-500';
      case 'D': return 'text-orange-500';
      case 'E': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const formatNutrientValue = (value, unit = '') => {
    if (value === undefined || value === null) return 'N/A';
    return `${value}${unit}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6">
              <div className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <strong>Error:</strong> {error || 'Product not found'}
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              ← Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 transition duration-200 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        {/* Main Product Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Product Image Section */}
            <div className="md:w-2/5 p-6">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-80 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`w-full h-80 flex items-center justify-center text-gray-500 ${product.image_url ? 'hidden' : 'flex'}`}
                >
                  <div className="text-center">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="mt-2">No Image Available</p>
                  </div>
                </div>
                
                {/* Nutrition Grade Badge */}
                {product.nutrition_grades && (
                  <div className={`absolute top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg ${getNutritionColor(product.nutrition_grades)} shadow-lg`}>
                    {product.nutrition_grades.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="mt-6">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 font-semibold flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-3/5 p-6 border-l border-gray-200">
              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.product_name || 'Unknown Product'}
              </h1>

              {/* Basic Information */}
              <div className="space-y-3 mb-6">
                {product.brands && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-20">Brand:</span>
                    <span className="text-gray-900">{product.brands}</span>
                  </div>
                )}

                {product.quantity && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-20">Quantity:</span>
                    <span className="text-gray-900">{product.quantity}</span>
                  </div>
                )}

                {product.categories && (
                  <div className="flex items-start">
                    <span className="font-semibold text-gray-700 w-20 mt-1">Categories:</span>
                    <span className="text-gray-900 flex-1">{product.categories}</span>
                  </div>
                )}

                {product.nutrition_grades && (
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-20">Nutrition Grade:</span>
                    <span className={`font-bold ${getNutritionTextColor(product.nutrition_grades)}`}>
                      {product.nutrition_grades.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Labels */}
              {product.labels && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Labels & Certifications</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.labels.split(',').map((label, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200"
                      >
                        {label.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients_text && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Ingredients</h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {product.ingredients_text}
                    </p>
                  </div>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Allergens</h3>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-700">{product.allergens}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Nutritional Information */}
          {product.nutriments && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Nutritional Information (per 100g/ml)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Energy */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Energy</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatNutrientValue(product.nutriments.energy, ' kcal')}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {formatNutrientValue(product.nutriments['energy-kj'], ' kJ')}
                  </div>
                </div>

                {/* Fat */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Fat</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatNutrientValue(product.nutriments.fat, 'g')}
                  </div>
                  {product.nutriments['saturated-fat'] && (
                    <div className="text-xs text-gray-400 mt-1">
                      Saturated: {formatNutrientValue(product.nutriments['saturated-fat'], 'g')}
                    </div>
                  )}
                </div>

                {/* Carbohydrates */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Carbohydrates</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatNutrientValue(product.nutriments.carbohydrates, 'g')}
                  </div>
                  {product.nutriments.sugars && (
                    <div className="text-xs text-gray-400 mt-1">
                      Sugars: {formatNutrientValue(product.nutriments.sugars, 'g')}
                    </div>
                  )}
                </div>

                {/* Protein */}
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Protein</div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatNutrientValue(product.nutriments.proteins, 'g')}
                  </div>
                </div>

                {/* Fiber */}
                {product.nutriments.fiber && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Fiber</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatNutrientValue(product.nutriments.fiber, 'g')}
                    </div>
                  </div>
                )}

                {/* Salt */}
                {product.nutriments.salt && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Salt</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatNutrientValue(product.nutriments.salt, 'g')}
                    </div>
                  </div>
                )}

                {/* Sodium */}
                {product.nutriments.sodium && (
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div className="text-sm text-gray-500 mb-1">Sodium</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatNutrientValue(product.nutriments.sodium, 'g')}
                    </div>
                  </div>
                )}

                {/* Additional nutrients can be added here */}
              </div>

              {/* Nutrition Table for more detailed view */}
              <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nutrient</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount per 100g/ml</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Object.entries(product.nutriments).map(([key, value]) => {
                      if (typeof value === 'number' && key !== 'energy-kj') {
                        return (
                          <tr key={key}>
                            <td className="px-4 py-3 text-sm text-gray-700 capitalize">
                              {key.replace(/-/g, ' ')}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                              {formatNutrientValue(value, 'g')}
                            </td>
                          </tr>
                        );
                      }
                      return null;
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Product Code */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-100">
            <div className="text-sm text-gray-600">
              Product Barcode: <span className="font-mono font-semibold">{product.code}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;