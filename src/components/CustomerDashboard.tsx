import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Clock, 
  MapPin, 
  Award, 
  Flame, 
  ChevronRight, 
  RotateCcw, 
  Plus, 
  Check, 
  ShoppingBag,
  Bike,
  Sparkles
} from 'lucide-react';
import { CustomerProfile, Product, Order } from '../types';
import { Currency } from './Currency';
import { ProductCard } from './ProductCard';

interface CustomerDashboardProps {
  customer: CustomerProfile;
  products: Product[];
  orders: Order[];
  onSelectProduct: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  onQuickReorder: (order: Order) => void;
  onOpenOrderTracker: (order: Order) => void;
  onUpdatePreferences: (prefs: string[]) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  customer,
  products,
  orders,
  onSelectProduct,
  onToggleFavorite,
  onQuickReorder,
  onOpenOrderTracker,
  onUpdatePreferences
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'orders' | 'nutrition' | 'addresses'>('favorites');
  const [newAddressTitle, setNewAddressTitle] = useState('');
  const [newAddressText, setNewAddressText] = useState('');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Favorite products
  const favoriteProducts = products.filter((p) =>
    customer.favoriteProductIds.includes(p.id)
  );

  // Calculate nutrition progress from orders
  const todayCalories = orders
    .filter((o) => o.status !== 'cancelled')
    .slice(0, 1)
    .reduce((sum, o) => sum + o.items.reduce((iSum, it) => iSum + (it.product.calories * it.quantity), 0), 0);

