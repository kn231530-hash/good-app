import { Product, CustomerProfile, Order, CourierInfo } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Wild Salmon & Quinoa Glow Bowl',
    tagline: 'Omega-rich wild caught salmon with roasted sweet potatoes & avocado',
    description: 'Pan-seared Alaskan wild salmon fillets resting over tri-color Andean quinoa, diced Hass avocados, massaged kale, edamame, and toasted sesame ginger vinaigrette.',
    category: 'Bowls & Salads',
    price: 16.50,
    originalPrice: 19.00,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviewsCount: 342,
    calories: 520,
    protein: 38,
    prepTime: '15-20 min',
    isOrganic: true,
    isVegan: false,
    isGlutenFree: true,
    isBestSeller: true,
    isChefSpecial: true,
    inStock: true,
    stockCount: 24,
    tags: ['High Protein', 'Gluten Free', 'Omega 3', 'Superfood'],
    customizationOptions: {
      sizes: [
        { name: 'Standard Regular Bowl (450g)', priceDelta: 0 },
        { name: 'Power Feast Double Salmon (650g)', priceDelta: 6.00 }
      ],
      spiceLevels: ['Mellow Mild', 'Spicy Jalapeño Kick', 'Sriracha Glazed'],
      additions: [
        { id: 'add-1', name: 'Extra Half Hass Avocado', price: 2.50 },
        { id: 'add-2', name: 'Organic Soft Boiled Egg', price: 1.80 },
        { id: 'add-3', name: 'Crispy Garlic Chickpea Crunch', price: 1.20 }
      ],
      dressing: ['Sesame Ginger Vinaigrette', 'Creamy Tahini Lemon', 'Green Goddess Basil']
    }
  },
  {
    id: 'prod-2',
    name: 'Truffle Mushroom Smash Burger',
    tagline: 'Grass-fed wagyu blend with black truffle aioli & aged Gruyère',
    description: 'Double smashed grass-fed beef patties with caramelized wild forest mushrooms, melted cave-aged Gruyère, baby arugula, and black truffle reduction on a toasted artisanal brioche bun.',
    category: 'Gourmet Burgers',
    price: 15.80,
    originalPrice: 17.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviewsCount: 480,
    calories: 740,
    protein: 44,
    prepTime: '18-22 min',
    isOrganic: true,
    isVegan: false,
    isGlutenFree: false,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 18,
    tags: ['Grass-fed', 'Artisanal Brioche', 'Chef Favorite'],
    customizationOptions: {
      sizes: [
        { name: 'Single Double-Patty', priceDelta: 0 },
        { name: 'Triple Monster Stack', priceDelta: 4.50 }
      ],
      additions: [
        { id: 'add-4', name: 'Smoked Applewood Bacon', price: 2.80 },
        { id: 'add-5', name: 'House Pickled Jalapeños', price: 1.00 },
        { id: 'add-6', name: 'Side of Truffle Parmesan Fries', price: 4.50 }
      ]
    }
  },
  {
    id: 'prod-3',
    name: 'Wood-Fired Burrata & Prosciutto Pizza',
    tagline: 'San Marzano DOP, creamy burrata ball, aged prosciutto & hot honey',
    description: 'Naturally leavened 72-hour sourdough crust baked at 900°F with organic San Marzano tomatoes, fresh buffalo mozzarella, fresh Italian burrata, 24-month prosciutto di Parma, and hot chili blossom honey.',
    category: 'Artisanal Pizzas',
    price: 18.20,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewsCount: 520,
    calories: 890,
    protein: 36,
    prepTime: '20-25 min',
    isOrganic: true,
    isVegan: false,
    isGlutenFree: false,
    isBestSeller: true,
    isChefSpecial: true,
    inStock: true,
    stockCount: 15,
    tags: ['72-hr Sourdough', 'Italian Burrata', 'Hot Honey'],
    customizationOptions: {
      sizes: [
        { name: '12-inch Classic (Serves 1-2)', priceDelta: 0 },
        { name: '16-inch Family Share (Serves 3-4)', priceDelta: 7.00 }
      ],
      additions: [
        { id: 'add-7', name: 'Extra Fresh Burrata Ball (125g)', price: 4.00 },
        { id: 'add-8', name: 'Wild Rocket Arugula & Shaved Parm', price: 2.00 }
      ]
    }
  },
  {
    id: 'prod-4',
    name: 'Dragonfruit Spirulina Glow Smoothie Bowl',
    tagline: 'Antioxidant superfood smoothie bowl topped with organic berries & chia',
    description: 'Blended organic pink pitaya (dragonfruit), blue spirulina, frozen wild bananas, mango chunks, topped with coconut flakes, chia seeds, cacao nibs, and raw mountain honey.',
    category: 'Smoothies & Juices',
    price: 9.80,
    originalPrice: 11.50,
    image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    reviewsCount: 210,
    calories: 340,
    protein: 14,
    prepTime: '10-12 min',
    isOrganic: true,
    isVegan: true,
    isGlutenFree: true,
    isBestSeller: false,
    isChefSpecial: false,
    inStock: true,
    stockCount: 30,
    tags: ['100% Vegan', 'Gluten Free', 'Immunity Boost', 'Antioxidants'],
    customizationOptions: {
      additions: [
        { id: 'add-9', name: 'Plant-Based Vanilla Pea Protein (+20g)', price: 2.20 },
        { id: 'add-10', name: 'Raw Almond Butter Swirl', price: 1.50 }
      ]
    }
  },
  {
    id: 'prod-5',
    name: 'Herb-Roasted Cauliflower Shawarma Bowl',
    tagline: 'Warm spiced spiced cauliflower with lemon tahini, pickled sumac onions & hummus',
    description: 'Roasted golden florets with Middle Eastern zaatar and smoked cumin, creamy smooth house hummus, cucumber-tomato salad, kalamata olives, and warm sourdough flatbread.',
    category: 'Bowls & Salads',
    price: 13.90,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    reviewsCount: 165,
    calories: 410,
    protein: 16,
    prepTime: '15 min',
    isOrganic: true,
    isVegan: true,
    isGlutenFree: true,
    isBestSeller: false,
    isChefSpecial: false,
    inStock: true,
    stockCount: 22,
    tags: ['Plant Based', 'Heart Healthy', 'Low Calorie'],
    customizationOptions: {
      spiceLevels: ['Gentle Zaatar', 'Medium Aleppo Pepper', 'Harissa Fiery Spiced'],
      additions: [
        { id: 'add-11', name: 'Warm Herbed Sourdough Flatbread', price: 1.90 },
        { id: 'add-12', name: 'Marinated Feta Cubes', price: 2.00 }
      ]
    }
  },
  {
    id: 'prod-6',
    name: 'Pan-Roasted Seabass with Lemon Caper Emulsion',
    tagline: 'Wild Mediterranean seabass over charred asparagus & saffron risotto',
    description: 'Crispy skin Chilean seabass fillet lightly seared with butter, white wine reduction, capers, baby heirlooms, and creamy Carnaroli saffron-infused risotto.',
    category: 'Chef Specials',
    price: 24.50,
    originalPrice: 28.00,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    rating: 4.97,
    reviewsCount: 290,
    calories: 610,
    protein: 48,
    prepTime: '25-30 min',
    isOrganic: true,
    isVegan: false,
    isGlutenFree: true,
    isBestSeller: false,
    isChefSpecial: true,
    inStock: true,
    stockCount: 12,
    tags: ['Fine Dining', 'Wild Catch', 'High Protein'],
    customizationOptions: {
      sizes: [
        { name: 'Standard Fillet (220g)', priceDelta: 0 },
        { name: 'Captain Cut (340g)', priceDelta: 8.50 }
      ]
    }
  },
  {
    id: 'prod-7',
    name: 'Cold-Pressed Green Radiance Juice',
    tagline: 'Raw organic celery, cucumber, green apple, ginger, kale & lemon',
    description: 'Cold-pressed hydraulic extracted raw juice with zero added water or sugar. 100% vital enzymes and chlorophyll for instant hydration and cellular energy.',
    category: 'Smoothies & Juices',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    rating: 4.91,
    reviewsCount: 185,
    calories: 110,
    protein: 3,
    prepTime: '5 min',
    isOrganic: true,
    isVegan: true,
    isGlutenFree: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 40,
    tags: ['Raw & Unpasteurized', 'Detox', 'No Added Sugar'],
    customizationOptions: {
      additions: [
        { id: 'add-13', name: 'Raw Organic Ginger Shot', price: 1.50 },
        { id: 'add-14', name: 'Turmeric & Cayenne Booster', price: 1.50 }
      ]
    }
  },
  {
    id: 'prod-8',
    name: 'Raw Cacao & Sea Salt Avocado Mousse',
    tagline: 'Velvety guilt-free dark chocolate mousse made with ripe avocados & maple',
    description: 'Decadent rich dark mousse whipped with pure organic Belgian cacao, ripe Haas avocado base, organic Grade-A maple syrup, Maldon sea salt flakes, and fresh raspberries.',
    category: 'Healthy Treats',
    price: 8.20,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    rating: 4.93,
    reviewsCount: 228,
    calories: 280,
    protein: 6,
    prepTime: '8 min',
    isOrganic: true,
    isVegan: true,
    isGlutenFree: true,
    isBestSeller: false,
    isChefSpecial: true,
    inStock: true,
    stockCount: 25,
    tags: ['Guilt Free', 'Dairy Free', 'Refined Sugar Free'],
    customizationOptions: {
      additions: [
        { id: 'add-15', name: 'Extra Organic Berry Compote', price: 1.80 }
      ]
    }
  }
];

