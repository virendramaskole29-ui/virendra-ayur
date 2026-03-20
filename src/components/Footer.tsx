import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';

import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export const Footer = () => {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const isAdmin = user?.email === 'virendramaskole29@gmail.com';

  return (
    <footer className="bg-earth-900 text-earth-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6 text-white">
              <Leaf className="w-8 h-8 text-brand-400" />
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Virendra
              </span>
            </Link>
            <p className="text-earth-300 mb-6 leading-relaxed">
              Bringing the ancient wisdom of Ayurveda to modern life. Pure, natural, and sustainably sourced wellness products.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center hover:bg-brand-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/shop" className="text-earth-300 hover:text-brand-400 transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="text-earth-300 hover:text-brand-400 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-earth-300 hover:text-brand-400 transition-colors">Contact Us</Link></li>
              {isAdmin && (
                <li><Link to="/admin" className="text-brand-400 hover:text-white transition-colors font-medium">Admin Panel</Link></li>
              )}
              <li><a href="#" className="text-earth-300 hover:text-brand-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-white">Categories</h3>
            <ul className="space-y-4">
              <li><Link to="/shop?category=Supplements" className="text-earth-300 hover:text-brand-400 transition-colors">Supplements</Link></li>
              <li><Link to="/shop?category=Skincare" className="text-earth-300 hover:text-brand-400 transition-colors">Skincare</Link></li>
              <li><Link to="/shop?category=Haircare" className="text-earth-300 hover:text-brand-400 transition-colors">Haircare</Link></li>
              <li><Link to="/shop?category=Immunity" className="text-earth-300 hover:text-brand-400 transition-colors">Immunity</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-earth-300">
                <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span>Pachmarhi, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-earth-300">
                <Phone className="w-5 h-5 text-brand-400 shrink-0" />
                <span>+91 97555 23428<br/>+91 93014 28604</span>
              </li>
              <li className="flex items-center gap-3 text-earth-300">
                <Mail className="w-5 h-5 text-brand-400 shrink-0" />
                <span>virendramaskole29@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-earth-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-earth-400">
          <p>© {new Date().getFullYear()} Virendra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
