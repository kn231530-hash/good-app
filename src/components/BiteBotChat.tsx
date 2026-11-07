import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Check, 
  ArrowRight,
  MessageSquare,
  ChefHat
} from 'lucide-react';
import { Product, Order, ChatMessage } from '../types';
import { Currency } from './Currency';

export const BiteBotLogo: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  return (
    <div className={`relative ${dim} rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-amber-400 p-0.5 shadow-md flex items-center justify-center shrink-0 ${className}`}>
      {/* Inner circular canvas with glowing chef bot */}
      <div className="w-full h-full bg-[#0F172A] rounded-[14px] flex items-center justify-center relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-amber-400/20 pointer-events-none" />
        
        {/* Custom ChefBot Mascot SVG */}
        <svg viewBox="0 0 36 36" className="w-[80%] h-[80%] text-emerald-400 drop-shadow-sm select-none" fill="none">
          {/* Chef Hat Toque Top */}
          <path d="M12 11C10.5 11 9 9.8 9.5 8C10 6 12 5.5 13.5 6.5C14.5 5 17 4.5 18.5 6C20 4.5 22.5 5 23.5 6.5C25 5.5 27 6 27.5 8C28 9.8 26.5 11 25 11H12Z" fill="url(#chefGrad)" />
          {/* Chef Hat Band */}
          <rect x="11" y="11" width="14" height="2.5" rx="1" fill="#F8FAFC" />
          
          {/* Friendly Robot Head / Screen */}
          <rect x="8" y="14.5" width="20" height="14.5" rx="4.5" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
          
          {/* Glowing Friendly Eyes */}
          <circle cx="13.5" cy="20.5" r="2.2" fill="#34D399" />
          <circle cx="22.5" cy="20.5" r="2.2" fill="#34D399" />
          <circle cx="14.3" cy="19.7" r="0.8" fill="#FFFFFF" />
          <circle cx="23.3" cy="19.7" r="0.8" fill="#FFFFFF" />
          
          {/* Cute Smile / Mouth */}
          <path d="M15 24.5C16 26 20 26 21 24.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="chefGrad" x1="9" y1="5" x2="27" y2="12" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Small sparkle badge on corner */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      </div>
    </div>
  );
};

interface BiteBotChatProps {
  products: Product[];
  orders: Order[];
  onAddToCart: (product: Product) => void;
  onOpenOrderTracker: (order: Order) => void;
}

