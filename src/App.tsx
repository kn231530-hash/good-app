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
import { ProductCard } from './components/ProductCard';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { PortfolioProposalView } from './components/PortfolioProposalView';
import { TasteMatchAIModal } from './components/TasteMatchAIModal';
import { BiteBotChat } from './components/BiteBotChat';
import { FreshOrderTracker } from './components/FreshOrderTracker';
import { Currency } from './components/Currency';
import { 
  Sparkles, 
  Flame, 
  Leaf, 
  ShieldCheck, 
  ArrowRight, 
  ShoppingBag,
  Store,
  Bike,
  Filter,
  Check
} from 'lucide-react';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<AppView>('store');

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

  // Modals
  const [isTasteMatchOpen, setIsTasteMatchOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      
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
      />

      {/* Main View Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6">
        
        {/* VIEW 1: ONLINE FOOD STORE */}
        {currentView === 'store' && (
          <div className="space-y-8 pb-20">
            
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
                    <span>Next-Gen Smart Ordering • 2026</span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                    Order Fresh. Shop Smart. Enjoy More.
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    Fresh organic bowls, 72-hour fermented sourdough pizzas, and cold-pressed juices — matched with AI meal recommendations & live GPS tracking.
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsTasteMatchOpen(true)}
                      className="h-10 px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/30 transition-all cursor-pointer active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Match My Nutrition with AI</span>
                    </button>

                    <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/15">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-semibold text-white">Coupon: FRESH2026</span>
                      <span className="text-slate-400">$5 OFF</span>
                    </div>
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
                      <span className="text-xs font-extrabold text-emerald-400">ORDER IN MOTION</span>
                      <span className="text-xs text-slate-400 font-mono">#{activeOrders[0].id}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200">
                      Courier {activeOrders[0].courier.name} is on {activeOrders[0].courier.vehicle} (ETA ~{activeOrders[0].estimatedMinutes} min)
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
                  { id: 'all', label: 'All Dishes', icon: '🍽️' },
                  { id: 'Bowls & Salads', label: 'Bowls & Salads', icon: '🥗' },
                  { id: 'Artisanal Pizzas', label: 'Artisanal Pizzas', icon: '🍕' },
                  { id: 'Gourmet Burgers', label: 'Gourmet Burgers', icon: '🍔' },
                  { id: 'Smoothies & Juices', label: 'Smoothies & Juices', icon: '🥤' },
                  { id: 'Chef Specials', label: 'Chef Specials', icon: '✨' },
                  { id: 'Healthy Treats', label: 'Guilt-Free Treats', icon: '🥑' }
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
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 ${
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
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 ${
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
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 ${
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
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 ${
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
                  className={`h-7 px-3 rounded-full text-[11px] font-bold border transition-all shrink-0 ${
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
                    className="text-[11px] font-bold text-slate-500 hover:text-rose-600 underline ml-1 shrink-0"
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
                    Handcrafted daily with verified nutritional data
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
                    className="mt-3 text-xs font-bold text-emerald-700 hover:underline"
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
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">Certified Organic Produce</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Zero chemical preservatives or synthetic additives. Sourced straight from local regenerative farms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 border border-sky-200">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">AI TasteMatch Guidance</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Personalized algorithmic nutrition that aligns with your calorie budget, macros, and cravings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200">
                  <Bike className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#0F172A]">Eco-Electric Rapid Fleet</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Zero-emission electric delivery scooters equipped with temperature-calibrated thermal pods.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: CUSTOMER DASHBOARD */}
        {currentView === 'dashboard' && (
          <CustomerDashboard
            customer={customer}
            products={products}
            orders={orders}
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

      {/* Floating Bottom Cart Bar if items in cart and on store view */}
      {cart.length > 0 && currentView === 'store' && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-lg mx-auto animate-bounce-in">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full h-13 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-between shadow-xl shadow-emerald-700/30 border border-emerald-500 transition-all active:scale-98 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white/90">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in basket
                </div>
                <Currency amount={cartTotal} size="base" className="text-white" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-extrabold text-xs sm:text-sm bg-black/15 px-3.5 py-1.5 rounded-full">
              <span>View Basket</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}

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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xs">
              FB
            </div>
            <span className="font-bold text-[#0F172A] text-sm">Fresh Bite</span>
            <span className="text-slate-400">| Smart Food Ordering & Online Store (2026)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Tagline: <em>Order fresh. Shop smart. Enjoy more.</em></span>
            <span>•</span>
            <span className="text-emerald-700 font-bold">100% Organic & Calorie Tracked</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
