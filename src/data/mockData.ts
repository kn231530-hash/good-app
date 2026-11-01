import { Product, CustomerProfile, Order, CourierInfo } from '../types';

export const REGIONS = [
  { id: 'gilgit', name: 'Gilgit City', subareas: 'Jutial, Cantt, NLI Market, Khomer, Chinar Bagh', eta: '20-30 min' },
  { id: 'gahkuch', name: 'Gahkuch', subareas: 'Main Bazaar, River Link Road, District Complex', eta: '25-35 min' },
  { id: 'aliabad', name: 'Aliabad & Hunza', subareas: 'Karimabad, Eagle Nest Link, Ganish, Nagar Turn', eta: '30-40 min' },
  { id: 'skardu', name: 'Skardu Town', subareas: 'Yadgar Chowk, Airport Road, Kharpocho Base', eta: '30-45 min' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'chaska-1',
    name: 'Chaska Crispy Zinger Burger',
    localName: 'چسکہ کرسپی زنگر برگر',
    tagline: 'Whole breast fillet coated in crunchy 11-spice crust with spicy garlic mayo',
    description: 'Golden crunchy marinated chicken thigh, fresh crunchy iceberg lettuce, spicy signature Chaska sauce, served in toasted sesame artisanal brioche.',
    category: 'Zingers & Burgers',
    price: 450,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    rating: 4.94,
    reviewsCount: 620,
    calories: 620,
    protein: 34,
    prepTime: '15-20 min',
    outletName: 'Chaska Fast Food Hub (Jutial)',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: true,
    inStock: true,
    stockCount: 45,
    dealBadge: 'Top Chaska Pick',
    tags: ['Zinger', 'Crispy Chicken', 'Spicy', 'Gilgit Favorite'],
    customizationOptions: {
      sizes: [
        { name: 'Standard Crispy Zinger', priceDelta: 0 },
        { name: 'Double Decker Zinger Tower', priceDelta: 220 }
      ],
      spiceLevels: ['Mellow Mild', 'Karakoram Spicy', 'Extra Fiery Hot'],
      additions: [
        { id: 'add-1', name: 'Cheese Slice (Aged Cheddar)', price: 60 },
        { id: 'add-2', name: 'Extra Chaska Garlic Mayo Dip', price: 50 },
        { id: 'add-3', name: 'Regular Salted French Fries', price: 120 }
      ]
    }
  },
  {
    id: 'chaska-2',
    name: 'Chicken Fajita Sensation Pizza (Large 13")',
    localName: 'چکن فجیتا پیزا (لارج)',
    tagline: 'Spicy Mexican-spiced chicken chunks, onions, bell peppers & mozzarella blend',
    description: 'Freshly stretched hand-tossed dough with zesty pizza sauce, premium mozzarella cheese, spiced chicken chunks, crisp bell peppers, sweet corn and oregano sprinkle.',
    category: 'Pizzas & Deals',
    price: 1450,
    originalPrice: 1650,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    rating: 4.96,
    reviewsCount: 540,
    calories: 1120,
    protein: 48,
    prepTime: '20-25 min',
    outletName: 'Royal Crust Pizzeria (NLI Market)',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 25,
    dealBadge: 'Save Rs. 200',
    tags: ['Fajita', 'Pizza', 'Cheese Burst', 'Family Size'],
    customizationOptions: {
      sizes: [
        { name: 'Regular 9" (Serves 1-2)', priceDelta: -450 },
        { name: 'Large 13" (Serves 3-4)', priceDelta: 0 },
        { name: 'Jumbo 16" Monster (Serves 5-6)', priceDelta: 600 }
      ],
      additions: [
        { id: 'add-4', name: 'Cheese Burst Stuffed Crust', price: 250 },
        { id: 'add-5', name: 'Extra Chicken Topping', price: 180 },
        { id: 'add-6', name: '1.5 Litre Chilled Soft Drink', price: 220 }
      ]
    }
  },
  {
    id: 'chaska-3',
    name: 'Chaska Midnight Mega Deal',
    localName: 'چسکہ مڈ نائٹ میگا ڈیل',
    tagline: '1x Large Pizza + 2x Crispy Zingers + Loaded Fries + 1.5L Drink',
    description: 'The ultimate late-night feast for friends and family! Includes 1 Large 13" Pizza of your choice, 2 Crispy Zinger Burgers, 1 Box of Loaded Fries, and a 1.5L soft drink.',
    category: 'Pizzas & Deals',
    price: 2190,
    originalPrice: 2650,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewsCount: 890,
    calories: 2400,
    protein: 95,
    prepTime: '25-30 min',
    outletName: 'Oderela Deals Central',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: true,
    inStock: true,
    stockCount: 30,
    dealBadge: 'Super Saver • 25% OFF',
    tags: ['Mega Deal', 'Combo', 'Zingers & Pizza', 'Party Feast']
  },
  {
    id: 'chaska-4',
    name: 'Cheesy Loaded Chicken Fries',
    localName: 'چیزی لوڈڈ فرائز',
    tagline: 'Crispy seasoned fries drenched in warm cheddar, chicken boti & jalapeños',
    description: 'Crispy golden fries layered with smoky chicken chunks, signature melted liquid cheese sauce, spicy pickled jalapeños, and dusted with secret peri-peri seasoning.',
    category: 'Zingers & Burgers',
    price: 420,
    originalPrice: 480,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80',
    rating: 4.91,
    reviewsCount: 380,
    calories: 580,
    protein: 22,
    prepTime: '12-15 min',
    outletName: 'Chaska Bites (Khomer)',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 50,
    dealBadge: 'Hot Snack',
    tags: ['Fries', 'Liquid Cheese', 'Snack', 'Late Night']
  },
  {
    id: 'chaska-5',
    name: 'Crispy Fried Chicken (3 Pcs Bucket)',
    localName: 'کرسپی فرائیڈ چکن (3 پیس)',
    tagline: 'Deep golden crunchy crust, tender juicy chicken with garlic dip',
    description: 'Fresh chicken drumsticks and thighs pressure-fried to golden perfection. Crisp on the outside, steaming juicy inside. Served with dinner roll & garlic sauce.',
    category: 'Fried Chicken & Wings',
    price: 580,
    originalPrice: 650,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    reviewsCount: 290,
    calories: 720,
    protein: 42,
    prepTime: '15-20 min',
    outletName: 'Crispy Fried Hub Gilgit',
    isHalal: true,
    isBestSeller: false,
    isChefSpecial: false,
    inStock: true,
    stockCount: 35,
    tags: ['Fried Chicken', 'Crispy', 'Bucket']
  },
  {
    id: 'chaska-6',
    name: 'Spicy Honey BBQ Wings (6 Pcs)',
    localName: 'ہنی بی بی کیو ونگز',
    tagline: 'Tossed in sweet mountain honey and smoky spicy BBQ glaze',
    description: 'Fresh tender wings fried crispy and coated in thick, sticky, sweet and tangy honey glaze. Topped with toasted sesame seeds.',
    category: 'Fried Chicken & Wings',
    price: 420,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviewsCount: 215,
    calories: 460,
    protein: 28,
    prepTime: '15 min',
    outletName: 'Wings & Rings Cantt',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 40,
    tags: ['Wings', 'BBQ', 'Honey', 'Snack']
  },
  {
    id: 'chaska-7',
    name: 'Authentic Gilgit Chapshuro (Meat Pie)',
    localName: 'روایتی گلگتی چپشورو',
    tagline: 'Traditional stone-baked flatbread stuffed with spiced minced meat & mountain herbs',
    description: 'Local northern specialty! Handmade wheat dough filled with seasoned minced beef, wild mountain onions, black pepper and coriander, baked over flat iron tawa.',
    category: 'Desi & Rolls',
    price: 360,
    originalPrice: 420,
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewsCount: 710,
    calories: 540,
    protein: 30,
    prepTime: '18 min',
    outletName: 'Karakoram Heritage Kitchen (Jutial)',
    isHalal: true,
    isOrganic: true,
    isBestSeller: true,
    isChefSpecial: true,
    inStock: true,
    stockCount: 50,
    dealBadge: 'Local Heritage',
    tags: ['Chapshuro', 'Gilgit Local', 'Desi', 'Must Try']
  },
  {
    id: 'chaska-8',
    name: 'Chicken Dum Biryani with Raita',
    localName: 'چکن دم بریانی مع رائتہ',
    tagline: 'Fragrant Basmati rice slow-cooked with spiced chicken pieces & golden potatoes',
    description: 'Traditional aromatic spiced Karachi-style Biryani cooked in sealed deg with tender chicken, potatoes, saffron aroma. Served with fresh mint raita and onion rings.',
    category: 'Desi & Rolls',
    price: 380,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    rating: 4.89,
    reviewsCount: 430,
    calories: 680,
    protein: 36,
    prepTime: '12-15 min',
    outletName: 'Al-Madina Biryani Point (City Bazaar)',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 60,
    tags: ['Biryani', 'Desi', 'Chicken', 'Lunch & Dinner']
  },
  {
    id: 'chaska-9',
    name: 'Chicken Garlic Mayo Paratha Roll',
    localName: 'چکن گارلک مایو پراٹھا رول',
    tagline: 'Charcoal grilled chicken boti rolled in crispy flaky tawa paratha',
    description: 'Smoky grilled chicken boti chunks rolled inside a golden flaky paratha, drizzled with garlic mayo sauce, mint chutney, and sliced onions.',
    category: 'Desi & Rolls',
    price: 280,
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    rating: 4.93,
    reviewsCount: 310,
    calories: 520,
    protein: 26,
    prepTime: '10-12 min',
    outletName: 'Roll Express (Cantt Road)',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 40,
    tags: ['Paratha Roll', 'Garlic Mayo', 'Quick Bite']
  },
  {
    id: 'chaska-10',
    name: 'Fresh Dairy Farm Milk (1 Litre Bottle)',
    localName: 'خالص بھینس کا دودھ (1 لیٹر)',
    tagline: 'Pure, fresh, unadulterated high-fat farm milk delivered chilled',
    description: 'Sourced daily from local northern farms. Freshly filtered, chilled, and delivered in food-grade sealed bottles. Perfect for tea and family nutrition.',
    category: 'Marts & Beverages',
    price: 220,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    rating: 4.97,
    reviewsCount: 520,
    calories: 640,
    protein: 32,
    prepTime: '10 min',
    outletName: 'Oderela Mart (Instant Grocery)',
    isHalal: true,
    isOrganic: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 75,
    tags: ['Mart', 'Fresh Milk', 'Grocery', 'Essential']
  },
  {
    id: 'chaska-11',
    name: 'Karak Doodh Patti Chai & Rusks (Tea Combo)',
    localName: 'کڑک دودھ پتی چائے اور رسک',
    tagline: 'Brewed with cardamom, pure milk, served with 4 crispy golden bakery rusks',
    description: 'Authentic roadside dhaba style boiled Doodh Patti tea. Piping hot in thermal cup, accompanied by crunchy bakery cake-rusks.',
    category: 'Marts & Beverages',
    price: 180,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviewsCount: 480,
    calories: 240,
    protein: 8,
    prepTime: '8 min',
    outletName: 'Chaska Chai Khana',
    isHalal: true,
    isBestSeller: true,
    isChefSpecial: false,
    inStock: true,
    stockCount: 80,
    tags: ['Chai', 'Tea', 'Snack', 'Evening Nashta']
  },
  {
    id: 'chaska-12',
    name: 'Fresh Bakery Cream Pastries (Box of 2)',
    localName: 'فریش کریم پیسٹریز (2 عدد)',
    tagline: 'Vanilla sponge layers with fresh whipped dairy cream & strawberry glaze',
    description: 'Baked fresh every morning by local Gilgit master bakers. Light aerated sponge cake with velvety fresh cream and chocolate flakes.',
    category: 'Bakery & Sweets',
    price: 320,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    rating: 4.86,
    reviewsCount: 195,
    calories: 420,
    protein: 6,
    prepTime: '5 min',
    outletName: 'Gilgit Royal Bakers',
    isHalal: true,
    isBestSeller: false,
    isChefSpecial: false,
    inStock: true,
    stockCount: 25,
    tags: ['Bakery', 'Dessert', 'Sweet']
  }
];

