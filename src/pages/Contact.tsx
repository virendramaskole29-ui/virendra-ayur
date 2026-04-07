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
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-earth-900 mb-4">
            Connect with Us
          </h1>
          <p className="text-earth-600 text-lg font-light">
            Whether you're looking to book a treatment or have questions about our Ayurvedic therapies, we're here to guide you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-brand-100">
              <h2 className="text-2xl font-serif text-earth-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-1">Our Sanctuary</h3>
                    <p className="text-earth-600 leading-relaxed font-light">
                      Arvind Marg, Pachmarhi,<br />
                      Madhya Pradesh 461881,<br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-1">Phone & WhatsApp</h3>
                    <p className="text-earth-600 font-light">+91 97555 23428<br/>+91 93014 28604</p>
                    <p className="text-earth-500 text-sm mt-1 font-light">Available 9am to 8pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-earth-900 mb-1">Email Address</h3>
                    <p className="text-earth-600 font-light">virendramaskole29@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a 
                href="https://wa.me/919755523428" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-4 rounded-2xl font-medium hover:opacity-90 transition-opacity shadow-lg"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412 0 6.556-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.565.933 3.176 1.423 4.842 1.423 5.403 0 9.792-4.39 9.795-9.793 0-2.618-1.02-5.08-2.871-6.932-1.851-1.852-4.311-2.872-6.93-2.872-5.405 0-9.794 4.39-9.797 9.793 0 1.831.51 3.616 1.473 5.16l-.971 3.547 3.633-.952zm11.334-7.113c-.301-.151-1.781-.879-2.056-.979-.275-.1-.475-.151-.675.151-.199.302-.775 1.005-.95 1.206-.175.202-.35.227-.651.076-.301-.151-1.27-.468-2.42-1.494-.894-.797-1.496-1.782-1.672-2.084-.176-.302-.019-.465.132-.615.136-.135.301-.352.451-.528.151-.176.201-.302.301-.503.1-.201.05-.377-.025-.528-.075-.151-.675-1.634-.925-2.237-.243-.588-.49-.509-.675-.519-.174-.01-.374-.012-.574-.012s-.525.075-.8.377c-.275.302-1.05 1.031-1.05 2.515s1.075 2.917 1.225 3.118c.15.201 2.115 3.231 5.123 4.531.715.309 1.273.494 1.707.633.718.228 1.37.196 1.885.119.574-.086 1.781-.729 2.031-1.432.25-.703.25-1.306.175-1.432-.075-.126-.275-.201-.575-.352z"/></svg>
                WhatsApp Us
              </a>
              <a 
                href="tel:+919755523428" 
                className="flex items-center justify-center gap-3 bg-brand-700 text-white py-4 rounded-2xl font-medium hover:bg-brand-800 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-brand-100">
              <h2 className="text-2xl font-serif text-earth-900 mb-8">
                Send us a Message
              </h2>
              
              {isSuccess ? (
                <div className="bg-brand-50 border border-brand-200 text-brand-800 p-10 rounded-3xl text-center">
                  <div className="w-16 h-16 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-brand-700" />
                  </div>
                  <h3 className="font-serif text-2xl mb-2">Message Sent!</h3>
                  <p className="font-light">Thank you for reaching out. Our team will get back to you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 text-brand-700 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-50/30 font-light"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      className="w-full px-6 py-4 rounded-2xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-50/30 font-light"
                      placeholder="Your Phone Number"
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
                      className="w-full px-6 py-4 rounded-2xl border border-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-50/30 font-light resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-earth-900 text-white py-5 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-brand-700 transition-all disabled:opacity-70 shadow-xl"
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
