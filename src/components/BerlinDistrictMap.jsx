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
  Utensils, 
  Home, 
  Wifi, 
  Coffee, 
  Clock, 
  ShieldCheck, 
  Store, 
  Info,
  Navigation,
  Layers,
  Sparkles,
  Train,
  CheckCircle,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import analyticsData from '../data/berlinbase_master_analytics.json';
import vibesData from '../data/vibes.json';

// District spatial coordinates (Lat, Lng) centered on each Berlin district
const DISTRICT_COORDINATES = {
  "Mitte": [52.5200, 13.4050],
  "Friedrichshain": [52.5135, 13.4540],
  "Kreuzberg": [52.4990, 13.4020],
  "Prenzlauer Berg": [52.5400, 13.4200],
  "Charlottenburg": [52.5160, 13.3050],
  "Schöneberg": [52.4850, 13.3550],
  "Mitte (Moabit)": [52.5320, 13.3370],
  "Neukölln": [52.4780, 13.4420],
  "Wedding": [52.5490, 13.3650],
  "Pankow": [52.5700, 13.4050],
  "Steglitz": [52.4550, 13.3200],
  "Lichtenberg": [52.5150, 13.4980]
};

// S41/S42 Berlin Ringbahn precise coordinate polygon loop (Zone A boundary)
const RINGBAHN_COORDINATES = [
  [52.5489, 13.3762], // S+U Gesundbrunnen (North)
  [52.5444, 13.4147], // S Schönhauser Allee
  [52.5434, 13.4300], // S Prenzlauer Allee
  [52.5360, 13.4550], // S Greifswalder Str.
  [52.5225, 13.4688], // S Landsberger Allee
  [52.5115, 13.4735], // S Storkower Str.
  [52.5030, 13.4690], // S Ostkreuz (East)
  [52.4900, 13.4640], // S Treptower Park
  [52.4760, 13.4420], // S Sonnenallee
  [52.4690, 13.4310], // S+U Neukölln (South)
  [52.4680, 13.4050], // S+U Hermannstraße
  [52.4720, 13.3680], // S+U Tempelhof
  [52.4780, 13.3450], // S Südkreuz
  [52.4820, 13.3320], // S Schöneberg
  [52.4880, 13.3200], // S+U Innsbrucker Platz
  [52.4900, 13.3050], // S+U Bundesplatz
  [52.4920, 13.2950], // S Heidelberger Platz
  [52.5010, 13.2820], // S Westkreuz (West)
  [52.5110, 13.2840], // S Messe Nord / ICC
  [52.5250, 13.2880], // S Westend
  [52.5350, 13.2980], // S+U Jungfernheide
  [52.5370, 13.3200], // S Beusselstraße
  [52.5360, 13.3480], // S+U Westhafen
  [52.5370, 13.3620], // S+U Wedding
  [52.5489, 13.3762]  // Back to Gesundbrunnen (Loop closed)
];

// Key 24h Weekend Night Metro Lines (BVG Nachtnetz: U8 Party Line & U1/U2 Cross-City Artery)
const NIGHT_TRANSIT_LINES = [
  {
    id: 'U8',
    name: 'U8 Line (Wedding - Alexanderplatz - Kreuzberg - Neukölln)',
    color: '#004F9F', // BVG Dark Blue
    coords: [
      [52.5650, 13.3420], // Wittenau
      [52.5560, 13.3610], // Osloer Str.
      [52.5489, 13.3762], // Gesundbrunnen
      [52.5360, 13.4010], // Bernauer Str.
      [52.5290, 13.4015], // Rosenthaler Platz
      [52.5200, 13.4050], // Alexanderplatz
      [52.5130, 13.4150], // Jannowitzbrücke
      [52.5010, 13.4180], // Kottbusser Tor (Kreuzberg)
      [52.4870, 13.4240], // Hermannplatz
      [52.4680, 13.4310]  // Hermannstraße (Neukölln)
    ]
  },
  {
    id: 'U1',
    name: 'U1/U3 Line (Charlottenburg - Kreuzberg - Warschauer Str.)',
    color: '#7DBA00', // BVG Green
    coords: [
      [52.5010, 13.3320], // Kurfürstendamm
      [52.5000, 13.3500], // Wittenbergplatz
      [52.4990, 13.3750], // Gleisdreieck
      [52.4990, 13.3880], // Möckernbrücke
      [52.5010, 13.4180], // Kottbusser Tor
      [52.5015, 13.4420], // Schlesisches Tor
      [52.5050, 13.4500]  // Warschauer Str. (RAW / Clubs)
    ]
  }
];