export const INITIAL_COURIER: CourierInfo = {
  name: 'Marcus Vance',
  phone: '+1 (555) 382-9912',
  vehicle: 'Eco-Electric Cargo Scooter (BITE-88)',
  rating: 4.98,
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  statusText: 'Navigating 4th Ave, 6 minutes away with insulated thermal pack',
  latitude: 37.7749,
  longitude: -122.4194
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'FB-9402',
    createdAt: '12:35 PM',
    status: 'out_for_delivery',
    items: [
      {
        id: 'ord-item-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedSize: { name: 'Standard Regular Bowl (450g)', priceDelta: 0 },
        selectedSpice: 'Spicy Jalapeño Kick',
        selectedAdditions: [{ id: 'add-1', name: 'Extra Half Hass Avocado', price: 2.50 }],
        selectedDressing: 'Sesame Ginger Vinaigrette',
        unitPrice: 19.00,
        totalPrice: 19.00
      },
      {
        id: 'ord-item-2',
        product: INITIAL_PRODUCTS[6],
        quantity: 1,
        selectedAdditions: [{ id: 'add-13', name: 'Raw Organic Ginger Shot', price: 1.50 }],
        unitPrice: 9.00,
        totalPrice: 9.00
      }
    ],
    customerName: 'Alex Johnson',
    customerPhone: '+1 (555) 234-8901',
    deliveryAddress: '742 Evergreen Terrace, Suite 4B, Metro District',
    paymentMethod: 'Apple Pay / Digital Wallet',
    subtotal: 28.00,
    deliveryFee: 2.99,
    ecoPackagingFee: 0.99,
    discount: 5.00,
    courierTip: 4.00,
    total: 30.98,
    estimatedMinutes: 8,
    courier: { ...INITIAL_COURIER }
  },
  {
    id: 'FB-9388',
    createdAt: 'Yesterday, 7:15 PM',
    status: 'delivered',
    items: [
      {
        id: 'ord-item-3',
        product: INITIAL_PRODUCTS[1],
        quantity: 2,
        selectedAdditions: [{ id: 'add-6', name: 'Side of Truffle Parmesan Fries', price: 4.50 }],
        unitPrice: 20.30,
        totalPrice: 40.60
      }
    ],
    customerName: 'Alex Johnson',
    customerPhone: '+1 (555) 234-8901',
    deliveryAddress: '742 Evergreen Terrace, Suite 4B, Metro District',
    paymentMethod: 'Visa Ending in •• 4242',
    subtotal: 40.60,
    deliveryFee: 2.99,
    ecoPackagingFee: 0.99,
    discount: 0,
    courierTip: 5.00,
    total: 49.58,
    estimatedMinutes: 0,
    courier: { ...INITIAL_COURIER }
  }
];

