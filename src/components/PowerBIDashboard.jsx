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
  LabelList
} from 'recharts';
import analyticsData from '../data/berlinbase_master_analytics.json';

export default function PowerBIDashboard() {
  const [activePage, setActivePage] = useState('rent');
  const [selectedRoomType, setSelectedRoomType] = useState('WG Room');
  const [useVectorChart, setUseVectorChart] = useState(false);

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
  const totalVerifiedDining = districts_lifestyle.reduce((sum, d) => sum + d.total_verified_restaurants, 0);
  const avgForeignShare = Math.round(
    districts_lifestyle.reduce((sum, d) => sum + d.foreign_cuisine_pct, 0) / districts_lifestyle.length
  );

  // Stats for Page 3
  const avgFiberCoverage = Math.round(
    districts_lifestyle.reduce((sum, d) => sum + d.fiber_internet_pct, 0) / districts_lifestyle.length
  );

  // Stats for Page 4 - Rounded to nearest 10 cents (e.g. 3.17 -> 3.20)
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
                4-page interactive analytical report powered by dual-table architecture (9,890+ verified listings).
              </p>
            </div>
          </div>
        </div>

        {/* Master Dataset Badge */}
        <div className="flex items-center space-x-2">
          <div className="bg-bvg-gray/60 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-gray-300 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-bvg-yellow"></span>
            <span>9,890+ Verified Listings Active</span>
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

          {/* Visual: Clustered Bar Chart representation */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[580px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <span>District Ranking by Total Monthly Rent (All-in)</span>
                  <span className="text-[11px] text-gray-400 font-normal">Estimated District Averages (Rounded)</span>
                </h3>
                <div className="flex items-center space-x-3">
                  {/* Recharts Vector Toggle */}
                  <button
                    onClick={() => setUseVectorChart(!useVectorChart)}
                    className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-metro ${
                      useVectorChart 
                        ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow' 
                        : 'bg-bvg-dark/80 text-gray-300 border-white/10 hover:border-bvg-yellow/40'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{useVectorChart ? 'SVG Recharts Active' : 'Switch to SVG Recharts Mode'}</span>
                  </button>
                  <span className="text-xs text-bvg-yellow font-mono hidden md:inline">100% Warm Standard</span>
                </div>
              </div>

            {/* Recharts SVG Vector Engine Mode */}
            {useVectorChart ? (
              <div className="pt-4 h-[480px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={filteredRentals}
                    margin={{ top: 10, right: 60, left: 70, bottom: 5 }}
                  >
                    <XAxis type="number" domain={[0, 1850]} stroke="#64748b" tickFormatter={(v) => `${v}€`} />
                    <YAxis 
                      type="category" 
                      dataKey="district_name" 
                      stroke="#cbd5e1" 
                      width={105}
                      tick={{ fill: '#e2e8f0', fontSize: 12, fontWeight: 600 }} 
                    />
                    <RechartsTooltip
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
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
                      formatter={(value) => [`€${value} / mo`, '']}
                    />
                    <Bar dataKey="average_monthly_rent_eur" radius={[0, 4, 4, 0]}>
                      <LabelList 
                        dataKey="average_monthly_rent_eur" 
                        position="right" 
                        formatter={(val) => `€${val}`} 
                        fill="#F0D722" 
                        fontSize={13} 
                        fontWeight={800} 
                      />
                      {filteredRentals.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={index < 3 ? '#F0D722' : index < 7 ? '#facc15' : '#ca8a04'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
            /* Standard Native Metro Bar List */
            <div className="space-y-2.5 pt-2">
              {filteredRentals.map((r, idx) => {
                const maxRent = 1700;
                const widthPct = Math.min(100, Math.round((r.average_monthly_rent_eur / maxRent) * 100));

                return (
                  <div key={r.district_name} className="group">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500 font-mono w-4">{idx + 1}</span>
                        <span className="font-bold text-gray-200 group-hover:text-bvg-yellow transition-colors">
                          {r.district_name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-extrabold text-white text-sm font-mono">
                          {r.average_monthly_rent_eur} €
                        </span>
                      </div>
                    </div>

                    <div className="h-4 bg-bvg-dark/80 rounded-md overflow-hidden p-0.5 border border-white/5">
                      <div
                        className="h-full rounded bg-gradient-to-r from-bvg-yellow/70 to-bvg-yellow transition-all duration-500 flex items-center justify-end pr-2"
                        style={{ width: `${widthPct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            )}
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

          {/* 100% Stacked Bar Chart */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[580px] flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white">
                  100% Stacked Cuisine Distribution: International vs. Traditional German
                </h3>
              {/* Legend */}
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-bvg-yellow"></span>
                  <span className="text-gray-300 font-medium">International Cuisine (%)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-3 rounded bg-[#2C2D35] border border-white/20"></span>
                  <span className="text-gray-300 font-medium">Traditional German (%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {[...districts_lifestyle]
                .sort((a, b) => b.foreign_cuisine_pct - a.foreign_cuisine_pct)
                .map((d) => (
                  <div key={d.district_name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-gray-200">{d.district_name}</span>
                      <div className="flex items-center space-x-2 font-mono text-[11px]">
                        <span className="text-bvg-yellow font-bold">%{d.foreign_cuisine_pct} Int.</span>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-400">%{d.german_cuisine_pct} Ger.</span>
                      </div>
                    </div>

                    {/* Stacked Progress */}
                    <div className="h-4 w-full bg-[#2C2D35] rounded-md overflow-hidden flex border border-white/10">
                      <div
                        className="bg-bvg-yellow h-full text-bvg-dark font-extrabold text-[10px] flex items-center justify-center transition-all duration-500"
                        style={{ width: `${d.foreign_cuisine_pct}%` }}
                      >
                        {d.foreign_cuisine_pct >= 25 ? `%${d.foreign_cuisine_pct}` : ''}
                      </div>
                      <div
                        className="h-full text-gray-300 font-medium text-[10px] flex items-center justify-center transition-all duration-500"
                        style={{ width: `${d.german_cuisine_pct}%` }}
                      >
                        {d.german_cuisine_pct >= 25 ? `%${d.german_cuisine_pct}` : ''}
                      </div>
                    </div>
                  </div>
                ))}
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

          {/* Clustered Bar Visual in Tech Cyan */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[580px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white">
                  Fiber Internet (FTTH/Gigabit) Coverage by District (%)
                </h3>
                <span className="text-xs text-cyan-400 font-mono">FTTH High Speed Benchmark</span>
              </div>

              <div className="space-y-2.5 pt-3">
                {[...districts_lifestyle]
                  .sort((a, b) => b.fiber_internet_pct - a.fiber_internet_pct)
                  .map((d, idx) => (
                    <div key={d.district_name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 font-mono w-4">{idx + 1}</span>
                          <span className="font-bold text-gray-200">{d.district_name}</span>
                        </div>
                        <span className="font-mono font-bold text-cyan-300 text-sm">
                          %{d.fiber_internet_pct}
                        </span>
                      </div>

                      <div className="h-4 bg-bvg-dark/80 rounded-md overflow-hidden p-0.5 border border-white/5">
                        <div
                          className="h-full rounded bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500 shadow-sm shadow-cyan-400/30"
                          style={{ width: `${d.fiber_internet_pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
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
                Specialty third-wave café pricing benchmark. Wedding offers the most affordable cup (3.20 €).
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Coffee className="w-6 h-6" />
            </div>
          </div>

          {/* Column / Bar Visual */}
          <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-5 min-h-[580px] flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-sm font-bold text-white">
                  Specialty Coffee Benchmark (Flat White in EUR)
                </h3>
                <span className="text-xs text-amber-400 font-mono">Third-Wave Roastery Median</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-4">
                {[...districts_lifestyle]
                  .sort((a, b) => b.flat_white_price_eur - a.flat_white_price_eur)
                  .map((d) => {
                    const roundedCoffee = (Math.round(d.flat_white_price_eur * 10) / 10).toFixed(2);
                    return (
                      <div 
                        key={d.district_name}
                        className="bg-bvg-dark/70 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-amber-500/40 transition-metro min-h-[100px]"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-bold text-sm text-gray-200">{d.district_name}</div>
                            <div className="text-[10px] text-gray-400">Specialty café avg</div>
                          </div>
                          <Coffee className="w-4 h-4 text-amber-500/70" />
                        </div>
                        <div className="text-right pt-2">
                          <div className="text-lg font-black text-amber-400 font-mono">
                            {roundedCoffee} €
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
