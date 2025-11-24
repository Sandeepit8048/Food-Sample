import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const { fetchProductByBarcode } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const productData = await fetchProductByBarcode(barcode);
      setProduct(productData);
      setLoading(false);
    };

    if (barcode) {
      loadProduct();
    }
  }, [barcode, fetchProductByBarcode]);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          ← Back to Products
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-6">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                {product.image_url ? (
                  <img 
                    src={product.image_url} 
                    alt={product.product_name}
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <span className="text-gray-500">No Image Available</span>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {product.product_name || 'Unknown Product'}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Product Information</h3>
                  {product.brands && (
                    <p className="mb-2"><strong>Brand:</strong> {product.brands}</p>
                  )}
                  {product.categories && (
                    <p className="mb-2"><strong>Categories:</strong> {product.categories}</p>
                  )}
                  {product.quantity && (
                    <p className="mb-2"><strong>Quantity:</strong> {product.quantity}</p>
                  )}
                  {product.nutrition_grades && (
                    <p className="mb-2">
                      <strong>Nutrition Grade:</strong>{' '}
                      <span className={`${getNutritionColor(product.nutrition_grades)} text-white px-2 py-1 rounded-full text-sm font-bold ml-2`}>
                        {product.nutrition_grades.toUpperCase()}
                      </span>
                    </p>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Labels</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.labels && product.labels.split(',').map((label, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {label.trim()}
                      </span>
                    ))}
                    {(!product.labels || product.labels.length === 0) && (
                      <span className="text-gray-500">No labels available</span>
                    )}
                  </div>
                </div>
              </div>

              {product.ingredients_text && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                  <p className="text-gray-700">{product.ingredients_text}</p>
                </div>
              )}

              {product.nutriments && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Nutritional Values (per 100g)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {product.nutriments.energy && (
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-blue-600">{Math.round(product.nutriments.energy)}</div>
                        <div className="text-sm text-blue-800">Energy (kJ)</div>
                      </div>
                    )}
                    {product.nutriments.fat && (
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-red-600">{product.nutriments.fat}g</div>
                        <div className="text-sm text-red-800">Fat</div>
                      </div>
                    )}
                    {product.nutriments.carbohydrates && (
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-green-600">{product.nutriments.carbohydrates}g</div>
                        <div className="text-sm text-green-800">Carbs</div>
                      </div>
                    )}
                    {product.nutriments.proteins && (
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-600">{product.nutriments.proteins}g</div>
                        <div className="text-sm text-purple-800">Protein</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;