export const INITIAL_CUSTOMER: CustomerProfile = {
  id: 'cust-101',
  name: 'Alex Johnson',
  email: 'alex.johnson@freshbite.app',
  phone: '+1 (555) 234-8901',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  tier: 'Gold Gourmet',
  loyaltyPoints: 1420,
  calorieGoalDaily: 2200,
  dietaryPreferences: ['High Protein', 'Gluten Conscious', 'Organic Only'],
  favoriteProductIds: ['prod-1', 'prod-3', 'prod-7'],
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Home Sanctuary',
      address: '742 Evergreen Terrace, Suite 4B, Metro District',
      type: 'Home',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Innovation Hub Office',
      address: 'Floor 14, 500 Silicon Vista Way',
      type: 'Work',
      isDefault: false
    }
  ]
};

export const PROMO_VOUCHERS: { [code: string]: { discount: number; type: 'flat' | 'percent'; minOrder: number; desc: string } } = {
  FRESH2026: { discount: 5, type: 'flat', minOrder: 25, desc: '$5 off your 2026 Fresh Bite feast' },
  SMARTBITE: { discount: 15, type: 'percent', minOrder: 30, desc: '15% off smart nutrition orders' },
  HEALTHY10: { discount: 3, type: 'flat', minOrder: 15, desc: '$3 off quick healthy bites' }
};

