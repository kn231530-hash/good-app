import React from 'react';
import { Leaf, Sparkles, Flame, Star, Check } from 'lucide-react';

export const OrganicBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <span
    className={`inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200/70 ${
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
    }`}
  >
    <Leaf className={size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'} />
    <span>Organic</span>
  </span>
);

export const VeganBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <span
    className={`inline-flex items-center gap-1 bg-green-50 text-green-700 font-bold rounded-full border border-green-200/70 ${
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
    }`}
  >
    <span>🌱 Vegan</span>
  </span>
);

export const GlutenFreeBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <span
    className={`inline-flex items-center gap-1 bg-sky-50 text-sky-700 font-bold rounded-full border border-sky-200/70 ${
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
    }`}
  >
    <span>🌾 Gluten-Free</span>
  </span>
);

export const ChefSpecialBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 font-bold rounded-full px-2 py-0.5 text-[10px] border border-amber-200/70">
    <Sparkles className="w-2.5 h-2.5 text-amber-600" />
    <span>Chef Special</span>
  </span>
);

export const BestSellerBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 font-bold rounded-full px-2 py-0.5 text-[10px] border border-rose-200/70">
    <Flame className="w-2.5 h-2.5 text-rose-600" />
    <span>Popular</span>
  </span>
);

export const RatingBadge: React.FC<{ rating: number; reviews?: number }> = ({ rating, reviews }) => (
  <div className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md px-2 py-1 rounded-full shadow-xs border border-slate-100">
    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
    <span className="text-xs font-extrabold text-[#0F172A]">{rating.toFixed(1)}</span>
    {reviews && <span className="text-[10px] text-slate-400 font-medium">({reviews})</span>}
  </div>
);

export const MacroPill: React.FC<{ calories: number; protein: number }> = ({ calories, protein }) => (
  <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
    <span>🔥 {calories} kcal</span>
    <span className="text-slate-300">•</span>
    <span className="text-emerald-700 font-bold">{protein}g protein</span>
  </div>
);
