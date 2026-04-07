import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Calendar, Clock, User, Phone, MessageSquare, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/utils';

export const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookings');
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', id), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `bookings/${id}`);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteDoc(doc(db, 'bookings', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `bookings/${id}`);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading bookings...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-serif font-bold text-earth-900">Appointment Bookings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl text-center border border-brand-200">
            <Calendar className="w-12 h-12 text-earth-300 mx-auto mb-4" />
            <p className="text-earth-600">No bookings found yet.</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-sm border border-brand-200 overflow-hidden">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                        booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status}
                      </span>
                      <span className="text-xs text-earth-400">
                        Booked on {booking.createdAt?.toDate().toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif text-earth-900">{booking.treatment}</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                      <div className="flex items-center gap-3 text-earth-600">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{booking.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-earth-600">
                        <Phone className="w-4 h-4" />
                        <span>{booking.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-earth-600">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-earth-600">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>

                    {booking.message && (
                      <div className="flex gap-3 bg-brand-50 p-4 rounded-xl border border-brand-100">
                        <MessageSquare className="w-4 h-4 text-brand-600 shrink-0 mt-1" />
                        <p className="text-sm text-earth-700 italic">"{booking.message}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 justify-end">
                    {booking.status === 'pending' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Confirm
                      </button>
                    )}
                    {booking.status !== 'cancelled' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel
                      </button>
                    )}
                    <button 
                      onClick={() => deleteBooking(booking.id)}
                      className="flex items-center gap-2 px-4 py-2 text-earth-400 hover:text-red-600 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
