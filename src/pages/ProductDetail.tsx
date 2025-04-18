
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { getProductById, getProductsByCategory, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = id ? getProductById(Number(id)) : null;
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  // Get related products from the same category
  const relatedProducts = getProductsByCategory(product.category)
    .filter(item => item.id !== product.id)
    .slice(0, 3);

  // Fisher-Yates shuffle algorithm to randomize related products
  const shuffledRelatedProducts = [...relatedProducts];
  for (let i = shuffledRelatedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledRelatedProducts[i], shuffledRelatedProducts[j]] = [
      shuffledRelatedProducts[j],
      shuffledRelatedProducts[i],
    ];
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 mb-6 hover:text-kranian-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Products
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Image */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={`/${product.image}`}
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-2xl text-kranian-700 font-bold mb-4">KES {product.price.toFixed(2)}</p>
            
            <div className="border-t border-b border-gray-200 py-6 my-6">
              <p className="text-gray-700 mb-4">{product.description}</p>
              
              <div className="flex items-center mb-6">
                <div className="mr-4">
                  <span className="font-medium">Category:</span>{' '}
                  <span className="capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="font-medium">Availability:</span>{' '}
                  <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="text-gray-500 hover:text-kranian-600 disabled:text-gray-300"
                    disabled={quantity <= 1}
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                  
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  
                  <button 
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="text-gray-500 hover:text-kranian-600 disabled:text-gray-300"
                    disabled={quantity >= 10}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Add to Cart Button */}
                <Button 
                  onClick={handleAddToCart}
                  className="bg-kranian-600 hover:bg-kranian-700 text-white flex-grow sm:flex-grow-0"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> 
                  Add to Cart
                </Button>
              </div>
            </div>
            
            {/* Delivery Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Delivery Information</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Local delivery available within 24 hours</li>
                <li>• Free shipping on orders over KES 50</li>
                <li>• International shipping to select countries</li>
                <li>• All flowers are fresh-cut and arranged the day of delivery</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shuffledRelatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
