import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-50/90 backdrop-blur-md border-b border-brand-200/50">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 -ml-2 text-earth-700 hover:text-brand-700"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Left Navigation */}
        <nav className="hidden md:flex items-center gap-8 flex-1">
          <Link to="/" className={cn("text-xs tracking-[0.15em] uppercase transition-colors hover:text-brand-600", location.pathname === '/' ? "text-brand-700 font-medium" : "text-earth-500")}>Home</Link>
          <Link to="/shop" className={cn("text-xs tracking-[0.15em] uppercase transition-colors hover:text-brand-600", location.pathname === '/shop' ? "text-brand-700 font-medium" : "text-earth-500")}>Shop</Link>
        </nav>

        {/* Centered Logo */}
        <Link to="/" className="flex flex-col items-center justify-center flex-1 text-center group">
          <span className="font-serif text-3xl md:text-4xl font-light tracking-wide text-earth-900 group-hover:text-brand-700 transition-colors">
            Virendra
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-600 mt-1">Ayurveda</span>
        </Link>

        {/* Desktop Right Navigation & Cart */}
        <nav className="hidden md:flex items-center justify-end gap-8 flex-1">
          <Link to="/about" className={cn("text-xs tracking-[0.15em] uppercase transition-colors hover:text-brand-600", location.pathname === '/about' ? "text-brand-700 font-medium" : "text-earth-500")}>Story</Link>
          <Link to="/contact" className={cn("text-xs tracking-[0.15em] uppercase transition-colors hover:text-brand-600", location.pathname === '/contact' ? "text-brand-700 font-medium" : "text-earth-500")}>Contact</Link>
          
          <button 
            className="relative p-2 text-earth-700 hover:text-brand-700 transition-colors flex items-center gap-2"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="text-xs tracking-[0.15em] uppercase hidden lg:block">Cart</span>
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-700 text-white text-[10px] flex items-center justify-center rounded-full font-medium">
                  {cartCount}
                </span>
              )}
            </div>
          </button>
        </nav>

        {/* Mobile Cart */}
        <div className="md:hidden flex-1 flex justify-end">
          <button 
            className="relative p-2 text-earth-700 hover:text-brand-700 transition-colors"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-700 text-white text-[10px] flex items-center justify-center rounded-full font-medium">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-earth-900/20 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-sm bg-brand-50 z-50 shadow-2xl md:hidden flex flex-col"
            >
              <div className="h-24 px-6 flex items-center justify-between border-b border-brand-200/50">
                <Link to="/" className="flex flex-col">
                  <span className="font-serif text-2xl font-light tracking-wide text-earth-900">
                    Virendra
                  </span>
                </Link>
                <button 
                  className="p-2 text-earth-500 hover:text-earth-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>
              <nav className="flex flex-col py-8 px-6 gap-6">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Shop', path: '/shop' },
                  { name: 'Our Story', path: '/about' },
                  { name: 'Contact', path: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "text-sm tracking-[0.2em] uppercase transition-colors",
                      location.pathname === link.path 
                        ? "text-brand-700 font-medium" 
                        : "text-earth-600 hover:text-brand-600"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
