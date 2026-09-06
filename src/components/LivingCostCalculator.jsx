import React, { useState } from 'react';
import { 
  Calculator, 
  Coins, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  PieChart, 
  DollarSign, 
  ShieldCheck, 
  TrendingUp, 
  PiggyBank, 
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import analyticsData from '../data/berlinbase_master_analytics.json';

// Deutschlandticket dynamic official price by year (German Federal Transport Ministry & DB official rate)
// In 2023-2024: 49€ | 2025: 58€ | 2026: 63€
const getOfficialDBTicketPrice = () => {
  const currentYear = new Date().getFullYear();
  if (currentYear >= 2026) return 63;
  if (currentYear === 2025) return 58;
  return 49;
};

export default function LivingCostCalculator() {
  const [netSalary, setNetSalary] = useState(2500);
  const [housingType, setHousingType] = useState('WG Room'); // 'WG Room', '1-Room Studio (1+0)', '1-Bedroom Flat (1+1 / 1+2)'
  const [diningStyle, setDiningStyle] = useState('balanced'); // 'budget', 'balanced', 'foodie'
  const [transitPass, setTransitPass] = useState('d_ticket'); // 'd_ticket', 'bike'

  const currentYear = new Date().getFullYear();
  const dbTicketPrice = getOfficialDBTicketPrice();

  const { districts_lifestyle, rentals_by_room } = analyticsData;

  // Monthly lifestyle cost assumptions based on benchmark data
  const diningCosts = {
    budget: 280,   // Mostly Aldi/Lidl cooking + occasional Döner/Falafel
    balanced: 420, // Grocery + weekly dinners & weekend brunch
    foodie: 620    // Specialty third-wave coffees, frequent dining out, bars
  };

  // Only DB Deutschlandticket and Bicycle / Walk
  const transitCosts = {
    d_ticket: dbTicketPrice,
    bike: 0
  };

  // Fixed monthly essentials: Mobile + Electricity + Internet + Haftpflicht
  const fixedUtilitiesCost = 135;

  const currentLifestyleCost = diningCosts[diningStyle] + transitCosts[transitPass] + fixedUtilitiesCost;

  // Calculate net savings for each of the 12 districts
  const districtCalculations = districts_lifestyle.map((d) => {
    const rental = rentals_by_room.find(
      r => r.district_name === d.district_name && r.room_category === housingType
    );
    const rent = rental ? rental.average_monthly_rent_eur : 750;
    
    // Coffee index factor (Specialty coffee drinkers spend ~25 cups a month)
    const coffeeSpend = diningStyle === 'foodie' 
      ? Math.round(d.flat_white_price_eur * 22) 
      : Math.round(d.flat_white_price_eur * 8);

    const totalMonthlyExpense = rent + currentLifestyleCost + coffeeSpend;
    const remainingSavings = netSalary - totalMonthlyExpense;
    const savingsRatio = Math.round((remainingSavings / netSalary) * 100);

    return {
      district_name: d.district_name,
      borough: d.borough,
      inside_ringbahn: d.inside_ringbahn,
      rent,
      totalExpense: totalMonthlyExpense,
      savings: remainingSavings,
      savingsRatio,
      coffeePrice: d.flat_white_price_eur,
      transitAlex: d.transit_to_alex_min
    };
  }).sort((a, b) => b.savings - a.savings); // Sorted by most savings left

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black shadow-lg shadow-bvg-yellow/10">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Personalized Berlin Living Cost & Savings Calculator
              </h2>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-bvg-yellow/10 text-bvg-yellow border border-bvg-yellow/20">
                Pre-Relocation Tool
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Simulate your realistic monthly cash flow across all 12 districts based on actual Warmmiete and local lifestyle indices.
            </p>
          </div>
        </div>

        <div className="bg-bvg-gray/60 px-4 py-2 rounded-xl border border-white/10 text-right">
          <span className="text-[10px] text-gray-400 uppercase font-bold block">German 30% Rent Rule</span>
          <span className="text-xs font-bold text-white">
            Max Rent Advice: <span className="text-bvg-yellow font-mono">€{Math.round(netSalary * 0.35)}</span>
          </span>
        </div>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-bvg-gray/30 p-4 rounded-xl border border-white/5">
        {/* 1. Net Salary Slider */}
        <div className="space-y-1.5 md:col-span-1">
          <div className="flex justify-between text-xs font-bold text-gray-300">
            <span>Net Monthly Income:</span>
            <span className="font-mono text-bvg-yellow text-sm">€{netSalary}</span>
          </div>
          <input
            type="range"
            min="1200"
            max="6500"
            step="100"
            value={netSalary}
            onChange={(e) => setNetSalary(Number(e.target.value))}
            className="w-full accent-bvg-yellow cursor-pointer h-2 bg-bvg-dark rounded-lg"
          />
          <div className="flex justify-between text-[9px] text-gray-500 font-mono">
            <span>€1,200 (Student)</span>
            <span>€3,200 (Median)</span>
            <span>€6,500+</span>
          </div>
        </div>

        {/* 2. Housing Category */}
        <div className="space-y-1.5 md:col-span-1">
          <span className="text-xs font-bold text-gray-300 block">Housing Type:</span>
          <div className="flex flex-col space-y-1">
            {[
              { id: 'WG Room', label: 'WG Shared Room' },
              { id: '1-Room Studio (1+0)', label: 'Studio (1+0)' },
              { id: '1-Bedroom Flat (1+1 / 1+2)', label: '1-Bed Flat (1+1)' }
            ].map(h => (
              <button
                key={h.id}
                onClick={() => setHousingType(h.id)}
                className={`text-xs py-1 px-2 rounded-lg font-bold text-left transition-metro ${
                  housingType === h.id
                    ? 'bg-bvg-yellow text-bvg-dark shadow-sm'
                    : 'bg-bvg-dark/70 text-gray-300 hover:text-white'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Dining & Lifestyle */}
        <div className="space-y-1.5 md:col-span-1">
          <span className="text-xs font-bold text-gray-300 block">Dining Habit:</span>
          <div className="flex flex-col space-y-1">
            {[
              { id: 'budget', label: 'Cook at Home (€280)' },
              { id: 'balanced', label: 'Balanced Expat (€420)' },
              { id: 'foodie', label: 'Foodie & Cafés (€620)' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDiningStyle(d.id)}
                className={`text-xs py-1 px-2 rounded-lg font-bold text-left transition-metro ${
                  diningStyle === d.id
                    ? 'bg-bvg-yellow text-bvg-dark shadow-sm'
                    : 'bg-bvg-dark/70 text-gray-300 hover:text-white'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Transit Ticket */}
        <div className="space-y-1.5 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-300">Transit Pass:</span>
            <span className="text-[10px] text-emerald-400 font-mono">DB Official</span>
          </div>
          <div className="flex flex-col space-y-1.5">
            <button
              onClick={() => setTransitPass('d_ticket')}
              className={`text-xs py-2 px-2.5 rounded-lg font-bold text-left transition-metro flex items-center justify-between ${
                transitPass === 'd_ticket'
                  ? 'bg-bvg-yellow text-bvg-dark shadow-sm'
                  : 'bg-bvg-dark/70 text-gray-300 hover:text-white'
              }`}
            >
              <span>DB Deutschlandticket</span>
              <span className="font-mono">{dbTicketPrice} € / mo</span>
            </button>
            <button
              onClick={() => setTransitPass('bike')}
              className={`text-xs py-2 px-2.5 rounded-lg font-bold text-left transition-metro flex items-center justify-between ${
                transitPass === 'bike'
                  ? 'bg-bvg-yellow text-bvg-dark shadow-sm'
                  : 'bg-bvg-dark/70 text-gray-300 hover:text-white'
              }`}
            >
              <span>Bicycle / Walk</span>
              <span className="font-mono">0 €</span>
            </button>
          </div>
          <div className="text-[9px] text-gray-400 pt-0.5">
            *Auto-indexed from Deutsche Bahn ({currentYear} tariff)
          </div>
        </div>
      </div>

      {/* Results Ranking Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center space-x-2">
            <PiggyBank className="w-4 h-4 text-emerald-400" />
            <span>Estimated Monthly Net Savings by District (Ranked Highest to Lowest)</span>
          </h3>
          <span className="text-xs text-gray-400 font-mono">
            {housingType} Standard
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {districtCalculations.map((d, idx) => {
            const isTopSaver = idx < 3;
            const isNegative = d.savings < 0;

            return (
              <div
                key={d.district_name}
                className={`bg-bvg-gray/40 border rounded-xl p-4 flex flex-col justify-between space-y-3 transition-metro ${
                  isTopSaver 
                    ? 'border-emerald-500/40 bg-emerald-950/10' 
                    : isNegative 
                    ? 'border-red-500/30' 
                    : 'border-white/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                        #{idx + 1}
                      </span>
                      <h4 className="font-bold text-white text-sm">{d.district_name}</h4>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      {d.inside_ringbahn ? 'Ringbahn (Zone A)' : 'Outer Ring (Zone B)'} • {d.transitAlex}m to Alex
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase block">Monthly Leftover</span>
                    <span className={`text-base font-black font-mono ${
                      isNegative ? 'text-red-400' : isTopSaver ? 'text-emerald-400' : 'text-bvg-yellow'
                    }`}>
                      {d.savings > 0 ? `+€${d.savings}` : `-€${Math.abs(d.savings)}`}
                    </span>
                  </div>
                </div>

                <div className="bg-bvg-dark/70 rounded-lg p-2.5 border border-white/5 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-400 text-[11px]">
                    <span>Average Rent ({housingType}):</span>
                    <span className="font-mono text-white font-bold">€{d.rent}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 text-[11px]">
                    <span>Living & Transit:</span>
                    <span className="font-mono text-gray-300">€{currentLifestyleCost}</span>
                  </div>
                  <div className="border-t border-white/5 pt-1 flex justify-between font-bold text-[11px]">
                    <span className="text-gray-300">Total Monthly Cost:</span>
                    <span className="font-mono text-white">€{d.totalExpense}</span>
                  </div>
                </div>

                {/* Savings progress bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Savings Rate:</span>
                    <span className={`font-bold font-mono ${d.savingsRatio > 30 ? 'text-emerald-400' : 'text-gray-300'}`}>
                      {d.savingsRatio}% of salary
                    </span>
                  </div>
                  <div className="h-1.5 bg-bvg-dark rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isNegative ? 'bg-red-500' : isTopSaver ? 'bg-emerald-400' : 'bg-bvg-yellow'
                      }`}
                      style={{ width: `${Math.max(5, Math.min(100, d.savingsRatio))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
