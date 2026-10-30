import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { Product, CartItem } from '../types';
import { Currency } from './Currency';
import { OrganicBadge, VeganBadge, GlutenFreeBadge, MacroPill } from './Badges';

interface ProductCustomizerModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product.customizationOptions?.sizes?.[0] || { name: 'Standard Regular Serving', priceDelta: 0 }
  );
  const [selectedSpice, setSelectedSpice] = useState(
    product.customizationOptions?.spiceLevels?.[0] || 'Standard'
  );
  const [selectedAdditions, setSelectedAdditions] = useState<{ id: string; name: string; price: number }[]>([]);
  const [selectedDressing, setSelectedDressing] = useState(
    product.customizationOptions?.dressing?.[0] || undefined
  );
  const [specialNotes, setSpecialNotes] = useState('');

  const toggleAddition = (add: { id: string; name: string; price: number }) => {
    setSelectedAdditions((prev) => {
      const exists = prev.some((a) => a.id === add.id);
      return exists ? prev.filter((a) => a.id !== add.id) : [...prev, add];
    });
  };

  const additionsTotal = selectedAdditions.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = product.price + (selectedSize?.priceDelta || 0) + additionsTotal;
  const totalPrice = unitPrice * quantity;

  const handleConfirm = () => {
    const item: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      selectedSize,
      selectedSpice,
      selectedAdditions,
      selectedDressing,
      specialNotes: specialNotes.trim() || undefined,
      unitPrice,
      totalPrice
    };
    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md p-0 sm:p-4 overflow-y-auto animate-fade-in">
      <div 
        className="bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Hero Image */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-100 shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Dietary Badges */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5">
            {product.isOrganic && <OrganicBadge size="md" />}
            {product.isVegan && <VeganBadge size="md" />}
            {product.isGlutenFree && <GlutenFreeBadge size="md" />}
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-md">
              {product.name}
            </h2>
            <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 no-scrollbar">
          
          {/* Description & Nutrition */}
          <div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <MacroPill calories={product.calories} protein={product.protein} />
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                ⏱️ {product.prepTime}
              </span>
            </div>
          </div>

          {/* Portion Size Options */}
          {product.customizationOptions?.sizes && product.customizationOptions.sizes.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-sm font-extrabold text-[#0F172A] mb-2">Select Portion Size</h4>
              <div className="space-y-2">
                {product.customizationOptions.sizes.map((sz, idx) => {
                  const isSelected = selectedSize.name === sz.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedSize(sz)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 text-[#0F172A] shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-emerald-600 bg-emerald-600' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-[#0F172A]">{sz.name}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-600">
                        {sz.priceDelta === 0 ? 'Standard' : `+$${sz.priceDelta.toFixed(2)}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Additions & Toppings */}
          {product.customizationOptions?.additions && product.customizationOptions.additions.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-sm font-extrabold text-[#0F172A] mb-2">Add Superfood Toppings & Sides</h4>
              <div className="space-y-2">
                {product.customizationOptions.additions.map((add) => {
                  const isSelected = selectedAdditions.some((a) => a.id === add.id);
                  return (
                    <div
                      key={add.id}
                      onClick={() => toggleAddition(add)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                            isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">{add.name}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700">
                        +${add.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Dressing Option if available */}
          {product.customizationOptions?.dressing && product.customizationOptions.dressing.length > 0 && (
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-sm font-extrabold text-[#0F172A] mb-2">Choice of Dressing</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.customizationOptions.dressing.map((d, idx) => {
                  const isSelected = selectedDressing === d;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDressing(d)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Kitchen Notes */}
          <div className="border-t border-slate-100 pt-4">
            <h4 className="text-sm font-extrabold text-[#0F172A] mb-1.5">Chef Instructions</h4>
            <input
              type="text"
              placeholder="e.g. dressing on the side, extra crispy, no cutlery..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="w-full h-10 px-3.5 text-xs bg-[#F8FAFC] focus:bg-white rounded-xl border border-slate-200 focus:border-emerald-600 outline-none"
            />
          </div>

        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          {/* Stepper */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700 disabled:opacity-40"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-extrabold text-[#0F172A]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-full font-extrabold px-5 flex items-center justify-between shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <span className="text-xs sm:text-sm">Add to Basket</span>
            <Currency amount={totalPrice} size="base" className="text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