  const todayProtein = orders
    .filter((o) => o.status !== 'cancelled')
    .slice(0, 1)
    .reduce((sum, o) => sum + o.items.reduce((iSum, it) => iSum + (it.product.protein * it.quantity), 0), 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-fade-in">
      
      {/* Profile Header Hero */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={customer.avatar}
              alt={customer.name}
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full text-xs">
              <Check className="w-3 h-3 stroke-[3]" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] tracking-tight">
                {customer.name}
              </h1>
              <span className="text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Award className="w-3 h-3 text-amber-600" />
                {customer.tier}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {customer.email} • {customer.phone}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
              <span className="bg-emerald-50 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                ✨ {customer.loyaltyPoints} Fresh Points
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-600">
                Target: {customer.calorieGoalDaily} kcal / day
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 text-center">
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 block font-semibold">Favorites</span>
            <span className="text-lg font-extrabold text-[#0F172A]">
              {customer.favoriteProductIds.length}
            </span>
          </div>
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 block font-semibold">Orders</span>
            <span className="text-lg font-extrabold text-[#0F172A]">
              {orders.length}
            </span>
          </div>
          <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-slate-100">
            <span className="text-xs text-slate-400 block font-semibold">Saved $</span>
            <span className="text-lg font-extrabold text-emerald-700">
              $35.00
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-200 pb-2">
        {[
          { key: 'favorites', label: 'Saved Favorite Foods', count: favoriteProducts.length, icon: Heart },
          { key: 'orders', label: 'Order History & Tracking', count: orders.length, icon: Clock },
          { key: 'nutrition', label: 'Daily Nutrition Tracker', icon: Flame },
          { key: 'addresses', label: 'Saved Addresses', count: customer.savedAddresses.length, icon: MapPin }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as any)}
              className={`h-10 px-4 rounded-full text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAVED FAVORITE FOODS */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Your Favorite Meals</h3>
              <p className="text-xs text-slate-500">Quick 1-click ordering for your frequent bites</p>
            </div>
            <span className="text-xs text-slate-400">{favoriteProducts.length} saved</span>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0F172A]">No Favorite Meals Yet</h4>
              <p className="text-xs text-slate-500 mt-1">Tap the heart icon on any dish to save it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {favoriteProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelectProduct={onSelectProduct}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ORDER HISTORY & LIVE TRACKER */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Order History & Real-Time Tracking</h3>
              <p className="text-xs text-slate-500">Monitor kitchen prep and live courier updates</p>
            </div>
          </div>

          <div className="space-y-4">
            {orders.map((ord) => {
              const isDelivered = ord.status === 'delivered';
              return (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-[#0F172A]">Order #{ord.id}</span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                            isDelivered
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse'
                          }`}
                        >
                          {ord.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Placed: {ord.createdAt} • Deliver to: {ord.deliveryAddress}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      {!isDelivered && (
                        <button
                          type="button"
                          onClick={() => onOpenOrderTracker(ord)}
                          className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>Track Live GPS</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onQuickReorder(ord)}
                        className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="py-3 space-y-2">
                    {ord.items.map((it) => (
                      <div key={it.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-5 text-center font-extrabold text-slate-700">{it.quantity}x</span>
                          <span className="font-semibold text-[#0F172A]">{it.product.name}</span>
                          {it.selectedSize && it.selectedSize.priceDelta > 0 && (
                            <span className="text-slate-400 text-[11px]">({it.selectedSize.name})</span>
                          )}
                        </div>
                        <Currency amount={it.totalPrice} size="sm" />
                      </div>
                    ))}
                  </div>

                  {/* Bottom Cost Breakdown */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>Payment: {ord.paymentMethod}</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-slate-400">Total:</span>
                      <Currency amount={ord.total} size="base" className="text-emerald-700" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: DAILY NUTRITION TRACKER */}
      {activeTab === 'nutrition' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A]">Daily Nutrition & Macro Progress</h3>
            <p className="text-xs text-slate-500">Fresh Bite automatically computes macros for all meals ordered</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">Calories Consumed</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">
                {todayCalories} <span className="text-xs font-semibold text-slate-500">/ {customer.calorieGoalDaily} kcal</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (todayCalories / customer.calorieGoalDaily) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">Protein Intake</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">
                {todayProtein} <span className="text-xs font-semibold text-slate-500">/ 110g Target</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-sky-600 h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (todayProtein / 110) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">Organic Produce Ratio</span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-1">
                85% <span className="text-xs font-semibold text-slate-500">Farm Certified</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">Zero synthetic pesticides, wild or regenerative soil grown.</p>
            </div>
          </div>

          {/* Dietary Preferences Selector */}
          <div className="border-t border-slate-100 pt-5">
            <h4 className="text-sm font-extrabold text-[#0F172A] mb-2">Your Dietary Focus Tags</h4>
            <div className="flex flex-wrap items-center gap-2">
              {['High Protein', 'Gluten Conscious', 'Organic Only', '100% Plant Based', 'Low Carb / Keto', 'Nut Allergy Safe'].map((tag) => {
                const isSelected = customer.dietaryPreferences.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      const updated = isSelected
                        ? customer.dietaryPreferences.filter((t) => t !== tag)
                        : [...customer.dietaryPreferences, tag];
                      onUpdatePreferences(updated);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isSelected ? `✓ ${tag}` : `+ ${tag}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-[#0F172A]">Delivery Address Book</h3>
              <p className="text-xs text-slate-500">Manage drop-off locations for home, work, and gym</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Address</span>
            </button>
          </div>

          {showAddressForm && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <input
                type="text"
                placeholder="Title (e.g. Studio, Vacation Suite)"
                value={newAddressTitle}
                onChange={(e) => setNewAddressTitle(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-white rounded-xl border border-slate-200 outline-none"
              />
              <input
                type="text"
                placeholder="Street address, apartment, city..."
                value={newAddressText}
                onChange={(e) => setNewAddressText(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-white rounded-xl border border-slate-200 outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (newAddressTitle && newAddressText) {
                    customer.savedAddresses.push({
                      id: `addr-${Date.now()}`,
                      title: newAddressTitle,
                      address: newAddressText,
                      type: 'Other',
                      isDefault: false
                    });
                    setNewAddressTitle('');
                    setNewAddressText('');
                    setShowAddressForm(false);
                  }
                }}
                className="px-4 py-1.5 rounded-full bg-[#0F172A] text-white text-xs font-bold"
              >
                Save Location
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {customer.savedAddresses.map((addr) => (
              <div
                key={addr.id}
                className="p-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-[#0F172A]">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{addr.address}</p>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Type: {addr.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
