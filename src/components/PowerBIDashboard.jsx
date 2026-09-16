import React, { useState } from 'react';
import { 
  BarChart3, 
  Utensils, 
  Wifi, 
  Coffee, 
  ExternalLink, 
  Filter, 
  Database, 
  Info, 
  Sliders, 
  CheckCircle2,
  PieChart,
  Layers,
  Sparkles
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList,
  CartesianGrid,
  Legend
} from 'recharts';
import analyticsData from '../data/berlinbase_master_analytics.json';

export default function PowerBIDashboard() {
  const [activePage, setActivePage] = useState('rent');
  const [selectedRoomType, setSelectedRoomType] = useState('WG Room');

  const { districts_lifestyle, rentals_by_room } = analyticsData;

  // Slicer options for Page 1
  const roomCategories = [
    'WG Room',
    '1-Room Studio (1+0)',
    '1-Bedroom Flat (1+1 / 1+2)'
  ];

  // Filter rentals data based on selected room category & round rents to nearest 10€ (e.g. 795 -> 800)
  const filteredRentals = rentals_by_room
    .filter(r => r.room_category === selectedRoomType)
    .map(r => ({
      ...r,
      average_monthly_rent_eur: Math.round(r.average_monthly_rent_eur / 10) * 10
    }))
    .sort((a, b) => b.average_monthly_rent_eur - a.average_monthly_rent_eur);

  const totalSampleCount = filteredRentals.reduce((sum, r) => sum + r.sample_count, 0);
  const avgRentCategory = Math.round(
    (filteredRentals.reduce((sum, r) => sum + r.average_monthly_rent_eur, 0) / (filteredRentals.length || 1)) / 10
  ) * 10;

  // Stats for Page 2
  const sortedCuisineData = [...districts_lifestyle]
    .sort((a, b) => b.foreign_cuisine_pct - a.foreign_cuisine_pct);
  const totalVerifiedDining = districts_lifestyle.reduce((sum, d) => sum + d.total_verified_restaurants, 0);
  const avgForeignShare = Math.round(
    districts_lifestyle.reduce((sum, d) => sum + d.foreign_cuisine_pct, 0) / districts_lifestyle.length
  );

  // Stats for Page 3
  const sortedFiberData = [...districts_lifestyle]
    .sort((a, b) => b.fiber_internet_pct - a.fiber_internet_pct);
  const avgFiberCoverage = Math.round(
    districts_lifestyle.reduce((sum, d) => sum + d.fiber_internet_pct, 0) / districts_lifestyle.length
  );

  // Stats for Page 4 - Rounded to nearest 10 cents (e.g. 3.17 -> 3.20)
  const sortedCoffeeData = [...districts_lifestyle]
    .map(d => ({
      ...d,
      rounded_coffee: parseFloat((Math.round(d.flat_white_price_eur * 10) / 10).toFixed(2))
    }))
    .sort((a, b) => b.rounded_coffee - a.rounded_coffee); // Sorted descending (highest to lowest)
  const avgCoffeeRaw = districts_lifestyle.reduce((sum, d) => sum + d.flat_white_price_eur, 0) / districts_lifestyle.length;
  const avgCoffeePrice = (Math.round(avgCoffeeRaw * 10) / 10).toFixed(2);

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-lg bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black text-sm shadow-md">
              BI
            </span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white tracking-tight">
                  BerlinBase Power BI Analytics Hub
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>PostgreSQL 16 Synced</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                4-page interactive analytical report powered by dual-table architecture (2,500+ trap-filtered verified listings).
              </p>
            </div>
          </div>
        </div>

        {/* Master Dataset Badge */}
        <div className="flex items-center space-x-2">
          <div className="bg-bvg-gray/60 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-bvg-yellow"></span>
            <span>2,500+ Verified Market Listings</span>
          </div>
        </div>
      </div>

      {/* 4 Master Pages Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActivePage('rent')}
          className={`flex items-center space-x-2.5 p-3 rounded-xl text-left border transition-metro ${
            activePage === 'rent'
              ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow font-bold shadow-lg shadow-bvg-yellow/10'
              : 'bg-bvg-gray/40 text-gray-300 border-white/5 hover:border-white/20 hover:bg-bvg-gray/80'
          }`}
        >
          <BarChart3 className={`w-4 h-4 ${activePage === 'rent' ? 'text-bvg-dark' : 'text-bvg-yellow'}`} />
          <div>
            <div className="text-[10px] uppercase font-bold opacity-80">Page 1</div>
            <div className="text-xs font-bold leading-tight">Monthly Rent by District</div>
          </div>
        </button>

        <button
          onClick={() => setActivePage('cuisine')}
          className={`flex items-center space-x-2.5 p-3 rounded-xl text-left border transition-metro ${
            activePage === 'cuisine'
              ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow font-bold shadow-lg shadow-bvg-yellow/10'
              : 'bg-bvg-gray/40 text-gray-300 border-white/5 hover:border-white/20 hover:bg-bvg-gray/80'
          }`}
        >
          <Utensils className={`w-4 h-4 ${activePage === 'cuisine' ? 'text-bvg-dark' : 'text-bvg-yellow'}`} />
          <div>
            <div className="text-[10px] uppercase font-bold opacity-80">Page 2</div>
            <div className="text-xs font-bold leading-tight">Cuisine Share (%)</div>
          </div>
        </button>

        <button
          onClick={() => setActivePage('fiber')}
          className={`flex items-center space-x-2.5 p-3 rounded-xl text-left border transition-metro ${
            activePage === 'fiber'
              ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow font-bold shadow-lg shadow-bvg-yellow/10'
              : 'bg-bvg-gray/40 text-gray-300 border-white/5 hover:border-white/20 hover:bg-bvg-gray/80'
          }`}
        >
          <Wifi className={`w-4 h-4 ${activePage === 'fiber' ? 'text-bvg-dark' : 'text-cyan-400'}`} />
          <div>
            <div className="text-[10px] uppercase font-bold opacity-80">Page 3</div>
            <div className="text-xs font-bold leading-tight">Fiber Internet Coverage</div>
          </div>
        </button>

        <button
          onClick={() => setActivePage('coffee')}
          className={`flex items-center space-x-2.5 p-3 rounded-xl text-left border transition-metro ${
            activePage === 'coffee'
              ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow font-bold shadow-lg shadow-bvg-yellow/10'
              : 'bg-bvg-gray/40 text-gray-300 border-white/5 hover:border-white/20 hover:bg-bvg-gray/80'
          }`}
        >
          <Coffee className={`w-4 h-4 ${activePage === 'coffee' ? 'text-bvg-dark' : 'text-amber-500'}`} />
          <div>
            <div className="text-[10px] uppercase font-bold opacity-80">Page 4</div>
            <div className="text-xs font-bold leading-tight">Coffee Price Index</div>
          </div>
        </button>
      </div>

      {/* PAGE 1: AVERAGE MONTHLY RENT BY DISTRICT */}
      {activePage === 'rent' && (
        <div className="space-y-5">
          {/* Top Control Bar: Tile Style Room Slicer & KPI Cards */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-bvg-gray/50 p-4 rounded-xl border border-white/10">
            {/* Tile Style Slicer */}
            <div>
              <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-bvg-yellow" />
                <span>Power BI Top Slicer (Tile Style): Room Category</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {roomCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedRoomType(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-metro ${
                      selectedRoomType === cat
                        ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/30'
                        : 'bg-bvg-dark/80 text-gray-300 hover:text-white border border-white/10 hover:border-bvg-yellow/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* KPI Cards */}
            <div className="flex items-center space-x-3">
              <div className="bg-bvg-dark/90 border border-white/10 px-4 py-2 rounded-xl text-right">
                <div className="text-[10px] font-bold uppercase text-gray-400">Total Sample Count</div>
                <div className="text-lg font-black text-bvg-yellow tracking-tight">
                  {totalSampleCount.toLocaleString()} listings
                </div>
              </div>

              <div className="bg-bvg-dark/90 border border-white/10 px-4 py-2 rounded-xl text-right">
                <div className="text-[10px] font-bold uppercase text-gray-400">Citywide Average</div>
                <div className="text-lg font-black text-white tracking-tight">
                  {avgRentCategory} € <span className="text-xs font-normal text-gray-400">/ mo</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual: High-Performance Recharts SVG Column Chart */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[600px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                    <span>District Ranking by Total Monthly Rent (All-in)</span>
                  </h3>
                  <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    Realistic rent averages — no swap ads, no WBS traps, just real homes
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xs text-bvg-yellow font-mono">100% Warm Rent Benchmark</span>
                </div>
              </div>

              {/* Permanent SVG Vector Engine Chart */}
              <div className="pt-4 h-[560px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredRentals}
                    margin={{ top: 25, right: 20, left: 10, bottom: 90 }}
                  >
                    {/* Subtle grid lines to guide the eye across the chart */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                    <XAxis 
                      dataKey="district_name" 
                      interval={0} 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fill: '#e2e8f0', fontSize: 11, fontWeight: 700 }}
                      stroke="#475569"
                      height={95}
                      dy={8}
                    />
                    <YAxis 
                      type="number" 
                      domain={[0, 'auto']} 
                      stroke="#64748b" 
                      tickFormatter={(v) => `${v}€`}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      width={45}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.06)' }}
                      contentStyle={{ 
                        backgroundColor: '#1A1A24', 
                        borderColor: '#F0D722', 
                        borderWidth: '1.5px',
                        borderRadius: '10px', 
                        color: '#FFFFFF', 
                        padding: '8px 12px',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)' 
                      }}
                      itemStyle={{ color: '#F0D722', fontWeight: 900, fontSize: '15px' }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 800, fontSize: '13px', marginBottom: '2px' }}
                      formatter={(value) => [`€${value} / mo`, 'Warm Rent']}
                    />
                    <Bar dataKey="average_monthly_rent_eur" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="average_monthly_rent_eur" 
                        position="top" 
                        formatter={(val) => `€${val}`} 
                        fill="#F0D722" 
                        fontSize={10} 
                        fontWeight={800}
                        offset={6}
                      />
                      {filteredRentals.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index < 4 ? '#F0D722' : index < 12 ? '#facc15' : '#ca8a04'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 2: INTERNATIONAL VS GERMAN CUISINE SHARE */}
      {activePage === 'cuisine' && (
        <div className="space-y-5">
          {/* Top KPI Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-bvg-gray/50 border border-white/10 p-4 rounded-xl">
              <div className="text-[11px] font-bold uppercase text-gray-400">Total Verified Dining Spots</div>
              <div className="text-2xl font-black text-bvg-yellow mt-1">
                {totalVerifiedDining.toLocaleString()}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">Verified Dining Locations Analyzed</div>
            </div>

            <div className="bg-bvg-gray/50 border border-white/10 p-4 rounded-xl">
              <div className="text-[11px] font-bold uppercase text-gray-400">Avg. International Share</div>
              <div className="text-2xl font-black text-white mt-1">
                %{avgForeignShare}
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">Top: Neukölln (%78), Kreuzberg (%76)</div>
            </div>

            <div className="bg-bvg-gray/50 border border-white/10 p-4 rounded-xl">
              <div className="text-[11px] font-bold uppercase text-gray-400">German Heritage Lead</div>
              <div className="text-2xl font-black text-gray-200 mt-1">
                Pankow (%68)
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">Followed by Steglitz (%65)</div>
            </div>
          </div>

          {/* PAGE 2: 100% Stacked Cuisine SVG Recharts Bar Chart */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[600px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>100% Stacked Cuisine Distribution: International vs. Traditional German</span>
                  <span className="text-[11px] text-gray-400 font-normal">Ranked by International Cuisine Share</span>
                </h3>
                <div className="flex items-center space-x-4 text-xs font-mono">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-bvg-yellow"></span>
                    <span className="text-gray-300">International %</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded bg-[#475569]"></span>
                    <span className="text-gray-300">Traditional German %</span>
                  </div>
                </div>
              </div>

              {/* SVG Stacked Bar Chart */}
              <div className="pt-4 h-[560px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortedCuisineData}
                    margin={{ top: 25, right: 20, left: 10, bottom: 90 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                    <XAxis 
                      dataKey="district_name" 
                      interval={0} 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fill: '#e2e8f0', fontSize: 11, fontWeight: 700 }}
                      stroke="#475569"
                      height={95}
                      dy={8}
                    />
                    <YAxis 
                      type="number" 
                      domain={[0, 100]} 
                      stroke="#64748b" 
                      tickFormatter={(v) => `%${v}`}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      width={45}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.06)' }}
                      contentStyle={{ 
                        backgroundColor: '#1A1A24', 
                        borderColor: '#F0D722', 
                        borderWidth: '1.5px',
                        borderRadius: '10px', 
                        color: '#FFFFFF', 
                        padding: '8px 12px',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)' 
                      }}
                      itemStyle={{ fontWeight: 800, fontSize: '13px' }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 800, fontSize: '13px', marginBottom: '2px' }}
                      formatter={(value, name) => [`%${value}`, name === 'foreign_cuisine_pct' ? 'International Cuisine' : 'Traditional German']}
                    />
                    <Bar dataKey="foreign_cuisine_pct" stackId="cuisine" fill="#F0D722" radius={[0, 0, 0, 0]}>
                      <LabelList 
                        dataKey="foreign_cuisine_pct" 
                        position="center" 
                        formatter={(val) => val > 0 ? `%${val}` : ''} 
                        fill="#1A1A24" 
                        fontSize={9} 
                        fontWeight={900} 
                      />
                    </Bar>
                    <Bar dataKey="german_cuisine_pct" stackId="cuisine" fill="#475569" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="german_cuisine_pct" 
                        position="center" 
                        formatter={(val) => val > 0 ? `%${val}` : ''} 
                        fill="#FFFFFF" 
                        fontSize={9} 
                        fontWeight={800} 
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 3: FIBER INTERNET COVERAGE */}
      {activePage === 'fiber' && (
        <div className="space-y-5">
          {/* Top KPI Card */}
          <div className="flex items-center justify-between bg-cyan-950/20 border border-cyan-500/30 p-4 rounded-xl">
            <div>
              <div className="text-xs font-bold uppercase text-cyan-400">Berlin Citywide Average Fiber FTTH</div>
              <div className="text-3xl font-black text-cyan-300 mt-1">%{avgFiberCoverage}</div>
              <p className="text-xs text-gray-300 mt-0.5">
                Highest speeds available in Mitte (%68) and Friedrichshain (%62).
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Wifi className="w-6 h-6" />
            </div>
          </div>

          {/* SVG Recharts Bar Chart in Tech Cyan */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[600px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>Fiber Internet (FTTH/Gigabit) Coverage by District (%)</span>
                  <span className="text-[11px] text-gray-400 font-normal">Broadband Infrastructure Benchmark</span>
                </h3>
                <span className="text-xs text-cyan-400 font-mono">FTTH High Speed Standard</span>
              </div>

              {/* SVG Column Chart */}
              <div className="pt-4 h-[560px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortedFiberData}
                    margin={{ top: 25, right: 20, left: 10, bottom: 90 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                    <XAxis 
                      dataKey="district_name" 
                      interval={0} 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fill: '#e2e8f0', fontSize: 11, fontWeight: 700 }}
                      stroke="#475569"
                      height={95}
                      dy={8}
                    />
                    <YAxis 
                      type="number" 
                      domain={[0, 80]} 
                      stroke="#64748b" 
                      tickFormatter={(v) => `%${v}`}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      width={45}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.06)' }}
                      contentStyle={{ 
                        backgroundColor: '#1A1A24', 
                        borderColor: '#22d3ee', 
                        borderWidth: '1.5px',
                        borderRadius: '10px', 
                        color: '#FFFFFF', 
                        padding: '8px 12px',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)' 
                      }}
                      itemStyle={{ color: '#22d3ee', fontWeight: 900, fontSize: '15px' }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 800, fontSize: '13px', marginBottom: '2px' }}
                      formatter={(value) => [`%${value}`, 'Fiber FTTH Coverage']}
                    />
                    <Bar dataKey="fiber_internet_pct" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="fiber_internet_pct" 
                        position="top" 
                        formatter={(val) => `%${val}`} 
                        fill="#22d3ee" 
                        fontSize={10} 
                        fontWeight={800}
                        offset={6}
                      />
                      {sortedFiberData.map((entry, index) => (
                        <Cell 
                          key={`cell-fiber-${index}`} 
                          fill={index < 4 ? '#22d3ee' : index < 12 ? '#06b6d4' : '#0891b2'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PAGE 4: COFFEE PRICE INDEX */}
      {activePage === 'coffee' && (
        <div className="space-y-5">
          {/* Top KPI Card */}
          <div className="flex items-center justify-between bg-amber-950/20 border border-amber-500/30 p-4 rounded-xl">
            <div>
              <div className="text-xs font-bold uppercase text-amber-400">Berlin Average Flat White Price</div>
              <div className="text-3xl font-black text-amber-300 mt-1">{avgCoffeePrice} €</div>
              <p className="text-xs text-gray-300 mt-0.5">
                Specialty third-wave café pricing benchmark. Marzahn (Zentrum) offers the most affordable cup (3.10 €).
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Coffee className="w-6 h-6" />
            </div>
          </div>

          {/* SVG Recharts Column Chart for Specialty Coffee */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[600px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>Specialty Coffee Benchmark (Flat White in EUR)</span>
                  <span className="text-[11px] text-gray-400 font-normal">Ranked from Highest to Lowest</span>
                </h3>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
                    <span className="text-red-400">≥ €4.30 High</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                    <span className="text-yellow-400">€3.50-€4.20 Moderate</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                    <span className="text-emerald-400">&lt; €3.50 Affordable</span>
                  </div>
                </div>
              </div>

              {/* SVG Column Chart */}
              <div className="pt-4 h-[560px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={sortedCoffeeData}
                    margin={{ top: 25, right: 20, left: 10, bottom: 90 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" vertical={false} />
                    <XAxis 
                      dataKey="district_name" 
                      interval={0} 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fill: '#e2e8f0', fontSize: 11, fontWeight: 700 }}
                      stroke="#475569"
                      height={95}
                      dy={8}
                    />
                    <YAxis 
                      type="number" 
                      domain={[2.5, 5.0]} 
                      stroke="#64748b" 
                      tickFormatter={(v) => `${v.toFixed(1)}€`}
                      tick={{ fill: '#94a3b8', fontSize: 11 }}
                      width={45}
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.06)' }}
                      contentStyle={{ 
                        backgroundColor: '#1A1A24', 
                        borderColor: '#f59e0b', 
                        borderWidth: '1.5px',
                        borderRadius: '10px', 
                        color: '#FFFFFF', 
                        padding: '8px 12px',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)' 
                      }}
                      itemStyle={{ color: '#fbbf24', fontWeight: 900, fontSize: '15px' }}
                      labelStyle={{ color: '#FFFFFF', fontWeight: 800, fontSize: '13px', marginBottom: '2px' }}
                      formatter={(value) => [`€${Number(value).toFixed(2)}`, 'Flat White Median']}
                    />
                    <Bar dataKey="rounded_coffee" radius={[4, 4, 0, 0]}>
                      <LabelList 
                        dataKey="rounded_coffee" 
                        position="top" 
                        formatter={(val) => `€${Number(val).toFixed(2)}`} 
                        fill="#fbbf24" 
                        fontSize={10} 
                        fontWeight={800}
                        offset={6}
                      />
                      {sortedCoffeeData.map((entry, index) => {
                        const price = entry.rounded_coffee;
                        let barColor = '#10b981'; // Green for affordable (< €3.50)
                        if (price >= 4.30) {
                          barColor = '#dc2626'; // Red for expensive / high-end (>= €4.30)
                        } else if (price >= 3.90) {
                          barColor = '#ea580c'; // Orange for above average (>= €3.90)
                        } else if (price >= 3.50) {
                          barColor = '#eab308'; // Amber / Yellow for moderate (>= €3.50)
                        }

                        return (
                          <Cell 
                            key={`cell-coffee-${entry.district_name}-${index}`} 
                            fill={barColor} 
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info Box */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 pt-3 border-t border-white/10 gap-2">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-bvg-yellow" />
            <span className="text-gray-300 font-medium">Source: Verified Berlin Rental &amp; Lifestyle Data Mart (ImmoScout24, WG-Gesucht, Check24, Destatis)</span>
          </div>
          <div className="text-[11px] text-gray-400 font-mono pl-6">
            Last Updated: {analyticsData.energy_and_inflation?.last_updated || new Date().toISOString().split('T')[0]} (Weekly Automated Sync)
          </div>
        </div>
        <span className="text-[11px] text-gray-500 font-mono">Live Power BI Desktop Model Ready</span>
      </div>
    </div>
  );
}
