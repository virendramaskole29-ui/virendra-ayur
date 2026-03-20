import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { LayoutDashboard, ShoppingCart, Package, LogOut, Plus, ShieldCheck } from 'lucide-react';
import { AdminProducts } from '../components/AdminProducts';
import { AdminOrders } from '../components/AdminOrders';

export const Admin = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders'>('dashboard');
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // Check if user is admin (virendramaskole29@gmail.com)
      if (user?.email === 'virendramaskole29@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    // Fetch stats
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      setStats(prev => ({ ...prev, products: snapshot.size }));
    });

    const unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
      let totalRevenue = 0;
      snapshot.docs.forEach(doc => {
        totalRevenue += doc.data().total || 0;
      });
      setStats(prev => ({ ...prev, orders: snapshot.size, revenue: totalRevenue }));
    });

    return () => {
      unsubProducts();
      unsubOrders();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-brand-200">
          <ShieldCheck className="w-16 h-16 text-brand-600 mx-auto mb-6" />
          <h1 className="text-2xl font-serif font-bold text-earth-900 mb-2">Admin Login</h1>
          <p className="text-earth-600 mb-8">Access the Virendra Admin Panel to manage products and orders.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-3 bg-brand-700 text-white rounded-xl font-medium hover:bg-brand-800 transition-colors flex items-center justify-center gap-2"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border border-red-200">
          <h1 className="text-2xl font-serif font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-earth-600 mb-8">You do not have permission to access this area.</p>
          <button 
            onClick={handleLogout}
            className="w-full py-3 bg-earth-900 text-white rounded-xl font-medium hover:bg-earth-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-earth-900 text-white flex flex-col">
        <div className="p-6 border-b border-earth-800">
          <h2 className="font-serif text-2xl font-light tracking-wide">Virendra</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-brand-400 mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-brand-700 text-white' : 'text-earth-400 hover:bg-earth-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'products' ? 'bg-brand-700 text-white' : 'text-earth-400 hover:bg-earth-800 hover:text-white'}`}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'orders' ? 'bg-brand-700 text-white' : 'text-earth-400 hover:bg-earth-800 hover:text-white'}`}
          >
            <ShoppingCart className="w-5 h-5" />
            Orders
          </button>
        </nav>

        <div className="p-4 border-t border-earth-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.displayName}</p>
              <p className="text-[10px] text-earth-400 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto p-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h1 className="text-3xl font-serif font-bold text-earth-900">Dashboard Overview</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-earth-600 font-medium">Total Products</h3>
                </div>
                <p className="text-4xl font-serif font-bold text-earth-900">{stats.products}</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-brand-700">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <h3 className="text-earth-600 font-medium">Total Orders</h3>
                </div>
                <p className="text-4xl font-serif font-bold text-earth-900">{stats.orders}</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700">
                    <span className="text-xl font-bold">₹</span>
                  </div>
                  <h3 className="text-earth-600 font-medium">Total Revenue</h3>
                </div>
                <p className="text-4xl font-serif font-bold text-earth-900">₹{stats.revenue.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-200">
              <h2 className="text-xl font-serif font-bold text-earth-900 mb-4">Quick Actions</h2>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('products')}
                  className="flex items-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl hover:bg-brand-800 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add New Product
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="flex items-center gap-2 px-6 py-3 border border-brand-200 text-earth-700 rounded-xl hover:bg-brand-50 transition-colors"
                >
                  View Recent Orders
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && <AdminProducts />}
        {activeTab === 'orders' && <AdminOrders />}
      </main>
    </div>
  );
};