export const INITIAL_COURIER: CourierInfo = {
  name: 'Tariq Ali Khan',
  phone: '+92 355 541 8920',
  vehicle: 'Honda CD70 Mountain Rider (GB-24-9182)',
  rating: 4.96,
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  statusText: 'Crossing Jutial Link Bridge, 6 mins away with thermal insulated food box',
  latitude: 35.9208,
  longitude: 74.3144
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ODR-4912',
    createdAt: '12:40 PM',
    status: 'out_for_delivery',
    items: [
      {
        id: 'ord-item-1',
        product: INITIAL_PRODUCTS[0], // Zinger
        quantity: 2,
        selectedAdditions: [{ id: 'add-1', name: 'Cheese Slice (Aged Cheddar)', price: 60 }],
        unitPrice: 510,
        totalPrice: 1020
      },
      {
        id: 'ord-item-2',
        product: INITIAL_PRODUCTS[3], // Loaded Fries
        quantity: 1,
        selectedAdditions: [],
        unitPrice: 420,
        totalPrice: 420
      }
    ],
    customerName: 'Kamran Shah',
    customerPhone: '+92 355 500 8912',
    deliveryAddress: 'House 14, Street 3, Jutial Officers Colony, Gilgit',
    region: 'Gilgit City',
    paymentMethod: 'Cash on Delivery (COD)',
    subtotal: 1440,
    deliveryFee: 120,
    ecoPackagingFee: 30,
    discount: 150,
    courierTip: 80,
    total: 1520,
    estimatedMinutes: 8,
    courier: { ...INITIAL_COURIER }
  }
];

