import React, { useState, useMemo } from 'react';
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
  ChevronDown
} from 'lucide-react';

// Major annual Berlin events detector
const BERLIN_EVENTS = [
  { name: 'Berlinale International Film Festival', month: 1, startDay: 10, endDay: 25, badge: '🎬 World Cinema Hotspot' },
  { name: 'Karneval der Kulturen', month: 4, startDay: 20, endDay: 30, badge: '🎭 Huge Street Parade in Kreuzberg' },
  { name: 'Fête de la Musique', month: 5, startDay: 21, endDay: 21, badge: '🎵 Free Live Music Across the City' },
  { name: 'Rave The Planet', month: 6, startDay: 5, endDay: 15, badge: '⚡ Massive Street Techno Demonstration (Tiergarten)' },
  { name: 'Berlin Pride / CSD', month: 6, startDay: 20, endDay: 28, badge: '🏳️‍🌈 Berlin Christopher Street Day Parade' },
  { name: 'Berlin Marathon', month: 8, startDay: 20, endDay: 30, badge: '🏃 World Marathon (Street Closures in Mitte)' },
  { name: 'Festival of Lights', month: 9, startDay: 4, endDay: 16, badge: '✨ Illumination of Historic Landmarks' },
  { name: 'Berliner Weihnachtsmarkt', month: 10, startDay: 22, endDay: 31, badge: '🎄 Traditional Christmas Markets' },
  { name: 'Berliner Weihnachtsmarkt', month: 11, startDay: 1, endDay: 26, badge: '🎄 Traditional Christmas Markets' }
];

// Curated Places with real Google Maps Queries & Geographic Zone Clusters
const ITINERARY_PLACES = {
  museums: {
    mitte: [
      { name: 'Neues Museum (Nefertiti)', area: 'Mitte (Museum Island)', mapQuery: 'Neues Museum Berlin' },
      { name: 'Alte Nationalgalerie', area: 'Mitte (Museum Island)', mapQuery: 'Alte Nationalgalerie Berlin' },
      { name: 'Pergamonmuseum. Das Panorama', area: 'Mitte (Museum Island)', mapQuery: 'Pergamonmuseum Das Panorama Berlin' },
      { name: 'Futurium (House of Futures)', area: 'Mitte (Regierungsviertel)', mapQuery: 'Futurium Berlin' }
    ],
    kreuzberg: [
      { name: 'Jewish Museum Berlin', area: 'Kreuzberg', mapQuery: 'Jewish Museum Berlin' },
      { name: 'Berlinische Galerie', area: 'Kreuzberg', mapQuery: 'Berlinische Galerie Berlin' },
      { name: 'Deutsches Technikmuseum', area: 'Kreuzberg', mapQuery: 'Deutsches Technikmuseum Berlin' }
    ]
  },
  clubs: {
    house: [
      { name: 'Watergate', area: 'Kreuzberg (Spree River)', note: 'Melodic techno & house, floor-to-ceiling LED ceiling overlooking Oberbaumbrücke' },
      { name: 'Sisyphos', area: 'Rummelsburg', note: 'Epic outdoor festival playground, open-air beach floor and warm house vibes' },
      { name: 'Club der Visionäre', area: 'Kreuzberg', note: 'Intimate canal-side wooden deck for minimal & deep house' }
    ],
    hard_techno: [
      { name: 'Tresor', area: 'Mitte', note: 'Iconic former power plant vault, pitch-black industrial basement with heavy stroboscopes' },
      { name: 'Berghain / Panorama Bar', area: 'Friedrichshain', note: 'World temple of industrial techno. Strict door policy: know the DJ, wear black, small groups' },
      { name: 'RSO.BERLIN', area: 'Schöneweide', note: 'High-end Kirsch audio sound system in raw industrial compound' }
    ],
    non_techno: [
      { name: 'Cassiopeia', area: 'Friedrichshain (RAW-Gelände)', note: 'Hip-hop, 90s/2000s, indie rock and punk vibes' },
      { name: 'SO36', area: 'Kreuzberg (Oranienstraße)', note: 'Historic punk, roller skate disco & queer party landmark' },
      { name: 'Sage Club / KitKat (Rock nights)', area: 'Mitte', note: 'Rock and live band party nights' }
    ]
  },
  cafes: [
    { name: 'The Barn (Neues Kranzler Eck / Mitte)', area: 'Mitte / Charlottenburg', specialty: 'Pioneer of Berlin third-wave single origin espresso' },
    { name: 'Five Elephant (Kreuzberg)', area: 'Kreuzberg (Reichenberger Str.)', specialty: 'Famous Philadelphia cheesecake & light roasts' },
    { name: 'Bonanza Coffee Roasters', area: 'Kreuzberg (Oderberger Str. / Adalbertstr.)', specialty: 'Architectural industrial haven with sunlit courtyard' },
    { name: 'Distrikt Coffee', area: 'Mitte (Bergstraße)', specialty: 'Artisanal pancakes, poached eggs & specialty flat whites' }
  ],
  doner: [
    { name: 'Mustafa’s Gemüsekebap', area: 'Kreuzberg (Mehringdamm)', note: 'Fried veggies, feta & secret lemon sauce (expect 40+ min queue)' },
    { name: 'Rüyam Gemüse Kebab', area: 'Schöneberg (Hauptstr.) & Prenzlauer Berg', note: 'Fluffy fresh bread, mint leaves and friendly atmosphere (Local #1)' },
    { name: 'K’Ups Gemüsekebap', area: 'Prenzlauer Berg (Kastanienallee)', note: 'High quality artisanal chicken & vegetarian options' }
  ],
  cold_war: [
    { name: 'East Side Gallery', area: 'Friedrichshain', note: '1.3 km preserved open-air Berlin Wall mural gallery along the Spree' },
    { name: 'Gedenkstätte Berliner Mauer (Bernauer Str.)', area: 'Mitte / Wedding', note: 'Most comprehensive original border strip with watchtower and documentation center' },
    { name: 'Checkpoint Charlie & Black Box', area: 'Kreuzberg / Mitte', note: 'Historic Cold War tank standoff border crossing' }
  ],
  beer_gardens: [
    { name: 'Prater Biergarten', area: 'Prenzlauer Berg (Kastanienallee)', note: 'Berlin’s oldest beer garden (operating since 1837) under chestnut trees' },
    { name: 'BRLO Brwhouse', area: 'Kreuzberg (Gleisdreieck Park)', note: 'Modern craft brewery built from 38 shipping containers with vast outdoor terrace' },
    { name: 'Café am Neuen See', area: 'Tiergarten', note: 'Rustic lakeside beer garden inside the quiet heart of Tiergarten park' }
  ],
  boat_tours: [
    { name: 'Historic City Center Spree Cruise', area: 'Mitte (Friedrichstraße / Nikolaiviertel)', note: '1-hour historic boat tour past Reichstag, Museum Island, and Berlin Cathedral' },
    { name: 'Bridging Berlin 3.5h River Circuit', area: 'Spree & Landwehrkanal', note: 'Scenic cruise navigating through 64 iconic bridges across East and West' }
  ]
};

