import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { auth } from '../firebase';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getImageUrl = (url: string) => {
  if (!url) return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';
  
  // Handle Google Drive links
  if (url.includes('drive.google.com') || url.includes('googleusercontent.com')) {
    // Extract ID from various formats:
    // /file/d/ID/view
    // /open?id=ID
    // /uc?id=ID
    // /id=ID
    // /d/ID
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || 
                    url.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
                    url.match(/\/uc\?id=([a-zA-Z0-9_-]+)/);
                    
    if (idMatch && idMatch[1]) {
      // Using the most reliable direct link format for Google Drive
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }
  
  return url;
};
