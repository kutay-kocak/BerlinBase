import React, { useState } from 'react';
import { 
  Smartphone, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  PiggyBank,
  MapPin,
  Sparkles,
  Compass
} from 'lucide-react';

export default function UsefulApps() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [electricityKwh, setElectricityKwh] = useState(2000);

  // Main Categories for Expat Life Hacks & Apps
  const categories = [
    { id: 'all', label: 'All Life Hacks' },
    { id: 'money', label: 'Fintech & Money Transfer' },
    { id: 'savings', label: 'Food & Daily Savings' },
    { id: 'logistics', label: 'Moving & Second-Hand' },
    { id: 'contracts', label: 'Contract Optimization' }
  ];

  // Museum Subcategories
  const museumSubcategories = [
    { id: 'all', label: 'All 15 Museums' },
    { id: 'modern_art', label: '🎨 Modern & Contemporary Art' },
    { id: 'history', label: '🧱 History & Cold War' },
    { id: 'classical', label: '🏛️ Classical Antiquities' },
    { id: 'science', label: '🚀 Science & Technology' }
  ];

  // Apps dataset
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

  // Filtering
  const filteredApps = selectedCategory === 'all' 
    ? apps 
    : apps.filter(a => a.category === selectedCategory);

  // Check24 Calculator
  const annualDefaultCost = Math.round((electricityKwh * 0.42) + (12 * 12));
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
              Curated tools to thrive in Berlin: avoid bank queue deadlocks, furnish on a budget, rescue food, and optimize contracts.
            </p>
          </div>

          <div className="bg-bvg-gray/60 border border-white/10 px-4 py-2.5 rounded-xl text-left sm:text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Expat Utility Hub</span>
            <span className="text-xl font-black text-bvg-yellow font-mono">Essential Expat Toolkit</span>
          </div>
        </div>

        {/* Category Pills - Multi-line Wrap / Chip Grid for effortless mobile access */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10 mt-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-metro cursor-pointer flex-shrink-0 ${
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

      {/* APPS SECTION */}
      <div className="space-y-4 pt-4">
        <div className="border-b border-white/10 pb-2">
          <h3 className="text-lg font-black text-white">Daily Expat Tools & Apps</h3>
          <p className="text-xs text-gray-400">Practical apps for finances, moving, second-hand furniture and groceries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-[#15151D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-bvg-yellow/40 transition-metro group relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 ${app.accentColor}`}>
                      {app.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-gray-400 bg-black/40 px-2 py-0.5 rounded">
                      {app.rating}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-bvg-yellow transition-colors">
                      {app.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                      {app.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {app.description}
                  </p>

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

                <div className="pt-4 mt-4 border-t border-white/5">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-bvg-gray/60 hover:bg-bvg-yellow hover:text-bvg-dark text-gray-200 text-xs font-bold transition-metro cursor-pointer"
                  >
                    <span>Visit & Install {app.name.split(' ')[0]}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      {/* Interactive Feature: Check24 Contract Switching Optimizer */}
      {(selectedCategory === 'all' || selectedCategory === 'contracts') && (
        <div className="bg-[#15151D] border border-cyan-500/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 mt-8">
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
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-300">
                <span>Annual Electricity Consumption (kWh)</span>
                <span className="text-cyan-400 font-mono text-sm">{electricityKwh} kWh</span>
              </div>
              <input
                type="range"
                min="1000"
                max="4500"
                step="250"
                value={electricityKwh}
                onChange={(e) => setElectricityKwh(Number(e.target.value))}
                className="w-full h-2 bg-bvg-dark rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>1-Person WG (1,200 kWh)</span>
                <span>Couple Flat (2,500 kWh)</span>
                <span>Family (3,800+ kWh)</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-bvg-dark/80 p-3 rounded-xl border border-red-500/20">
                <span className="text-[10px] uppercase font-bold text-red-400 block">Default Grundversorgung</span>
                <span className="text-lg font-black text-white font-mono mt-1 block">€{annualDefaultCost} / yr</span>
                <span className="text-[10px] text-gray-500">~0.42 € / kWh</span>
              </div>

              <div className="bg-bvg-dark/80 p-3 rounded-xl border border-emerald-500/20">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Optimized via Check24</span>
                <span className="text-lg font-black text-emerald-400 font-mono mt-1 block">€{annualOptimizedCost} / yr</span>
                <span className="text-[10px] text-emerald-500/80">~0.28 € + €120 Bonus</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
