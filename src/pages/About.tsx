import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Heart, ShieldCheck, Sprout, MapPin, Users, Award, Eye } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-brand-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1545191215-220a5672fc9e?auto=format&fit=crop&q=80&w=2000" 
            alt="Pachmarhi Forest" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-earth-900/50 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-white mb-8">
              Our Healing Journey
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
              Rooted in the ancient soil of Pachmarhi, we are dedicated to restoring the harmony of mind, body, and spirit through authentic Ayurveda.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-6 font-medium">The Story of Chanchal Ayurvedic</h2>
              <h3 className="text-3xl md:text-5xl font-serif text-earth-900 mb-8 leading-tight">
                A Legacy of Natural Healing in the Heart of India
              </h3>
              <p className="text-lg text-earth-600 font-light leading-relaxed mb-6">
                Founded over 15 years ago, Chanchal Ayurvedic Pachmarhi began with a simple mission: to make the profound benefits of Ayurveda accessible to those seeking refuge in the natural beauty of the Satpura range.
              </p>
              <p className="text-lg text-earth-600 font-light leading-relaxed mb-8">
                Our center is named after the spirit of rejuvenation. Pachmarhi, with its unique microclimate and rich biodiversity, provides the perfect environment for Ayurvedic healing. The herbs we use are often sourced from the very forests that surround us, ensuring maximum potency and freshness.
              </p>
              <div className="flex items-center gap-4 p-6 bg-brand-50 rounded-2xl border border-brand-100">
                <MapPin className="w-8 h-8 text-brand-600 shrink-0" />
                <p className="text-earth-800 font-medium italic">
                  "Healing happens best where nature is at its purest."
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=1200" 
                  alt="Ayurvedic Treatment Room" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-brand-100 hidden md:block">
                <p className="text-4xl font-serif text-brand-700 mb-1">15+</p>
                <p className="text-xs tracking-widest uppercase text-earth-500">Years of Tradition</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-brand-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[3rem] shadow-sm border border-brand-100"
            >
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-8">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif text-earth-900 mb-6">Our Mission</h3>
              <p className="text-lg text-earth-600 font-light leading-relaxed">
                To provide authentic, personalized Ayurvedic care that empowers individuals to take charge of their health naturally. We strive to preserve ancient healing traditions while integrating them into modern lifestyles.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-12 rounded-[3rem] shadow-sm border border-brand-100"
            >
              <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600 mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-serif text-earth-900 mb-6">Our Vision</h3>
              <p className="text-lg text-earth-600 font-light leading-relaxed">
                To be a global destination for Ayurvedic wellness tourism, where people from all walks of life can experience the transformative power of nature and ancient wisdom in the heart of Satpura.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-6 font-medium">Our Experts</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-earth-900 mb-8">Guided by Wisdom</h3>
            <p className="text-earth-600 max-w-2xl mx-auto">
              Our team of experienced vaidyas and therapists are dedicated to your healing journey, providing compassionate care and expert guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mb-8 border-4 border-brand-100 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=800" 
                  alt="Dr. Vaidya" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-2xl font-serif text-earth-900 mb-2">Dr. Virendra Maskole</h4>
              <p className="text-brand-600 font-medium mb-4 uppercase tracking-widest text-xs">Chief Vaidya & Founder</p>
              <p className="text-earth-600 font-light max-w-sm">
                With over 15 years of experience in Panchakarma and herbal medicine, Dr. Maskole leads our healing programs with deep knowledge and compassion.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mb-8 border-4 border-brand-100 shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=800" 
                  alt="Dr. Vaidya" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-2xl font-serif text-earth-900 mb-2">Dr. Chanchal Maskole</h4>
              <p className="text-brand-600 font-medium mb-4 uppercase tracking-widest text-xs">Senior Ayurvedic Consultant</p>
              <p className="text-earth-600 font-light max-w-sm">
                Specializing in women's health and stress management, Dr. Chanchal brings a holistic and nurturing approach to every consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