export const PORTFOLIO_SPECS = {
  projectName: 'Fresh Bite — Smart Food Ordering & Online Store',
  tagline: 'Order fresh. Shop smart. Enjoy more.',
  launchYear: '2026',
  clientOrStatus: 'Interactive Development Portfolio & Project Proposal',
  overview: `Fresh Bite is a next-generation smart food ordering platform and modern online store built to make buying food easier, faster, and smarter. Engineered from the ground up for modern consumer demands, it fuses artisanal food photography, effortless checkout UX, and real-time operations with AI-powered food recommendations, an intelligent culinary concierge chatbot, and a full administrative dashboard for restaurants and stores.`,
  coreFeatures: [
    {
      title: 'Customer Dashboard & Personalization',
      items: [
        'Secure profile, multi-address book management, and dietary preferences (High Protein, Vegan, Keto, Halal, Gluten-Free).',
        'Saved favorite foods with 1-click lightning reorder.',
        'Nutrition insights and live daily calorie/macro tracker.',
        'Gold Gourmet loyalty rewards and order status histories.'
      ]
    },
    {
      title: 'Online Food Store & Dynamic Ordering',
      items: [
        'Curated culinary catalog categorized by meal type with high-resolution editorial photography.',
        'Comprehensive dietary & macro badges (Calories, Protein, Organic, Vegan, Gluten-Free).',
        'Interactive dish customization modal (custom portion sizes, spice levels, add-on toppings, dressings, chef notes).',
        'Real-time cart drawer with automatic voucher discounts, eco-packaging toggle, and contactless digital payments.'
      ]
    },
    {
      title: 'AI Intelligence & BiteBot Assistance',
      items: [
        'TasteMatch AI Recommender: Analyzes cravings, calorie budgets, and restrictions to generate personalized dish recommendations.',
        'BiteBot Conversational Assistant: Live AI support chatbot that answers menu inquiries, finds dishes matching macros, checks live delivery status, and adds items directly into your basket.'
      ]
    },
    {
      title: 'Full-Featured Admin Management Portal',
      items: [
        'Real-time operations metrics: Today’s GMV, active order count, customer volume, and average ticket size.',
        'Live Product Catalog Manager: In-stock toggles, price updates, instant product addition modal.',
        'Order Fulfillment Pipeline: Kanban/list status updates (Placed → Kitchen Prep → Out for Delivery → Delivered).',
        'Customer CRM directory with spend analytics and loyalty tracking.'
      ]
    },
    {
      title: 'Architecture & Tech Stack',
      items: [
        'Frontend: React 19 SPA + Vite + Tailwind CSS with Plus Jakarta Sans typography and mobile-first fluid responsive grid.',
        'Backend / Data Layer: PostgreSQL / Supabase schema blueprint with real-time websocket streams, row-level security (RLS), and ACID transactions.',
        'AI Engine: Google GenAI SDK (@google/genai) integration for natural language menu grounding and dynamic dietary parsing.',
        'SEO & Performance: Schema.org FoodEstablishment JSON-LD structured data, OpenGraph cards, Core Web Vitals <1.2s LCP optimization.'
      ]
    }
  ]
};
