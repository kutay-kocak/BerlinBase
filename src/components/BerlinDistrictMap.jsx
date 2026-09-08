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

// District spatial coordinates (Lat, Lng) for all 22 Berlin districts (12 core + 10 outer)
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
  "Lichtenberg": [52.5150, 13.4980],
  // 10 Outer Districts:
  "Karlshorst": [52.4810, 13.5280],
  "Tempelhof": [52.4640, 13.3850],
  "Alt-Treptow": [52.4920, 13.4520],
  "Weißensee": [52.5550, 13.4680],
  "Rummelsburg": [52.5020, 13.4880],
  "Spandau (Zentrum)": [52.5350, 13.2000],
  "Köpenick (Altstadt)": [52.4450, 13.5750],
  "Reinickendorf (Tegel)": [52.5890, 13.2840],
  "Lichtenrade": [52.3920, 13.3980],
  "Marzahn (Zentrum)": [52.5430, 13.5410]
};

// Precise coordinates of the 6 Major Berlin Transit Hubs
const MAJOR_STATIONS = [
  { id: 'hauptbahnhof', name: 'Berlin Hauptbahnhof', short: 'Hbf', coords: [52.5250, 13.3694], role: 'Central Cross-Rail & ICE Hub' },
  { id: 'alexanderplatz', name: 'Alexanderplatz', short: 'Alex', coords: [52.5219, 13.4132], role: 'East City Center & U/S-Bahn Pulse' },
  { id: 'ostkreuz', name: 'Ostkreuz', short: 'Ostkreuz', coords: [52.5030, 13.4690], role: 'Eastern Ring Junction & Regional Hub' },
  { id: 'suedkreuz', name: 'Südkreuz', short: 'Südkreuz', coords: [52.4754, 13.3653], role: 'Southern Ring Hub & Airport Corridor' },
  { id: 'gesundbrunnen', name: 'Gesundbrunnen', short: 'Gesundbrunnen', coords: [52.5489, 13.3762], role: 'Northern Cross-Rail & Ring Interchange' },
  { id: 'zoo_garten', name: 'Zoologischer Garten', short: 'Zoo', coords: [52.5073, 13.3324], role: 'West City Center & Regional Express' },
  { id: 'spandau', name: 'Berlin-Spandau', short: 'Spandau', coords: [52.5344, 13.1975], role: 'Western High-Speed ICE Gateway' }
];

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

// Key 24h Weekend Night Metro Lines (BVG Nachtnetz)
const NIGHT_TRANSIT_LINES = [
  {
    id: 'U8',
    name: 'U8 Line (Wedding - Alexanderplatz - Kreuzberg - Neukölln)',
    color: '#004F9F',
    coords: [
      [52.5650, 13.3420],
      [52.5560, 13.3610],
      [52.5489, 13.3762],
      [52.5360, 13.4010],
      [52.5290, 13.4015],
      [52.5200, 13.4050],
      [52.5130, 13.4150],
      [52.5010, 13.4180],
      [52.4870, 13.4240],
      [52.4680, 13.4310]
    ]
  },
  {
    id: 'U1',
    name: 'U1/U3 Line (Charlottenburg - Kreuzberg - Warschauer Str.)',
    color: '#7DBA00',
    coords: [
      [52.5010, 13.3320],
      [52.5000, 13.3500],
      [52.4990, 13.3750],
      [52.4990, 13.3880],
      [52.5010, 13.4180],
      [52.5015, 13.4420],
      [52.5050, 13.4500]
    ]
  }
];

