import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
