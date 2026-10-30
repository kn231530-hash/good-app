import React from 'react';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Shield, 
  User, 
  LayoutDashboard, 
  FileText, 
  X,
  Leaf,
  Store,
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
  onOpenActiveOrder
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Top Value Banner */}
      <div className="bg-[#0F172A] text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px]">
              <Sparkles className="w-3 h-3" /> Fresh Bite 2026
            </span>
            <span className="text-slate-300 truncate">
              Order fresh. Shop smart. Enjoy more. • Use code <strong>FRESH2026</strong> for $5 OFF orders over $25
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[11px] text-slate-400 font-medium shrink-0">
            <span className="flex items-center gap-1 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Real-time Kitchen & Dispatch Active
            </span>
            <span>Support: support@freshbite.app</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => onSelectView('store')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-[#0F172A]">
                  Fresh<span className="text-emerald-600">Bite</span>
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wide bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-md">
                  Smart Store
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 -mt-0.5 hidden sm:block">
                Order fresh. Shop smart. Enjoy more.
              </p>
            </div>
          </div>

          {/* Nav Views Switcher (Store | Dashboard | Admin | Portfolio) */}
          <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => onSelectView('store')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentView === 'store'
                  ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Online Store</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectView('dashboard')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentView === 'dashboard'
                  ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer Dashboard</span>
              {customer.favoriteProductIds.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">
                  {customer.favoriteProductIds.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectView('admin')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentView === 'admin'
                  ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
              {activeOrderCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onSelectView('portfolio')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                currentView === 'portfolio'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Portfolio & Specs</span>
            </button>
          </div>

          {/* Search Bar - Center Desktop */}
          {currentView === 'store' && (
            <div className="flex-1 max-w-sm hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search bowls, burgers, smoothies, vegan..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full h-10 pl-9 pr-8 bg-[#F8FAFC] focus:bg-white text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 rounded-full border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* TasteMatch AI Recommender button */}
            <button
              type="button"
              onClick={onOpenTasteMatch}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-emerald-800 border border-emerald-200/80 rounded-full text-xs font-bold shadow-xs transition-all active:scale-95"
              title="AI Food Recommender"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span className="hidden sm:inline">TasteMatch AI</span>
            </button>

            {/* Active Order Pill if exists */}
            {activeOrderCount > 0 && (
              <button
                type="button"
                onClick={onOpenActiveOrder}
                className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-full text-xs font-bold transition-all shadow-xs"
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
              <span className="hidden sm:inline">Basket</span>
              {cartTotal > 0 && (
                <span className="border-l border-white/30 pl-1.5">
                  <Currency amount={cartTotal} size="sm" className="text-white" />
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile View Switcher & Mobile Search */}
        <div className="mt-2.5 flex flex-col gap-2 lg:hidden">
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold text-center">
            <button
              type="button"
              onClick={() => onSelectView('store')}
              className={`py-1.5 rounded-lg transition-all ${
                currentView === 'store' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Store
            </button>
            <button
              type="button"
              onClick={() => onSelectView('dashboard')}
              className={`py-1.5 rounded-lg transition-all ${
                currentView === 'dashboard' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Dashboard
            </button>
            <button
              type="button"
              onClick={() => onSelectView('admin')}
              className={`py-1.5 rounded-lg transition-all ${
                currentView === 'admin' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => onSelectView('portfolio')}
              className={`py-1.5 rounded-lg transition-all ${
                currentView === 'portfolio' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Portfolio
            </button>
          </div>

          {currentView === 'store' && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search fresh dishes, bowls, juices..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-9 pl-8 pr-7 bg-[#F8FAFC] text-xs text-[#0F172A] rounded-full border border-slate-200 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
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
