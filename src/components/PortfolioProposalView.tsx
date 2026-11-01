import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  Database, 
  Server, 
  Search, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  Code2,
  ExternalLink,
  Store,
  User,
  LayoutDashboard
} from 'lucide-react';
import { PORTFOLIO_SPECS } from '../data/mockData';
import { AppView } from '../types';

interface PortfolioProposalViewProps {
  onSwitchView: (view: AppView) => void;
}

export const PortfolioProposalView: React.FC<PortfolioProposalViewProps> = ({ onSwitchView }) => {
  const [copied, setCopied] = useState(false);

  const portfolioMarkdown = `# ${PORTFOLIO_SPECS.projectName}
**Tagline:** ${PORTFOLIO_SPECS.tagline}
**Launch Year:** ${PORTFOLIO_SPECS.launchYear}
**Status:** ${PORTFOLIO_SPECS.clientOrStatus}

## Project Overview
${PORTFOLIO_SPECS.overview}

## Key Platform Features
### 1. Customer Dashboard
- Secure sign-up, profile management, and dietary preference tagging (High Protein, Vegan, Gluten-Free, Organic).
- Saved favorite foods list with 1-click lightning reordering.
- Real-time order history with live delivery telemetry and digital receipts.
- Daily nutrition and calorie consumption progress tracker.

### 2. Online Food Store
- High-definition editorial food photography with interactive menus.
- Granular categorization: Fresh Bowls, Artisanal Sourdough Pizzas, Gourmet Burgers, Raw Cold-Pressed Juices, Chef Specials.
- Comprehensive macro breakdowns (Calories, Protein, Organic validation).
- Dynamic dish customization modal (portions, dressings, add-on toppings, chef notes).
- Modern slide-over cart with instant coupon vouchers (FRESH2026, SMARTBITE) and eco-friendly packaging.

### 3. Admin Management Portal
- Executive KPI dashboard: Real-time GMV, active fulfillment pipeline, and average order metrics.
- Live Product Catalog Inventory: Instant in-stock toggles, inline price editing, and product creation.
- Order Operations Pipeline: One-click status progression (Placed → Kitchen Prep → Out for Delivery → Delivered).
- Customer CRM directory with customer spend, order frequencies, and loyalty tiers.

### 4. Advanced AI & Conversational Features
- **TasteMatch AI**: Dynamic meal planner matching calorie limits, dietary restrictions, and budget.
- **BiteBot AI Support**: Conversational shopping assistant with real-time intent parsing, live order tracking, and embedded 1-click cart addition.

## Backend Technology & Cloud Architecture
- **Database:** PostgreSQL / Supabase with Row Level Security (RLS) and real-time WebSocket subscriptions.
- **Image Storage:** Cloud object storage with automated WebP compression and responsive CDN edge caching.
- **AI Integration:** Google GenAI TypeScript SDK (@google/genai) for smart culinary recommendations.
- **Authentication:** Token-based secure authentication with session revocation and encrypted storage.

## SEO & Performance Strategy
- Schema.org FoodEstablishment & Product JSON-LD structured microdata.
- Pre-rendered meta tags (OpenGraph, Twitter Cards) for social virality.
- Mobile-first responsive fluid grid with zero CLS (Cumulative Layout Shift) and sub-1.2s LCP load time.
`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(portfolioMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-fade-in">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-emerald-500 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                Project Proposal & Portfolio
              </span>
              <span className="bg-white/10 text-slate-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/15">
                Target Launch: {PORTFOLIO_SPECS.launchYear}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {PORTFOLIO_SPECS.projectName}
            </h1>
            <p className="text-emerald-400 font-bold text-sm sm:text-base mt-1">
              "{PORTFOLIO_SPECS.tagline}"
            </p>
            <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
              {PORTFOLIO_SPECS.overview}
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleCopyMarkdown}
              className="h-11 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Proposal Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy English Portfolio</span>
                </>
              )}
            </button>
            <span className="text-[10px] text-slate-400 text-center">
              Ready for client review or dev presentation
            </span>
          </div>
        </div>

        {/* Live Interactive Links to Platform Subsystems */}
        <div className="relative z-10 mt-8 pt-6 border-t border-slate-700/80 flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold mr-1">
            Test Live Subsystems:
          </span>

          <button
            type="button"
            onClick={() => onSwitchView('chaska_ai')}
            className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 border border-emerald-500/40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chaska AI Router</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchView('store')}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/15 transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-emerald-400" />
            <span>Storefront</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchView('dashboard')}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/15 transition-colors"
          >
            <User className="w-3.5 h-3.5 text-sky-400" />
            <span>Customer Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => onSwitchView('admin')}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 border border-white/15 transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Feature Architecture Matrix */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-[#0F172A] tracking-tight">
          System Feature Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PORTFOLIO_SPECS.coreFeatures.map((feat: { title: string; items: string[] }, idx: number) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs flex items-center justify-center border border-emerald-200">
                    0{idx + 1}
                  </span>
                  <h3 className="font-extrabold text-sm text-[#0F172A]">{feat.title}</h3>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                  {feat.items.map((item: string, iIdx: number) => (
                    <li key={iIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications: Database Schema & API Layer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-extrabold text-[#0F172A]">
              PostgreSQL & Supabase Database Architecture
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Production relational data model with Row-Level Security (RLS) policies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 block font-sans">table: products</span>
            <div className="text-slate-600 text-[11px] space-y-0.5">
              <p>id: uuid (PK)</p>
              <p>name: text</p>
              <p>category: enum</p>
              <p>price: numeric(10,2)</p>
              <p>calories: integer</p>
              <p>protein_g: integer</p>
              <p>in_stock: boolean</p>
              <p>stock_count: integer</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 block font-sans">table: orders</span>
            <div className="text-slate-600 text-[11px] space-y-0.5">
              <p>id: text (PK)</p>
              <p>customer_id: uuid (FK)</p>
              <p>status: enum</p>
              <p>total_amount: numeric(10,2)</p>
              <p>delivery_address: text</p>
              <p>courier_id: uuid (FK)</p>
              <p>created_at: timestamp</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-extrabold text-slate-900 block font-sans">table: customers</span>
            <div className="text-slate-600 text-[11px] space-y-0.5">
              <p>id: uuid (PK)</p>
              <p>name: text</p>
              <p>email: text (unique)</p>
              <p>loyalty_tier: enum</p>
              <p>dietary_prefs: text[]</p>
              <p>calorie_goal: integer</p>
            </div>
          </div>
        </div>

        {/* SEO & Performance Standards */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-extrabold text-sm border border-emerald-200">
              100
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">Core Web Vitals</h5>
              <p className="text-[11px] text-slate-500">LCP &lt;1.2s • Zero layout shift</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center font-extrabold text-sm border border-sky-200">
              SEO
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">Schema.org Structured Data</h5>
              <p className="text-[11px] text-slate-500">JSON-LD FoodEstablishment markup</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-extrabold text-sm border border-amber-200">
              AI
            </div>
            <div>
              <h5 className="font-extrabold text-xs text-[#0F172A]">Gemini AI Integration</h5>
              <p className="text-[11px] text-slate-500">Natural meal matching & concierge</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
