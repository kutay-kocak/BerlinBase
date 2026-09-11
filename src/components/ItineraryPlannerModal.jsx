import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Compass, 
  Sparkles, 
  Check, 
  ExternalLink, 
  ArrowUp, 
  ArrowDown, 
  AlertTriangle, 
  X, 
  ShieldCheck, 
  Coffee, 
  Utensils, 
  Music, 
  Beer, 
  Ship, 
  Landmark, 
  Layers,
  RefreshCw,
  List,
  Navigation,
  CloudRain,
  Sun,
  Coins,
  Gem,
  Download,
  CalendarPlus,
  FileText,
  Share2
} from 'lucide-react';

import { BERLIN_EVENTS, DISTRICT_CLUSTERS } from '../data/itinerary/itineraryCatalog';
import { 
  generateItineraryPlan, 
  substituteItineraryStop, 
  exportItineraryToICS, 
  exportItineraryToPDF 
} from '../utils/itineraryEngine';

export default function ItineraryPlannerModal({ isOpen, onClose, onApplyToChat }) {
  const today = new Date();
  const [currentViewDate, setCurrentViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
  const [endDate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // New Modes: Rain Contingency & Budget vs Splurge
  const [isRainMode, setIsRainMode] = useState(false);
  const [budgetTier, setBudgetTier] = useState('budget'); // 'budget' | 'splurge'

  // Priority order for the 7 selected activities
  const [priorityOrder, setPriorityOrder] = useState([
    'museums',
    'cold_war',
    'cafes',
    'doner',
    'beer_gardens',
    'clubs',
    'boat_tours'
  ]);

  const [selectedActivities, setSelectedActivities] = useState({
    museums: true,
    cold_war: true,
    cafes: true,
    doner: true,
    beer_gardens: true,
    clubs: false,
    boat_tours: false
  });

  // 3 Museum types: 'all', 'art', 'history'
  const [museumType, setMuseumType] = useState('all');
  const [museumsPerDay, setMuseumsPerDay] = useState(1);
  const [clubGenre, setClubGenre] = useState('house');
  const [tempo, setTempo] = useState('balanced');
  const [customDetails, setCustomDetails] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const dayCount = useMemo(() => {
    if (!startDate || !endDate) return 3;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.min(Math.max(days, 1), 10);
  }, [startDate, endDate]);

  const activeBerlinEvents = useMemo(() => {
    if (!startDate || !endDate) return [];
    const sMonth = startDate.getMonth();
    const eMonth = endDate.getMonth();
    const sDay = startDate.getDate();
    const eDay = endDate.getDate();

    return BERLIN_EVENTS.filter(evt => {
      if (evt.month >= sMonth && evt.month <= eMonth) {
        if (sMonth === eMonth) {
          return evt.startDay <= eDay && evt.endDay >= sDay;
        }
        return true;
      }
      return false;
    });
  }, [startDate, endDate]);

  if (!isOpen) return null;

  // Calendar Day Selection (Does not close immediately; allows review + Apply button)
  const handleDayClick = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else {
      if (date < startDate) {
        setStartDate(date);
        setEndDate(startDate);
      } else {
        setEndDate(date);
      }
    }
  };

  const movePriority = (idx, direction) => {
    const newOrder = [...priorityOrder];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[idx];
    newOrder[idx] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setPriorityOrder(newOrder);
  };

  const toggleActivity = (key) => {
    setSelectedActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Generate Itinerary with strict SAME NEIGHBORHOOD clustering, Rain Mode & Budget/Splurge filters
  const handleGenerateItinerary = () => {
    const plan = generateItineraryPlan({
      dayCount,
      startDate,
      endDate,
      tempo,
      clubGenre,
      budgetTier,
      selectedActivities,
      museumType,
      museumsPerDay,
      isRainMode,
      activeBerlinEvents
    });
    setGeneratedPlan(plan);
  };

  // Substitute stop handler: picks the next vetted alternative venue in the SAME category and SAME neighborhood
  const handleSubstituteStop = (dayIdx, stopIdx) => {
    setGeneratedPlan(prevPlan => substituteItineraryStop({
      prevPlan,
      dayIdx,
      stopIdx,
      museumType,
      clubGenre
    }));
  };

  // 1. OFFLINE EXPORT: Download .ICS (Apple & Google Calendar Sync)
  const handleExportICS = () => {
    exportItineraryToICS({ generatedPlan, startDate });
  };

  // 2. OFFLINE EXPORT: Printable PDF Dossier (Styled Offline Document)
  const handleExportPDF = () => {
    exportItineraryToPDF({ generatedPlan });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#12131C] border border-white/15 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-white my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#161724]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black shadow-md shadow-bvg-yellow/20">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-black text-white">Smart Berlin Itinerary Planner</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  AI Travel Engine
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Weather Rain B-Plan, Budget vs Splurge, .ICS Calendar & Printable PDF export.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {!generatedPlan ? (
            <>
              {/* 1. Date Range & Calendar Section */}
              <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-gray-400 block mb-1 flex items-center space-x-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 text-bvg-yellow" />
                      <span>1. Trip Dates (Up to 2 Years Ahead)</span>
                    </label>
                    <div className="text-sm font-black text-white">
                      {startDate ? startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Start'}
                      {'  ➔  '}
                      {endDate ? endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Select End Date'}
                      <span className="ml-2 text-xs font-mono text-bvg-yellow bg-bvg-yellow/10 px-2 py-0.5 rounded-md">
                        {dayCount} {dayCount === 1 ? 'Day' : 'Days'} Trip
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-bvg-yellow text-bvg-dark font-extrabold text-xs transition-metro shadow-md cursor-pointer"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>{isCalendarOpen ? 'Hide Calendar' : 'Open Calendar Picker'}</span>
                  </button>
                </div>

                {/* Detected Events Banner */}
                {activeBerlinEvents.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-1">
                    <div className="font-bold text-amber-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Berlin Special Event Detected in Your Dates:</span>
                    </div>
                    {activeBerlinEvents.map((evt, idx) => (
                      <div key={idx} className="text-gray-300 pl-5">
                        • <strong>{evt.name}</strong> ({evt.badge})
                      </div>
                    ))}
                  </div>
                )}

                {/* Calendar Dropdown UI with Apply & Close Button */}
                {isCalendarOpen && (
                  <div className="pt-3 border-t border-white/10 mt-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1))}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-bold text-white font-mono">
                        {currentViewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1))}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-gray-300 cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Month Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs">
                      {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
                        <span key={d} className="text-gray-500 font-bold py-1">{d}</span>
                      ))}
                      {Array.from({ length: (new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), 1).getDay() + 6) % 7 }).map((_, i) => (
                        <div key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 0).getDate() }).map((_, i) => {
                        const dayNumber = i + 1;
                        const cellDate = new Date(currentViewDate.getFullYear(), currentViewDate.getMonth(), dayNumber);
                        const isStart = startDate && cellDate.toDateString() === startDate.toDateString();
                        const isEnd = endDate && cellDate.toDateString() === endDate.toDateString();
                        const isInRange = startDate && endDate && cellDate > startDate && cellDate < endDate;

                        return (
                          <button
                            key={dayNumber}
                            onClick={() => handleDayClick(cellDate)}
                            className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                              isStart || isEnd
                                ? 'bg-bvg-yellow text-bvg-dark font-black shadow-md'
                                : isInRange
                                ? 'bg-bvg-yellow/20 text-yellow-200'
                                : 'text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {dayNumber}
                          </button>
                        );
                      })}
                    </div>

                    {/* Apply Dates & Close Panel Button */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-[11px] text-gray-400">
                        {startDate && endDate ? `Selected: ${startDate.toLocaleDateString('en-GB')} – ${endDate.toLocaleDateString('en-GB')} (${dayCount} days)` : 'Click Start & End date on calendar'}
                      </span>
                      <button
                        onClick={() => setIsCalendarOpen(false)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-colors shadow cursor-pointer"
                      >
                        Apply Dates & Close
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. New Intelligent Toggles: Rain Contingency & Budget vs Splurge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Weather Adaptive Plan Toggle */}
                <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      <span>Weather Adaptive Plan</span>
                    </span>
                    <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
                      <button
                        onClick={() => setIsRainMode(false)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer flex items-center space-x-1 ${
                          !isRainMode ? 'bg-amber-400 text-black shadow' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Sun className="w-3 h-3" />
                        <span>Sunny Mode</span>
                      </button>
                      <button
                        onClick={() => setIsRainMode(true)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer flex items-center space-x-1 ${
                          isRainMode ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <CloudRain className="w-3 h-3" />
                        <span>Rainy Mode</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    {isRainMode 
                      ? '☔ Automatically reroutes outdoor parks & open-air memorials to covered vaults, heated glass boats and indoor galleries.' 
                      : '☀️ Standard outdoor & open-air itinerary with riverside beer gardens.'}
                  </p>
                </div>

                {/* Budget vs Splurge Toggle */}
                <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <Coins className="w-4 h-4 text-emerald-400" />
                      <span>Budget vs. Luxury</span>
                    </span>
                    <div className="flex bg-white/5 p-0.5 rounded-lg border border-white/10">
                      <button
                        onClick={() => setBudgetTier('budget')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer ${
                          budgetTier === 'budget' ? 'bg-emerald-500 text-black shadow' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        € Local Value
                      </button>
                      <button
                        onClick={() => setBudgetTier('splurge')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-extrabold transition-all cursor-pointer flex items-center space-x-1 ${
                          budgetTier === 'splurge' ? 'bg-amber-400 text-black shadow' : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        <Gem className="w-3 h-3" />
                        <span>✨ Luxury</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    {budgetTier === 'splurge' 
                      ? '✨ Upgrades to Michelin-starred dining (Cookies Cream, Nobelhart), speakeasies & botanical brunch.' 
                      : 'Authentic expat value: 4.5★ third-wave roasters, famous döner spots & craft taprooms.'}
                  </p>
                </div>
              </div>

              {/* 3. Tempo & Time Management */}
              <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-4 space-y-2.5">
                <label className="text-xs font-bold uppercase text-gray-400 block flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>3. Time Management & Trip Pace</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'chill', label: '🐢 Chill & Relaxed', desc: '1-2 key stops per day, plenty of café & park time' },
                    { id: 'balanced', label: '⚖️ Balanced (Recommended)', desc: '3-4 stops daily, efficient metro transit & great variety' },
                    { id: 'efficient', label: '⚡ Maximum Efficiency', desc: 'Full-power packed days, see as much as humanly possible' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTempo(t.id)}
                      className={`p-3 rounded-xl text-left border transition-metro flex flex-col justify-between cursor-pointer ${
                        tempo === t.id
                          ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow font-bold shadow-md'
                          : 'bg-bvg-dark/60 text-gray-300 border-white/5 hover:border-white/20'
                      }`}
                    >
                      <span className="font-extrabold text-xs">{t.label}</span>
                      <span className={`text-[10px] mt-1 leading-snug ${tempo === t.id ? 'text-bvg-dark/90 font-medium' : 'text-gray-400'}`}>
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Selected Activities & Priority Ranking with Smooth Motion */}
              <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-gray-400 block flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>4. Activities & Smooth Priority Order</span>
                  </label>
                  <span className="text-[10px] text-gray-500">Smooth animation on reordering</span>
                </div>

                {/* Animated Reorderable List via Framer Motion layout */}
                <div className="space-y-2">
                  <AnimatePresence>
                    {priorityOrder.map((key, idx) => {
                      const isSelected = selectedActivities[key];

                      const labels = {
                        museums: { title: 'Museums & Galleries', icon: Landmark, desc: 'World-class arts, cold war relics & Nefertiti' },
                        cold_war: { title: 'Cold War & Wall Memorials', icon: ShieldCheck, desc: 'East Side Gallery, Bernauer Str. & Checkpoint Charlie' },
                        cafes: { title: 'Specialty Cafés (4.2★+ Rated)', icon: Coffee, desc: 'Single origins, oat flat whites & artisanal roasters' },
                        doner: { title: 'Iconic Döner & Street Food (or Splurge Dining)', icon: Utensils, desc: 'Mustafa’s, Rüyam, or Michelin tasting menus' },
                        beer_gardens: { title: 'Craft Beer & Historic Beer Gardens (or Speakeasies)', icon: Beer, desc: 'Prater, BRLO or hidden mixology lounges' },
                        clubs: { title: 'Legendary Berlin Club Culture', icon: Music, desc: 'House, techno and iconic nightlife institutions' },
                        boat_tours: { title: 'Spree River & Canal Cruises', icon: Ship, desc: 'Historic 1h or 3.5h bridge sightseeing tours' }
                      };

                      const meta = labels[key];
                      const Icon = meta.icon;

                      return (
                        <motion.div
                          key={key}
                          layout
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                          className={`flex items-center justify-between p-3 rounded-xl border ${
                            isSelected
                              ? 'bg-bvg-dark/90 border-white/20'
                              : 'bg-black/20 border-white/5 opacity-50'
                          }`}
                        >
                          <div 
                            className="flex items-center space-x-3 cursor-pointer flex-1"
                            onClick={() => toggleActivity(key)}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                              isSelected ? 'bg-bvg-yellow text-bvg-dark border-bvg-yellow font-bold' : 'border-white/30'
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-bvg-yellow' : 'text-gray-500'}`} />
                            <div>
                              <div className="text-xs font-bold text-white">{meta.title}</div>
                              <div className="text-[10px] text-gray-400">{meta.desc}</div>
                            </div>
                          </div>

                          {/* Priority Smooth Arrows */}
                          <div className="flex items-center space-x-1 pl-2 border-l border-white/10 ml-2">
                            <button
                              onClick={() => movePriority(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-gray-400 hover:text-white cursor-pointer transition-transform active:scale-90"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[10px] font-mono text-gray-400 w-4 text-center font-bold">{idx + 1}</span>
                            <button
                              onClick={() => movePriority(idx, 'down')}
                              disabled={idx === priorityOrder.length - 1}
                              className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-gray-400 hover:text-white cursor-pointer transition-transform active:scale-90"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* 5. Sub-Filters: Museum 3-Way Category & Clubs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Museum Specific 3-Category Slicer (All, Art, History) */}
                {selectedActivities.museums && (
                  <div className="bg-bvg-gray/30 border border-amber-500/20 rounded-xl p-3.5 space-y-3">
                    <span className="text-xs font-bold text-amber-300 flex items-center space-x-1.5">
                      <Landmark className="w-3.5 h-3.5 text-amber-400" />
                      <span>Museum Category & Pace</span>
                    </span>

                    {/* 3 Categories: All, Art, History */}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-gray-400">Museum Category:</span>
                      <div className="grid grid-cols-3 gap-1.5 pt-0.5">
                        {[
                          { id: 'all', label: 'All Museums' },
                          { id: 'art', label: '🎨 Art' },
                          { id: 'history', label: '🧱 History' }
                        ].map(m => (
                          <button
                            key={m.id}
                            onClick={() => setMuseumType(m.id)}
                            className={`py-1 px-2 rounded-lg text-[11px] font-bold text-center cursor-pointer transition-colors ${
                              museumType === m.id
                                ? 'bg-amber-400 text-black shadow'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-gray-400 text-[11px] pt-1 border-t border-white/5">
                      <span>Max museums per day:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map(n => (
                          <button
                            key={n}
                            onClick={() => setMuseumsPerDay(n)}
                            className={`px-2.5 py-0.5 rounded text-xs font-bold cursor-pointer ${
                              museumsPerDay === n ? 'bg-amber-400 text-black' : 'bg-white/5 text-gray-400'
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Club Specific Sub-options */}
                {selectedActivities.clubs && (
                  <div className="bg-bvg-gray/30 border border-purple-500/20 rounded-xl p-3.5 space-y-2">
                    <span className="text-xs font-bold text-purple-300 flex items-center space-x-1.5">
                      <Music className="w-3.5 h-3.5 text-purple-400" />
                      <span>Club Sound & Genre</span>
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { id: 'house', label: 'House / Melodic' },
                        { id: 'hard_techno', label: 'Hard Techno' },
                        { id: 'non_techno', label: 'Indie / Alt' }
                      ].map(g => (
                        <button
                          key={g.id}
                          onClick={() => setClubGenre(g.id)}
                          className={`py-1.5 px-1.5 rounded-lg text-[10px] font-bold text-center cursor-pointer ${
                            clubGenre === g.id
                              ? 'bg-purple-600 text-white shadow'
                              : 'bg-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-purple-300/80 leading-tight pt-1">
                      Includes primary club + guaranteed nearby Backup B-Plan.
                    </p>
                  </div>
                )}
              </div>

              {/* 6. Custom Details input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 block">
                  Optional: Special Interests or Dietary Preferences
                </label>
                <input
                  type="text"
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  placeholder="e.g. Vegetarian only, love Bauhaus architecture, visiting with a partner..."
                  className="w-full bg-bvg-gray/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-bvg-yellow"
                />
              </div>

              {/* Generate CTA */}
              <button
                onClick={handleGenerateItinerary}
                className="w-full py-3.5 rounded-xl bg-bvg-yellow hover:bg-yellow-400 text-bvg-dark font-black text-sm flex items-center justify-center space-x-2 transition-metro shadow-xl shadow-bvg-yellow/10 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Optimized {dayCount}-Day Itinerary</span>
              </button>
            </>
          ) : (
            /* Generated Itinerary Output View */
            <div className="space-y-6">
              
              {/* Status Header & Offline Export Controls */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold uppercase text-emerald-400">Single-Zone Clustered Route Ready</span>
                    {generatedPlan.isRainMode && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        ☔ Rain Contingency
                      </span>
                    )}
                    {generatedPlan.budgetTier === 'splurge' && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        ✨ Luxury Mode
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-black text-white mt-0.5">
                    {generatedPlan.dayCount}-Day Berlin Itinerary ({generatedPlan.startDate} – {generatedPlan.endDate})
                  </h4>
                  <p className="text-xs text-gray-300">
                    Clustered in the same district per day. Click <strong>Substitute</strong> to swap any place.
                  </p>
                </div>

                {/* Offline Export Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                  {/* Apple / Google Calendar .ICS Export */}
                  <button
                    onClick={handleExportICS}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15 cursor-pointer shadow-sm"
                    title="Add all day stops to Apple Calendar, Google Calendar or Outlook"
                  >
                    <CalendarPlus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sync to Phone Calendar (.ics)</span>
                  </button>

                  {/* Printable Offline PDF */}
                  <button
                    onClick={handleExportPDF}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-bvg-yellow hover:bg-yellow-400 text-bvg-dark text-xs font-black transition-all cursor-pointer shadow-sm"
                    title="Print or save as offline PDF document"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Export PDF Dossier</span>
                  </button>

                  <button
                    onClick={() => setGeneratedPlan(null)}
                    className="text-xs font-bold px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Day-by-Day Cards */}
              <div className="space-y-4">
                {generatedPlan.days.map((day, dIdx) => (
                  <div 
                    key={day.dayNumber}
                    className="bg-[#171826] border border-white/10 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-bvg-yellow text-bvg-dark font-black text-xs flex items-center justify-center">
                            {day.dayNumber}
                          </span>
                          <h5 className="font-extrabold text-base text-white">{day.title}</h5>
                        </div>
                        <span className="text-xs text-bvg-yellow pl-8 block font-medium">Zone Focus: {day.focus}</span>
                      </div>

                      {/* Google Maps Dual Action Buttons: Route & Places List */}
                      <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                        <a
                          href={day.mapsListUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
                          title="Open places as a list on Google Maps"
                        >
                          <List className="w-3.5 h-3.5" />
                          <span>Google Maps List</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>

                        <a
                          href={day.mapsRouteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold transition-all shadow-md cursor-pointer"
                          title="Open directions route in Google Maps"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Navigation Route</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      </div>
                    </div>

                    {/* Timeline Stops with Substitute Button */}
                    <div className="space-y-3.5 pl-2 sm:pl-4 border-l-2 border-white/10 ml-2">
                      {day.stops.map((stop, sIdx) => (
                        <div key={sIdx} className="relative pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 group">
                          <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-bvg-yellow ring-4 ring-[#171826]" />
                          
                          <div className="space-y-0.5 flex-1 pr-2">
                            <div className="flex items-baseline space-x-2 flex-wrap">
                              <span className="text-xs font-mono font-bold text-gray-400">{stop.time}</span>
                              <span className="text-[11px] uppercase font-bold text-bvg-yellow">{stop.type}</span>
                              {stop.rating && (
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  ★ {stop.rating} Google
                                </span>
                              )}
                              {stop.price && (
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  {stop.price}
                                </span>
                              )}
                              {generatedPlan.isRainMode && stop.isIndoor && (
                                <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-300 border border-blue-500/20 flex items-center space-x-1">
                                  <CloudRain className="w-2.5 h-2.5" />
                                  <span>Covered</span>
                                </span>
                              )}
                            </div>
                            <div className="text-sm font-bold text-white flex items-center space-x-2">
                              <span>{stop.title}</span>
                              <span className="text-[11px] font-normal text-gray-400">({stop.location})</span>
                            </div>
                            <div className="text-xs text-gray-300 leading-relaxed">{stop.detail}</div>
                            {stop.doorWarning && (
                              <div className="text-[11px] text-amber-400 mt-1 font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                                ⚠️ {stop.doorWarning}
                              </div>
                            )}
                          </div>

                          {/* Substitute Button */}
                          <div className="flex items-center space-x-2 self-start sm:self-center shrink-0 pt-1 sm:pt-0">
                            <button
                              onClick={() => handleSubstituteStop(dIdx, sIdx)}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 text-[11px] font-bold transition-all border border-white/10 hover:border-bvg-yellow/50 active:scale-95 cursor-pointer shadow-sm"
                              title="Swap this venue for another curated option in the same neighborhood"
                            >
                              <RefreshCw className="w-3 h-3 text-bvg-yellow" />
                              <span>Substitute</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat transfer button */}
              <div className="p-4 rounded-xl bg-bvg-dark border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-gray-400">
                  Want Alex to answer questions or give local insider tips for these specific spots?
                </div>
                <button
                  onClick={() => {
                    if (onApplyToChat) {
                      onApplyToChat(`Alex, I generated a ${generatedPlan.dayCount}-day Berlin trip itinerary from ${generatedPlan.startDate} to ${generatedPlan.endDate} (${generatedPlan.isRainMode ? 'Rain Mode' : 'Sunny'}, Tier: ${generatedPlan.budgetTier}). Can you give me insider tips for these days?`);
                    }
                    onClose();
                  }}
                  className="px-4 py-2 rounded-lg bg-bvg-yellow text-bvg-dark font-extrabold text-xs hover:bg-yellow-400 transition-colors cursor-pointer"
                >
                  Discuss Itinerary with Alex in Chat ➔
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
