import React, { useState } from 'react';
import { Sparkles, X, Check, Flame, Sliders, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { Currency } from './Currency';
import { MacroPill } from './Badges';

interface TasteMatchAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const TasteMatchAIModal: React.FC<TasteMatchAIModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onQuickAdd
}) => {
  if (!isOpen) return null;

  const [goal, setGoal] = useState<'high_protein' | 'low_calorie' | 'comfort' | 'quick'>('high_protein');
  const [maxBudget, setMaxBudget] = useState<number>(20);
  const [veganOnly, setVeganOnly] = useState(false);
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Recommendations logic
  const matchedProducts = products.filter((p) => {
    if (veganOnly && !p.isVegan) return false;
    if (glutenFreeOnly && !p.isGlutenFree) return false;
    if (p.price > maxBudget) return false;

    if (goal === 'high_protein') return p.protein >= 30;
    if (goal === 'low_calorie') return p.calories <= 450;
    if (goal === 'comfort') return p.calories > 600 || p.category === 'Artisanal Pizzas' || p.category === 'Gourmet Burgers';
    if (goal === 'quick') return parseInt(p.prepTime) <= 15;
    return true;
  });

  const handleSimulateRegen = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-[#0F172A]">TasteMatch AI Recommender</h3>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  AI Grounded
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Personalized nutrition matching based on your goals, cravings & budget
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="py-4 overflow-y-auto space-y-5 flex-1 no-scrollbar">
          
          {/* Goal Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              What is your dietary focus today?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'high_protein', label: 'High Protein', icon: '💪', desc: '30g+ protein muscle fuel' },
                { id: 'low_calorie', label: 'Clean & Lean', icon: '🥗', desc: '<450 kcal light bowls' },
                { id: 'comfort', label: 'Chef Comfort', icon: '🍕', desc: 'Indulgent gourmet delights' },
                { id: 'quick', label: 'Fast 15-Min', icon: '⚡', desc: 'Rapid fresh prep' }
              ].map((g) => {
                const isSelected = goal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setGoal(g.id as any);
                      handleSimulateRegen();
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-base block mb-0.5">{g.icon}</span>
                    <span className="text-xs font-extrabold block">{g.label}</span>
                    <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">{g.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget & Diet Sliders */}
          <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Max Budget:</span>
                <span className="text-emerald-700">${maxBudget}</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            <div className="flex items-center justify-between sm:justify-center gap-3">
              <label className="text-xs font-bold text-slate-700">Vegan Only</label>
              <button
                type="button"
                onClick={() => setVeganOnly(!veganOnly)}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  veganOnly ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    veganOnly ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between sm:justify-center gap-3">
              <label className="text-xs font-bold text-slate-700">Gluten-Free</label>
              <button
                type="button"
                onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
                className={`w-9 h-5 rounded-full transition-colors relative ${
                  glutenFreeOnly ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform ${
                    glutenFreeOnly ? 'translate-x-4' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* AI Output Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                AI Curated Matches ({matchedProducts.length})
              </h4>
              <span className="text-[11px] text-emerald-700 font-bold">
                98% Taste Compatibility
              </span>
            </div>

            {isGenerating ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl">
                <Sparkles className="w-8 h-8 text-emerald-600 animate-spin mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-600">TasteMatch AI is analyzing flavor profiles...</p>
              </div>
            ) : matchedProducts.length === 0 ? (
              <div className="p-6 text-center bg-slate-50 rounded-2xl text-xs text-slate-500">
                No dishes match this exact combination. Try raising the max budget or relaxing filters.
              </div>
            ) : (
              <div className="space-y-3">
                {matchedProducts.slice(0, 3).map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3 hover:border-emerald-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-extrabold text-xs sm:text-sm text-[#0F172A] truncate">
                            {prod.name}
                          </h5>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded">
                            {prod.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">{prod.tagline}</p>
                        <div className="mt-1">
                          <MacroPill calories={prod.calories} protein={prod.protein} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <Currency amount={prod.price} size="base" className="text-emerald-700 font-extrabold" />
                      <button
                        type="button"
                        onClick={() => {
                          onQuickAdd(prod);
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Powered by Fresh Bite Nutritional Intelligence</span>
          <button
            onClick={onClose}
            className="font-bold text-emerald-700 hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
