import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  ShoppingBag, 
  Check, 
  MapPin, 
  Flame, 
  Bike, 
  Clock, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { CHASKA_QUICK_PROMPTS, REGIONS } from '../data/mockData';
import { Currency } from './Currency';
import { BiteBotLogo } from './BiteBotChat';

interface ChaskaAIRouterProps {
  products: Product[];
  onAddToCart: (item: CartItem) => void;
  onOpenCart: () => void;
  selectedRegion: string;
  onSelectRegion: (reg: string) => void;
}

export const ChaskaAIRouter: React.FC<ChaskaAIRouterProps> = ({
  products,
  onAddToCart,
  onOpenCart,
  selectedRegion,
  onSelectRegion
}) => {
  const [messyQuery, setMessyQuery] = useState('');
  const [isRouting, setIsRouting] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>('Bhai 2 zinger or loaded fries mangwa do');
  const [routedProducts, setRoutedProducts] = useState<Product[]>([
    products[0], // Zinger
    products[3]  // Loaded Fries
  ]);
  const [routedNote, setRoutedNote] = useState<string>(
    'Chaska AI parsed: 2x Crispy Zinger Burgers + 1x Cheesy Loaded Fries from Chaska Fast Food Hub (Jutial). Ready for 20-min dispatch!'
  );
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleRouteMessage = (textToRoute?: string) => {
    const query = (textToRoute || messyQuery).trim();
    if (!query) return;

    setIsRouting(true);
    setLastQuery(query);
    if (!textToRoute) setMessyQuery('');

    setTimeout(() => {
      const lower = query.toLowerCase();
      let matched: Product[] = [];
      let note = '';

      if (lower.includes('zinger') || lower.includes('burger') || lower.includes('fries')) {
        matched = products.filter((p) => p.id === 'chaska-1' || p.id === 'chaska-4');
        note = 'Chaska AI matched your burger craving with our top-rated Crispy Zinger and Cheesy Loaded Fries from Jutial!';
      } else if (lower.includes('pizza') || lower.includes('fajita') || lower.includes('deal')) {
        matched = products.filter((p) => p.id === 'chaska-2' || p.id === 'chaska-3');
        note = 'Chaska AI routed to Royal Crust Pizzeria: Large 13" Chicken Fajita Sensation with extra mozzarella!';
      } else if (lower.includes('biryani') || lower.includes('desi') || lower.includes('rice')) {
        matched = products.filter((p) => p.id === 'chaska-8' || p.id === 'chaska-9');
        note = 'Chaska AI matched freshly steamed Chicken Dum Biryani with raita & Chicken Paratha Roll!';
      } else if (lower.includes('chapshuro') || lower.includes('local') || lower.includes('gilgit')) {
        matched = products.filter((p) => p.id === 'chaska-7');
        note = 'Chaska AI routed to Karakoram Heritage Kitchen for freshly stone-baked authentic Gilgiti Chapshuro!';
      } else if (lower.includes('wing') || lower.includes('fried') || lower.includes('chicken')) {
        matched = products.filter((p) => p.id === 'chaska-5' || p.id === 'chaska-6');
        note = 'Chaska AI matched 3-pc Crispy Fried Chicken Bucket & Spicy Honey BBQ Wings!';
      } else if (lower.includes('doodh') || lower.includes('milk') || lower.includes('chai') || lower.includes('tea') || lower.includes('rusk')) {
        matched = products.filter((p) => p.id === 'chaska-10' || p.id === 'chaska-11');
        note = 'Chaska AI routed to Oderela Instant Mart: 1 Litre Farm Fresh Milk & Karak Doodh Patti with Cake Rusks!';
      } else {
        // Generic fallback bestsellers
        matched = products.slice(0, 3);
        note = `Chaska AI scanned all open outlets in ${selectedRegion} and found top trending dishes for you!`;
      }

      setRoutedProducts(matched);
      setRoutedNote(note);
      setIsRouting(false);
      setAddedSuccess(false);
    }, 450);
  };

  const handleAddAllToBasket = () => {
    routedProducts.forEach((prod) => {
      const item: CartItem = {
        id: `${prod.id}-${Date.now()}`,
        product: prod,
        quantity: 1,
        selectedAdditions: [],
        unitPrice: prod.price,
        totalPrice: prod.price
      };
      onAddToCart(item);
    });
    setAddedSuccess(true);
    setTimeout(() => {
      onOpenCart();
    }, 500);
  };

  const totalBundlePrice = routedProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-fade-in">
      
      {/* Chaska AI Hero Banner */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-emerald-900/60">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Oderela.com/chaska
              </span>
              <span className="text-amber-400 font-bold text-xs bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/30">
                چسکہ اسمارٹ راؤٹر
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Order via Messy Messages
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
              No need to scroll through 100 menus! Just type what you want in Urdu or English (e.g. <em>"Bhai 2 zinger aur fries bhej do"</em>) and Chaska AI instantly routes your order to open outlets in Gilgit, Gahkuch, and Aliabad.
            </p>

            {/* Region Selector */}
            <div className="mt-4 flex items-center gap-2 text-xs">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-semibold">Active Region:</span>
              <select
                value={selectedRegion}
                onChange={(e) => onSelectRegion(e.target.value)}
                className="bg-white/10 text-emerald-300 font-bold px-3 py-1 rounded-full border border-white/20 outline-none cursor-pointer"
              >
                {REGIONS.map((r) => (
                  <option key={r.id} value={r.name} className="bg-slate-900 text-white">
                    {r.name} ({r.eta})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-400 p-1 shadow-2xl flex items-center justify-center">
              <BiteBotLogo size="lg" className="w-full h-full rounded-[22px]" />
            </div>
          </div>
        </div>

        {/* Natural Language Messy Input Bar */}
        <div className="relative z-10 mt-8">
          <div className="bg-white rounded-2xl p-2 sm:p-2.5 shadow-2xl flex items-center gap-2 border-2 border-emerald-500/50">
            <input
              type="text"
              placeholder="Type anything (e.g. 'Bhai 2 zinger or loaded fries', 'Fajita pizza deal', 'doodh aur chai')..."
              value={messyQuery}
              onChange={(e) => setMessyQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRouteMessage()}
              className="flex-1 h-11 px-3 sm:px-4 text-xs sm:text-sm text-[#0F172A] font-medium outline-none placeholder-slate-400"
            />
            <button
              type="button"
              onClick={() => handleRouteMessage()}
              className="h-11 px-5 sm:px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <span>Chaska Route</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </button>
          </div>

          {/* Quick Clickable Prompts from Oderela */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-[11px] font-bold text-slate-400 shrink-0">Try Messy Prompts:</span>
            {CHASKA_QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleRouteMessage(prompt.text)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1"
              >
                <span>{prompt.icon}</span>
                <span>{prompt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chaska AI Smart Route Result Card */}
      {isRouting ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
          <Sparkles className="w-10 h-10 text-emerald-600 animate-spin mx-auto mb-3" />
          <h3 className="font-extrabold text-sm text-[#0F172A]">Chaska AI is routing your message...</h3>
          <p className="text-xs text-slate-500 mt-1">Checking open local kitchens in {selectedRegion}</p>
        </div>
      ) : lastQuery && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Chaska AI Match Complete
                </span>
                <span className="text-xs text-slate-400 italic">"{lastQuery}"</span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#0F172A] mt-1.5 leading-relaxed">
                {routedNote}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Delivery: <strong className="text-emerald-700">Cash on Delivery (COD)</strong>
              </span>
            </div>
          </div>

          {/* Matched Dishes List */}
          <div className="space-y-3">
            {routedProducts.map((prod) => (
              <div
                key={prod.id}
                className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-16 h-16 rounded-2xl object-cover bg-slate-100 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-[#0F172A]">{prod.name}</h4>
                      {prod.localName && (
                        <span className="text-xs font-bold text-slate-400">{prod.localName}</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{prod.tagline}</p>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                      <span className="font-medium text-emerald-800 bg-emerald-100/60 px-2 py-0.2 rounded">
                        📍 {prod.outletName}
                      </span>
                      <span>⏱️ {prod.prepTime}</span>
                      <span>🔥 {prod.calories} kcal</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                  <Currency amount={prod.price} size="lg" className="text-emerald-700 font-extrabold" />
                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart({
                        id: `${prod.id}-${Date.now()}`,
                        product: prod,
                        quantity: 1,
                        selectedAdditions: [],
                        unitPrice: prod.price,
                        totalPrice: prod.price
                      });
                      onOpenCart();
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    Add This
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Bundle Checkout Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Total for this Chaska Route ({routedProducts.length} items)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <Currency amount={totalBundlePrice} size="xl" className="text-emerald-700" />
                <span className="text-xs text-slate-500 font-medium">+ Rs. 120 Delivery to {selectedRegion}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddAllToBasket}
              className={`h-12 px-6 rounded-full font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-700 text-white shadow-emerald-700/25'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added! Opening Basket...</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add All & Order via Cash on Delivery</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Why Oderela & Chaska AI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-2xl block mb-2">⚡</span>
          <h4 className="font-extrabold text-sm text-[#0F172A]">Messy Text Ordering</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Send voice notes or type casual Urdu/English messages. Chaska AI does the hard work.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-2xl block mb-2">🏍️</span>
          <h4 className="font-extrabold text-sm text-[#0F172A]">Northern Transit Fleet</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Couriers navigating Jutial, NLI Bazaar, Gahkuch, and Aliabad with thermal hot boxes.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <span className="text-2xl block mb-2">💵</span>
          <h4 className="font-extrabold text-sm text-[#0F172A]">Cash on Delivery (COD)</h4>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Pay safely at your doorstep in PKR, or via JazzCash and EasyPaisa upon delivery.
          </p>
        </div>
      </div>

    </div>
  );
};
