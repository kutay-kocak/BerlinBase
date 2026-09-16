import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  CircleMarker, 
  Popup, 
  Tooltip,
  Polyline,
  useMap
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  Train,
  Home, 
  Utensils, 
  Clock, 
  Wifi, 
  Coffee, 
  ShieldCheck, 
  Store, 
  Info,
  Navigation,
  Layers,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Compass,
  Zap,
  ArrowRight
} from 'lucide-react';
import analyticsData from '../data/berlinbase_master_analytics.json';
import vibesData from '../data/vibes.json';

import { 
  DISTRICT_COORDINATES, 
  MAJOR_STATIONS, 
  RINGBAHN_COORDINATES, 
  NIGHT_TRANSIT_LINES, 
  DISTRICT_SCORES 
} from '../data/map/districtGeoData';
import { enrichDistrictData, getMarkerStyle } from '../utils/mapHelpers';

export default function BerlinDistrictMap() {
  // Rent Level is now the #1 primary category!
  const [selectedMetric, setSelectedMetric] = useState('rent');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState('WG Room');
  const [ringFilter, setRingFilter] = useState('all'); // 'all', 'inside', 'outer'
  const [showNightTransit, setShowNightTransit] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const { districts_lifestyle, rentals_by_room } = analyticsData;

  // Build combined dataset mapped with coordinates, scores, vibes, and 6-Station Transit Times
  const allDistrictData = enrichDistrictData({
    districtsLifestyle: districts_lifestyle,
    rentalsByRoom: rentals_by_room,
    vibesData,
    districtCoordinates: DISTRICT_COORDINATES,
    districtScores: DISTRICT_SCORES
  });

  // Apply Zone A (Inside Ringbahn) / Zone B (Outer Ring) filter
  const districtMapData = allDistrictData.filter(d => {
    if (ringFilter === 'inside') return d.inside_ringbahn;
    if (ringFilter === 'outer') return !d.inside_ringbahn;
    return true;
  });

  // Dynamic visual styling helper with distinct 4-tier relative scales (Green, Yellow, Orange, Red)
  const getDistrictMarkerStyle = (item) => getMarkerStyle(item, selectedMetric, selectedRoomFilter);

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Top Header & Ringbahn Zone Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-black text-white tracking-tight">
              Berlin District Map & Price Analytics
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-bvg-yellow text-bvg-dark uppercase">
              22 Districts Live
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-x-2">
            <span>Now covers 10 fast-transit outer districts (Karlshorst, Tempelhof, Alt-Treptow, Weißensee, Spandau & more).</span>
            <span className="text-emerald-400 font-medium text-[11px]">• Realistic rent averages — no swap ads, no WBS traps, just real homes</span>
          </p>
        </div>

        {/* Ringbahn Zone Slicer moved right under header */}
        <div className="flex items-center space-x-2 bg-bvg-gray/50 px-3 py-1.5 rounded-xl border border-white/10 self-start lg:self-center">
          <span className="text-xs text-gray-300 font-semibold flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-bvg-yellow" />
            <span>Filter by Ring:</span>
          </span>
          <div className="flex space-x-1.5">
            <button
              onClick={() => setRingFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'all'
                  ? 'bg-bvg-yellow text-bvg-dark shadow'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              All (22 Kieze)
            </button>
            <button
              onClick={() => setRingFilter('inside')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'inside'
                  ? 'bg-bvg-yellow text-bvg-dark shadow'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Inside Ring (Zone A)
            </button>
            <button
              onClick={() => setRingFilter('outer')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'outer'
                  ? 'bg-bvg-yellow text-bvg-dark shadow'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Outer Ring (Zone B)
            </button>
          </div>
        </div>
      </div>

      {/* Direct Map Controls Bar (Directly Above the Map Canvas) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bvg-gray/40 p-3 rounded-xl border border-white/10">
        {/* 5 Master Categories (Rent Level prominently FIRST!) */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* 1. RENT LEVEL FIRST! */}
          <button
            onClick={() => setSelectedMetric('rent')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-metro ${
              selectedMetric === 'rent'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>1. Rent Level</span>
          </button>

          {/* 2. TRANSPORTATION */}
          <button
            onClick={() => setSelectedMetric('transit')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'transit'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-blue-400" />
            <span>2. Transportation & Hubs</span>
          </button>

          {/* 3. INTERNATIONAL CUISINE */}
          <button
            onClick={() => setSelectedMetric('cuisine')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'cuisine'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>3. International Cuisine %</span>
          </button>

          {/* 4. FIBER INTERNET */}
          <button
            onClick={() => setSelectedMetric('fiber')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'fiber'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>4. Fiber Internet</span>
          </button>

          {/* 5. COFFEE PRICE */}
          <button
            onClick={() => setSelectedMetric('coffee')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'coffee'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>5. Flat White €</span>
          </button>
        </div>

        {/* Right side sub-action: Room Category Slicer (when rent is selected) */}
        {selectedMetric === 'rent' && (
          <div className="flex items-center space-x-1.5 self-start sm:self-auto">
            <span className="text-xs text-gray-400 font-semibold hidden md:inline">Type:</span>
            <div className="flex space-x-1">
              {['WG Room', '1-Room Studio (1+0)', '1-Bedroom Flat (1+1 / 1+2)'].map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoomFilter(room)}
                  className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                    selectedRoomFilter === room
                      ? 'bg-bvg-yellow text-bvg-dark shadow'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {room === 'WG Room' ? 'WG' : room === '1-Room Studio (1+0)' ? 'Studio' : '1-Bed Flat'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Leaflet Map & Interactive District Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Leaflet Map Canvas (col-span-2) */}
        <div className="lg:col-span-2 h-[560px] rounded-xl overflow-hidden border border-white/10 relative shadow-inner">
          <MapContainer
            center={[52.5150, 13.4050]}
            zoom={11}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* S41/S42 Ringbahn Landmark Outline */}
            <Polyline
              positions={RINGBAHN_COORDINATES}
              pathOptions={{
                color: '#E30613',
                weight: 3.5,
                dashArray: '6, 6',
                opacity: 0.85
              }}
            >
              <Tooltip sticky direction="center">
                <span className="font-bold text-xs text-red-600">S41/S42 Ringbahn (Zone A Boundary)</span>
              </Tooltip>
            </Polyline>

            {/* Night Metro Lines Overlay */}
            {showNightTransit && NIGHT_TRANSIT_LINES.map((line) => (
              <Polyline
                key={line.id}
                positions={line.coords}
                pathOptions={{
                  color: line.color,
                  weight: 4,
                  opacity: 0.9
                }}
              >
                <Tooltip sticky direction="center">
                  <span className="font-bold text-xs">{line.name}</span>
                </Tooltip>
              </Polyline>
            ))}

            {/* 6 Major Hub Station Markers */}
            {MAJOR_STATIONS.map((st) => (
              <CircleMarker
                key={st.id}
                center={st.coords}
                radius={7}
                pathOptions={{
                  fillColor: '#1e293b',
                  color: '#f59e0b',
                  weight: 3,
                  fillOpacity: 1
                }}
              >
                <Tooltip direction="top" offset={[0, -5]}>
                  <div className="text-xs font-black text-gray-900">
                    🚉 {st.name} ({st.short})
                    <div className="text-[10px] font-normal text-gray-600">{st.role}</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}

            {/* District Circular Markers */}
            {districtMapData.map((d) => {
              const style = getDistrictMarkerStyle(d);

              return (
                <CircleMarker
                  key={d.district_id}
                  center={d.coords}
                  radius={style.radius}
                  pathOptions={style}
                  eventHandlers={{
                    click: () => {
                      setActiveDistrict(d);
                      if (window.innerWidth < 1024) {
                        const el = document.getElementById('district-detail-card');
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                      }
                    },
                  }}
                >
                  <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                    <div className="text-xs font-bold text-gray-900 min-w-[190px]">
                      <div className="flex items-center justify-between border-b pb-1 mb-1">
                        <span className="font-black">{d.district_name}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-gray-100 text-gray-700">
                          {d.inside_ringbahn ? 'Zone A' : 'Zone B'}
                        </span>
                      </div>
                      
                      <div className="text-[10px] text-gray-700 font-normal space-y-1">
                        {/* Top 2 Nearest Stations in Tooltip */}
                        <div className="bg-amber-50 p-1.5 rounded border border-amber-200 text-[10px]">
                          <span className="font-bold text-amber-900 block">🚉 Nearest 2 Major Hubs:</span>
                          <div className="flex items-center justify-between text-gray-800 pt-0.5">
                            <span>1. {d.nearest_hubs[0].name}</span>
                            <strong className="text-amber-700 font-mono">{d.nearest_hubs[0].mins}m</strong>
                          </div>
                          <div className="flex items-center justify-between text-gray-800">
                            <span>2. {d.nearest_hubs[1].name}</span>
                            <strong className="text-amber-700 font-mono">{d.nearest_hubs[1].mins}m</strong>
                          </div>
                        </div>

                        <div className="font-semibold text-gray-900 pt-0.5">
                          {selectedMetric === 'transit' && `To Alex: ${d.transit_to_alex_min}m | To Hbf: ${d.transit_hubs?.hauptbahnhof || 15}m`}
                          {selectedMetric === 'rent' && `${selectedRoomFilter}: €${selectedRoomFilter === 'WG Room' ? d.rent_wg : selectedRoomFilter === '1-Room Studio (1+0)' ? d.rent_studio : d.rent_flat}`}
                          {selectedMetric === 'cuisine' && `Int. Cuisine: %${d.foreign_cuisine_pct}`}
                          {selectedMetric === 'fiber' && `Fiber FTTH: %${d.fiber_internet_pct}`}
                          {selectedMetric === 'coffee' && `Flat White: €${d.flat_white_price_eur.toFixed(2)}`}
                        </div>
                        <div className="text-gray-500">
                          Anmeldung: ~{d.anmeldung_weeks} wks wait ({d.anmeldung_ease}/5 ease)
                        </div>
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Top-Right Floating Control: 24h Transportation Routes Button */}
          <div className="absolute top-3 right-3 z-[1000]">
            <button
              onClick={() => setShowNightTransit(!showNightTransit)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-metro border flex items-center space-x-1.5 shadow-xl backdrop-blur-md cursor-pointer ${
                showNightTransit
                  ? 'bg-blue-600 text-white border-blue-400 shadow-blue-500/20'
                  : 'bg-[#1A1A24]/90 text-gray-200 border-white/20 hover:text-white hover:bg-[#1A1A24] hover:border-bvg-yellow/50'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-blue-400" />
              <span>{showNightTransit ? '24h Routes Active' : '24h Transportation Routes'}</span>
            </button>
          </div>

          {/* Map Overlay Quick Legend */}
          <div className="absolute bottom-3 left-3 bg-bvg-dark/95 backdrop-blur-md border border-white/10 p-2.5 rounded-lg text-xs z-[1000] text-gray-200 shadow-xl">
            <div className="text-[10px] font-bold uppercase text-gray-400 mb-1 flex items-center justify-between">
              <span>{selectedMetric === 'transit' ? 'Transit Speed to Hubs' : '4-Tier Relative Scale'}</span>
              <span className="text-[9px] text-amber-400 font-bold ml-2">
                🚉 6 Main Hubs Pinned
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span className="text-emerald-400 font-medium">
                  {selectedMetric === 'transit' ? '< 12 mins (Ultra Fast)' : selectedMetric === 'fiber' ? 'Top Speed' : selectedMetric === 'rent' ? 'Affordable' : 'Low/Value'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                <span className="text-yellow-400 font-medium">
                  {selectedMetric === 'transit' ? '14-18 mins' : 'Moderate'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
                <span className="text-orange-400 font-medium">
                  {selectedMetric === 'transit' ? '20-24 mins' : 'High'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
                <span className="text-red-400 font-medium">
                  {selectedMetric === 'transit' ? '25+ mins' : 'High / Premium'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* District Detail Card (Right Side) */}
        <div id="district-detail-card" className="bg-bvg-gray/40 border border-white/10 rounded-xl p-5 flex flex-col justify-between space-y-4 scroll-mt-20">
          {activeDistrict ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    activeDistrict.inside_ringbahn 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {activeDistrict.inside_ringbahn ? 'Inside Ringbahn (Zone A)' : 'Outer Ring (Zone B)'}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">Borough: {activeDistrict.borough}</span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">{activeDistrict.district_name}</h3>
                <p className="text-xs text-gray-400">{activeDistrict.district_name}, Berlin</p>

                {/* Vibe Tags Badge Row */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeDistrict.vibe_tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-white/5 border border-white/10 text-bvg-yellow px-2 py-0.5 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 🚉 HIGHLIGHTED: NEAREST 2 STATIONS & COMPLETE 6-HUB TRANSIT TIMES */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 flex items-center space-x-1.5">
                    <Train className="w-4 h-4" />
                    <span>Nearest 2 Major Rail Hubs</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">Direct BVG/S-Bahn</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <div className="bg-bvg-dark/80 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">1st Nearest Hub</div>
                    <div className="text-sm font-black text-white mt-0.5">{activeDistrict.nearest_hubs[0].name}</div>
                    <div className="text-xs font-mono font-bold text-emerald-400">~{activeDistrict.nearest_hubs[0].mins} minutes</div>
                  </div>

                  <div className="bg-bvg-dark/80 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 uppercase font-bold">2nd Nearest Hub</div>
                    <div className="text-sm font-black text-white mt-0.5">{activeDistrict.nearest_hubs[1].name}</div>
                    <div className="text-xs font-mono font-bold text-cyan-400">~{activeDistrict.nearest_hubs[1].mins} minutes</div>
                  </div>
                </div>

                {/* Full 6 Hub Breakdown */}
                <div className="pt-2 border-t border-white/10">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-1.5">
                    Commute to All 6 Major Berlin Hubs:
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-mono">
                    <div className="bg-black/30 p-1 rounded border border-white/5">
                      <span className="text-gray-400 block">Alex:</span>
                      <strong className="text-white">{activeDistrict.transit_hubs?.alexanderplatz || activeDistrict.transit_to_alex_min}m</strong>
                    </div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">
                      <span className="text-gray-400 block">Hbf:</span>
                      <strong className="text-white">{activeDistrict.transit_hubs?.hauptbahnhof || 15}m</strong>
                    </div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">
                      <span className="text-gray-400 block">Ostkreuz:</span>
                      <strong className="text-white">{activeDistrict.transit_hubs?.ostkreuz || 14}m</strong>
                    </div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">
                      <span className="text-gray-400 block">Südkreuz:</span>
                      <strong className="text-white">{activeDistrict.transit_hubs?.suedkreuz || 18}m</strong>
                    </div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">
                      <span className="text-gray-400 block">Gesundbr.:</span>
                      <strong className="text-white">{activeDistrict.transit_hubs?.gesundbrunnen || 18}m</strong>
                    </div>
                    <div className="bg-black/30 p-1 rounded border border-white/5">
                      <span className="text-gray-400 block">Zoo Garten:</span>
                      <strong className="text-white">{activeDistrict.transit_hubs?.zoo_garten || 20}m</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* Flat-Hunting Difficulty & Registration Score Banner */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center justify-between">
                      <span>Rental Competition</span>
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                    </div>
                    <div className="text-sm font-extrabold text-white mt-1">
                      {activeDistrict.hunting_difficulty} / 5
                    </div>
                    <div className="text-[10px] text-amber-400 font-medium">
                      {activeDistrict.hunting_difficulty_label}
                    </div>
                  </div>

                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center justify-between">
                      <span>Anmeldung Wait</span>
                      <FileCheck className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="text-sm font-extrabold text-white mt-1">
                      ~{activeDistrict.anmeldung_weeks} Weeks
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      Ease Score: {activeDistrict.anmeldung_ease}/5
                    </div>
                  </div>
                </div>

                {/* Rent Stats */}
                <div className="bg-bvg-dark/70 p-3 rounded-lg border border-white/5 space-y-1.5">
                  <div className="font-bold text-gray-300 flex items-center justify-between">
                    <span>Average Monthly Rent (All-in)</span>
                    <Home className="w-3.5 h-3.5 text-bvg-yellow" />
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center pt-1 font-mono">
                    <div className="bg-white/5 p-1 rounded">
                      <div className="text-[9px] text-gray-400 uppercase">WG Room</div>
                      <div className="font-bold text-white">€{activeDistrict.rent_wg}</div>
                    </div>
                    <div className="bg-white/5 p-1 rounded">
                      <div className="text-[9px] text-gray-400 uppercase">Studio (1+0)</div>
                      <div className="font-bold text-white">€{activeDistrict.rent_studio}</div>
                    </div>
                    <div className="bg-white/5 p-1 rounded">
                      <div className="text-[9px] text-gray-400 uppercase">1-Bed Flat</div>
                      <div className="font-bold text-white">€{activeDistrict.rent_flat}</div>
                    </div>
                  </div>
                </div>

                {/* Cuisine Metric & Specialties */}
                <div className="bg-bvg-dark/70 p-3 rounded-lg border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Utensils className="w-4 h-4 text-bvg-yellow" />
                      <div>
                        <div className="font-bold text-gray-200">Culinary Profile</div>
                        <div className="text-[10px] text-gray-400">%{activeDistrict.foreign_cuisine_pct} International Dining</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-bvg-yellow font-mono text-right max-w-[150px] truncate">{activeDistrict.primary_cuisine}</span>
                  </div>
                  <div className="text-[11px] bg-white/5 p-2 rounded border border-white/5 space-y-1">
                    <div><span className="text-gray-400 font-semibold">Specialty:</span> <span className="text-white font-medium">{activeDistrict.famous_specialty}</span></div>
                    <div><span className="text-gray-400 font-semibold">Street Hotspot:</span> <span className="text-bvg-yellow font-medium">{activeDistrict.top_street_hotspot}</span></div>
                  </div>
                </div>

                {/* Fiber FTTH & Spätis */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center space-x-1">
                      <Wifi className="w-3 h-3 text-cyan-400" />
                      <span>Fiber FTTH</span>
                    </div>
                    <div className="text-base font-extrabold text-cyan-400 mt-0.5">%{activeDistrict.fiber_internet_pct}</div>
                  </div>

                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center space-x-1">
                      <Store className="w-3 h-3 text-bvg-yellow" />
                      <span>Late Night Spätis</span>
                    </div>
                    <div className="text-base font-extrabold text-white mt-0.5">{activeDistrict.spati_count} Spätis</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-bvg-yellow">
                <Navigation className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-white text-sm">Select a District on the Map</h4>
              <p className="text-xs text-gray-400 max-w-xs leading-relaxed">
                Click any circle marker to view direct commute times to all 6 major Berlin rail hubs (Hbf, Ostkreuz, Alex, Südkreuz, Zoo, Gesundbrunnen) plus rental and vibe stats.
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-500">
            Click markers to pan and inspect district transit matrix.
          </div>
        </div>
      </div>
    </div>
  );
}
