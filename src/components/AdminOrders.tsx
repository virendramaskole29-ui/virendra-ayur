import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { ShoppingBag, Clock, CheckCircle, Truck, XCircle, ChevronDown, ExternalLink, Trash2 } from 'lucide-react';

export const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const deleteOrder = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteDoc(doc(db, 'orders', id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-emerald-100 text-emerald-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-earth-100 text-earth-700';
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-earth-900">Customer Orders</h1>
        <div className="flex gap-2">
          {['all', 'pending', 'shipped', 'delivered', 'cancelled'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${filter === s ? 'bg-brand-700 text-white' : 'bg-white text-earth-600 border border-brand-200 hover:bg-brand-50'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-brand-200 overflow-hidden">
            <div className="p-6 flex flex-wrap items-center justify-between gap-6 border-b border-brand-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(order.status)}`}>
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-earth-900">Order #{order.orderId}</h3>
                  <p className="text-xs text-earth-500">
                    {order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : 'Just now'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="text-xs text-earth-500 uppercase tracking-wider">Customer</p>
                  <p className="font-medium text-earth-900">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-earth-500 uppercase tracking-wider">Total</p>
                  <p className="font-bold text-brand-700">₹{order.total.toLocaleString()}</p>
                </div>
                <div className="relative group">
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`appearance-none pl-4 pr-10 py-2 rounded-lg text-sm font-bold outline-none cursor-pointer transition-colors ${getStatusColor(order.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                </div>
                <button 
                  onClick={() => deleteOrder(order.id)}
                  className="p-2 text-earth-400 hover:text-red-600 transition-colors"
                  title="Delete Order"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 bg-brand-50/30 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs font-bold text-earth-400 uppercase tracking-widest mb-4">Shipping Details</h4>
                <div className="space-y-2 text-sm text-earth-700">
                  <p><span className="text-earth-400">Phone:</span> {order.customerPhone}</p>
                  <p><span className="text-earth-400">Email:</span> {order.customerEmail}</p>
                  <p><span className="text-earth-400">Address:</span> {order.address}, {order.city}, {order.state} - {order.pincode}</p>
                  <p><span className="text-earth-400">Payment:</span> {order.paymentMethod}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-earth-400 uppercase tracking-widest mb-4">Order Items</h4>
                <div className="space-y-3">
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-white border border-brand-200 rounded flex items-center justify-center text-[10px] font-bold">
                          {item.quantity}x
                        </span>
                        <span className="text-earth-900">{item.name}</span>
                      </div>
                      <span className="text-earth-600">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-brand-300">
            <ShoppingBag className="w-12 h-12 text-brand-200 mx-auto mb-4" />
            <p className="text-earth-500">No orders found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