export const BiteBotChat: React.FC<BiteBotChatProps> = ({
  products,
  orders,
  onAddToCart,
  onOpenOrderTracker
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "👋 Assalam-o-Alaikum! Main hoon Chaska AI (Oderela Router). Aap casual Urdu ya English mein kuch bhi likhein — jaise 'bhai 2 zinger or loaded fries', 'large fajita pizza deal', ya 'doodh aur chai' — main foran open outlets se match karke order prepare kar doonga!",
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      generateBotResponse(query);
      setIsTyping(false);
    }, 500);
  };

  const generateBotResponse = (query: string) => {
    const lower = query.toLowerCase();

    // 1. Order status query
    if (lower.includes('track') || lower.includes('order') || lower.includes('status') || lower.includes('kahan') || lower.includes('rider') || lower.includes('where')) {
      const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled') || orders[0];
      if (activeOrder) {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'assistant',
            text: `🚚 Order #${activeOrder.id} is currently **${activeOrder.status.replace('_', ' ')}**. Courier ${activeOrder.courier.name} is on ${activeOrder.courier.vehicle} heading to ${activeOrder.deliveryAddress}. ETA ~${activeOrder.estimatedMinutes} minutes!`,
            timestamp: 'Just now',
            actionType: 'track_order'
          }
        ]);
        return;
      }
    }

    // 2. Zinger / Burger / Fries
    if (lower.includes('zinger') || lower.includes('burger') || lower.includes('fries') || lower.includes('crunch')) {
      const matched = products.filter((p) => p.id === 'chaska-1' || p.id === 'chaska-4');
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `🍔 Zinger craving sorted! Yeh raha hamara top-rated **Chaska Crispy Zinger** aur **Cheesy Loaded Fries** (Chaska Fast Food Hub Jutial se):`,
          timestamp: 'Just now',
          recommendedProducts: matched
        }
      ]);
      return;
    }

    // 3. Pizza / Deal
    if (lower.includes('pizza') || lower.includes('fajita') || lower.includes('deal') || lower.includes('midnight')) {
      const matched = products.filter((p) => p.id === 'chaska-2' || p.id === 'chaska-3');
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `🍕 Zabardast pizza deals available! Royal Crust Gilgit ka **Large 13" Chicken Fajita** ya **Midnight Mega Deal** check karein:`,
          timestamp: 'Just now',
          recommendedProducts: matched
        }
      ]);
      return;
    }

    // 4. Chapshuro / Local Northern Cuisine
    if (lower.includes('chapshuro') || lower.includes('local') || lower.includes('gilgit') || lower.includes('hunza')) {
      const matched = products.filter((p) => p.id === 'chaska-7');
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `🫓 Wah! Karakoram Heritage Kitchen ka authentic stone-baked **Gilgiti Chapshuro** fresh tawa se ready ho raha hai:`,
          timestamp: 'Just now',
          recommendedProducts: matched
        }
      ]);
      return;
    }

    // 5. Biryani / Roll / Desi
    if (lower.includes('biryani') || lower.includes('chawal') || lower.includes('roll') || lower.includes('desi') || lower.includes('paratha')) {
      const matched = products.filter((p) => p.id === 'chaska-8' || p.id === 'chaska-9');
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `🍛 Hot & fresh desi khana! Al-Madina **Chicken Dum Biryani** aur Roll Express ka **Chicken Garlic Mayo Paratha Roll**:`,
          timestamp: 'Just now',
          recommendedProducts: matched
        }
      ]);
      return;
    }

    // 6. Doodh / Chai / Mart
    if (lower.includes('doodh') || lower.includes('milk') || lower.includes('chai') || lower.includes('tea') || lower.includes('rusk') || lower.includes('mart')) {
      const matched = products.filter((p) => p.id === 'chaska-10' || p.id === 'chaska-11');
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `🥛 Oderela Instant Mart se 1 Litre pure farm milk aur Chaska Chai Khana ki Karak Doodh Patti ready hai:`,
          timestamp: 'Just now',
          recommendedProducts: matched
        }
      ]);
      return;
    }

    // 7. Discount / Coupon query
    if (lower.includes('discount') || lower.includes('promo') || lower.includes('coupon') || lower.includes('code') || lower.includes('deal') || lower.includes('off')) {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `🎟️ Special Oderela Chaska Vouchers:\n• **CHASKA50**: Rs. 150 OFF (min order Rs. 800)\n• **ODERELA**: Rs. 200 OFF Northern Express Delivery\n• **ZINGER**: Rs. 100 OFF Zinger Meals!`,
          timestamp: 'Just now'
        }
      ]);
      return;
    }

    // Generic friendly answer with recommendations
    const topPicks = products.slice(0, 2);
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: `Maine aapka message samjh liya! Yeh do items Gilgit aur Gahkuch mein top trending hain:`,
        timestamp: 'Just now',
        recommendedProducts: topPicks
      }
    ]);
  };

  return (
    <>
      {/* Floating Toggle Pill */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3 sm:right-5 z-[60] bg-gradient-to-r from-[#0F172A] via-teal-900 to-emerald-800 hover:from-black hover:to-emerald-900 text-white rounded-full p-1.5 pr-3 sm:pr-4 flex items-center gap-2 shadow-xl shadow-emerald-950/30 border border-emerald-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <BiteBotLogo size="sm" />
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xs tracking-wide text-white">
                BiteBot AI
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <span className="text-[10px] text-emerald-300 font-semibold block leading-tight">
              Ask Chef Concierge
            </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3 sm:right-6 z-[60] w-[94vw] sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[520px] max-h-[calc(100dvh-6.5rem-env(safe-area-inset-bottom))] animate-scale-up">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex items-center justify-between shrink-0 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <BiteBotLogo size="md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-white">BiteBot AI</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Fresh Bite Smart Culinary Concierge</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {[
              'High protein salmon',
              '<450 kcal meals',
              'Active order status',
              'Promo vouchers'
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p)}
                className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-700 whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3.5 no-scrollbar text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-start gap-2 max-w-[90%]">
                  {msg.sender === 'assistant' && (
                    <BiteBotLogo size="sm" className="w-6 h-6 rounded-lg mt-0.5 shrink-0" />
                  )}
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-br-none ml-auto'
                        : 'bg-slate-100 text-[#0F172A] rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>

                {/* Inline Recommendation Cards */}
                {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                  <div className="mt-2 space-y-2 w-full max-w-[90%]">
                    {msg.recommendedProducts.map((p) => (
                      <div
                        key={p.id}
                        className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="font-extrabold text-[11px] text-[#0F172A] truncate block">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              {p.calories} kcal • {p.protein}g protein
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <Currency amount={p.price} size="sm" className="text-emerald-700 font-bold" />
                          <button
                            type="button"
                            onClick={() => onAddToCart(p)}
                            className="px-2 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] flex items-center gap-0.5"
                          >
                            <span>Add</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <span className="text-[9px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 text-slate-400 bg-slate-100 px-3 py-2 rounded-2xl w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0">
            <input
              type="text"
              placeholder="Ask anything about food, calories, orders..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 h-9 px-3 text-xs bg-slate-100 focus:bg-white rounded-full border border-slate-200 focus:border-emerald-600 outline-none"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