// Flat-Hunting Difficulty and Registration Ease Scores for all 22 Districts
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
  "Steglitz": { difficulty: 2, difficultyLabel: "Balanced / Realistic", anmeldungWeeks: 3, anmeldungEase: 5, supermarketDensity: "High" },
  // 10 Outer Districts:
  "Karlshorst": { difficulty: 2, difficultyLabel: "Balanced / Realistic", anmeldungWeeks: 2, anmeldungEase: 5, supermarketDensity: "High" },
  "Tempelhof": { difficulty: 3, difficultyLabel: "Moderate Competition", anmeldungWeeks: 3, anmeldungEase: 4, supermarketDensity: "Very High" },
  "Alt-Treptow": { difficulty: 4, difficultyLabel: "High Competition", anmeldungWeeks: 3, anmeldungEase: 4, supermarketDensity: "High" },
  "Weißensee": { difficulty: 3, difficultyLabel: "Moderate Competition", anmeldungWeeks: 3, anmeldungEase: 4, supermarketDensity: "High" },
  "Rummelsburg": { difficulty: 3, difficultyLabel: "Moderate Competition", anmeldungWeeks: 2, anmeldungEase: 5, supermarketDensity: "Medium" },
  "Spandau (Zentrum)": { difficulty: 2, difficultyLabel: "Accessible / Low Stress", anmeldungWeeks: 2, anmeldungEase: 5, supermarketDensity: "Very High" },
  "Köpenick (Altstadt)": { difficulty: 2, difficultyLabel: "Peaceful / Accessible", anmeldungWeeks: 2, anmeldungEase: 5, supermarketDensity: "High" },
  "Reinickendorf (Tegel)": { difficulty: 2, difficultyLabel: "Affordable / Low Stress", anmeldungWeeks: 2, anmeldungEase: 5, supermarketDensity: "High" },
  "Lichtenrade": { difficulty: 1, difficultyLabel: "Low Competition", anmeldungWeeks: 2, anmeldungEase: 5, supermarketDensity: "High" },
  "Marzahn (Zentrum)": { difficulty: 1, difficultyLabel: "Easiest in Berlin", anmeldungWeeks: 1, anmeldungEase: 5, supermarketDensity: "Very High" }
};

