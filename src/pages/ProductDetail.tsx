import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { products } from '../data/products';
import { useCart } from '../store/CartContext';
import { formatPrice } from '../lib/utils';
import { Minus, Plus, ShoppingBag, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif text-earth-900 mb-4">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-600 hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-earth-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-earth-500 hover:text-earth-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-earth-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Gallery */}
            <div className="bg-earth-100 aspect-square md:aspect-auto">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="mb-2">
                <span className="text-brand-600 font-medium tracking-wider uppercase text-sm">
                  {product.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-serif font-semibold text-earth-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-earth-900 mb-6">
                {formatPrice(product.price)}
              </p>
              
              <div className="prose prose-earth mb-8">
                <p className="text-earth-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-serif text-lg font-semibold text-earth-900 mb-4">Key Benefits</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-earth-600">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <h3 className="font-serif text-lg font-semibold text-earth-900 mb-3">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, index) => (
                    <span key={index} className="px-4 py-2 bg-earth-100 text-earth-700 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-earth-100 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-earth-200 rounded-xl overflow-hidden h-14 w-full sm:w-32 shrink-0 bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex-1 h-full flex items-center justify-center text-earth-600 hover:bg-earth-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium text-earth-900">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex-1 h-full flex items-center justify-center text-earth-600 hover:bg-earth-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 h-14 bg-brand-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
