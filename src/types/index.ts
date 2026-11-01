export type ProductCategory = 
  | 'Zingers & Burgers' 
  | 'Pizzas & Deals' 
  | 'Fried Chicken & Wings' 
  | 'Desi & Rolls' 
  | 'Bowls & Salads' 
  | 'Marts & Beverages' 
  | 'Bakery & Sweets';

export interface Product {
  id: string;
  name: string;
  localName?: string; // Urdu script name e.g. "چکن زنگر برگر"
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number; // in PKR (Rs.)
  originalPrice?: number;
  image: string;
  rating: number;
  reviewsCount: number;
  calories: number;
  protein: number; // in grams
  prepTime: string;
  outletName?: string; // local partner restaurant/mart
  isOrganic?: boolean;
  isHalal: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isBestSeller: boolean;
  isChefSpecial: boolean;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  dealBadge?: string; // e.g. "Chaska Deal", "Save Rs. 150"
  customizationOptions?: {
    sizes?: { name: string; priceDelta: number }[];
    spiceLevels?: string[];
    additions?: { id: string; name: string; price: number }[];
    dressing?: string[];
  };
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedSize?: { name: string; priceDelta: number };
  selectedSpice?: string;
  selectedAdditions: { id: string; name: string; price: number }[];
  selectedDressing?: string;
  specialNotes?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus = 'placed' | 'confirmed' | 'kitchen_prep' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface CourierInfo {
  name: string;
  phone: string;
  vehicle: string;
  rating: number;
  photo: string;
  statusText: string;
  latitude: number;
  longitude: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  region: string; // e.g. "Gilgit (Jutial)", "Gahkuch", "Aliabad"
  paymentMethod: string;
  subtotal: number;
  deliveryFee: number;
  ecoPackagingFee: number;
  discount: number;
  courierTip: number;
  total: number;
  estimatedMinutes: number;
  courier: CourierInfo;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  tier: 'Gold Gourmet' | 'Silver Epicure' | 'Green Member';
  loyaltyPoints: number;
  selectedRegion: string;
  savedAddresses: {
    id: string;
    title: string;
    address: string;
    region: string;
    type: 'Home' | 'Work' | 'Other';
    isDefault: boolean;
  }[];
  favoriteProductIds: string[];
  dietaryPreferences: string[];
  calorieGoalDaily: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  recommendedProducts?: Product[];
  actionType?: 'add_to_cart' | 'track_order' | 'discount_applied' | 'chaska_routed';
  actionProduct?: Product;
}

export type AppView = 'store' | 'chaska_ai' | 'dashboard' | 'admin' | 'portfolio';
