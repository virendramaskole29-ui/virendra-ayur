export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  benefits: string[];
  ingredients: string[];
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Ashwagandha Root Extract',
    description: 'Premium stress relief and vitality booster. Our Ashwagandha is sustainably sourced and highly concentrated for maximum efficacy.',
    price: 899,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1611078813455-84227c813098?auto=format&fit=crop&q=80&w=800',
    benefits: ['Reduces stress and anxiety', 'Improves sleep quality', 'Boosts energy levels'],
    ingredients: ['Organic Ashwagandha Root Extract', 'Black Pepper Extract (for absorption)'],
    isFeatured: true,
  },
  {
    id: 'p2',
    name: 'Kumkumadi Tailam',
    description: 'Authentic Ayurvedic facial oil for radiant, glowing skin. Formulated with pure saffron and 26 precious herbs.',
    price: 1499,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=800',
    benefits: ['Brightens complexion', 'Reduces dark circles', 'Improves skin texture'],
    ingredients: ['Saffron', 'Sandalwood', 'Manjistha', 'Licorice', 'Sesame Oil'],
    isFeatured: true,
  },
  {
    id: 'p3',
    name: 'Triphala Churna',
    description: 'Gentle daily detox and digestive support. A traditional blend of three fruits for overall gastrointestinal health.',
    price: 450,
    category: 'Digestion',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
    benefits: ['Supports healthy digestion', 'Natural detoxifier', 'Rich in Vitamin C'],
    ingredients: ['Amla (Indian Gooseberry)', 'Bibhitaki', 'Haritaki'],
    isFeatured: true,
  },
  {
    id: 'p4',
    name: 'Bhringraj Hair Oil',
    description: 'Intensive hair growth and scalp therapy. Infused with herbs known to promote hair strength and reduce hair fall.',
    price: 650,
    category: 'Haircare',
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=800',
    benefits: ['Promotes hair growth', 'Reduces dandruff', 'Prevents premature graying'],
    ingredients: ['Bhringraj', 'Amla', 'Brahmi', 'Coconut Oil', 'Sesame Oil'],
    isFeatured: false,
  },
  {
    id: 'p5',
    name: 'Chyawanprash',
    description: 'Immunity boosting Ayurvedic jam. A powerful antioxidant paste made from Amla and 40+ herbs.',
    price: 750,
    category: 'Immunity',
    image: 'https://images.unsplash.com/photo-1615486171448-4eff3c08064f?auto=format&fit=crop&q=80&w=800',
    benefits: ['Builds immunity', 'Improves respiratory health', 'Enhances stamina'],
    ingredients: ['Amla', 'Ghee', 'Honey', 'Dashmoola', 'Cardamom', 'Cinnamon'],
    isFeatured: true,
  },
  {
    id: 'p6',
    name: 'Brahmi Vati',
    description: 'Cognitive support and memory enhancer. Helps improve focus, concentration, and mental clarity.',
    price: 550,
    category: 'Supplements',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    benefits: ['Improves memory', 'Enhances concentration', 'Calms the mind'],
    ingredients: ['Brahmi Extract', 'Shankhpushpi'],
    isFeatured: false,
  },
  {
    id: 'p7',
    name: 'Neem & Tulsi Face Wash',
    description: 'Purifying and antibacterial face wash for clear, acne-free skin. Gently cleanses without stripping natural oils.',
    price: 350,
    category: 'Skincare',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800',
    benefits: ['Clears acne and blemishes', 'Purifies skin', 'Removes excess oil'],
    ingredients: ['Neem Extract', 'Tulsi (Holy Basil)', 'Aloe Vera'],
    isFeatured: true,
  },
  {
    id: 'p8',
    name: 'Amla Reetha Shikakai Shampoo',
    description: 'Traditional herbal shampoo for strong, shiny, and voluminous hair. Natural cleansing without harsh sulfates.',
    price: 499,
    category: 'Haircare',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&q=80&w=800',
    benefits: ['Strengthens hair roots', 'Adds natural shine', 'Prevents hair fall'],
    ingredients: ['Amla', 'Reetha (Soapnut)', 'Shikakai', 'Hibiscus'],
    isFeatured: true,
  }
];

export const categories = Array.from(new Set(products.map(p => p.category)));
