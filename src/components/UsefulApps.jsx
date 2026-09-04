import React, { useState } from 'react';
import { 
  Smartphone, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  TrendingDown, 
  Truck, 
  ShoppingBag, 
  ShieldCheck, 
  HelpCircle,
  PiggyBank,
  RefreshCw,
  Sliders,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export default function UsefulApps() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [electricityKwh, setElectricityKwh] = useState(2000);
  const [currentProviderCost, setCurrentProviderCost] = useState(85);

  // Categories
  const categories = [
    { id: 'all', label: 'All Life Hacks' },
    { id: 'money', label: 'Fintech & Money Transfer' },
    { id: 'savings', label: 'Food & Daily Savings' },
    { id: 'logistics', label: 'Moving & Second-Hand' },
    { id: 'contracts', label: 'Contract Optimization' }
  ];

  // Apps dataset based on MASTER_PLAN.md
  const apps = [
    {
      id: 'wise',
      category: 'money',
      name: 'Wise (formerly TransferWise)',
      tagline: 'Multi-Currency Account & Zero-Markup FX',
      rating: '4.8 ★',
      badge: 'Essential for Expats',
      description: 'Open a local German IBAN in minutes before your official bank appointment. Convert salary or send money abroad with transparent mid-market exchange rates and minimal fees.',
      tips: 'Landlords and utility companies accept the Wise EUR IBAN (SEPA compliant) without issues while you wait for N26, Sparkasse, or DKB.',
      url: 'https://wise.com',
      color: 'from-emerald-500/20 to-emerald-500/5',
      accentColor: 'text-emerald-400'
    },
    {
      id: 'taptap',
      category: 'money',
      name: 'TAPTAP Send',
      tagline: 'Instant Zero-Fee Cross-Border Remittance',
      rating: '4.7 ★',
      badge: 'Zero Commission Routes',
      description: 'Specialized mobile money transfer to specific overseas destinations with zero transfer fees and strong competitive exchange rates.',
      tips: 'Best for direct mobile-wallet and bank deposits without paying hefty Western Union / bank wire surcharges.',
      url: 'https://www.taptapsend.com',
      color: 'from-blue-500/20 to-blue-500/5',
      accentColor: 'text-blue-400'
    },
    {
      id: 'tgtg',
      category: 'savings',
      name: 'Too Good To Go',
      tagline: 'Surplus Gourmet Food at 1/3 Price',
      rating: '4.9 ★',
      badge: 'Daily Food Hack',
      description: 'Rescue fresh pastries, sushi, artisanal breads, and restaurant meals from top Berlin cafés (Zeit für Brot, Brammibal’s, Bio Company) before closing time for €3.50 - €5.00.',
      tips: 'Set push alerts for popular bakeries around 17:00 - 18:00; "Magic Bags" sell out within 90 seconds in Prenzlauer Berg & Kreuzberg.',
      url: 'https://toogoodtogo.com',
      color: 'from-amber-500/20 to-amber-500/5',
      accentColor: 'text-amber-400'
    },
    {
      id: 'kleinanzeigen',
      category: 'logistics',
      name: 'Kleinanzeigen (formerly eBay)',
      tagline: 'Germany’s #1 Marketplace for Free & Used Goods',
      rating: '4.6 ★',
      badge: 'Furnishing Hack',
      description: 'Furnish your entire Altbau apartment for next to nothing. Filter by "Zu verschenken" (Free giveaway) to pick up couches, desks, plants, and vintage chairs within walking distance.',
      tips: 'Always message politely in German using auto-templates: "Hallo, ich kann es gerne heute zeitnah abholen!" (Speed is key!).',
      url: 'https://www.kleinanzeigen.de',
      color: 'from-green-500/20 to-green-500/5',
      accentColor: 'text-green-400'
    },
    {
      id: 'lalamove',
      category: 'logistics',
      name: 'Lalamove & Miles Van Sharing',
      tagline: 'Instant Van & Courier Logistics On Demand',
      rating: '4.5 ★',
      badge: 'Transport Hack',
      description: 'Found a great bed or wardrobe on Kleinanzeigen but don’t own a car? Book an on-demand van with driver via Lalamove or unlock a Miles VW Crafter van with just your smartphone driver’s license.',
      tips: 'Miles Transporter charges per km rather than minute-based congestion traffic, making it ideal for crossing the city during rush hour.',
      url: 'https://www.lalamove.com',
      color: 'from-orange-500/20 to-orange-500/5',
      accentColor: 'text-orange-400'
    },
    {
      id: 'check24',
      category: 'contracts',
      name: 'Check24 / Verivox',
      tagline: 'Electricity, DSL/Fiber & Insurance Switcher',
      rating: '4.8 ★',
      badge: '€300-€500/yr Saved',
      description: 'The golden rule of living in Germany: never stay on default utility tariffs (Grundversorgung). Switch your electricity, home internet (WLAN), and liability insurance (Haftpflicht) annually.',
      tips: 'New customer bonuses (Neukundenbonus & Sofortbonus) pay out within 3 months, dropping your real monthly kWh electricity cost drastically.',
      url: 'https://www.check24.de',
      color: 'from-cyan-500/20 to-cyan-500/5',
      accentColor: 'text-cyan-400'
    }
  ];

  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(a => a.category === selectedCategory);

  // Check24 Interactive Contract Optimization Calculator
  // Default tariff avg: ~0.42 €/kWh vs optimized switch: ~0.28 €/kWh + €120 cashback bonus
  const annualDefaultCost = Math.round((electricityKwh * 0.42) + (12 * 12)); // Grundpreis + Arbeitspreis
  const annualOptimizedCost = Math.round((electricityKwh * 0.28) + (10 * 12) - 120);
  const potentialSavings = Math.max(0, annualDefaultCost - annualOptimizedCost);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black text-lg shadow-lg shadow-bvg-yellow/10">
                <Smartphone className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Useful Apps & Expat Life Hacks
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              Curated tools to survive and thrive in Berlin: avoid bank queue deadlocks, furnish your apartment on a budget, rescue food, and save €300–€500 every year on utility contracts.
            </p>
          </div>

          <div className="bg-bvg-gray/60 border border-white/10 px-4 py-2.5 rounded-xl text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Avg. First-Year Savings</span>
            <span className="text-xl font-black text-bvg-yellow font-mono">€450+ / year</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-6 border-t border-white/10 mt-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-metro ${
                selectedCategory === c.id
                  ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/20'
                  : 'bg-bvg-gray/40 text-gray-300 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Apps Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => (
          <div
            key={app.id}
            className={`bg-[#15151D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-bvg-yellow/40 transition-metro group relative overflow-hidden`}
          >
            <div className="space-y-3">
              {/* Top Row: Badge & Rating */}
              <div className="flex items-center justify-between">
                <span className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 ${app.accentColor}`}>
                  {app.badge}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400 bg-black/40 px-2 py-0.5 rounded">
                  {app.rating}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-bvg-yellow transition-colors">
                  {app.name}
                </h3>
                <p className="text-xs text-gray-400 font-medium mt-0.5">
                  {app.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-gray-300 leading-relaxed">
                {app.description}
              </p>

              {/* Pro-Tip Box */}
              <div className="bg-bvg-dark/80 rounded-xl p-3 border border-white/5 text-xs text-gray-300 space-y-1">
                <span className="text-[10px] uppercase font-bold text-bvg-yellow flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-bvg-yellow" />
                  <span>Local Insider Hack</span>
                </span>
                <p className="text-[11px] text-gray-400 leading-normal">
                  {app.tips}
                </p>
              </div>
            </div>

            {/* Direct External Link */}
            <div className="pt-4 mt-4 border-t border-white/5">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-bvg-gray/60 hover:bg-bvg-yellow hover:text-bvg-dark text-gray-200 text-xs font-bold transition-metro"
              >
                <span>Visit & Install {app.name.split(' ')[0]}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Feature: Check24 Contract Switching Optimizer */}
      <div className="bg-[#15151D] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center space-x-3">
            <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-black">
              <PiggyBank className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white">
                  Contract Switching Simulator (Check24 Strategy)
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Annual Rule
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                In Germany, landlords rarely include electricity in Warmmiete. Staying on default tariffs costs up to 40% more.
              </p>
            </div>
          </div>

          <div className="bg-cyan-950/40 border border-cyan-500/30 px-4 py-2.5 rounded-xl text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400">Estimated Annual Saving</span>
            <span className="text-2xl font-black text-cyan-300 font-mono block">
              €{potentialSavings} / yr
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Slider input */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-300 mb-2 font-medium">
                <span>Estimated Annual Electricity Consumption:</span>
                <span className="font-mono font-bold text-cyan-400">{electricityKwh} kWh / year</span>
              </div>
              <input
                type="range"
                min="1000"
                max="4000"
                step="250"
                value={electricityKwh}
                onChange={(e) => setElectricityKwh(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-bvg-dark rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                <span>1,000 kWh (1 Person / WG)</span>
                <span>2,500 kWh (Couple)</span>
                <span>4,000 kWh (Family)</span>
              </div>
            </div>

            <div className="bg-bvg-dark/60 p-4 rounded-xl border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Default Municipal Rate (Grundversorgung):</span>
                <span className="font-mono text-red-400 font-bold">~€{annualDefaultCost} / yr</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Optimized Switcher Rate (+ Cashback):</span>
                <span className="font-mono text-emerald-400 font-bold">~€{annualOptimizedCost} / yr</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between font-bold text-white">
                <span>Net Money Kept in Your Pocket:</span>
                <span className="font-mono text-cyan-400">€{potentialSavings} / yr</span>
              </div>
            </div>
          </div>

          {/* Golden Rules Callout */}
          <div className="bg-bvg-gray/40 border border-white/10 rounded-xl p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase text-bvg-yellow flex items-center space-x-1.5">
              <AlertCircle className="w-4 h-4 text-bvg-yellow" />
              <span>The 3 Golden German Contract Rules</span>
            </h4>
            <ul className="text-xs text-gray-300 space-y-2 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Take meter photo on move-in day:</strong> Always photograph your electricity meter (Stromzähler) with serial number during apartment handover (Übergabeprotokoll).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Switch within 14 days:</strong> Sign up via Check24 within 2 weeks of moving in; your new provider automatically cancels the expensive default city provider.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Repeat every 12-24 months:</strong> New customer bonuses expire after year 1, so set a calendar reminder to switch again.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
