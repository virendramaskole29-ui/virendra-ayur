import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const heroImages = [
  "https://images.unsplash.com/photo-1611078813455-84227c813098?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200"
];

export const Home = () => {
  const featuredProducts = products.slice(0, 8);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-50">
      {/* Premium Hero Section */}
      <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
        {/* Herbal Leaves Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none mix-blend-multiply">
          <img 
            src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000" 
            alt="Herbal leaves background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-brand-200 mb-8 shadow-sm">
              <Leaf className="w-4 h-4 text-brand-600" />
              <span className="text-xs font-medium tracking-widest uppercase text-brand-800">
                100% Natural & Chemical-Free
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-earth-900 leading-[1.15] mb-6 drop-shadow-sm">
              Pure Ayurvedic Wellness for a Healthy Life
            </h1>
            
            <p className="text-lg md:text-xl text-earth-600 mb-10 font-light leading-relaxed">
              Restore your body's natural balance with our premium, chemical-free herbal remedies. Crafted from ancient wisdom for your modern lifestyle.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center gap-3 bg-brand-700 text-white px-8 py-4 rounded-full font-medium tracking-wide hover:bg-brand-800 hover:shadow-lg hover:shadow-brand-700/30 hover:-translate-y-1 transition-all duration-300"
              >
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            {/* Decorative background blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-200/50 rounded-full blur-3xl -z-10"></div>
            
            <div className="relative w-full max-w-lg rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-brand-900/10 border border-white/50 aspect-[4/5] group">
              {heroImages.map((img, index) => (
                <img 
                  key={img}
                  src={img} 
                  alt={`Premium Ayurvedic Herbs ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                    index === currentImage ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                  referrerPolicy="no-referrer"
                />
              ))}
              {/* Soft inner shadow overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl md:rounded-[2.5rem] z-10 pointer-events-none"></div>
              
              {/* Image Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentImage ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-white/95 p-4 md:p-6 rounded-2xl shadow-xl shadow-earth-900/5 border border-earth-100 flex items-center gap-4 backdrop-blur-md"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-earth-900">Certified Pure</p>
                <p className="text-xs text-earth-500">Authentic Ingredients</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Note */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 max-w-3xl text-center relative z-10">
          <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-8 font-medium">A Note from the Founder</h2>
          <p className="text-2xl md:text-3xl text-earth-800 font-serif italic leading-relaxed mb-12">
            "I started this brand to share the healing recipes my grandmother taught me. 
            There are no shortcuts here—just pure, potent herbs and a lot of love. 
            This isn't just a store; it's my personal invitation to a balanced life."
          </p>
          <div className="signature text-brand-800">Virendra</div>
        </div>
        
        {/* Subtle decorative lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-brand-200"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-brand-200"></div>
      </section>

      {/* Featured Products - Boutique Style */}
      <section className="py-32 bg-brand-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-earth-900 mb-6">
              Our Ayurvedic Products
            </h2>
            <div className="w-16 h-1 bg-brand-400 rounded-full mb-8"></div>
            <p className="text-earth-600 text-lg max-w-2xl">
              Discover our premium collection of natural, chemical-free remedies crafted to support your daily wellness journey.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['All', 'Supplements', 'Skincare', 'Haircare', 'Immunity'].map((cat) => (
              <Link
                key={cat}
                to={cat === 'All' ? '/shop' : `/shop?category=${cat}`}
                className="px-6 py-2.5 rounded-full border border-brand-200 bg-white text-earth-700 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-300 font-medium text-sm shadow-sm"
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-earth-900 text-white px-10 py-4 rounded-full font-medium hover:bg-brand-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              View Full Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
