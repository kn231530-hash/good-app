import React, { useState } from 'react';
import { 
  X, 
  Bike, 
  Phone, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Flame, 
  Utensils, 
  ChevronRight, 
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { Currency } from './Currency';

interface FreshOrderTrackerProps {
  order: Order | null;
  onClose: () => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export const FreshOrderTracker: React.FC<FreshOrderTrackerProps> = ({
  order,
  onClose,
  onUpdateOrderStatus
}) => {
  if (!order) return null;

  const [callModalOpen, setCallModalOpen] = useState(false);

  const STAGES: { key: OrderStatus; label: string; desc: string }[] = [
    {
      key: 'placed',
      label: 'Order Placed',
      desc: 'Encrypted payment authorized, sending to kitchen'
    },
    {
      key: 'confirmed',
      label: 'Confirmed by Fresh Bite',
      desc: 'Kitchen verified organic ingredients and assigned station'
    },
    {
      key: 'kitchen_prep',
      label: 'Artisanal Preparation',
      desc: 'Chef cooking fresh dishes with calibrated thermal timing'
    },
    {
      key: 'out_for_delivery',
      label: 'Out for Delivery',
      desc: `${order.courier.name} on ${order.courier.vehicle}`
    },
    {
      key: 'delivered',
      label: 'Delivered Fresh & Warm',
      desc: 'Handed over at your doorstep. Enjoy your meal!'
    }
  ];

  const currentStageIndex = STAGES.findIndex((s) => s.key === order.status);

  const handleNextStage = () => {
    if (currentStageIndex < STAGES.length - 1) {
      onUpdateOrderStatus(order.id, STAGES[currentStageIndex + 1].key);
    } else {
      onUpdateOrderStatus(order.id, 'placed');
    }
  };

  const progressPercent = Math.max(10, Math.min(100, ((currentStageIndex + 1) / STAGES.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold bg-emerald-500 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Live Dispatch
              </span>
              <span className="text-xs text-slate-300 font-mono">#{order.id}</span>
            </div>
            <h2 className="text-lg font-extrabold text-white mt-1">
              {order.status === 'delivered' ? 'Order Completed 🎉' : 'Your Order is in Motion'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 no-scrollbar">
          
          {/* Estimated ETA Banner */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Estimated Delivery
              </span>
              <div className="text-2xl font-extrabold text-[#0F172A] mt-0.5">
                {order.status === 'delivered' ? (
                  <span className="text-emerald-700">Delivered</span>
                ) : (
                  `${order.estimatedMinutes} Minutes`
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Deliver to:</span>
              <span className="text-xs font-bold text-[#0F172A] block max-w-[180px] truncate">
                {order.deliveryAddress}
              </span>
            </div>
          </div>

          {/* Stepped Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Live Progress
            </h4>
            <div className="relative pl-6 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {STAGES.map((st, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={st.key} className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-emerald-500 border-emerald-500 text-white ring-4 ring-emerald-500/20'
                          : 'bg-white border-slate-300 text-slate-300'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                      ) : isCurrent ? (
                        <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs sm:text-sm font-extrabold ${
                            isCurrent ? 'text-emerald-700' : isPassed ? 'text-[#0F172A]' : 'text-slate-400'
                          }`}
                        >
                          {st.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{st.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={order.courier.photo}
                alt={order.courier.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm text-[#0F172A]">{order.courier.name}</h4>
                  <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded-full border border-amber-200">
                    ★ {order.courier.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{order.courier.vehicle}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">{order.courier.statusText}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCallModalOpen(true)}
              className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-xs transition-colors shrink-0"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Items breakdown */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white text-xs space-y-2">
            <div className="font-extrabold text-slate-400 uppercase tracking-wider mb-1">
              Order Summary ({order.items.length} items)
            </div>
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between items-center text-slate-700">
                <span>{it.quantity}x {it.product.name}</span>
                <Currency amount={it.totalPrice} size="sm" />
              </div>
            ))}
            <div className="pt-2 border-t border-slate-100 flex justify-between font-extrabold text-sm text-[#0F172A]">
              <span>Total Paid</span>
              <Currency amount={order.total} size="base" className="text-emerald-700" />
            </div>
          </div>

        </div>

        {/* Footer Simulation Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">Live Delivery Simulator</span>
          <button
            type="button"
            onClick={handleNextStage}
            className="px-4 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            {currentStageIndex < STAGES.length - 1 ? (
              <>
                <span>Advance to Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Call Modal */}
      {callModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
              <Phone className="w-7 h-7 animate-pulse" />
            </div>
            <h3 className="text-base font-extrabold text-[#0F172A]">Calling Courier</h3>
            <p className="text-xs text-slate-500 mt-1">{order.courier.name} ({order.courier.phone})</p>
            <p className="text-xs text-slate-400 mt-3 italic">
              "Hi! I'm 2 blocks away on the eco scooter, heading up to your suite right now!"
            </p>
            <button
              onClick={() => setCallModalOpen(false)}
              className="mt-5 w-full py-2.5 rounded-full bg-slate-900 text-white font-bold text-xs"
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