export const INITIAL_CUSTOMER: CustomerProfile = {
  id: 'cust-101',
  name: 'Kamran Shah',
  email: 'kamran.shah@gmail.com',
  phone: '+92 355 500 8912',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  tier: 'Gold Gourmet',
  loyaltyPoints: 1250,
  calorieGoalDaily: 2400,
  selectedRegion: 'Gilgit City',
  dietaryPreferences: ['100% Halal Verified', 'Crispy Fast Food', 'Traditional Gilgit Heritage'],
  favoriteProductIds: ['chaska-1', 'chaska-2', 'chaska-7'],
  savedAddresses: [
    {
      id: 'addr-1',
      title: 'Home (Jutial)',
      address: 'House 14, Street 3, Jutial Officers Colony',
      region: 'Gilgit City',
      type: 'Home',
      isDefault: true
    },
    {
      id: 'addr-2',
      title: 'Office (NLI Complex)',
      address: 'Shop 22, 2nd Floor, NLI Market Bazaar',
      region: 'Gilgit City',
      type: 'Work',
      isDefault: false
    }
  ]
};

export const PROMO_VOUCHERS: { [code: string]: { discount: number; type: 'flat' | 'percent'; minOrder: number; desc: string } } = {
  CHASKA50: { discount: 150, type: 'flat', minOrder: 800, desc: 'Rs. 150 OFF on your first Chaska order' },
  ODERELA: { discount: 200, type: 'flat', minOrder: 1200, desc: 'Rs. 200 OFF Northern Express Delivery' },
  ZINGER: { discount: 100, type: 'flat', minOrder: 600, desc: 'Rs. 100 OFF Zinger Meals' }
};

