import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Package, Truck, CheckCircle2, Clock, AlertCircle, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { formatPrice } from '../lib/utils';

export const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrder(null);

    try {
      const q = query(
        collection(db, 'orders'), 
        where('orderId', '==', orderId.trim().toUpperCase()),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Order not found. Please check your Order ID and try again.');
      } else {
        const orderData = querySnapshot.docs[0].data();
        setOrder({ id: querySnapshot.docs[0].id, ...orderData });
      }
    } catch (err) {
      console.error("Error tracking order:", err);
      setError('An error occurred while tracking your order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending': return 1;
      case 'shipped': return 2;
      case 'delivered': return 3;
      case 'cancelled': return -1;
      default: return 1;
    }
  };

  const statusStep = order ? getStatusStep(order.status) : 0;

  return (
    <div className="min-h-screen bg-brand-50 py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold text-earth-900 mb-4">
            Track Your Order
          </h1>
          <p className="text-earth-600 text-lg max-w-2xl mx-auto">
            Enter your Order ID to see the real-time status of your Ayurvedic remedies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-brand-200 mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-earth-400" />
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g. VIR-123456-789)"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-brand-50/30 font-mono"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-brand-700 text-white px-10 py-4 rounded-2xl font-medium hover:bg-brand-800 transition-all shadow-lg shadow-brand-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? 'Searching...' : 'Track Order'}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 border border-red-100"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </div>

        {/* Order Details */}
        <AnimatePresence mode="wait">
          {order && (
            <motion.div
              key={order.orderId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Status Tracker */}
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-brand-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                  <div>
                    <p className="text-xs text-earth-500 uppercase tracking-[0.2em] mb-1">Order Status</p>
                    <h2 className="text-2xl font-serif font-bold text-earth-900 capitalize">
                      {order.status === 'cancelled' ? 'Order Cancelled' : `Your Order is ${order.status}`}
                    </h2>
                  </div>
                  <div className="bg-brand-50 px-4 py-2 rounded-full border border-brand-100">
                    <p className="text-sm font-medium text-brand-700">Order ID: <span className="font-mono">{order.orderId}</span></p>
                  </div>
                </div>

                {order.status !== 'cancelled' ? (
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute top-6 left-6 right-6 h-1 bg-earth-100 hidden md:block">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((statusStep - 1) / 2) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-brand-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                      {/* Step 1: Pending */}
                      <div className="flex md:flex-col items-center gap-4 md:text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${statusStep >= 1 ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' : 'bg-earth-100 text-earth-400'}`}>
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm uppercase tracking-wider ${statusStep >= 1 ? 'text-earth-900' : 'text-earth-400'}`}>Confirmed</p>
                          <p className="text-xs text-earth-500 mt-1">Order received & processing</p>
                        </div>
                      </div>

                      {/* Step 2: Shipped */}
                      <div className="flex md:flex-col items-center gap-4 md:text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${statusStep >= 2 ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' : 'bg-earth-100 text-earth-400'}`}>
                          <Truck className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm uppercase tracking-wider ${statusStep >= 2 ? 'text-earth-900' : 'text-earth-400'}`}>Shipped</p>
                          <p className="text-xs text-earth-500 mt-1">Order is on its way to you</p>
                        </div>
                      </div>

                      {/* Step 3: Delivered */}
                      <div className="flex md:flex-col items-center gap-4 md:text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-500 ${statusStep >= 3 ? 'bg-brand-600 text-white shadow-lg shadow-brand-200' : 'bg-earth-100 text-earth-400'}`}>
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm uppercase tracking-wider ${statusStep >= 3 ? 'text-earth-900' : 'text-earth-400'}`}>Delivered</p>
                          <p className="text-xs text-earth-500 mt-1">Order successfully delivered</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4 text-red-700">
                    <XCircle className="w-8 h-8" />
                    <div>
                      <p className="font-bold">Order Cancelled</p>
                      <p className="text-sm opacity-80">This order has been cancelled. Please contact support for more information.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Shipping Details */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-200">
                  <h3 className="font-serif font-bold text-xl text-earth-900 mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-brand-600" />
                    Shipping Details
                  </h3>
                  <div className="space-y-4 text-earth-700">
                    <div>
                      <p className="text-xs text-earth-400 uppercase tracking-widest mb-1">Customer Name</p>
                      <p className="font-medium">{order.customerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-earth-400 uppercase tracking-widest mb-1">Address</p>
                      <p className="font-medium leading-relaxed">
                        {order.address}, {order.city}, {order.state} - {order.pincode}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-earth-400 uppercase tracking-widest mb-1">Phone</p>
                        <p className="font-medium flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-brand-500" />
                          {order.customerPhone}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-earth-400 uppercase tracking-widest mb-1">Email</p>
                        <p className="font-medium flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-brand-500" />
                          {order.customerEmail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-200">
                  <h3 className="font-serif font-bold text-xl text-earth-900 mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-brand-600" />
                    Order Summary
                  </h3>
                  <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-2 border-b border-brand-50 last:border-0">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-brand-50 text-brand-700 rounded flex items-center justify-center text-[10px] font-bold">
                            {item.quantity}x
                          </span>
                          <span className="text-sm font-medium text-earth-800">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-earth-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-brand-100 flex justify-between items-center">
                    <span className="text-earth-500 font-medium">Total Amount</span>
                    <span className="text-2xl font-serif font-bold text-brand-700">₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Section */}
        <div className="mt-16 text-center">
          <p className="text-earth-500 mb-4">Having trouble tracking your order?</p>
          <div className="flex justify-center gap-8">
            <a href="tel:+919755523428" className="text-brand-700 font-medium hover:underline flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Support
            </a>
            <a href="mailto:virendramaskole29@gmail.com" className="text-brand-700 font-medium hover:underline flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const XCircle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);
