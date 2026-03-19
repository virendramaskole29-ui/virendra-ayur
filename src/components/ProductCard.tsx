import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { formatPrice } from '../lib/utils';
import { useCart } from '../store/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-earth-100 h-full">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-brand-50 block">
        <img 
          src={product.image} 
          alt={product.name} 
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] tracking-widest uppercase text-brand-700 font-medium shadow-sm">
          {product.category}
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow p-6">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl font-medium text-earth-900 mb-2 group-hover:text-brand-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-earth-500 text-sm font-light mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between gap-4">
          <span className="text-xl font-semibold text-earth-900">
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 bg-brand-50 text-brand-700 hover:bg-brand-600 hover:text-white px-4 py-2.5 rounded-xl font-medium transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
