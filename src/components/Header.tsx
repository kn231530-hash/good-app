import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  User, 
  LayoutDashboard, 
  FileText, 
  X,
  Leaf,
  Home,
  Compass,
  Layers,
  Clock,
  Heart,
  Tag,
  HelpCircle,
  Bell,
  Bike
} from 'lucide-react';
import { AppView, CustomerProfile } from '../types';
import { Currency } from './Currency';

interface HeaderProps {
  currentView: AppView;
  onSelectView: (view: AppView) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  customer: CustomerProfile;
  activeOrderCount: number;
  onOpenTasteMatch: () => void;
  onOpenActiveOrder: () => void;
  // English Navigation actions
  onOpenCategories: () => void;
  onOpenOrders: () => void;
  onOpenFavorites: () => void;
  onOpenNotifications: () => void;
  onOpenOffers: () => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  searchQuery,
  onSearchChange,
  cartCount,
  cartTotal,
  onOpenCart,
  customer,
  activeOrderCount,
  onOpenTasteMatch,
  onOpenActiveOrder,
  onOpenCategories,
  onOpenOrders,
  onOpenFavorites,
  onOpenNotifications,
  onOpenOffers,
  onOpenHelp,
  onOpenProfile,
  unreadNotificationsCount = 2
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top Value Banner */}
      <div className="bg-[#0F172A] text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px]">
              <Sparkles className="w-3 h-3 text-amber-400" /> Oderela Chaska AI
            </span>
            <span className="text-slate-300 truncate">
              Order via Messy Messages across Gilgit, Gahkuch & Aliabad • Code: <strong>CHASKA50</strong> (Rs. 150 OFF)
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 font-medium shrink-0">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Express Delivery Active in Gilgit
            </span>
            <button
              type="button"
              onClick={onOpenHelp}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3 h-3 text-amber-400" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3 md:gap-5">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onSelectView('store')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
            title="Fresh Bite & Oderela Chaska Home"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                  Oderela<span className="text-emerald-600">Chaska</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-md">
                  چسکہ AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-0.5 hidden sm:block">
                Order via Messy Messages • Gilgit-Baltistan
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links (Home, Explore, Categories, Orders, Favorites, Offers, Help) */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => onSelectView('store')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                currentView === 'store'
                  ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('chaska_ai')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                currentView === 'chaska_ai'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xs'
                  : 'text-emerald-700 hover:text-emerald-900 bg-emerald-50/50'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore</span>
              <span className="text-[9px] font-black bg-amber-400 text-slate-950 px-1.5 rounded-full">
                AI
              </span>
            </button>

            <button
              type="button"
              onClick={onOpenCategories}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Categories</span>
            </button>

            <button
              type="button"
              onClick={onOpenOrders}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Orders</span>
              {activeOrderCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              )}
            </button>

            <button
              type="button"
              onClick={onOpenFavorites}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Favorites</span>
              {customer.favoriteProductIds.length > 0 && (
                <span className="text-[10px] bg-rose-100 text-rose-700 font-black px-1.5 rounded-full">
                  {customer.favoriteProductIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={onOpenOffers}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-amber-800 bg-amber-50 hover:bg-amber-100 transition-all"
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Offers</span>
            </button>

            <button
              type="button"
              onClick={onOpenHelp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              <span>Help & Contact</span>
            </button>
          </nav>

          {/* Search Input - Desktop */}
          <div className="flex-1 max-w-xs hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search burgers, pizzas, rolls..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (currentView !== 'store') onSelectView('store');
                }}
                className="w-full h-9.5 pl-9 pr-8 bg-[#F8FAFC] focus:bg-white text-xs text-[#0F172A] placeholder-slate-400 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Notifications Button */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
              )}
            </button>

            {/* Profile Button (Desktop) */}
            <button
              type="button"
              onClick={onOpenProfile}
              className="hidden sm:flex items-center gap-1.5 p-1.5 pr-2.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-xs font-bold text-slate-700"
              title="Profile"
            >
              <img
                src={customer.avatar}
                alt={customer.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="max-w-[80px] truncate">{customer.name.split(' ')[0]}</span>
            </button>

            {/* Active Order Pill if exists */}
            {activeOrderCount > 0 && (
              <button
                type="button"
                onClick={onOpenActiveOrder}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-xs font-bold transition-all shadow-xs"
              >
                <Bike className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Track</span>
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-extrabold">
                  {activeOrderCount}
                </span>
              </button>
            )}

            {/* Cart Button */}
            <button
              type="button"
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-full font-bold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {cartTotal > 0 && (
                <span className="border-l border-white/30 pl-1.5 hidden xs:inline">
                  <Currency amount={cartTotal} size="sm" className="text-white" />
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Secondary Quick Action Bar (Categories, Offers, Favorites, Help, Search) */}
        <div className="mt-2.5 flex flex-col gap-2 xl:hidden">
          
          {/* Quick buttons rail on mobile/tablet */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-bold">
            <button
              type="button"
              onClick={onOpenCategories}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-600" />
              <span>Categories</span>
            </button>

            <button
              type="button"
              onClick={onOpenOffers}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 whitespace-nowrap shrink-0 transition-colors"
            >
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Offers</span>
            </button>

            <button
              type="button"
              onClick={onOpenFavorites}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Favorites ({customer.favoriteProductIds.length})</span>
            </button>

            <button
              type="button"
              onClick={onOpenHelp}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap shrink-0 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Help or Contact</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('admin')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-colors ${
                currentView === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('portfolio')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap shrink-0 transition-colors ${
                currentView === 'portfolio' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Specs</span>
            </button>
          </div>

          {/* Search Box on Mobile (Visible when on store view) */}
          {currentView === 'store' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search burgers, pizzas, rolls, desserts..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-9 pl-8 pr-7 bg-[#F8FAFC] text-xs text-[#0F172A] rounded-full border border-slate-200 outline-none focus:border-emerald-500 focus:bg-white"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
