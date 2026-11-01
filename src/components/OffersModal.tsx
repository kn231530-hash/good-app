import React, { useState } from 'react';
import { 
  X, 
  Tag, 
  Copy, 
  Check, 
  Sparkles, 
  Percent, 
  Gift, 
  Flame,
  ArrowRight
} from 'lucide-react';

interface PromoOffer {
  code: string;
  title: string;
  discount: string;
  description: string;
  minOrder: string;
  validUntil: string;
  badge?: string;
  categoryLimit?: string;
}

const OFFERS: PromoOffer[] = [
  {
    code: 'CHASKA50',
    title: 'Oderela Chaska Launch Special',
    discount: 'Rs. 150 OFF',
    description: 'Flat discount on any order placed with AI messy router or store catalog.',
    minOrder: 'Min. order Rs. 800',
    validUntil: 'Valid this week in Gilgit & Gahkuch',
    badge: 'Popular',
    categoryLimit: 'All categories'
  },
  {
    code: 'ODERELA',
    title: 'Pizza Cravers & Family Deals',
    discount: '20% OFF',
    description: 'Save 20% on all Large and Medium Tikka, Fajita & Cheese Pizzas.',
    minOrder: 'Min. order Rs. 1,200',
    validUntil: 'Active daily after 4 PM',
    badge: 'Hot Deal',
    categoryLimit: 'Pizzas & Deals'
  },
  {
    code: 'ZINGER',
    title: 'Crispy Zinger Mania',
    discount: 'Free Delivery',
    description: 'Free doorstep express rider delivery on all Zinger combos and loaded burgers.',
    minOrder: 'Min. order Rs. 500',
    validUntil: 'Ends Sunday midnight',
    badge: 'Free Delivery',
    categoryLimit: 'Zingers & Burgers'
  },
  {
    code: 'FRESH2026',
    title: 'New Gourmet Member Welcome',
    discount: '10% OFF',
    description: '10% instant checkout deduction on your first 3 food deliveries.',
    minOrder: 'No minimum order',
    validUntil: 'Valid for new profiles',
    categoryLimit: 'Storewide'
  }
];

interface OffersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOffer?: (code: string) => void;
}

export const OffersModal: React.FC<OffersModalProps> = ({
  isOpen,
  onClose,
  onApplyOffer
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh] animate-scale-up">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Exclusive Promo Discounts</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">Active Offers & Vouchers</h2>
          <p className="text-xs text-slate-300 mt-1">
            Copy any promo code below and apply it during checkout in your basket.
          </p>
        </div>

        {/* Offers List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1 divide-y divide-slate-100">
          {OFFERS.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.code}
                className="pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/80 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-[#0F172A] text-sm sm:text-base">
                      {offer.title}
                    </span>
                    {offer.badge && (
                      <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-600" />
                        {offer.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    {offer.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 font-medium pt-1">
                    <span className="text-emerald-700 font-bold">{offer.discount}</span>
                    <span>•</span>
                    <span>{offer.minOrder}</span>
                    <span>•</span>
                    <span className="text-slate-400">{offer.validUntil}</span>
                  </div>
                </div>

                {/* Voucher code box & copy */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  <div className="border-2 border-dashed border-emerald-500/60 bg-emerald-50/60 px-3 py-1.5 rounded-xl font-mono font-black text-sm text-emerald-800 tracking-wider">
                    {offer.code}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleCopy(offer.code);
                      if (onApplyOffer) onApplyOffer(offer.code);
                    }}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-[#0F172A] hover:bg-emerald-700 text-white active:scale-95'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Apply codes directly in the Cart drawer.</span>
          <button
            type="button"
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