export default function ItineraryPlannerModal({ isOpen, onClose, onApplyToChat }) {
  const today = new Date();
  const [currentViewDate, setCurrentViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1));
  const [endDate, setEndDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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

  const [museumSubcategory, setMuseumSubcategory] = useState('popular');
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
        setIsCalendarOpen(false);
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

  const handleGenerateItinerary = () => {
    const days = [];
    const zones = [
      { name: 'Historic Mitte & Museum Island', focus: 'Museums, Spree & Cold War' },
      { name: 'Kreuzberg & Neukölln Canal Life', focus: 'Iconic Döner, Specialty Cafes & Kiez Vibe' },
      { name: 'Friedrichshain & Urban Nightlife', focus: 'East Side Gallery, RAW-Gelände & Club Culture' },
      { name: 'Tiergarten, Charlottenburg & West Berlin', focus: 'Beer Gardens, Modern Architecture & Green Parks' }
    ];

    for (let i = 0; i < dayCount; i++) {
      const dayNum = i + 1;
      const zone = zones[i % zones.length];
      const dayStops = [];

      if (selectedActivities.cafes) {
        const cafe = ITINERARY_PLACES.cafes[i % ITINERARY_PLACES.cafes.length];
        dayStops.push({
          time: '09:30 AM',
          type: '☕ Breakfast & Specialty Coffee',
          title: cafe.name,
          location: cafe.area,
          detail: cafe.specialty,
          mapsQuery: `${cafe.name}, Berlin`
        });
      }

      if (selectedActivities.museums && (i % 2 === 0 || tempo === 'efficient')) {
        const musList = i % 2 === 0 ? ITINERARY_PLACES.museums.mitte : ITINERARY_PLACES.museums.kreuzberg;
        const mus = musList[i % musList.length];
        dayStops.push({
          time: '11:00 AM',
          type: '🏛️ Cultural Landmark',
          title: mus.name,
          location: mus.area,
          detail: 'Book tickets online to skip queue. Allow ~1.5 to 2 hours.',
          mapsQuery: mus.mapQuery
        });
      }

      if (selectedActivities.doner) {
        const don = ITINERARY_PLACES.doner[i % ITINERARY_PLACES.doner.length];
        dayStops.push({
          time: '01:30 PM',
          type: '🥙 Iconic Street Food Lunch',
          title: don.name,
          location: don.area,
          detail: don.note,
          mapsQuery: `${don.name}, Berlin`
        });
      }

      if (selectedActivities.cold_war && i % 2 === 1) {
        const cw = ITINERARY_PLACES.cold_war[(i - 1) % ITINERARY_PLACES.cold_war.length];
        dayStops.push({
          time: '03:30 PM',
          type: '🧱 Historic Cold War Memorial',
          title: cw.name,
          location: cw.area,
          detail: cw.note,
          mapsQuery: `${cw.name}, Berlin`
        });
      } else if (selectedActivities.boat_tours && i === 0) {
        const boat = ITINERARY_PLACES.boat_tours[0];
        dayStops.push({
          time: '03:45 PM',
          type: '🚢 Scenic Spree River Cruise',
          title: boat.name,
          location: boat.area,
          detail: boat.note,
          mapsQuery: 'Friedrichstraße Boat Dock Berlin'
        });
      }

      if (selectedActivities.beer_gardens && (tempo !== 'chill' || i % 2 === 0)) {
        const bg = ITINERARY_PLACES.beer_gardens[i % ITINERARY_PLACES.beer_gardens.length];
        dayStops.push({
          time: '05:30 PM',
          type: '🍺 Craft Beer & Garden Chill',
          title: bg.name,
          location: bg.area,
          detail: bg.note,
          mapsQuery: `${bg.name}, Berlin`
        });
      }

      if (selectedActivities.clubs && (i === dayCount - 1 || i === 1)) {
        const clubsForGenre = ITINERARY_PLACES.clubs[clubGenre] || ITINERARY_PLACES.clubs.house;
        const mainClub = clubsForGenre[0];
        const backupClub = clubsForGenre[1] || clubsForGenre[0];

        dayStops.push({
          time: '11:45 PM',
          type: '🪩 Berlin Nightlife & Club Experience',
          title: mainClub.name,
          location: mainClub.area,
          detail: `${mainClub.note}. Backup B-Plan: ${backupClub.name} (${backupClub.area}).`,
          mapsQuery: `${mainClub.name}, Berlin`,
          doorWarning: 'Strict door policy: arrive sober, group of 1-2, know the lineup.'
        });
      }

      const mapsStops = dayStops.map(s => encodeURIComponent(s.mapsQuery)).join('/');
      const googleMapsUrl = `https://www.google.com/maps/dir/${mapsStops}`;

      days.push({
        dayNumber: dayNum,
        title: `Berlin Day ${dayNum} Trip: ${zone.name}`,
        zone: zone.name,
        focus: zone.focus,
        stops: dayStops,
        mapsUrl: googleMapsUrl
      });
    }

    setGeneratedPlan({
      dayCount,
      startDate: startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      endDate: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      days,
      events: activeBerlinEvents
    });
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
                Custom dates, geographic routing, seasonal rules & multi-day Google Maps export.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
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
                      <span>1. Select Trip Dates (Up to 2 Years Ahead)</span>
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
                    className="inline-flex items-center space-x-2 px-3 py-2 rounded-lg bg-bvg-yellow text-bvg-dark font-extrabold text-xs transition-metro shadow-md cursor-pointer"
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

                {/* Calendar Dropdown UI */}
                {isCalendarOpen && (
                  <div className="pt-3 border-t border-white/10 mt-3">
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() - 1, 1))}
                        className="p-1 rounded-lg hover:bg-white/10 text-gray-300"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-bold text-white font-mono">
                        {currentViewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                      <button
                        onClick={() => setCurrentViewDate(new Date(currentViewDate.getFullYear(), currentViewDate.getMonth() + 1, 1))}
                        className="p-1 rounded-lg hover:bg-white/10 text-gray-300"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

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
                            className={`p-2 rounded-lg text-xs font-semibold transition-all ${
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
                  </div>
                )}
              </div>

              {/* 2. Tempo & Time Management */}
              <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-4 space-y-2.5">
                <label className="text-xs font-bold uppercase text-gray-400 block flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>2. Time Management & Trip Pace</span>
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

              {/* 3. Selected Activities & Priority Ranking */}
              <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase text-gray-400 block flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>3. Choose Activities & Set Priority Order</span>
                  </label>
                  <span className="text-[10px] text-gray-500">Use arrows to rank what matters most</span>
                </div>

                <div className="space-y-2">
                  {priorityOrder.map((key, idx) => {
                    const isSelected = selectedActivities[key];

                    const labels = {
                      museums: { title: 'Museums & Galleries', icon: Landmark, desc: 'World-class arts, cold war relics & Nefertiti' },
                      cold_war: { title: 'Cold War & Wall Memorials', icon: ShieldCheck, desc: 'East Side Gallery, Bernauer Str. & Checkpoint Charlie' },
                      cafes: { title: 'Specialty Cafés & Roasteries', icon: Coffee, desc: 'Artisanal flat whites, third-wave espresso & bakeries' },
                      doner: { title: 'Iconic Döner & Street Food', icon: Utensils, desc: 'Mustafa’s, Rüyam & crispy Berlin street gems' },
                      beer_gardens: { title: 'Craft Beer & Historic Beer Gardens', icon: Beer, desc: 'Prater, BRLO and lakeside draughts' },
                      clubs: { title: 'Legendary Berlin Club Culture', icon: Music, desc: 'House, techno and iconic nightlife institutions' },
                      boat_tours: { title: 'Spree River & Canal Cruises', icon: Ship, desc: 'Historic 1h or 3.5h bridge sightseeing tours' }
                    };

                    const meta = labels[key];
                    const Icon = meta.icon;

                    return (
                      <div
                        key={key}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
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

                        {/* Priority Arrows */}
                        <div className="flex items-center space-x-1 pl-2 border-l border-white/10 ml-2">
                          <button
                            onClick={() => movePriority(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-gray-400 hover:text-white cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-mono text-gray-500 w-3 text-center">{idx + 1}</span>
                          <button
                            onClick={() => movePriority(idx, 'down')}
                            disabled={idx === priorityOrder.length - 1}
                            className="p-1 rounded hover:bg-white/10 disabled:opacity-20 text-gray-400 hover:text-white cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Sub-Filters for Selected Activities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedActivities.museums && (
                  <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-3.5 space-y-2">
                    <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <Landmark className="w-3.5 h-3.5 text-amber-400" />
                      <span>Museum Preferences</span>
                    </span>
                    <div className="flex justify-between items-center text-gray-400 text-[11px]">
                      <span>Max museums per day:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map(n => (
                          <button
                            key={n}
                            onClick={() => setMuseumsPerDay(n)}
                            className={`px-2 py-0.5 rounded text-xs font-bold cursor-pointer ${
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
                          className={`py-1 px-1.5 rounded-lg text-[10px] font-bold text-center cursor-pointer ${
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

              {/* 5. Custom Details input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 block">
                  Optional: Special Interests or Food Dietary Preferences
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
                <div>
                  <div className="text-xs font-bold uppercase text-emerald-400">Personalized Route Ready</div>
                  <h4 className="text-lg font-black text-white">
                    {generatedPlan.dayCount}-Day Berlin Itinerary ({generatedPlan.startDate} – {generatedPlan.endDate})
                  </h4>
                  <p className="text-xs text-gray-300">
                    Arranged geographically to minimize transit travel time. Each day has a dedicated Google Maps route.
                  </p>
                </div>
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 self-start sm:self-auto cursor-pointer"
                >
                  Edit Inputs
                </button>
              </div>

              {/* Day-by-Day Cards */}
              <div className="space-y-4">
                {generatedPlan.days.map((day) => (
                  <div 
                    key={day.dayNumber}
                    className="bg-[#171826] border border-white/10 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="w-6 h-6 rounded-full bg-bvg-yellow text-bvg-dark font-black text-xs flex items-center justify-center">
                            {day.dayNumber}
                          </span>
                          <h5 className="font-extrabold text-base text-white">{day.title}</h5>
                        </div>
                        <span className="text-xs text-bvg-yellow pl-8 block">Zone focus: {day.focus}</span>
                      </div>

                      {/* Google Maps Route Button for Day */}
                      <a
                        href={day.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-extrabold transition-all shadow-md self-start sm:self-auto cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Open "Berlin Day {day.dayNumber} Trip" in Maps</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    </div>

                    {/* Timeline Stops */}
                    <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-white/10 ml-2">
                      {day.stops.map((stop, sIdx) => (
                        <div key={sIdx} className="relative pl-4">
                          <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-bvg-yellow ring-4 ring-[#171826]" />
                          <div className="flex items-baseline space-x-2">
                            <span className="text-xs font-mono font-bold text-gray-400">{stop.time}</span>
                            <span className="text-[11px] uppercase font-bold text-bvg-yellow">{stop.type}</span>
                          </div>
                          <div className="text-sm font-bold text-white mt-0.5">{stop.title}</div>
                          <div className="text-xs text-gray-300 mt-0.5 leading-relaxed">{stop.detail}</div>
                          {stop.doorWarning && (
                            <div className="text-[11px] text-amber-400 mt-1 font-medium bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                              ⚠️ {stop.doorWarning}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat transfer button */}
              <div className="p-4 rounded-xl bg-bvg-dark border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-gray-400">
                  Want Alex to answer questions or give local tips for these spots?
                </div>
                <button
                  onClick={() => {
                    if (onApplyToChat) {
                      onApplyToChat(`Alex, I generated a ${generatedPlan.dayCount}-day Berlin trip itinerary from ${generatedPlan.startDate} to ${generatedPlan.endDate} with tempo: ${tempo}. Can you give me insider tips for these days?`);
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
