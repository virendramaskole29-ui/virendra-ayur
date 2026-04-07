import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, Phone, MessageSquare, CheckCircle2, ArrowRight, Leaf } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const treatments = [
  "Panchakarma Therapy",
  "Stress Relief Therapy",
  "Skin & Hair Treatment",
  "Joint Pain Treatment",
  "Detox Program",
  "General Consultation"
];

export const BookAppointment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: treatments[0],
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'bookings'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      setIsSubmitting(false);
      alert('There was an error processing your booking. Please try again or call us directly.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif text-earth-900 mb-4">Book Your Healing Session</h1>
            <p className="text-earth-600 font-light">Take the first step towards natural wellness in Pachmarhi.</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-xl overflow-hidden border border-brand-100">
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Left Side - Info */}
            <div className="lg:col-span-2 bg-earth-900 p-10 text-white flex flex-col justify-between">
              <div>
                <Leaf className="w-12 h-12 text-brand-400 mb-8" />
                <h2 className="text-3xl font-serif mb-6">Why Choose Us?</h2>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0" />
                    <p className="text-earth-200 font-light">Expert Vaidyas with 15+ years experience</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0" />
                    <p className="text-earth-200 font-light">Authentic forest-sourced herbal treatments</p>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand-400 shrink-0" />
                    <p className="text-earth-200 font-light">Tranquil healing environment in Pachmarhi</p>
                  </li>
                </ul>
              </div>
              
              <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-sm text-earth-300 mb-2">Need immediate help?</p>
                <p className="text-xl font-medium">+91 97555 23428</p>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:col-span-3 p-10 md:p-12">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="w-10 h-10 text-brand-600" />
                  </div>
                  <h3 className="text-3xl font-serif text-earth-900 mb-4">Booking Received!</h3>
                  <p className="text-earth-600 font-light mb-8 max-w-xs mx-auto">
                    Thank you for choosing Chanchal Ayurvedic. Our team will call you shortly to confirm your appointment.
                  </p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-brand-700 font-medium hover:underline"
                  >
                    Make another booking
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
                        <input 
                          type="text" 
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-100 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30 font-light"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-100 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30 font-light"
                          placeholder="Your Phone"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Select Treatment</label>
                    <select 
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border border-brand-100 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30 font-light appearance-none"
                    >
                      {treatments.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-2">Preferred Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
                        <input 
                          type="date" 
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-100 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30 font-light"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-earth-700 mb-2">Preferred Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
                        <input 
                          type="time" 
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-100 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30 font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Additional Message (Optional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-earth-400" />
                      <textarea 
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-100 focus:ring-2 focus:ring-brand-500 focus:outline-none bg-brand-50/30 font-light resize-none"
                        placeholder="Any specific health concerns?"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-700 text-white py-5 rounded-2xl font-medium flex items-center justify-center gap-3 hover:bg-brand-800 transition-all shadow-xl disabled:opacity-70"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm Booking'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
