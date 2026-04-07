import React from 'react';
import { motion } from 'motion/react';
import { Leaf, Star, ShieldCheck, Sparkles, Wind, Droplets, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const treatments = [
  {
    title: "Panchakarma Therapy",
    subtitle: "The Ultimate Detox",
    description: "A comprehensive five-step purification process that removes deep-seated toxins from the body, balances the doshas, and rejuvenates the entire system.",
    benefits: ["Deep detoxification", "Improved immunity", "Mental clarity", "Balanced metabolism"],
    icon: <Leaf className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Stress Relief Therapy",
    subtitle: "Mind-Body Harmony",
    description: "Specialized Shirodhara and Abhyanga treatments designed to calm the nervous system, reduce anxiety, and promote deep, restful sleep.",
    benefits: ["Reduced anxiety", "Better sleep quality", "Nervous system support", "Mental relaxation"],
    icon: <Wind className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Skin & Hair Treatment",
    subtitle: "Natural Radiance",
    description: "Herbal facials, hair masks, and body wraps using forest-sourced ingredients to treat skin conditions and promote natural beauty from within.",
    benefits: ["Glowing skin", "Hair growth support", "Natural anti-aging", "Treatment for skin issues"],
    icon: <Sparkles className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Joint Pain Treatment",
    subtitle: "Mobility & Strength",
    description: "Targeted potli massage and herbal oil applications to reduce inflammation, relieve chronic pain, and improve joint flexibility.",
    benefits: ["Pain relief", "Reduced inflammation", "Improved flexibility", "Long-term joint health"],
    icon: <Heart className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Detox Programs",
    subtitle: "Internal Cleansing",
    description: "Short and long-term herbal detox programs guided by our vaidyas to reset your digestive fire and clear metabolic waste.",
    benefits: ["Weight management", "Better digestion", "Increased energy", "Clearer skin"],
    icon: <Droplets className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800"
  }
];

export const Services = () => {
  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <section className="py-24 bg-earth-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1545191215-220a5672fc9e?auto=format&fit=crop&q=80&w=2000" 
            alt="Forest background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Healing Treatments</h1>
            <p className="text-xl text-earth-200 max-w-2xl mx-auto font-light">
              Ancient Ayurvedic wisdom tailored for your modern wellness journey in the serene hills of Pachmarhi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treatments List */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center`}
              >
                <div className="lg:w-1/2 relative">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                      src={treatment.image} 
                      alt={treatment.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-6 ${index % 2 === 1 ? '-left-6' : '-right-6'} w-32 h-32 bg-brand-600 rounded-3xl flex items-center justify-center text-white shadow-xl`}>
                    {treatment.icon}
                  </div>
                </div>
                
                <div className="lg:w-1/2">
                  <h2 className="text-sm tracking-[0.3em] uppercase text-brand-600 mb-4 font-medium">{treatment.subtitle}</h2>
                  <h3 className="text-4xl md:text-5xl font-serif text-earth-900 mb-6">{treatment.title}</h3>
                  <p className="text-lg text-earth-600 font-light leading-relaxed mb-8">
                    {treatment.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {treatment.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-3 text-earth-700">
                        <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                          <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link 
                    to="/book" 
                    className="inline-flex items-center gap-3 bg-earth-900 text-white px-8 py-4 rounded-full font-medium hover:bg-brand-700 transition-all duration-300"
                  >
                    Book This Treatment
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Not sure which treatment is right for you?</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light">
            Schedule a consultation with our expert vaidyas to receive a personalized wellness plan based on your prakriti.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 bg-white text-brand-700 px-10 py-4 rounded-full font-medium hover:bg-brand-50 transition-all duration-300 shadow-xl"
          >
            Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};
