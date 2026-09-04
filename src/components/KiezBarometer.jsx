import React, { useState } from 'react';
import vibesData from '../data/vibes.json';
import { Beer, Utensils, Clock, Store, Compass, TrendingUp, Info } from 'lucide-react';

export default function KiezBarometer() {
  const [selectedDistrict, setSelectedDistrict] = useState('Neukölln');
  const districts = Object.keys(vibesData);
  const current = vibesData[selectedDistrict];

  return (
    <div className="bg-[#1e1f29] border border-white/10 rounded-xl p-6 shadow-xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-full bg-bvg-yellow/10 text-bvg-yellow text-xs font-bold border border-bvg-yellow/20">
              Unique Data Metric
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">The Berlin Kiez Barometer</h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Beyond standard rent stats: Späti density, the real Dönerflation index, and transit speed to Alexanderplatz.
          </p>
        </div>

        {/* District Selector Pill Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {districts.map((d) => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-metro min-h-[36px] ${
                selectedDistrict === d
                  ? 'bg-bvg-yellow text-bvg-dark shadow-md'
                  : 'bg-bvg-gray text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Späti Count Card */}
        <div className="bg-bvg-dark/60 border border-white/5 rounded-xl p-4 flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-yellow-500/10 text-bvg-yellow border border-yellow-500/20">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-gray-400">Late Night Culture</div>
            <div className="text-xl font-extrabold text-white mt-0.5">{current.spati_count} Spätis</div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-bvg-yellow">
              {current.spati_density} Density
            </span>
          </div>
        </div>

        {/* Döner Price Card */}
        <div className="bg-bvg-dark/60 border border-white/5 rounded-xl p-4 flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-gray-400">Dönerflation Index</div>
            <div className="text-xl font-extrabold text-white mt-0.5">€{current.avg_doner_eur.toFixed(2)}</div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-gray-300">
              Local Median Kebab
            </span>
          </div>
        </div>

        {/* Transit Time Card */}
        <div className="bg-bvg-dark/60 border border-white/5 rounded-xl p-4 flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-gray-400">Transit to Alex</div>
            <div className="text-xl font-extrabold text-white mt-0.5">{current.transit_alex_min} mins</div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-blue-300">
              U-Bahn / S-Bahn Direct
            </span>
          </div>
        </div>

        {/* Bureaucracy Wait Card */}
        <div className="bg-bvg-dark/60 border border-white/5 rounded-xl p-4 flex items-start space-x-3">
          <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-medium uppercase text-gray-400">Anmeldung Appointment</div>
            <div className="text-xl font-extrabold text-white mt-0.5">~{current.anmeldung_weeks} Weeks</div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-purple-300">
              Avg Bürgeramt Wait
            </span>
          </div>
        </div>
      </div>

      {/* Selected District Vibe Tags */}
      <div className="bg-bvg-dark/40 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-bvg-yellow flex-shrink-0" />
          <span className="text-xs text-gray-300">
            <strong className="text-white">{selectedDistrict} Vibe:</strong>
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {current.tags.map((tag, idx) => (
            <span 
              key={idx} 
              className="text-xs px-2.5 py-1 rounded-lg bg-bvg-gray text-gray-200 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