export const CHASKA_QUICK_PROMPTS = [
  { text: 'Bhai 2 zinger or loaded fries mangwa do', label: '2 Zingers + Loaded Fries', icon: '🍔' },
  { text: 'Large Fajita Pizza with drink family deal', label: 'Large Fajita Pizza Deal', icon: '🍕' },
  { text: 'Late night snacks or crispy wings near Jutial', label: 'Spicy Honey Wings', icon: '🍗' },
  { text: 'Chicken Biryani or cold drink for lunch', label: 'Chicken Biryani Plate', icon: '🍛' },
  { text: 'Traditional stone-baked Gilgiti Chapshuro', label: 'Authentic Chapshuro', icon: '🫓' },
  { text: 'Ghar k liye doodh, chai aur bakery rusks', label: 'Milk, Chai & Rusks', icon: '🫖' }
];

export const PORTFOLIO_SPECS = {
  projectName: 'Fresh Bite — Smart Food Ordering & Online Store (Chaska AI Powered)',
  tagline: 'Order fresh. Shop smart. Enjoy more.',
  launchYear: '2026',
  clientOrStatus: 'Production Ready Proposal & Interactive Platform',
  overview: 'Fresh Bite is a modern smart food ordering platform and online store built to make buying food easier, faster, and smarter across Northern Pakistan. Integrated with Oderela Chaska AI for unstructured natural language messy message ordering in Roman Urdu and English, full cash-on-delivery (COD) dispatch, live order telemetry, customer dashboard, and administrative store controls.',
  coreFeatures: [
    {
      title: 'Customer Dashboard',
      items: [
        'Secure profile management, dietary preferences, and saved delivery addresses across Gilgit, Gahkuch, and Aliabad.',
        'Saved favorite foods with 1-click instant reordering.',
        'Order history with live GPS delivery status, rider contact, and digital COD receipts.',
        'Daily calorie consumption and nutrition tracking progress.'
      ]
    },
    {
      title: 'Online Food Store & Catalog',
      items: [
        'Curated menu items with HD photography, Pakistani Rupee (PKR) pricing, nutritional macros, and deal badges.',
        'Categorized rails: Zingers & Burgers, Pizzas & Deals, Fried Chicken, Desi & Chapshuro Rolls, Marts & Dairy, Bakery.',
        'Granular meal customization modal with portion sizing, sauces, extra cheese, and chef instructions.',
        'Slide-over cart with instant coupon vouchers (CHASKA50, ODERELA, ZINGER) and COD checkout.'
      ]
    },
    {
      title: 'Admin Management Portal',
      items: [
        'Live KPI telemetry: Daily GMV, active delivery pipeline, and outlet order metrics.',
        'Live Product Catalog Inventory: Instant in-stock toggles, inline price editing, and product creation.',
        'Fulfillment lifecycle pipeline (Placed → Kitchen Prep → Rider Dispatched → Delivered).',
        'Customer directory tracking spending patterns, addresses, and loyalty tier.'
      ]
    },
    {
      title: 'Chaska AI Messy Message Router & BiteBot',
      items: [
        'Natural Language "Messy Message" Ordering: Type unstructured prompts in Roman Urdu/English (e.g., "bhai 2 zinger fries bhej do").',
        'Smart outlet and dish entity extraction matching local partners with 1-click add-all-to-cart.',
        'TasteMatch AI algorithmic meal recommendations tailored to calorie goals and budgets.',
        'Conversational customer support assistant with live order inquiry resolution.'
      ]
    }
  ],
  backendStack: [
    { name: 'PostgreSQL / Supabase', role: 'Relational data store with Row Level Security (RLS) and real-time order subscriptions.' },
    { name: 'Node.js & Express / Vite', role: 'High-throughput server-side API proxy and optimized client SPA bundle.' },
    { name: 'Google GenAI SDK', role: 'Advanced semantic parsing and natural language intent classification.' },
    { name: 'Cloud Storage & CDN', role: 'Automated WebP compression with sub-second image asset delivery.' }
  ],
  seoArchitecture: [
    'Schema.org FoodEstablishment & Product JSON-LD structured data for rich snippet indexing.',
    'Pre-rendered OpenGraph and Twitter card social share metadata.',
    'Mobile-first responsive fluid layout achieving sub-second load times.'
  ]
};