// District Flat-Hunting Difficulty and Anmeldung Ease Index (Master Plan Day 9)
const DISTRICT_SCORES = {
  "Mitte": { difficulty: 5, difficultyLabel: "Extreme Competition", anmeldungWeeks: 5, anmeldungEase: 2, supermarketDensity: "Very High" },
  "Friedrichshain": { difficulty: 5, difficultyLabel: "Extreme Competition", anmeldungWeeks: 6, anmeldungEase: 2, supermarketDensity: "Very High" },
  "Kreuzberg": { difficulty: 5, difficultyLabel: "Extreme Competition", anmeldungWeeks: 6, anmeldungEase: 2, supermarketDensity: "Very High" },
  "Prenzlauer Berg": { difficulty: 5, difficultyLabel: "Extreme Competition", anmeldungWeeks: 4, anmeldungEase: 3, supermarketDensity: "High" },
  "Neukölln": { difficulty: 4, difficultyLabel: "High Competition", anmeldungWeeks: 7, anmeldungEase: 2, supermarketDensity: "Very High" },
  "Charlottenburg": { difficulty: 4, difficultyLabel: "High Competition", anmeldungWeeks: 4, anmeldungEase: 4, supermarketDensity: "High" },
  "Schöneberg": { difficulty: 4, difficultyLabel: "High Competition", anmeldungWeeks: 4, anmeldungEase: 4, supermarketDensity: "High" },
  "Mitte (Moabit)": { difficulty: 3, difficultyLabel: "Moderate Competition", anmeldungWeeks: 5, anmeldungEase: 3, supermarketDensity: "High" },
  "Wedding": { difficulty: 3, difficultyLabel: "Moderate Competition", anmeldungWeeks: 5, anmeldungEase: 4, supermarketDensity: "High" },
  "Pankow": { difficulty: 2, difficultyLabel: "Balanced / Realistic", anmeldungWeeks: 3, anmeldungEase: 5, supermarketDensity: "Medium" },
  "Lichtenberg": { difficulty: 2, difficultyLabel: "Balanced / Realistic", anmeldungWeeks: 3, anmeldungEase: 5, supermarketDensity: "High" },
  "Steglitz": { difficulty: 2, difficultyLabel: "Balanced / Realistic", anmeldungWeeks: 3, anmeldungEase: 5, supermarketDensity: "High" }
};

