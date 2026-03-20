import React from 'react';
import { Leaf, Heart, ShieldCheck, Sprout } from 'lucide-react';
import { getImageUrl } from '../lib/utils';

export const About = () => {
  return (
    <div className="min-h-screen bg-earth-50">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542840410-3092f99611a3?auto=format&fit=crop&q=80&w=2000" 
            alt="Ayurvedic herbs" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-earth-900/60"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white mb-6">
            Our Story
          </h1>
          <p className="text-lg md:text-xl text-earth-100 leading-relaxed">
            Rooted in tradition, crafted for the modern world. We believe in the profound healing power of nature.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg prose-earth mx-auto">
            <h2 className="text-3xl font-serif font-semibold text-earth-900 mb-6 text-center">
              The Virendra Philosophy
            </h2>
            <p className="text-earth-600 leading-relaxed mb-8 text-center">
              Founded on the principles of Ayurveda, the 5,000-year-old science of life, Virendra was born from a desire to bring authentic, pure, and effective herbal remedies to everyday wellness routines.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1611078813455-84227c813098?auto=format&fit=crop&q=80&w=800" 
                  alt="Herbal preparation" 
                  className="rounded-2xl shadow-md w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-serif font-semibold text-earth-900 mb-4">Purity in Every Drop</h3>
                <p className="text-earth-600 leading-relaxed mb-6">
                  We source our ingredients directly from organic farmers across India who practice sustainable agriculture. Every herb is harvested at its peak potency to ensure maximum efficacy.
                </p>
                <p className="text-earth-600 leading-relaxed">
                  Our formulations are free from synthetic chemicals, parabens, and artificial fragrances. What you get is 100% natural goodness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-semibold text-earth-900 mb-16 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">100% Natural</h3>
              <p className="text-earth-600">Uncompromised purity in every product we create.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Authentic</h3>
              <p className="text-earth-600">True to classical Ayurvedic texts and traditions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <Sprout className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Sustainable</h3>
              <p className="text-earth-600">Ethically sourced and environmentally conscious.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Cruelty-Free</h3>
              <p className="text-earth-600">Never tested on animals, crafted with compassion.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Founder Section */}
      <section className="py-24 bg-earth-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={getImageUrl("https://drive.google.com/uc?export=view&id=1TeWZGit2uwN2l9wPk6aJg1uolFMaGzg_")} 
                  alt="Virendra Maskole - Founder" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-900/40 to-transparent"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <span className="text-brand-600 font-medium tracking-widest uppercase text-xs mb-4 block">The Visionary</span>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-earth-900 mb-6">
                Virendra Maskole
              </h2>
              <p className="text-earth-600 text-lg leading-relaxed mb-6 italic">
                "Ayurveda is not just a system of medicine; it is a way of life that brings us back to our roots and restores the balance between mind, body, and spirit."
              </p>
              <p className="text-earth-600 leading-relaxed mb-8">
                Virendra founded this brand with a mission to simplify Ayurveda for the modern generation. By combining ancient wisdom with contemporary standards of purity and transparency, he aims to make holistic wellness accessible to everyone, everywhere.
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-serif text-xl font-medium text-earth-900">Virendra Maskole</span>
                <span className="text-earth-400 text-sm">Founder & CEO</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
