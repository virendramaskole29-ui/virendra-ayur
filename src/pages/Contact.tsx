import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const scriptUrl = (import.meta as any).env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbz7bjhQhHwnfwgTLUg1MxPCZDzjHpNQXz9xOliDuE3ciUkREgg_l42hGRVoNMgdXy9n/exec";

    if (!scriptUrl) {
      console.warn("Google Sheet Webhook URL is not configured. Mocking submission.");
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }, 1000);
      return;
    }

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required to avoid CORS issues with Google Apps Script
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(formData)
      });
      
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-earth-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-earth-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-earth-600 text-lg">
            Have a question about our products or your order? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-earth-100 h-full">
              <h2 className="text-2xl font-serif font-semibold text-earth-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-1">Our Location</h3>
                    <p className="text-earth-600 leading-relaxed">
                      Pachmarhi,<br />
                      Madhya Pradesh,<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-1">Phone Number</h3>
                    <p className="text-earth-600">+91 97555 23428<br/>+91 93014 28604</p>
                    <p className="text-earth-500 text-sm mt-1">Mon-Fri, 9am to 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-1">Email Address</h3>
                    <p className="text-earth-600">virendramaskole29@gmail.com</p>
                    <p className="text-earth-500 text-sm mt-1">We aim to reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-earth-100">
              <h2 className="text-2xl font-serif font-semibold text-earth-900 mb-8">
                Send us a Message
              </h2>
              
              {isSuccess ? (
                <div className="bg-brand-50 border border-brand-200 text-brand-800 p-6 rounded-xl text-center">
                  <h3 className="font-medium text-lg mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 text-brand-600 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Message</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50 resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-600 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <Send className="w-5 h-5" />}
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
