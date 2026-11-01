import React from 'react';
import { 
  X, 
  UtensilsCrossed, 
  Pizza, 
  Flame, 
  Soup, 
  Salad, 
  Coffee, 
  Cake, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { ProductCategory, Product } from '../types';

interface CategoriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  products: Product[];
}

const CATEGORY_META: { id: string; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: 'all',
    label: 'All Items & Combos',
    icon: <Layers className="w-5 h-5 text-emerald-600" />,
    desc: 'Browse entire culinary catalog across Gilgit'
  },
  {
    id: 'Zingers & Burgers',
    label: 'Zingers & Burgers',
    icon: <Flame className="w-5 h-5 text-amber-600" />,
    desc: 'Crispy fried patties, loaded double cheese & beef burgers'
  },
  {
    id: 'Pizzas & Deals',
    label: 'Pizzas & Deals',
    icon: <Pizza className="w-5 h-5 text-rose-600" />,
    desc: 'Tikka, Fajita, stuffed crust & family sharing feasts'
  },
  {
    id: 'Fried Chicken & Wings',
    label: 'Fried Chicken & Wings',
    icon: <UtensilsCrossed className="w-5 h-5 text-amber-500" />,
    desc: 'Golden crispy chicken buckets, wings & tenders'
  },
  {
    id: 'Desi & Rolls',
    label: 'Desi & Rolls',
    icon: <Soup className="w-5 h-5 text-orange-600" />,
    desc: 'Paratha rolls, chicken boti, chapli kebabs & karahi'
  },
  {
    id: 'Bowls & Salads',
    label: 'Bowls & Salads',
    icon: <Salad className="w-5 h-5 text-teal-600" />,
    desc: 'Macro-counted organic salad bowls & quinoa pots'
  },
  {
    id: 'Marts & Beverages',
    label: 'Marts & Beverages',
    icon: <Coffee className="w-5 h-5 text-blue-600" />,
    desc: 'Cold drinks, juices, chilled shakes & quick snacks'
  },
  {
    id: 'Bakery & Sweets',
    label: 'Bakery & Sweets',
    icon: <Cake className="w-5 h-5 text-pink-600" />,
    desc: 'Apricot cakes, brownies, pastries & fresh desserts'
  }
];

export const CategoriesModal: React.FC<CategoriesModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  products
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[88vh] animate-scale-up">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h2 className="text-lg font-black text-[#0F172A] tracking-tight">Food Categories</h2>
            <p className="text-xs text-slate-500">Pick a menu category to filter the store</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2 flex-1">
          {CATEGORY_META.map((cat) => {
            const count = cat.id === 'all' 
              ? products.length 
              : products.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all border ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400 text-emerald-950 font-bold'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    {cat.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-extrabold">{cat.label}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded-full">
                        {count} items
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{cat.desc}</p>
                  </div>
                </div>

                <div className="shrink-0 pl-2">
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-700 translate-x-1' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