export default function BerlinDistrictMap() {
  const [selectedMetric, setSelectedMetric] = useState('cuisine');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState('WG Room');
  const [ringFilter, setRingFilter] = useState('all'); // 'all', 'inside', 'outer'
  const [showNightTransit, setShowNightTransit] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const { districts_lifestyle, rentals_by_room } = analyticsData;

  // Build combined dataset mapped with coordinates, scores, and vibes
  const allDistrictData = districts_lifestyle.map(d => {
    const coords = DISTRICT_COORDINATES[d.district_name] || [52.52, 13.40];
    const scores = DISTRICT_SCORES[d.district_name] || { difficulty: 3, difficultyLabel: "Moderate", anmeldungWeeks: 4, anmeldungEase: 3, supermarketDensity: "High" };
    
    // Look up vibes by district key (checking Moabit as fallback)
    const vibeEntry = vibesData[d.district_name] || vibesData[d.district_name.replace('Mitte (Moabit)', 'Moabit')] || { tags: ["Berlin Kiez", "Connected"], spati_density: "High" };
    
    // Find rentals for this district
    const wg = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === 'WG Room');
    const studio = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === '1-Room Studio (1+0)');
    const flat = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === '1-Bedroom Flat (1+1 / 1+2)');

    return {
      ...d,
      coords,
      rent_wg: wg ? wg.average_monthly_rent_eur : 650,
      rent_studio: studio ? studio.average_monthly_rent_eur : 950,
      rent_flat: flat ? flat.average_monthly_rent_eur : 1450,
      hunting_difficulty: scores.difficulty,
      hunting_difficulty_label: scores.difficultyLabel,
      anmeldung_weeks: scores.anmeldungWeeks,
      anmeldung_ease: scores.anmeldungEase,
      supermarket_density: scores.supermarketDensity,
      vibe_tags: vibeEntry.tags || ["Vibrant Kiez", "Well Connected"]
    };
  });

  // Apply Zone A (Inside Ringbahn) / Zone B (Outer Ring) filter
  const districtMapData = allDistrictData.filter(d => {
    if (ringFilter === 'inside') return d.inside_ringbahn;
    if (ringFilter === 'outer') return !d.inside_ringbahn;
    return true;
  });

  // Dynamic visual styling helper with distinct 4-tier relative scales (Green, Yellow, Orange, Red)
  const getMarkerStyle = (item) => {
    let radius = 18;
    let fillColor = '#F0D722';
    let borderColor = '#ffffff';

    if (selectedMetric === 'cuisine') {
      // International cuisine share % (32% min - 78% max)
      // Higher share = deeper/darker, lower share = lighter green/amber
      // Scale: >= 72% Deep Amber Red (#dc2626), 62-71% Warm Orange (#f97316), 50-61% Yellow (#eab308), < 50% Green (#10b981)
      const ratio = item.foreign_cuisine_pct;
      radius = 14 + ((ratio - 30) / 50) * 16;
      if (ratio >= 72) {
        fillColor = '#dc2626'; // Deep Red - Highest International concentration (Neukölln, Kreuzberg, Friedrichshain)
      } else if (ratio >= 62) {
        fillColor = '#ea580c'; // Vibrant Orange (Mitte, Moabit, Wedding, Charlottenburg)
      } else if (ratio >= 48) {
        fillColor = '#eab308'; // Balanced Yellow (Prenzlauer Berg, Schöneberg, Lichtenberg)
      } else {
        fillColor = '#10b981'; // Green - Traditional German cuisine dominant (Pankow, Steglitz)
      }
    } else if (selectedMetric === 'rent') {
      // Category-specific relative tiering:
      // Green = Most affordable (Bottom quartile)
      // Yellow = Moderate / Fair (Second quartile)
      // Orange = Above average (Third quartile)
      // Red = Highest rent tier (Top quartile)
      if (selectedRoomFilter === 'WG Room') {
        const r = item.rent_wg; // Range: 522€ - 744€
        radius = 14 + ((r - 520) / 230) * 16;
        if (r >= 710) fillColor = '#dc2626';       // Top: Mitte (744), Kreuzberg (717)
        else if (r >= 660) fillColor = '#ea580c';  // High: Friedrichshain (708), P.Berg (689), Charlottenburg (660)
        else if (r >= 600) fillColor = '#eab308';  // Moderate: Schöneberg (644), Neukölln (636), Moabit (608)
        else fillColor = '#10b981';                // Best Value: Wedding (561), Pankow (567), Steglitz (554), Lichtenberg (522)
      } else if (selectedRoomFilter === '1-Room Studio (1+0)') {
        const r = item.rent_studio; // Range: 807€ - 1125€
        radius = 14 + ((r - 800) / 330) * 16;
        if (r >= 1040) fillColor = '#dc2626';      // Top: Mitte (1125), Friedrichshain (1043), Kreuzberg (1041)
        else if (r >= 980) fillColor = '#ea580c';  // High: Prenzlauer Berg (1014), Charlottenburg (987)
        else if (r >= 900) fillColor = '#eab308';  // Moderate: Schöneberg (966), Neukölln (950), Moabit (935)
        else fillColor = '#10b981';                // Best Value: Pankow (897), Steglitz (884), Wedding (851), Lichtenberg (807)
      } else {
        const r = item.rent_flat; // Range: 1155€ - 1669€
        radius = 14 + ((r - 1150) / 520) * 16;
        if (r >= 1550) fillColor = '#dc2626';      // Top: Mitte (1669), Prenzlauer Berg (1575), Friedrichshain (1554)
        else if (r >= 1450) fillColor = '#ea580c'; // High: Kreuzberg (1542), Charlottenburg (1501)
        else if (r >= 1350) fillColor = '#eab308'; // Moderate: Schöneberg (1423), Neukölln (1376), Moabit (1370)
        else fillColor = '#10b981';                // Best Value: Steglitz (1280), Pankow (1278), Wedding (1253), Lichtenberg (1155)
      }
    } else if (selectedMetric === 'fiber') {
      // Fiber FTTH % (36% - 68%)
      // Exactly matches bottom 4-tier palette:
      // Green = Top Speed (60%+)
      // Yellow = High Speed (50-59%)
      // Orange = Moderate Speed (44-49%)
      // Red = Low Speed (<44%)
      const fib = item.fiber_internet_pct;
      radius = 14 + ((fib - 35) / 35) * 16;
      if (fib >= 60) {
        fillColor = '#10b981'; // Top Speed (Mitte %68, Friedrichshain %62)
      } else if (fib >= 50) {
        fillColor = '#eab308'; // High Speed (Kreuzberg %58, Lichtenberg %55, Prenzlauer Berg %54, Neukölln %51)
      } else if (fib >= 44) {
        fillColor = '#ea580c'; // Moderate Speed (Pankow %49, Schöneberg %46, Wedding %45)
      } else {
        fillColor = '#dc2626'; // Low Speed (Mitte (Moabit) %42, Charlottenburg %38, Steglitz %36)
      }
    } else if (selectedMetric === 'coffee') {
      // Flat White Price (€3.20 - €4.50)
      // Red = Most Expensive (Specialty Roasteries), Green = Most Affordable
      const c = item.flat_white_price_eur;
      radius = 14 + ((c - 3.20) / 1.30) * 16;
      if (c >= 4.40) {
        fillColor = '#dc2626'; // High-end specialty (€4.50 Mitte, €4.40 Prenzlauer Berg)
      } else if (c >= 4.10) {
        fillColor = '#ea580c'; // Third-wave hotspot (€4.30 Friedrichshain, €4.20 Kreuzberg, Charlottenburg)
      } else if (c >= 3.60) {
        fillColor = '#eab308'; // City average (€3.90 Schöneberg, €3.80 Neukölln, Pankow, €3.70 Steglitz, €3.60 Moabit)
      } else {
        fillColor = '#10b981'; // Budget friendly (€3.40 Lichtenberg, €3.20 Wedding)
      }
    } else if (selectedMetric === 'transit') {
      // Transit latency to Alexanderplatz
      // Green = Super fast (<=10m), Yellow = Quick (11-18m), Orange = Moderate (19-24m), Red = Furthest (25m+)
      const t = item.transit_to_alex_min;
      radius = Math.max(14, 28 - (t * 0.45));
      if (t <= 10) {
        fillColor = '#10b981'; // Mitte (6m), Friedrichshain (10m)
      } else if (t <= 18) {
        fillColor = '#eab308'; // P.Berg (12m), Kreuzberg (14m), Wedding (16m), Neukölln (18m), Moabit (18m)
      } else if (t <= 24) {
        fillColor = '#ea580c'; // Schöneberg (19m), Charlottenburg (22m), Lichtenberg (24m)
      } else {
        fillColor = '#dc2626'; // Pankow (25m), Steglitz (32m)
      }
    }

    return {
      radius: Math.round(radius),
      fillColor,
      color: borderColor,
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.88
    };
  };

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-bvg-yellow text-bvg-dark font-black text-sm flex items-center justify-center shadow-md">
              <Navigation className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-black text-white tracking-tight">
              Interactive Berlin Geo-Intelligence Map
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Explore 12 Berlin districts across PostgreSQL metrics: international cuisine, real rent, fiber internet, and transportation times.
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedMetric('cuisine')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'cuisine'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>International Cuisine %</span>
          </button>

          <button
            onClick={() => setSelectedMetric('rent')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'rent'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Rent Level</span>
          </button>

          <button
            onClick={() => setSelectedMetric('transit')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'transit'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Transit to Alex</span>
          </button>

          <button
            onClick={() => setSelectedMetric('fiber')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'fiber'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Fiber Internet</span>
          </button>

          <button
            onClick={() => setSelectedMetric('coffee')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'coffee'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Flat White €</span>
          </button>
        </div>
      </div>

      {/* Sub-slicers: Rent Filter & Ringbahn Zone Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bvg-gray/40 px-4 py-2.5 rounded-xl border border-white/10">
        {/* Ringbahn Zone Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-300 font-semibold flex items-center space-x-1.5">
            <Train className="w-3.5 h-3.5 text-bvg-yellow" />
            <span>Zone Filter:</span>
          </span>
          <div className="flex space-x-1.5">
            <button
              onClick={() => setRingFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'all'
                  ? 'bg-bvg-yellow text-bvg-dark'
                  : 'bg-bvg-dark text-gray-300 hover:text-white'
              }`}
            >
              All Berlin (12)
            </button>
            <button
              onClick={() => setRingFilter('inside')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro flex items-center space-x-1 ${
                ringFilter === 'inside'
                  ? 'bg-emerald-500 text-bvg-dark'
                  : 'bg-bvg-dark text-gray-300 hover:text-white'
              }`}
            >
              <span>Inside Ringbahn (Zone A)</span>
            </button>
            <button
              onClick={() => setRingFilter('outer')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'outer'
                  ? 'bg-bvg-yellow text-bvg-dark'
                  : 'bg-bvg-dark text-gray-300 hover:text-white'
              }`}
            >
              Outer Ring (Zone B)
            </button>
          </div>
        </div>

        {/* 24h Weekend Night Metro Layer Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowNightTransit(!showNightTransit)}
            className={`text-xs px-3 py-1.5 rounded-lg font-extrabold transition-metro flex items-center space-x-1.5 border ${
              showNightTransit
                ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                : 'bg-bvg-dark/80 text-gray-300 border-white/10 hover:border-blue-400/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span>24h Night Metro (U-Bahn)</span>
          </button>
        </div>

        {/* Housing Metric Filter if Rent selected */}
        {selectedMetric === 'rent' && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300 font-semibold flex items-center space-x-1.5">
              <Layers className="w-3.5 h-3.5 text-bvg-yellow" />
              <span>Housing Type:</span>
            </span>
            <div className="flex space-x-1.5">
              {['WG Room', '1-Room Studio (1+0)', '1-Bedroom Flat (1+1 / 1+2)'].map((room) => (
                <button
                  key={room}
                  onClick={() => setSelectedRoomFilter(room)}
                  className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                    selectedRoomFilter === room
                      ? 'bg-bvg-yellow text-bvg-dark'
                      : 'bg-bvg-dark text-gray-300 hover:text-white'
                  }`}
                >
                  {room}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Map + Detail Side Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leaflet Map Container */}
        <div className="lg:col-span-2 h-[500px] rounded-xl overflow-hidden border border-white/10 relative shadow-inner z-10">
          <MapContainer
            center={[52.518, 13.405]}
            zoom={11}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%', background: '#121218' }}
          >
            {/* Pristine Clean Street TileLayer without watermark */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* S41/S42 Ringbahn Official Loop Highlight */}
            <Polyline
              positions={RINGBAHN_COORDINATES}
              pathOptions={{
                color: '#F0D722',
                weight: 3.5,
                opacity: 0.9,
                dashArray: '8, 8',
                lineCap: 'round',
                lineJoin: 'round'
              }}
            >
              <Tooltip permanent={false} direction="center" offset={[0, 0]}>
                <div className="text-xs font-bold text-gray-900">
                  S41 / S42 Ringbahn (Zone A Boundary)
                </div>
              </Tooltip>
            </Polyline>

            {/* 24h Night Metro Lines (U8 & U1) */}
            {showNightTransit && NIGHT_TRANSIT_LINES.map((line) => (
              <Polyline
                key={line.id}
                positions={line.coords}
                pathOptions={{
                  color: line.color,
                  weight: 4,
                  opacity: 0.95
                }}
              >
                <Tooltip permanent={false} direction="center">
                  <div className="text-xs font-bold text-gray-900">
                    {line.name} (24h Weekend Service)
                  </div>
                </Tooltip>
              </Polyline>
            ))}

            {districtMapData.map((d) => {
              const style = getMarkerStyle(d);

              return (
                <CircleMarker
                  key={d.district_id}
                  center={d.coords}
                  radius={style.radius}
                  pathOptions={style}
                  eventHandlers={{
                    click: () => setActiveDistrict(d),
                  }}
                >
                  <Tooltip permanent={false} direction="top" offset={[0, -10]}>
                    <div className="text-xs font-bold text-gray-900 min-w-[160px]">
                      <div className="flex items-center justify-between border-b pb-1 mb-1">
                        <span>{d.district_name}</span>
                        <span className="text-[9px] font-mono px-1 rounded bg-gray-100 text-gray-700">
                          {d.inside_ringbahn ? 'Zone A' : 'Zone B'}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-700 font-normal space-y-0.5">
                        <div className="font-semibold text-gray-900">
                          {selectedMetric === 'cuisine' && `Int. Cuisine: %${d.foreign_cuisine_pct}`}
                          {selectedMetric === 'rent' && `${selectedRoomFilter}: €${selectedRoomFilter === 'WG Room' ? d.rent_wg : selectedRoomFilter === '1-Room Studio (1+0)' ? d.rent_studio : d.rent_flat}`}
                          {selectedMetric === 'transit' && `Alex Transit: ${d.transit_to_alex_min} min`}
                          {selectedMetric === 'fiber' && `Fiber FTTH: %${d.fiber_internet_pct}`}
                          {selectedMetric === 'coffee' && `Flat White: €${d.flat_white_price_eur.toFixed(2)}`}
                        </div>
                        <div className="text-gray-500">
                          Competition: <strong>{d.hunting_difficulty}/5</strong> ({d.hunting_difficulty_label})
                        </div>
                        <div className="text-gray-500">
                          Anmeldung: ~{d.anmeldung_weeks} wks wait
                        </div>
                      </div>
                    </div>
                  </Tooltip>

                  <Popup>
                    <div className="text-xs p-1 text-gray-900 font-sans">
                      <div className="font-extrabold text-sm border-b pb-1 mb-1 text-gray-900 flex items-center justify-between">
                        <span>{d.district_name}</span>
                        <span className="text-[10px] font-mono text-gray-500">{d.inside_ringbahn ? 'Ringbahn Zone A' : 'Outer Zone B'}</span>
                      </div>
                      <div className="space-y-1">
                        <div><strong>Top Cuisine:</strong> {d.primary_cuisine}</div>
                        <div><strong>Famous Specialty:</strong> {d.famous_specialty}</div>
                        <div><strong>Competition Score:</strong> {d.hunting_difficulty} / 5 ({d.hunting_difficulty_label})</div>
                        <div><strong>Anmeldung Wait:</strong> ~{d.anmeldung_weeks} weeks</div>
                        <div className="border-t pt-1 mt-1 text-[11px]">
                          <strong>WG:</strong> €{d.rent_wg} | <strong>Flat:</strong> €{d.rent_flat} | <strong>Fiber:</strong> %{d.fiber_internet_pct}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          {/* Map Overlay Quick Legend with dynamic scale explanation */}
          <div className="absolute bottom-3 left-3 bg-bvg-dark/95 backdrop-blur-md border border-white/10 p-2.5 rounded-lg text-xs z-[1000] text-gray-200 shadow-xl">
            <div className="text-[10px] font-bold uppercase text-gray-400 mb-1 flex items-center justify-between">
              <span>Dynamic 4-Tier Relative Scale</span>
              <span className="text-[9px] text-bvg-yellow font-normal">
                {showNightTransit ? 'S41/S42 + 24h U-Bahn Active' : 'S41/S42 Ring Highlighted'}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span className="text-emerald-400 font-medium">
                  {selectedMetric === 'fiber' ? 'Top Speed' : selectedMetric === 'rent' ? 'Affordable' : selectedMetric === 'cuisine' ? 'German Heritage' : selectedMetric === 'transit' ? 'Ultra Fast' : 'Best Value'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></span>
                <span className="text-yellow-400 font-medium">
                  {selectedMetric === 'fiber' ? 'High Speed' : 'Moderate'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
                <span className="text-orange-400 font-medium">
                  {selectedMetric === 'fiber' ? 'Moderate Speed' : 'High'}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]"></span>
                <span className="text-red-400 font-medium">
                  {selectedMetric === 'fiber' ? 'Low Speed' : selectedMetric === 'rent' ? 'Premium Rent' : selectedMetric === 'cuisine' ? 'Highest Int. Share' : selectedMetric === 'transit' ? 'Furthest' : 'Highest Price'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* District Detail Card */}
        <div className="bg-bvg-gray/40 border border-white/10 rounded-xl p-5 flex flex-col justify-between space-y-4">
          {activeDistrict ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    activeDistrict.inside_ringbahn 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {activeDistrict.inside_ringbahn ? 'Inside Ringbahn (Zone A)' : 'Outer Ring (Zone B)'}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">ID: {activeDistrict.district_id}</span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">{activeDistrict.district_name}</h3>
                <p className="text-xs text-gray-400">{activeDistrict.borough} District</p>

                {/* Vibe Tags Badge Row */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeDistrict.vibe_tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] bg-white/5 border border-white/10 text-bvg-yellow px-2 py-0.5 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))}
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
                        <div className="text-[10px] text-gray-400">%{activeDistrict.foreign_cuisine_pct} International Dining Share</div>
                      </div>
                    </div>
                    <span className="text-sm font-extrabold text-bvg-yellow font-mono">{activeDistrict.primary_cuisine}</span>
                  </div>
                  <div className="text-[11px] bg-white/5 p-2 rounded border border-white/5 space-y-1">
                    <div><span className="text-gray-400 font-semibold">Famous For:</span> <span className="text-white font-medium">{activeDistrict.famous_specialty}</span></div>
                    <div><span className="text-gray-400 font-semibold">Street Hotspot:</span> <span className="text-bvg-yellow font-medium">{activeDistrict.top_street_hotspot}</span></div>
                  </div>
                </div>

                {/* Transit & Fiber */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>To Alexanderplatz</span>
                    </div>
                    <div className="text-base font-extrabold text-white mt-0.5">{activeDistrict.transit_to_alex_min} mins</div>
                  </div>

                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center space-x-1">
                      <Wifi className="w-3 h-3 text-cyan-400" />
                      <span>Fiber FTTH</span>
                    </div>
                    <div className="text-base font-extrabold text-cyan-400 mt-0.5">%{activeDistrict.fiber_internet_pct}</div>
                  </div>
                </div>

                {/* Supermarket Density & Späti */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-bvg-dark/70 p-2.5 rounded-lg border border-white/5">
                    <div className="text-[10px] text-gray-400 flex items-center space-x-1">
                      <Store className="w-3 h-3 text-emerald-400" />
                      <span>Supermarkets</span>
                    </div>
                    <div className="text-sm font-extrabold text-white mt-0.5">{activeDistrict.supermarket_density} Density</div>
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
                Click any circle marker on the map to inspect in-depth dining, rental tiers, Bürgeramt wait, and infrastructure stats.
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-white/5 text-[10px] text-gray-500">
            Click markers to pan and inspect district profile.
          </div>
        </div>
      </div>
    </div>
  );
}