export default function BerlinDistrictMap() {
  // Transportation is now the #1 TOP category!
  const [selectedMetric, setSelectedMetric] = useState('transit');
  const [selectedRoomFilter, setSelectedRoomFilter] = useState('WG Room');
  const [ringFilter, setRingFilter] = useState('all'); // 'all', 'inside', 'outer'
  const [showNightTransit, setShowNightTransit] = useState(false);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const { districts_lifestyle, rentals_by_room } = analyticsData;

  // Build combined dataset mapped with coordinates, scores, vibes, and 6-Station Transit Times
  const allDistrictData = districts_lifestyle.map(d => {
    const coords = DISTRICT_COORDINATES[d.district_name] || [52.52, 13.40];
    const scores = DISTRICT_SCORES[d.district_name] || { difficulty: 3, difficultyLabel: "Moderate", anmeldungWeeks: 4, anmeldungEase: 3, supermarketDensity: "High" };
    const vibeEntry = vibesData[d.district_name] || vibesData[d.district_name.replace('Mitte (Moabit)', 'Moabit')] || { tags: ["Berlin Kiez", "Connected"], spati_density: "High" };

    const wg = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === 'WG Room');
    const studio = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === '1-Room Studio (1+0)');
    const flat = rentals_by_room.find(r => r.district_name === d.district_name && r.room_category === '1-Bedroom Flat (1+1 / 1+2)');

    const rentWg = wg ? Math.round(wg.average_monthly_rent_eur / 10) * 10 : 580;
    const rentStudio = studio ? Math.round(studio.average_monthly_rent_eur / 10) * 10 : 880;
    const rentFlat = flat ? Math.round(flat.average_monthly_rent_eur / 10) * 10 : 1320;
    const roundedCoffee = Math.round(d.flat_white_price_eur * 10) / 10;

    // Transit matrix for the 6 major hubs (+ Spandau)
    const hubs = d.transit_hubs || {
      hauptbahnhof: 16,
      alexanderplatz: d.transit_to_alex_min || 16,
      ostkreuz: 14,
      suedkreuz: 18,
      gesundbrunnen: 18,
      zoo_garten: 20,
      spandau: 28
    };

    // Calculate nearest 2 major stations based on transit minutes
    const hubEntries = [
      { id: 'hauptbahnhof', name: 'Hauptbahnhof (Hbf)', mins: hubs.hauptbahnhof || 15 },
      { id: 'alexanderplatz', name: 'Alexanderplatz', mins: hubs.alexanderplatz || d.transit_to_alex_min || 16 },
      { id: 'ostkreuz', name: 'Ostkreuz', mins: hubs.ostkreuz || 14 },
      { id: 'suedkreuz', name: 'Südkreuz', mins: hubs.suedkreuz || 18 },
      { id: 'gesundbrunnen', name: 'Gesundbrunnen', mins: hubs.gesundbrunnen || 18 },
      { id: 'zoo_garten', name: 'Zoologischer Garten (Zoo)', mins: hubs.zoo_garten || 20 },
      { id: 'spandau', name: 'Berlin-Spandau', mins: hubs.spandau || 28 }
    ].sort((a, b) => a.mins - b.mins);

    const nearestHubs = [hubEntries[0], hubEntries[1]];

    return {
      ...d,
      coords,
      rent_wg: rentWg,
      rent_studio: rentStudio,
      rent_flat: rentFlat,
      flat_white_price_eur: roundedCoffee,
      hunting_difficulty: scores.difficulty,
      hunting_difficulty_label: scores.difficultyLabel,
      anmeldung_weeks: scores.anmeldungWeeks,
      anmeldung_ease: scores.anmeldungEase,
      supermarket_density: scores.supermarketDensity,
      vibe_tags: vibeEntry.tags || ["Vibrant Kiez", "Well Connected"],
      transit_hubs: hubs,
      nearest_hubs: nearestHubs
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

    if (selectedMetric === 'transit') {
      // Transit to Hubs (6 min - 32 min)
      // Green = Ultra Fast (<14 min), Yellow = Fast (14-19 min), Orange = Moderate (20-25 min), Red = Outer (>25 min)
      const t = item.transit_to_alex_min;
      radius = 14 + ((35 - Math.min(35, t)) / 25) * 16;
      if (t <= 12) {
        fillColor = '#10b981'; // Green: Mitte, Friedrichshain, Alt-Treptow
      } else if (t <= 18) {
        fillColor = '#eab308'; // Yellow: Kreuzberg, Prenzlauer Berg, Karlshorst, Tempelhof, Rummelsburg
      } else if (t <= 24) {
        fillColor = '#ea580c'; // Orange: Charlottenburg, Wedding, Moabit, Weißensee, Köpenick, Spandau
      } else {
        fillColor = '#dc2626'; // Red: Steglitz, Pankow, Reinickendorf, Lichtenrade, Marzahn
      }
    } else if (selectedMetric === 'rent') {
      // Rent scale
      const r = selectedRoomFilter === 'WG Room' ? item.rent_wg : selectedRoomFilter === '1-Room Studio (1+0)' ? item.rent_studio : item.rent_flat;
      const minR = selectedRoomFilter === 'WG Room' ? 460 : selectedRoomFilter === '1-Room Studio (1+0)' ? 710 : 1020;
      const maxR = selectedRoomFilter === 'WG Room' ? 740 : selectedRoomFilter === '1-Room Studio (1+0)' ? 1120 : 1670;
      radius = 14 + ((r - minR) / (maxR - minR || 1)) * 16;
      
      if (selectedRoomFilter === 'WG Room') {
        if (r >= 680) fillColor = '#dc2626';
        else if (r >= 600) fillColor = '#ea580c';
        else if (r >= 520) fillColor = '#eab308';
        else fillColor = '#10b981';
      } else if (selectedRoomFilter === '1-Room Studio (1+0)') {
        if (r >= 1000) fillColor = '#dc2626';
        else if (r >= 900) fillColor = '#ea580c';
        else if (r >= 800) fillColor = '#eab308';
        else fillColor = '#10b981';
      } else {
        if (r >= 1500) fillColor = '#dc2626';
        else if (r >= 1350) fillColor = '#ea580c';
        else if (r >= 1200) fillColor = '#eab308';
        else fillColor = '#10b981';
      }
    } else if (selectedMetric === 'cuisine') {
      const ratio = item.foreign_cuisine_pct;
      radius = 14 + ((ratio - 30) / 50) * 16;
      if (ratio >= 65) fillColor = '#dc2626';
      else if (ratio >= 50) fillColor = '#ea580c';
      else if (ratio >= 40) fillColor = '#eab308';
      else fillColor = '#10b981';
    } else if (selectedMetric === 'fiber') {
      const fib = item.fiber_internet_pct;
      radius = 14 + ((fib - 35) / 35) * 16;
      if (fib >= 60) fillColor = '#10b981';
      else if (fib >= 50) fillColor = '#eab308';
      else if (fib >= 44) fillColor = '#ea580c';
      else fillColor = '#dc2626';
    } else if (selectedMetric === 'coffee') {
      const c = item.flat_white_price_eur;
      radius = 14 + ((c - 3.10) / 1.40) * 16;
      if (c >= 4.30) fillColor = '#dc2626';
      else if (c >= 3.90) fillColor = '#ea580c';
      else if (c >= 3.50) fillColor = '#eab308';
      else fillColor = '#10b981';
    }

    return {
      fillColor,
      color: borderColor,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.85,
      radius: Math.max(12, Math.min(30, radius))
    };
  };

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Top Header & Slicers */}
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
          <p className="text-xs text-gray-400 mt-1">
            Now covers 10 fast-transit outer districts (Karlshorst, Tempelhof, Alt-Treptow, Weißensee, Spandau & more).
          </p>
        </div>

        {/* 5 Master Categories (Transportation prominently FIRST!) */}
        <div className="flex flex-wrap gap-2">
          {/* 1. TRANSPORTATION FIRST! */}
          <button
            onClick={() => setSelectedMetric('transit')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-metro ${
              selectedMetric === 'transit'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Train className="w-3.5 h-3.5 text-blue-400" />
            <span>1. Transportation & Hubs</span>
          </button>

          {/* 2. RENT LEVEL */}
          <button
            onClick={() => setSelectedMetric('rent')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-metro ${
              selectedMetric === 'rent'
                ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/50'
                : 'bg-bvg-gray text-gray-300 hover:text-white'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>2. Rent Level</span>
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
      </div>

      {/* Sub-slicers: Rent Filter & Ringbahn Zone Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bvg-gray/40 px-4 py-2.5 rounded-xl border border-white/10">
        {/* Ringbahn Zone Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-300 font-semibold flex items-center space-x-1.5">
            <Compass className="w-3.5 h-3.5 text-bvg-yellow" />
            <span>Filter by Ring:</span>
          </span>
          <div className="flex space-x-1.5">
            <button
              onClick={() => setRingFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'all'
                  ? 'bg-bvg-yellow text-bvg-dark'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              All (22 Kieze)
            </button>
            <button
              onClick={() => setRingFilter('inside')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'inside'
                  ? 'bg-bvg-yellow text-bvg-dark'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Inside Ring (Zone A)
            </button>
            <button
              onClick={() => setRingFilter('outer')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-metro ${
                ringFilter === 'outer'
                  ? 'bg-bvg-yellow text-bvg-dark'
                  : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              Outer Ring (Zone B: Karlshorst, Spandau...)
            </button>
          </div>
        </div>

        {/* Room Category Sub-Filter (when Rent metric is active) */}
        {selectedMetric === 'rent' ? (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-300 font-semibold">Room Type:</span>
            <div className="flex space-x-1.5">
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
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowNightTransit(!showNightTransit)}
              className={`text-xs px-3 py-1 rounded-md font-bold transition-metro border flex items-center space-x-1.5 cursor-pointer ${
                showNightTransit
                  ? 'bg-blue-600 text-white border-blue-400 shadow'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              <Train className="w-3 h-3" />
              <span>{showNightTransit ? '24h U-Bahn Overlay ON' : 'Show 24h Transit Overlay'}</span>
            </button>
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
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
              const style = getMarkerStyle(d);

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
