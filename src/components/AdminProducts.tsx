import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, X, Save, Image as ImageIcon } from 'lucide-react';
import { getImageUrl } from '../lib/utils';

export const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Supplements',
    image: '',
    description: '',
    stock: '100',
    benefits: '',
    ingredients: '',
    isFeatured: false
  });

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      benefits: formData.benefits.split(',').map(s => s.trim()).filter(Boolean),
      ingredients: formData.ingredients.split(',').map(s => s.trim()).filter(Boolean),
      isFeatured: formData.isFeatured,
      updatedAt: serverTimestamp()
    };

    try {
      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), data);
      } else {
        await addDoc(collection(db, 'products'), {
          ...data,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      setFormData({ 
        name: '', 
        price: '', 
        category: 'Supplements', 
        image: '', 
        description: '', 
        stock: '100',
        benefits: '',
        ingredients: '',
        isFeatured: false
      });
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      description: product.description || '',
      stock: (product.stock || 100).toString(),
      benefits: (product.benefits || []).join(', '),
      ingredients: (product.ingredients || []).join(', '),
      isFeatured: product.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-serif font-bold text-earth-900">Manage Products</h1>
        <button 
          onClick={() => {
            setEditingProduct(null);
            setFormData({ 
              name: '', 
              price: '', 
              category: 'Supplements', 
              image: '', 
              description: '', 
              stock: '100',
              benefits: '',
              ingredients: ''
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-brand-700 text-white rounded-xl hover:bg-brand-800 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-brand-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-brand-50 border-b border-brand-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-earth-600">Product</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-earth-600">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-earth-600">Price</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-earth-600">Stock</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-earth-600">Featured</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-earth-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-brand-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img 
                      src={getImageUrl(product.image)} 
                      alt="" 
                      className="w-12 h-12 rounded-lg object-cover" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <div>
                      <p className="font-medium text-earth-900">{product.name}</p>
                      <p className="text-xs text-earth-500 truncate max-w-[200px]">{product.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs rounded-full font-medium">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-earth-900">₹{product.price}</td>
                <td className="px-6 py-4 text-earth-600">{product.stock}</td>
                <td className="px-6 py-4">
                  {product.isFeatured ? (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] rounded-full font-bold uppercase tracking-wider">Featured</span>
                  ) : (
                    <span className="text-earth-300 text-[10px] uppercase tracking-wider">Regular</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(product)}
                      className="p-2 text-earth-400 hover:text-brand-600 transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-earth-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-brand-200 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-earth-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-earth-400 hover:text-earth-900">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-earth-700">Product Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    placeholder="e.g. Ashwagandha Gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-earth-700">Category</label>
                  <select 
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                  >
                    <option>Supplements</option>
                    <option>Skincare</option>
                    <option>Haircare</option>
                    <option>Immunity</option>
                    <option>Digestion</option>
                    <option>Wellness</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-earth-700">Price (₹)</label>
                  <input 
                    required
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-earth-700">Stock Quantity</label>
                  <input 
                    required
                    type="number"
                    value={formData.stock}
                    onChange={e => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-earth-700">Image URL</label>
                <div className="flex gap-4">
                  <input 
                    required
                    type="url"
                    value={formData.image}
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="flex-grow px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {formData.image && (
                    <img 
                      src={getImageUrl(formData.image)} 
                      alt="Preview" 
                      className="w-12 h-12 rounded-lg object-cover border border-brand-200" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-earth-700">Description</label>
                <textarea 
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none resize-none"
                  placeholder="Tell customers about this product..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-earth-700">Benefits (comma separated)</label>
                  <input 
                    type="text"
                    value={formData.benefits}
                    onChange={e => setFormData({...formData, benefits: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    placeholder="e.g. Boosts immunity, Improves digestion"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-earth-700">Ingredients (comma separated)</label>
                  <input 
                    type="text"
                    value={formData.ingredients}
                    onChange={e => setFormData({...formData, ingredients: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-brand-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none"
                    placeholder="e.g. Ashwagandha, Turmeric"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-brand-50 rounded-xl border border-brand-100">
                <input 
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={e => setFormData({...formData, isFeatured: e.target.checked})}
                  className="w-5 h-5 rounded border-brand-300 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-earth-700 cursor-pointer">
                  Mark as Featured Product (will show on Home page)
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 border border-brand-200 text-earth-700 rounded-xl hover:bg-brand-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-brand-700 text-white rounded-xl hover:bg-brand-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {editingProduct ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
