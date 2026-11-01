import React from 'react';
import { 
  Home, 
  Compass, 
  ShoppingBag, 
  Clock, 
  User 
} from 'lucide-react';
import { AppView } from '../types';

interface BottomNavProps {
  currentView: AppView;
  activeDashboardTab?: 'favorites' | 'orders' | 'nutrition' | 'addresses';
  cartCount: number;
  activeOrdersCount: number;
  onSelectHome: () => void;
  onSelectExplore: () => void;
  onSelectCart: () => void;
  onSelectOrders: () => void;
  onSelectProfile: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentView,
  activeDashboardTab,
  cartCount,
  activeOrdersCount,
  onSelectHome,
  onSelectExplore,
  onSelectCart,
  onSelectOrders,
  onSelectProfile
}) => {
  const isHomeActive = currentView === 'store';
  const isExploreActive = currentView === 'chaska_ai';
  const isOrdersActive = currentView === 'dashboard' && activeDashboardTab === 'orders';
  const isProfileActive = currentView === 'dashboard' && activeDashboardTab !== 'orders';

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_25px_rgba(15,23,42,0.08)] px-2 py-1.5 transition-all"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        
        {/* 1. HOME */}
        <button
          type="button"
          onClick={onSelectHome}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all select-none active:scale-95 ${
            isHomeActive
              ? 'text-emerald-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 transition-transform ${isHomeActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isHomeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Home</span>
        </button>

        {/* 2. EXPLORE */}
        <button
          type="button"
          onClick={onSelectExplore}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all select-none active:scale-95 ${
            isExploreActive
              ? 'text-emerald-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Compass className={`w-5 h-5 transition-transform ${isExploreActive ? 'scale-110 stroke-[2.5] text-emerald-600' : 'stroke-[1.8]'}`} />
            <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />
            {isExploreActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Explore</span>
        </button>

        {/* 3. CART (Center Highlighted) */}
        <button
          type="button"
          onClick={onSelectCart}
          className="relative flex flex-col items-center justify-center flex-1 py-1 px-1 select-none active:scale-95 group"
        >
          <div className="relative -mt-3.5 w-11 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30 flex items-center justify-center transition-transform group-hover:scale-105">
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-extrabold min-w-5 h-5 px-1 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-slate-700 mt-1">Cart</span>
        </button>

        {/* 4. ORDERS */}
        <button
          type="button"
          onClick={onSelectOrders}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all select-none active:scale-95 ${
            isOrdersActive
              ? 'text-emerald-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <Clock className={`w-5 h-5 transition-transform ${isOrdersActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {activeOrdersCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-amber-500 text-slate-950 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {activeOrdersCount}
              </span>
            )}
            {isOrdersActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Orders</span>
        </button>

        {/* 5. PROFILE */}
        <button
          type="button"
          onClick={onSelectProfile}
          className={`relative flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all select-none active:scale-95 ${
            isProfileActive
              ? 'text-emerald-700 font-extrabold'
              : 'text-slate-500 hover:text-slate-900 font-medium'
          }`}
        >
          <div className="relative">
            <User className={`w-5 h-5 transition-transform ${isProfileActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isProfileActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-600" />
            )}
          </div>
          <span className="text-[11px] mt-1 tracking-tight">Profile</span>
        </button>

      </div>
    </nav>
  );
};
