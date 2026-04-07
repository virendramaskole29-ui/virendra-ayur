import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShieldCheck, MapPin, Phone, Calendar, Star, Quote, ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../lib/utils';

const heroImages = [
  "https://images.unsplash.com/photo-1545191215-220a5672fc9e?auto=format&fit=crop&q=80&w=1200", // Forest/Nature
  "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1200", // Spa/Ayurveda
  "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=1200", // Herbs
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200"  // Peaceful meditation
];

const services = [
  {
    title: "Panchakarma Therapy",
    description: "Traditional five-fold detoxification treatment to restore balance and vitality.",
    icon: <Leaf className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Stress Relief",
    description: "Calming therapies designed to soothe the nervous system and clear the mind.",
    icon: <Star className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Detox Programs",
    description: "Customized herbal cleansing to remove toxins and rejuvenate your body.",
    icon: <ShieldCheck className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
  }
];

const testimonials = [
  {
    name: "Rajesh Kumar",
    text: "The Panchakarma treatment at Chanchal Ayurvedic was life-changing. I feel lighter and more energetic than I have in years.",
    location: "Bhopal"
  },
  {
    name: "Anjali Sharma",
    text: "Pachmarhi is the perfect setting for healing. The doctors here are truly knowledgeable and compassionate.",
    location: "Indore"
  },
  {
    name: "David Miller",
    text: "A truly authentic Ayurvedic experience. The stress relief therapy helped me find peace during my travels.",
    location: "UK"
  }
];

export const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-50">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Images Slider */}
        <div className="absolute inset-0 z-0">
          {heroImages.map((img, index) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={img} 
                alt="Pachmarhi Nature" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-earth-900/40 backdrop-blur-[2px]"></div>
            </div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-8 text-white">
                <Leaf className="w-4 h-4" />
                <span className="text-xs font-medium tracking-widest uppercase">
                  Authentic Ayurveda in Pachmarhi
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-white leading-[1.1] mb-8">
                Pure Ayurvedic Products from Pachmarhi
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 font-light leading-relaxed max-w-2xl">
                Discover the healing power of nature with our authentic Ayurvedic remedies, crafted with herbs from the Satpura forests.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <Link 
                  to="/shop" 
                  className="inline-flex items-center justify-center gap-3 bg-brand-600 text-white px-10 py-4 rounded-full font-medium tracking-wide hover:bg-brand-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Shop Products
                  <ShoppingBag className="w-5 h-5" />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-medium tracking-wide hover:bg-white/20 transition-all duration-300"
                >
                  Contact Us
                  <Phone className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-6 font-medium">Welcome to Chanchal Ayurvedic</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-earth-900 mb-8 leading-tight">
              Authentic Herbal Remedies from the Satpura Range
            </h3>
            <p className="text-lg text-earth-600 font-light leading-relaxed mb-12">
              Located in the "Queen of Satpura," Chanchal Ayurvedic Pachmarhi is dedicated to bringing you the purest form of Ayurvedic products. Our expert vaidyas use locally sourced, wild-crafted herbs and time-tested traditional methods to prepare remedies that promote holistic wellness and natural healing.
            </p>
            <div className="flex justify-center gap-12">
              <div className="text-center">
                <p className="text-4xl font-serif text-brand-700 mb-2">15+</p>
                <p className="text-xs tracking-widest uppercase text-earth-500">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-brand-700 mb-2">5k+</p>
                <p className="text-xs tracking-widest uppercase text-earth-500">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-serif text-brand-700 mb-2">100%</p>
                <p className="text-xs tracking-widest uppercase text-earth-500">Natural Care</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-brand-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-6 font-medium">Ayurvedic Remedies</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-earth-900 leading-tight">
                Authentic Products for Your Wellness
              </h3>
            </div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-brand-700 font-medium hover:gap-3 transition-all border-b-2 border-brand-200 pb-1">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Brahmi Hair Oil",
                price: 450,
                image: "https://images.unsplash.com/photo-1611078813455-84227c813098?auto=format&fit=crop&q=80&w=800",
                category: "Herbal Oils"
              },
              {
                name: "Ashwagandha Powder",
                price: 350,
                image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
                category: "Supplements"
              },
              {
                name: "Herbal Detox Tea",
                price: 299,
                image: "https://images.unsplash.com/photo-1544787210-2827448b303c?auto=format&fit=crop&q=80&w=800",
                category: "Wellness Tea"
              },
              {
                name: "Kumkumadi Tailam",
                price: 850,
                image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800",
                category: "Skin Care"
              }
            ].map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to="/shop">
                  <div className="aspect-square rounded-3xl overflow-hidden bg-brand-50 mb-6 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-earth-900 rounded-full shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xl font-serif text-earth-900 mb-2 group-hover:text-brand-700 transition-colors">{product.name}</h4>
                  <p className="text-brand-600 font-medium">₹{product.price}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-6 font-medium">Testimonials</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-earth-900 mb-8">What Our Guests Say</h3>
              <p className="text-earth-600 mb-8">
                Real stories of healing and transformation from those who have experienced our care in Pachmarhi.
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />)}
              </div>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(0, 2).map((t, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="bg-brand-50 p-10 rounded-[2.5rem] relative"
                >
                  <Quote className="absolute top-8 right-8 w-12 h-12 text-brand-200" />
                  <p className="text-xl text-earth-800 font-serif italic mb-8 relative z-10">
                    "{t.text}"
                  </p>
                  <div>
                    <p className="font-bold text-earth-900">{t.name}</p>
                    <p className="text-sm text-earth-500">{t.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 bg-earth-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm tracking-[0.3em] uppercase text-brand-400 mb-6 font-medium">Visit Us</h2>
              <h3 className="text-4xl md:text-5xl font-serif mb-8">Healing in the Heart of Nature</h3>
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-xl mb-1">Our Location</p>
                    <p className="text-earth-300">Arvind Marg, Pachmarhi,<br/>Madhya Pradesh 461881, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brand-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-bold text-xl mb-1">Contact Details</p>
                    <p className="text-earth-300">+91 97555 23428<br/>+91 93014 28604</p>
                  </div>
                </div>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-400 font-medium hover:text-white transition-colors"
              >
                Get Directions <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="h-[400px] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14766.452562479572!2d78.4233!3d22.4674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397e6f8a8a8a8a8a%3A0x8a8a8a8a8a8a8a8a!2sPachmarhi%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Chanchal Ayurvedic Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
