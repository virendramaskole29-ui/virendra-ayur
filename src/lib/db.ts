import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { products as initialProducts } from '../data/products';

export const seedDatabase = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    if (querySnapshot.empty) {
      console.log('Seeding initial products...');
      for (const product of initialProducts) {
        const { id, ...productData } = product;
        await addDoc(collection(db, 'products'), {
          ...productData,
          stock: 100,
          createdAt: serverTimestamp()
        });
      }
      console.log('Seeding complete!');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

export const getProducts = async () => {
  const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getFeaturedProducts = async () => {
  const q = query(collection(db, 'products'), limit(8));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
