import React, { useState, useMemo } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMER 
} from './data/mockData';
import { 
  Product, 
  Order, 
  CartItem, 
  CustomerProfile, 
  AppView, 
  OrderStatus 
} from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ProductCard } from './components/ProductCard';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PortfolioProposalView } from './components/PortfolioProposalView';
import { TasteMatchAIModal } from './components/TasteMatchAIModal';
import { BiteBotChat } from './components/BiteBotChat';
import { FreshOrderTracker } from './components/FreshOrderTracker';
import { ChaskaAIRouter } from './components/ChaskaAIRouter';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { OffersModal } from './components/OffersModal';
import { HelpContactModal } from './components/HelpContactModal';
import { CategoriesModal } from './components/CategoriesModal';
import { Currency } from './components/Currency';
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Store,
  Bike
} from 'lucide-react';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<AppView>('store');
  const [dashboardTab, setDashboardTab] = useState<'favorites' | 'orders' | 'nutrition' | 'addresses'>('favorites');
  const [selectedRegion, setSelectedRegion] = useState<string>('Gilgit City');

  // Master Data State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customer, setCustomer] = useState<CustomerProfile>(INITIAL_CUSTOMER);

  // Storefront Filtering & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterVegan, setFilterVegan] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);
  const [filterOrganic, setFilterOrganic] = useState(false);
  const [filterHighProtein, setFilterHighProtein] = useState(false);
  const [filterBestSeller, setFilterBestSeller] = useState(false);

  // Cart & Customization State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Modals & Panels State
  const [isTasteMatchOpen, setIsTasteMatchOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  // Computed Cart metrics
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || prod.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prod.name.toLowerCase().includes(q) ||
        prod.tagline.toLowerCase().includes(q) ||
        prod.description.toLowerCase().includes(q) ||
        prod.tags.some((t) => t.toLowerCase().includes(q));

      // Quick dietary filters
      const matchesVegan = !filterVegan || prod.isVegan;
      const matchesGlutenFree = !filterGlutenFree || prod.isGlutenFree;
      const matchesOrganic = !filterOrganic || prod.isOrganic;
      const matchesHighProtein = !filterHighProtein || prod.protein >= 30;
      const matchesBestSeller = !filterBestSeller || prod.isBestSeller;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesVegan &&
        matchesGlutenFree &&
        matchesOrganic &&
        matchesHighProtein &&
        matchesBestSeller
      );
    });
  }, [
    products,
    selectedCategory,
    searchQuery,
    filterVegan,
    filterGlutenFree,
    filterOrganic,
    filterHighProtein,
    filterBestSeller
  ]);

  // Cart Operations
  const handleAddToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.product.id === newItem.product.id &&
          it.selectedSize?.name === newItem.selectedSize?.name
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += newItem.quantity;
        copy[existingIdx].totalPrice =
          copy[existingIdx].unitPrice * copy[existingIdx].quantity;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  const handleQuickAdd = (product: Product) => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      selectedAdditions: [],
      unitPrice: product.price,
      totalPrice: product.price
    };
    handleAddToCart(item);
  };

  const handleUpdateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((it) => it.id !== id));
    } else {
      setCart((prev) =>
        prev.map((it) =>
          it.id === id
            ? { ...it, quantity: qty, totalPrice: it.unitPrice * qty }
            : it
        )
      );
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((it) => it.id !== id));
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setTrackingOrder(newOrder);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
    );
    if (trackingOrder && trackingOrder.id === orderId) {
      setTrackingOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Favorite toggle
  const handleToggleFavorite = (productId: string) => {
    setCustomer((prev) => {
      const exists = prev.favoriteProductIds.includes(productId);
      return {
        ...prev,
        favoriteProductIds: exists
          ? prev.favoriteProductIds.filter((id) => id !== productId)
          : [...prev.favoriteProductIds, productId]
      };
    });
  };

  // Admin handlers
  const handleToggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleUpdatePrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const activeOrders = orders.filter((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  // Navigation Button Handlers
  const handleSelectHome = () => {
    setCurrentView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExplore = () => {
    setCurrentView('chaska_ai');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOrders = () => {
    setCurrentView('dashboard');
    setDashboardTab('orders');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenFavorites = () => {
    setCurrentView('dashboard');
    setDashboardTab('favorites');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfile = () => {
    setCurrentView('dashboard');
    setDashboardTab('addresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNotificationAction = (action: string) => {
    if (action === 'orders') handleOpenOrders();
    else if (action === 'offers') setIsOffersOpen(true);
    else if (action === 'profile') handleOpenProfile();
    else if (action === 'categories') setIsCategoriesOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col pb-24">
      
      {/* Header */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        customer={customer}
        activeOrderCount={activeOrders.length}
        onOpenTasteMatch={() => setIsTasteMatchOpen(true)}
        onOpenActiveOrder={() => {
          if (activeOrders.length > 0) setTrackingOrder(activeOrders[0]);
          else if (orders.length > 0) setTrackingOrder(orders[0]);
        }}
        onOpenCategories={() => setIsCategoriesOpen(true)}
        onOpenOrders={handleOpenOrders}
        onOpenFavorites={handleOpenFavorites}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenOffers={() => setIsOffersOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenProfile={handleOpenProfile}
      />

      {/* Main View Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        
        {/* VIEW 1: ONLINE FOOD STORE */}
        {currentView === 'store' && (
          <div className="space-y-8">
            
            {/* Hero Banner */}
            {!searchQuery && (
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-lg border border-emerald-900">
                <div 
                  className="absolute inset-0 opacity-25 bg-cover bg-center mix-blend-overlay"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-transparent pointer-events-none" />

                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fresh Bite • Gilgit, Gahkuch & Aliabad</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Order fresh. Discover local favourites. Delivered with care.
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    Crispy Zingers, Fajita Pizzas, Chapshuro, Karak Chai & Daily Marts. Type messy messages in Roman Urdu/English or browse partner outlets across Northern Pakistan!
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentView('chaska_ai')}
                      className="h-10 px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30 transition-all cursor-pointer active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try BiteBot AI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsTasteMatchOpen(true)}
                      className="h-10 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                    >
                      <span>TasteMatch AI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsOffersOpen(true)}
                      className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15 transition-colors cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-white">Voucher: CHASKA50</span>
                      <span className="text-emerald-300 font-bold">Rs. 150 OFF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Active Order Banner if order is live */}
            {activeOrders.length > 0 && (
              <div
                onClick={() => setTrackingOrder(activeOrders[0])}
                className="p-3.5 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white rounded-2xl flex items-center justify-between cursor-pointer shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center animate-pulse">
                    <Bike className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-emerald-400">RIDER DISPATCHED</span>
                      <span className="text-xs text-slate-400 font-mono">#{activeOrders[0].id}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">
                      Rider {activeOrders[0].courier.name} on {activeOrders[0].courier.vehicle} (ETA ~{activeOrders[0].estimatedMinutes} min) • COD Payment
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-white/10 px-3 py-1.5 rounded-full">
                  <span>Track Live</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            {/* Storefront Categories & Quick Filters */}
            <div className="space-y-3">
              {/* Category Rails */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'all', label: 'All Items & Outlets', icon: '🍽️' },
                  { id: 'Zingers & Burgers', label: 'Zingers & Burgers', icon: '🍔' },
                  { id: 'Pizzas & Deals', label: 'Pizzas & Deals', icon: '🍕' },
                  { id: 'Fried Chicken & Wings', label: 'Fried Chicken & Wings', icon: '🍗' },
                  { id: 'Desi & Rolls', label: 'Desi & Chapshuro Rolls', icon: '🍲' },
                  { id: 'Bowls & Salads', label: 'Bowls & Salads', icon: '🥗' },
                  { id: 'Marts & Beverages', label: 'Marts & Dairy', icon: '🥛' },
                  { id: 'Bakery & Sweets', label: 'Bakery & Mithai', icon: '🧁' }
                ].map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`h-9 px-4 rounded-full flex items-center gap-1.5 text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Dietary Filters */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
                  Filters:
                </span>

                <button
                  type="button"
                  onClick={() => setFilterVegan(!filterVegan)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${
                    filterVegan
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-400 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🌱 Vegan
                </button>

                <button
                  type="button"
                  onClick={() => setFilterGlutenFree(!filterGlutenFree)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${
                    filterGlutenFree
                      ? 'bg-sky-50 text-sky-700 border-sky-400 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🌾 Gluten-Free
                </button>

                <button
                  type="button"
                  onClick={() => setFilterOrganic(!filterOrganic)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${
                    filterOrganic
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-400 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🍃 Certified Organic
                </button>

                <button
                  type="button"
                  onClick={() => setFilterHighProtein(!filterHighProtein)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${
                    filterHighProtein
                      ? 'bg-amber-50 text-amber-800 border-amber-400 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  💪 High Protein (30g+)
                </button>

                <button
                  type="button"
                  onClick={() => setFilterBestSeller(!filterBestSeller)}
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 cursor-pointer ${
                    filterBestSeller
                      ? 'bg-rose-50 text-rose-700 border-rose-400 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  🔥 Popular
                </button>

                {(filterVegan || filterGlutenFree || filterOrganic || filterHighProtein || filterBestSeller) && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilterVegan(false);
                      setFilterGlutenFree(false);
                      setFilterOrganic(false);
                      setFilterHighProtein(false);
                      setFilterBestSeller(false);
                    }}
                    className="text-[11px] font-bold text-slate-500 hover:text-rose-600 underline ml-1 shrink-0 cursor-pointer"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#0F172A] tracking-tight">
                    {selectedCategory === 'all' ? 'Fresh Culinary Catalog' : selectedCategory}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Handcrafted daily with verified nutritional data & express delivery
                  </p>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {filteredProducts.length} dishes available
                </span>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                  <p className="text-sm font-semibold text-slate-600">
                    No dishes found matching your criteria.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                      setFilterVegan(false);
                      setFilterGlutenFree(false);
                      setFilterOrganic(false);
                      setFilterHighProtein(false);
                      setFilterBestSeller(false);
                    }}
                    className="mt-3 text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => {
                    const cartQty = cart
                      .filter((c) => c.product.id === product.id)
                      .reduce((sum, c) => sum + c.quantity, 0);

                    return (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelectProduct={(p) => setCustomizingProduct(p)}
                        isFavorite={customer.favoriteProductIds.includes(product.id)}
                        onToggleFavorite={handleToggleFavorite}
                        cartQuantity={cartQty}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Brand Pillars Band */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">Top Outlets & Marts</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Local favorites across Gilgit City, Gahkuch, Aliabad & Skardu — Zingers, Pizzas, Chapshuro & Mart goods.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">BiteBot AI Assistant</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Type unstructured Roman Urdu or English messages ("2 zinger or loaded fries"). Our AI maps items directly to cart.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">Cash on Delivery (COD)</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Reliable motorbike dispatch right to your doorstep with live rider status and cash payment on arrival.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW: CHASKA AI ROUTER (oderela.com/chaska) */}
        {currentView === 'chaska_ai' && (
          <ChaskaAIRouter
            products={products}
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        )}

        {/* VIEW 2: CUSTOMER DASHBOARD */}
        {currentView === 'dashboard' && (
          <CustomerDashboard
            customer={customer}
            products={products}
            orders={orders}
            selectedTab={dashboardTab}
            onTabChange={setDashboardTab}
            onSelectProduct={(p) => setCustomizingProduct(p)}
            onToggleFavorite={handleToggleFavorite}
            onQuickReorder={(ord) => {
              ord.items.forEach((it) => handleAddToCart(it));
              setIsCartOpen(true);
            }}
            onOpenOrderTracker={(ord) => setTrackingOrder(ord)}
            onUpdatePreferences={(newPrefs) =>
              setCustomer((prev) => ({ ...prev, dietaryPreferences: newPrefs }))
            }
          />
        )}

        {/* VIEW 3: ADMIN PORTAL */}
        {currentView === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            onToggleStock={handleToggleStock}
            onUpdatePrice={handleUpdatePrice}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}

        {/* VIEW 4: PORTFOLIO & PROPOSAL */}
        {currentView === 'portfolio' && (
          <PortfolioProposalView onSwitchView={setCurrentView} />
        )}

      </main>

      {/* Modals & Drawers */}
      <ProductCustomizerModal
        product={customizingProduct}
        onClose={() => setCustomizingProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
        customer={customer}
        onOrderPlaced={handleOrderPlaced}
      />

      <TasteMatchAIModal
        isOpen={isTasteMatchOpen}
        onClose={() => setIsTasteMatchOpen(false)}
        products={products}
        onSelectProduct={(p) => setCustomizingProduct(p)}
        onQuickAdd={handleQuickAdd}
      />

      <FreshOrderTracker
        order={trackingOrder}
        onClose={() => setTrackingOrder(null)}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />

      {/* BiteBot AI Assistant */}
      <BiteBotChat
        products={products}
        orders={orders}
        onAddToCart={handleQuickAdd}
        onOpenOrderTracker={(ord) => setTrackingOrder(ord)}
      />

      {/* Categories Modal */}
      <CategoriesModal
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          if (currentView !== 'store') setCurrentView('store');
        }}
        products={products}
      />

      {/* Offers & Vouchers Modal */}
      <OffersModal
        isOpen={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        onApplyOffer={(code) => {
          setIsOffersOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* Help & Contact Support Modal */}
      <HelpContactModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateAction={handleNotificationAction}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 mt-auto mb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs">
              OC
            </div>
            <span className="font-bold text-[#0F172A] text-sm">Fresh Bite</span>
            <span className="text-slate-400">| Smart Food Ordering & Online Store (2026)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 flex-wrap">
            <button 
              type="button" 
              onClick={handleSelectHome}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Home
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={handleSelectExplore}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Explore
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => setIsCategoriesOpen(true)}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Categories
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => setIsOffersOpen(true)}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Offers
            </button>
            <span>•</span>
            <button 
              type="button" 
              onClick={() => setIsHelpOpen(true)}
              className="hover:text-emerald-700 cursor-pointer"
            >
              Help & Contact
            </button>
            <span>•</span>
            <span className="text-emerald-700 font-bold">Cash on Delivery Across Gilgit-Baltistan</span>
          </div>
        </div>
      </footer>

      {/* Fixed Bottom Navigation Bar (Persistent across all pages: Home | Explore | Cart | Orders | Profile) */}
      <BottomNav
        currentView={currentView}
        activeDashboardTab={dashboardTab}
        cartCount={cartCount}
        activeOrdersCount={activeOrders.length}
        onSelectHome={handleSelectHome}
        onSelectExplore={handleSelectExplore}
        onSelectCart={() => setIsCartOpen(true)}
        onSelectOrders={handleOpenOrders}
        onSelectProfile={handleOpenProfile}
      />

    </div>
  );
}
