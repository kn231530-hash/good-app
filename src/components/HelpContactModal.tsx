import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  ChevronDown, 
  Send, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface HelpContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLiveChat?: () => void;
}

const FAQS = [
  {
    question: 'How do I order using natural Urdu or messy messages?',
    answer: 'Simply switch to the "Explore" or "Chaska AI" tab. Type or paste your unformatted food request (e.g., "2 zinger burgers spicy, 1 7up cold, Jutial Gilgit"), and our intelligent parser instantly organizes items, pricing, and addresses ready for 1-click confirmation.'
  },
  {
    question: 'What payment methods are supported in Gilgit-Baltistan?',
    answer: 'We support 100% Cash on Delivery (COD) upon doorstep arrival across Gilgit City, Gahkuch, and Aliabad (Hunza), as well as direct Easypaisa and JazzCash mobile account transfers.'
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery time is between 25 to 45 minutes depending on your sector. Fresh hot bags are insulated to preserve heat in cool mountain temperatures.'
  },
  {
    question: 'Can I track my delivery rider in real time?',
    answer: 'Yes! After placing an order, click "Orders" or "Track" to see live status updates from kitchen preparation to rider dispatch with contact details and estimated arrival.'
  }
];

export const HelpContactModal: React.FC<HelpContactModalProps> = ({
  isOpen,
  onClose,
  onOpenLiveChat
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject('');
      setTicketMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[92vh] animate-scale-up">
        {/* Header */}
        <div className="bg-[#0F172A] text-white p-6 relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Customer Care</span>
          </div>

          <h2 className="text-2xl font-black tracking-tight">Help & Contact Support</h2>
          <p className="text-xs text-slate-300 mt-1">
            We are here to assist with your food orders, delivery questions, and rider updates.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm mb-1">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call Dispatch Hotline</span>
                </div>
                <p className="text-xs text-emerald-800">
                  Instant helpline for live order tracking and kitchen updates.
                </p>
              </div>
              <a
                href="tel:+923555008912"
                className="mt-3 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-colors"
              >
                <span>+92 355 500 8912</span>
              </a>
            </div>

            <div className="bg-teal-50/70 border border-teal-200/80 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-teal-900 font-extrabold text-sm mb-1">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>WhatsApp Direct Chat</span>
                </div>
                <p className="text-xs text-teal-800">
                  Send food inquiries, voice notes, or order coordinates on WhatsApp.
                </p>
              </div>
              <a
                href="https://wa.me/923555008912?text=Hello%20Oderela%20Chaska%20Support%2C%20I%20need%20help%20with%20an%20order"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition-colors"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Operating Info */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 flex flex-col sm:flex-row gap-4 text-xs text-slate-600">
            <div className="flex items-start gap-2.5 flex-1">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0F172A] block">Operating Hours</span>
                <span>Monday – Sunday: 11:00 AM – 1:00 AM PST</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 flex-1">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#0F172A] block">Serving Regions</span>
                <span>Gilgit (Jutial, City, Danyore), Gahkuch, Aliabad (Hunza)</span>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div>
            <h3 className="font-extrabold text-sm text-[#0F172A] mb-3">Frequently Asked Questions</h3>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.question}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 bg-white hover:bg-slate-50 transition-colors"
                    >
                      <span className="text-xs font-bold text-[#0F172A]">{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-xs text-slate-600 bg-slate-50/50 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact Message Box */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-white">
            <h3 className="font-extrabold text-sm text-[#0F172A] mb-1">Send a Message to Support</h3>
            <p className="text-xs text-slate-500 mb-3">Have feedback or a custom inquiry? Drop us a line below.</p>

            {ticketSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-bold animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Message received! Our team will respond shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Subject (e.g. Order #ORD-7721 inquiry)"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us what you need assistance with..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Fresh Bite & Oderela Chaska 2026 Support</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
