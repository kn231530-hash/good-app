import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  MapPin, 
  Tag, 
  Sparkles, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  Bike
} from 'lucide-react';
import { CartItem, CustomerProfile, Order } from '../types';
import { PROMO_VOUCHERS, INITIAL_COURIER } from '../data/mockData';
import { Currency } from './Currency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  customer: CustomerProfile;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  customer,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('FRESH2026');
  const [courierTip, setCourierTip] = useState<number>(3.00);
  const [ecoPackaging, setEcoPackaging] = useState<boolean>(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('Apple Pay / Digital Wallet');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal > 40 ? 0 : 2.99;
  const ecoFee = ecoPackaging ? 0.99 : 0;

  // Calculate voucher savings
  let discount = 0;
  if (appliedPromo && PROMO_VOUCHERS[appliedPromo]) {
    const promo = PROMO_VOUCHERS[appliedPromo];
    if (subtotal >= promo.minOrder) {
      if (promo.type === 'flat') {
        discount = promo.discount;
      } else {
        discount = (subtotal * promo.discount) / 100;
      }
    }
  }

  const grandTotal = Math.max(0, subtotal + deliveryFee + ecoFee + courierTip - discount);

  const handleApplyPromo = () => {
    const clean = promoCode.trim().toUpperCase();
    if (PROMO_VOUCHERS[clean]) {
      setAppliedPromo(clean);
      setPromoCode('');
    } else {
      alert('Invalid Promo code. Try FRESH2026 ($5 off) or SMARTBITE (15% off)');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    // Audio chime effect
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}

    setTimeout(() => {
      const address = customer.savedAddresses[selectedAddressIndex]?.address || 'Primary Residence, Metro District';
      const newOrder: Order = {
        id: `FB-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: 'Just now',
        status: 'confirmed',
        items: [...cart],
        customerName: customer.name,
        customerPhone: customer.phone,
        deliveryAddress: address,
        paymentMethod,
        subtotal,
        deliveryFee,
        ecoPackagingFee: ecoFee,
        discount,
        courierTip,
        total: grandTotal,
        estimatedMinutes: 24,
        courier: { ...INITIAL_COURIER }
      };

      onOrderPlaced(newOrder);
      onClearCart();
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white h-full flex flex-col shadow-2xl relative z-10 border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#0F172A]">Fresh Basket</h2>
              <p className="text-xs text-slate-500">{cart.length} items from Fresh Bite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Tag className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">Your Basket is Empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Explore our chef-crafted bowls, artisan sourdough pizzas, or raw organic juices.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 no-scrollbar">
            
            {/* Delivery Destination */}
            <div className="bg-[#F8FAFC] rounded-2xl p-3.5 border border-slate-200">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Deliver to ({customer.name}):
                    </span>
                    <select
                      value={selectedAddressIndex}
                      onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}
                      className="block w-full text-xs font-bold text-[#0F172A] bg-transparent outline-none cursor-pointer mt-0.5"
                    >
                      {customer.savedAddresses.map((addr, idx) => (
                        <option key={addr.id} value={idx}>
                          {addr.title}: {addr.address}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ETA 20-30 min
                </span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                <span>Selected Meals</span>
                <button
                  onClick={onClearCart}
                  className="text-slate-400 hover:text-rose-500 flex items-center gap-1 text-[11px]"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>

              {cart.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-start gap-3"
                >
                  <img
                    src={entry.product.image}
                    alt={entry.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-[#0F172A] line-clamp-1">
                        {entry.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(entry.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    <div className="text-[11px] text-slate-500 space-y-0.5 mt-0.5">
                      {entry.selectedSize && entry.selectedSize.priceDelta > 0 && (
                        <p>• {entry.selectedSize.name}</p>
                      )}
                      {entry.selectedAdditions.length > 0 && (
                        <p className="text-emerald-700 font-medium">
                          + {entry.selectedAdditions.map((a) => a.name).join(', ')}
                        </p>
                      )}
                      {entry.specialNotes && (
                        <p className="italic text-slate-400">"{entry.specialNotes}"</p>
                      )}
                    </div>

                    {/* Stepper & Price */}
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center bg-slate-100 rounded-full p-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(entry.id, entry.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-extrabold text-[#0F172A]">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(entry.id, entry.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white shadow-xs flex items-center justify-center text-slate-700"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <Currency amount={entry.totalPrice} size="base" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Courier Tip */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#0F172A]">Courier Delivery Tip</span>
                <span className="text-[10px] text-slate-500">100% goes to driver</span>
              </div>
              <div className="flex items-center gap-2">
                {[0, 2, 3, 5, 7].map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    onClick={() => setCourierTip(tip)}
                    className={`flex-1 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      courierTip === tip
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {tip === 0 ? 'None' : `$${tip}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Eco Packaging Toggle */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-[#0F172A]">100% Biodegradable Packaging</h5>
                  <p className="text-[11px] text-slate-500">Plant-fiber container + cornstarch utensils</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEcoPackaging(!ecoPackaging)}
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  ecoPackaging ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                    ecoPackaging ? 'translate-x-5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            {/* Promo Code Input */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F172A] mb-2">
                <Tag className="w-3.5 h-3.5 text-emerald-600" />
                <span>Promo Voucher Code</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. FRESH2026 or SMARTBITE"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  className="flex-1 h-9 px-3 text-xs bg-[#F8FAFC] border border-slate-200 rounded-xl uppercase font-bold outline-none focus:border-emerald-600"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="h-9 px-3.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="mt-2.5 flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Applied: {appliedPromo}</span>
                    <span className="text-[11px] font-normal text-slate-600">
                      ({PROMO_VOUCHERS[appliedPromo]?.desc})
                    </span>
                  </div>
                  <button
                    onClick={() => setAppliedPromo(null)}
                    className="text-slate-400 hover:text-rose-500 font-bold ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200">
              <h5 className="text-xs font-bold text-[#0F172A] mb-2">Payment Method</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { name: 'Apple Pay / Digital Wallet', icon: '' },
                  { name: 'Credit/Debit Card (••4242)', icon: '💳' },
                  { name: 'Cash on Delivery', icon: '💵' },
                  { name: 'Fresh Loyalty Balance', icon: '✨' }
                ].map((pm) => (
                  <button
                    key={pm.name}
                    type="button"
                    onClick={() => setPaymentMethod(pm.name)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-1.5 truncate ${
                      paymentMethod === pm.name
                        ? 'border-emerald-600 bg-emerald-50/60 font-bold text-[#0F172A]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>{pm.icon}</span>
                    <span className="truncate text-[11px]">{pm.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bill Breakdown */}
            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <Currency amount={subtotal} size="sm" />
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Fast Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
              </div>
              {ecoPackaging && (
                <div className="flex justify-between text-slate-600">
                  <span>Eco Packaging</span>
                  <Currency amount={ecoFee} size="sm" />
                </div>
              )}
              {courierTip > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Courier Tip</span>
                  <Currency amount={courierTip} size="sm" />
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount ({appliedPromo})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-extrabold text-[#0F172A]">
                <span className="text-sm">Total</span>
                <Currency amount={grandTotal} size="xl" className="text-emerald-700" />
              </div>
            </div>

          </div>
        )}

        {/* Footer Submit CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200 shrink-0">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleCheckout}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-full font-extrabold px-6 flex items-center justify-between shadow-lg shadow-emerald-600/25 transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Confirming with Kitchen...' : 'Place Smart Order'}</span>
              <div className="flex items-center gap-1.5">
                <Currency amount={grandTotal} size="base" className="text-white" />
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Encrypted SSL Checkout • 100% Quality & Freshness Guarantee
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
