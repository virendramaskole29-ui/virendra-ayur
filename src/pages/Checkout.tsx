import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { formatPrice, getImageUrl } from '../lib/utils';
import { CheckCircle2, ArrowRight, ShieldCheck, Copy } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateOrderId = () => {
    const prefix = 'VIR';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    const orderData = {
      orderId: newOrderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: cartTotal,
      status: 'pending',
      createdAt: serverTimestamp(),
    };

    console.log('Saving order to Firestore and Google Sheets:', orderData);

    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'orders'), orderData);
      console.log('Order saved to Firestore');

      // 2. Save to Google Sheets (Legacy/Backup)
      const webhookUrl = (import.meta as any).env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbz7bjhQhHwnfwgTLUg1MxPCZDzjHpNQXz9xOliDuE3ciUkREgg_l42hGRVoNMgdXy9n/exec";
      
      if (webhookUrl) {
        const sheetData = {
          ...orderData,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          items: items.map(item => `${item.name} (x${item.quantity})`).join(', '),
          date: new Date().toLocaleString('en-IN'),
        };

        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(sheetData),
        });
        console.log('Order data sent to Google Sheets');
      }

      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied to clipboard!');
  };

  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-earth-50 px-4 text-center">
        <div className="w-20 h-20 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-earth-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-earth-600 text-lg max-w-md mb-6">
          Thank you for choosing Virendra. Your order has been successfully placed and will be shipped soon.
        </p>
        
        <div className="bg-white px-6 py-4 rounded-xl border border-earth-200 shadow-sm mb-6 flex items-center gap-4">
          <div className="text-left">
            <p className="text-xs text-earth-500 uppercase tracking-wider mb-1">Order ID</p>
            <p className="font-mono font-medium text-earth-900 text-lg">{orderId}</p>
          </div>
          <button 
            onClick={copyOrderId}
            className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
            title="Copy Order ID"
          >
            <Copy className="w-5 h-5" />
          </button>
        </div>

        {/* Order Tracking Section */}
        <div className="bg-white p-6 rounded-2xl border border-earth-100 shadow-sm mb-8 w-full max-w-md text-left">
          <h3 className="font-serif font-semibold text-earth-900 mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-600" />
            Order Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-brand-500 rounded-full animate-pulse" />
              <div>
                <p className="text-sm font-medium text-earth-900">Processing</p>
                <p className="text-xs text-earth-500">Your order is being prepared for shipment</p>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-40">
              <div className="w-3 h-3 bg-earth-300 rounded-full" />
              <div>
                <p className="text-sm font-medium text-earth-900">Shipped</p>
                <p className="text-xs text-earth-500">Waiting for courier pickup</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-earth-400 italic">
            * Tracking updates will be sent to {formData.email}
          </p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="bg-brand-600 text-white px-8 py-3 rounded-full font-medium hover:bg-brand-700 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif text-earth-900 mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-600 hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-serif font-semibold text-earth-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-earth-100">
              <h2 className="text-xl font-serif font-semibold text-earth-900 mb-6">Shipping Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-earth-700 mb-2">Full Address</label>
                  <textarea 
                    name="address"
                    required
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50 resize-none"
                    placeholder="House/Flat No., Street, Landmark"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">City</label>
                    <input 
                      type="text" 
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">State</label>
                    <input 
                      type="text" 
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-earth-700 mb-2">PIN Code</label>
                    <input 
                      type="text" 
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-earth-50/50"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-earth-100">
                  <h2 className="text-xl font-serif font-semibold text-earth-900 mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border border-earth-200 rounded-xl cursor-pointer hover:bg-earth-50 transition-colors">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-earth-300"
                      />
                      <span className="ml-3 font-medium text-earth-900">Cash on Delivery (COD)</span>
                    </label>
                    <label className="flex items-center p-4 border border-earth-200 rounded-xl cursor-pointer hover:bg-earth-50 transition-colors opacity-60">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="online"
                        disabled
                        className="w-4 h-4 text-brand-600 focus:ring-brand-500 border-earth-300"
                      />
                      <span className="ml-3 font-medium text-earth-900">Online Payment (Coming Soon)</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-brand-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-8"
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-earth-100 sticky top-24">
              <h2 className="text-xl font-serif font-semibold text-earth-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-earth-100 shrink-0">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-earth-900 line-clamp-2">{item.name}</h3>
                      <p className="text-earth-500 text-xs mt-1">Qty: {item.quantity}</p>
                      <p className="font-medium text-earth-900 mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-earth-100 pt-4 space-y-3">
                <div className="flex justify-between text-earth-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-earth-600">
                  <span>Shipping</span>
                  <span className="text-brand-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-earth-900 pt-3 border-t border-earth-100">
                  <span>Total</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
              </div>

              <div className="mt-8 bg-earth-50 p-4 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <p className="text-sm text-earth-600">
                  Secure checkout. Your personal information is protected and encrypted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
