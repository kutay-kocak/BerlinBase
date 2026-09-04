import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Clock, 
  Film, 
  Waves, 
  Music, 
  ExternalLink, 
  ShieldAlert, 
  Compass,
  CheckCircle2,
  Tag,
  Info,
  Layers
} from 'lucide-react';

export default function Activities() {
  const [activeCategory, setActiveCategory] = useState('flea_markets');

  const categories = [
    { id: 'flea_markets', label: 'Sunday Flea Markets' },
    { id: 'lakes', label: 'Swimming Lakes (Badeseen)' },
    { id: 'cinemas', label: 'Open-Air Cinemas (Freiluftkino)' },
    { id: 'clubs', label: 'Club Culture & Awareness' }
  ];

  // Flea markets with exact Google Maps search queries and timing
  const fleaMarkets = [
    {
      name: 'Flohmarkt im Mauerpark',
      district: 'Prenzlauer Berg',
      scale: 'Mega Scale • Iconic',
      time: 'Sundays • 10:00 – 18:00',
      description: 'Berlin’s most famous Sunday tradition. Hundreds of stalls selling vintage clothes, vinyl records, handmade jewelry, antique bikes, and street food. Outdoor amphitheater karaoke starts around 15:00 in good weather.',
      vibe: 'Bustling, vibrant, energetic',
      transit: 'U8 Bernauer Str. or M10 Wolliner Str.',
      badge: '#1 Sunday Tradition',
      mapQuery: 'Flohmarkt im Mauerpark, Bernauer Str. 63-64, 13355 Berlin',
      mapUrl: 'https://www.google.com/maps/place/Mauerpark+Flohmarkt/@52.5413884,13.3976021,17z/data=!4m10!1m2!2m1!1sFlohmarkt+im+Mauerpark,+Bernauer+Str.+63-64,+13355+Berlin!3m6!1s0x47a85162d3293ec5:0x59decc88722be21e!8m2!3d52.5413884!4d13.4023657!15sCjlGbG9obWFya3QgaW0gTWF1ZXJwYXJrLCBCZXJuYXVlciBTdHIuIDYzLTY0LCAxMzM1NSBCZXJsaW5aOCI2ZmxvaG1hcmt0IGltIG1hdWVycGFyayBiZXJuYXVlciBzdHIgNjMgNjQgMTMzNTUgYmVybGlukgELZmxlYV9tYXJrZXSaASRDaGREU1VoTk1HOW5TMFZKUTBGblNVTmZObU5pZW5KUlJSQULgAQD6AQQIABA2!16s%2Fg%2F11gvfrmvp5?entry=ttu',
      pairedWith: null
    },
    {
      name: 'Flohmarkt am Boxhagener Platz',
      district: 'Friedrichshain',
      scale: 'Medium Scale • Neighborhood Gem',
      time: 'Sundays • 10:00 – 18:00',
      description: 'Surrounded by some of the best brunch cafes in Berlin. Excellent for second-hand books, retro furniture, mid-century lamps, vintage paintings, and local art prints.',
      vibe: 'Hip, relaxed, foodie-friendly',
      transit: 'U5 Frankfurter Tor or S-Ostkreuz',
      badge: 'Local Favorite',
      mapQuery: 'Flohmarkt am Boxhagener Platz, 10245 Berlin',
      mapUrl: null,
      pairedWith: 'RAW-Gelände Flea Market (only 8-10 min walk away! Visit both together for the ultimate Friedrichshain Sunday crawl)'
    },
    {
      name: 'Flohmarkt auf dem RAW-Gelände',
      district: 'Friedrichshain (Warschauer Str.)',
      scale: 'Industrial Creative • Cultural Hub',
      time: 'Sundays • 09:00 – 17:00',
      description: 'Set inside the historic post-industrial railway workshops filled with graffiti murals, skate halls, and craft beer spots. Heavy focus on vintage denim, upcycled leather jackets, indie jewelry, and artisanal crafts.',
      vibe: 'Alternative, gritty urban, lively street music',
      transit: 'S/U Warschauer Straße (3 min walk)',
      badge: 'Urban Culture Hub',
      mapQuery: 'Flohmarkt auf dem RAW-Gelände, Revaler Str. 99, 10245 Berlin',
      mapUrl: 'https://www.google.com/maps/place/RAW-Gel%C3%A4nde/@52.5065496,13.4503799,17z/data=!4m10!1m2!2m1!1sFlohmarkt+auf+dem+RAW-Gel%C3%A4nde,+Revaler+Str.+99,+10245+Berlin!3m6!1s0x47a84fec1e954c79:0xb60c1d2c7d0cde87!8m2!3d52.5065496!4d13.4551435!15sCkNGbG9obWFya3QgYXVmIGRlbSBSQVctR2VsYWVuZGUsIFJldmFsZXIgU3RyLiA5OSwgMTAyNDUgQmVybGluWjgiNmZsb2htYXJrdCBhdWYgZGVtIHJhdyBnZWxhZW5kZSByZXZhbGVyIHN0ciA5OSAxMDI0NSBiZXJsaW6SAQ9jdWx0dXJhbF9jZW50ZXKaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVTm5haTFMYTBwUkVBRTgBAB-yAQ9jdWx0dXJhbF9jZW50ZXI!16s%2Fg%2F122r4c1k?entry=ttu',
      pairedWith: 'Boxhagener Platz (Walk up Simon-Dach-Straße for cafes and explore Boxi in the same afternoon)'
    },
    {
      name: 'Nowkoelln Flowmarkt',
      district: 'Neukölln (Maybachufer)',
      scale: 'Waterfront Market • Bi-Weekly',
      time: 'Every 2nd Sunday • 10:00 – 17:30',
      description: 'Set right along the Landwehrkanal with swans gliding by. Features upcycled fashion, independent Berlin designers, live acoustic musicians, and artisanal street food stalls.',
      vibe: 'Alternative, artistic, canalside chill',
      transit: 'U8 Schönleinstr. or U7 Hermannplatz',
      badge: 'Canalside Vibe',
      mapQuery: 'Nowkoelln Flowmarkt, Maybachufer, 12047 Berlin',
      pairedWith: null
    },
    {
      name: 'Antikmarkt am Arkonaplatz',
      district: 'Mitte',
      scale: 'Boutique Scale • Curated',
      time: 'Sundays • 10:00 – 16:00',
      description: 'Charming leafy square shaded by linden trees. Known for curated 1960s and 1970s interior design objects, vintage analog cameras, Bauhaus lamps, and classic vinyl.',
      vibe: 'Sophisticated, quiet, design-oriented',
      transit: 'U8 Bernauer Str. or Tram M1',
      badge: 'Design & Retro',
      mapQuery: 'Antikmarkt am Arkonaplatz, 10435 Berlin',
      pairedWith: null
    }
  ];

  // Extended swimming lakes reachable by BVG public transit (7 total)
  const lakes = [
    {
      name: 'Schlachtensee',
      borough: 'Steglitz-Zehlendorf',
      waterQuality: 'Crystal Clear (Grade A+)',
      transit: 'S1 Schlachtensee (Direct 1 min walk)',
      travelTimeAlex: '34 min from Alexanderplatz',
      description: 'One of the cleanest, deepest, and most accessible swimming lakes in Berlin. Step right off the S1 train and you are immediately on the forest shoreline with secluded bathing coves.',
      tip: 'Grab a cold Radler or pretzel at the historic Fischerhütte beer garden right on the eastern shore.',
      mapQuery: 'Schlachtensee, 14129 Berlin'
    },
    {
      name: 'Krumme Lanke',
      borough: 'Steglitz-Zehlendorf',
      waterQuality: 'Pristine Forest Water',
      transit: 'U3 Krumme Lanke + 10 min walk through Grunewald',
      travelTimeAlex: '38 min from Alexanderplatz',
      description: 'Narrow, serpentine lake enveloped by the dense Grunewald forest. Quieter than Schlachtensee, featuring sandy pockets and wooden swimming docks nestled in nature.',
      tip: 'Popular with students and peaceful sunbathers; great 2.5 km running trail around the water.',
      mapQuery: 'Krumme Lanke, 14169 Berlin'
    },
    {
      name: 'Müggelsee (Großer Müggelsee)',
      borough: 'Treptow-Köpenick',
      waterQuality: 'Vast Open Waters',
      transit: 'S3 Friedrichshagen + Tram 60 / 61',
      travelTimeAlex: '42 min from Alexanderplatz',
      description: 'Berlin’s largest lake. Features massive sandy shores (Strandbad Rahnsdorf), solar boat rentals, stand-up paddleboarding, and traditional fish smokehouses.',
      tip: 'Rent a motor-free electric boat or kayak to explore the peaceful canals of "Neu-Venedig" (New Venice).',
      mapQuery: 'Großer Müggelsee, Berlin'
    },
    {
      name: 'Plötzensee',
      borough: 'Mitte (Wedding)',
      waterQuality: 'Good / Urban Oasis',
      transit: 'U9 Amrumer Str. or Tram M13 / 50',
      travelTimeAlex: '22 min from Alexanderplatz',
      description: 'A genuine inner-city swimming lake nestled in Wedding’s Volkspark Rehberge. Features an organized lido (Strandbad Plötzensee) with sandy beach areas and volleyball courts.',
      tip: 'Perfect for a refreshing post-work dip if you live in Wedding, Moabit, or Mitte.',
      mapQuery: 'Strandbad Plötzensee, Nordufer 26, 13351 Berlin'
    },
    {
      name: 'Wannsee (Strandbad Wannsee)',
      borough: 'Steglitz-Zehlendorf',
      waterQuality: 'Iconic Broad Beach',
      transit: 'S1 or S7 Nikolassee + 10 min walk',
      travelTimeAlex: '36 min from Alexanderplatz',
      description: 'Europe’s largest inland open-air lido on a body of water. Famous for its kilometer-long white Baltic sand beach, protected 1920s Bauhaus architecture, and classic wicker beach chairs (Strandkörbe).',
      tip: 'Visit on sunny weekdays to enjoy the historic beach chairs without weekend peak crowds.',
      mapQuery: 'Strandbad Wannsee, Wannseebadweg 25, 14129 Berlin'
    },
    {
      name: 'Weißensee',
      borough: 'Pankow',
      waterQuality: 'Charming Park Lagoon',
      transit: 'Tram M4 to Weißer See (Direct from Alex)',
      travelTimeAlex: '16 min from Alexanderplatz',
      description: 'Peaceful circular lake located right in Pankow. Boasts a soft sandy beach (Strandbad Weißensee) with a palm-tree cocktail bar, paddle boat rentals, and a picturesque fountain.',
      tip: 'Fastest lake access from Alexanderplatz and Prenzlauer Berg (just a 16-minute tram ride on the M4).',
      mapQuery: 'Strandbad Weißensee, Uferpromenade am Weißen See, 13088 Berlin'
    },
    {
      name: 'Tegeler See',
      borough: 'Reinickendorf',
      waterQuality: 'Archipelago & Steamer Docks',
      transit: 'U6 Alt-Tegel (5 min walk to Greenwichpromenade)',
      travelTimeAlex: '28 min from Alexanderplatz',
      description: 'Berlin’s second-largest lake, dotted with seven scenic islands. The Greenwichpromenade offers lakeside ice cream parlors, steamer cruises, and access to Strandbad Tegelsee.',
      tip: 'Walk across the historic red iron bridge (Humboldtsteg) into the quiet forest paths of Tegeler Forst.',
      mapQuery: 'Tegeler See, 13507 Berlin'
    }
  ];

  // Open Air Cinemas
  const openAirCinemas = [
    {
      name: 'Freiluftkino Kreuzberg',
      location: 'Bethanien Art Center Courtyard, Kreuzberg',
      format: 'Original Language with Subtitles (OmU)',
      atmosphere: 'Intimate historic courtyard surrounded by graffiti and old architecture.',
      highlight: 'Screening international indie cinema, documentaries, and cult films.',
      mapQuery: 'Freiluftkino Kreuzberg, Mariannenplatz 2, 10997 Berlin'
    },
    {
      name: 'Freiluftkino Friedrichshain',
      location: 'Volkspark Friedrichshain',
      format: 'Original Version (OmU) & German Dubbed',
      atmosphere: 'Vast outdoor amphitheater in the center of the park with 1,500 deck chairs.',
      highlight: 'Blockbusters, open-air beer garden, and fresh organic popcorn.',
      mapQuery: 'Freiluftkino Friedrichshain, 10249 Berlin'
    },
    {
      name: 'Freiluftkino Rehberge',
      location: 'Volkspark Rehberge, Wedding',
      format: 'Original Version (OmU)',
      atmosphere: 'Magical forest clearing surrounded by tall oak trees.',
      highlight: 'Peaceful atmosphere with moonlit nighttime screenings.',
      mapQuery: 'Freiluftkino Rehberge, Windhuker Str., 13351 Berlin'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black text-lg shadow-lg shadow-bvg-yellow/10">
                <Sparkles className="w-5 h-5" />
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Activities & Culture Guide
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl">
              Berlin’s soul lives outside: Sunday flea markets, train-accessible swimming lakes, open-air park cinemas, and iconic club etiquette.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% Public Transit Accessible (BVG)</span>
            </span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-6 border-t border-white/10 mt-6">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-metro ${
                activeCategory === c.id
                  ? 'bg-bvg-yellow text-bvg-dark shadow-md ring-2 ring-bvg-yellow/20'
                  : 'bg-bvg-gray/40 text-gray-300 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 1: SUNDAY FLEA MARKETS */}
      {activeCategory === 'flea_markets' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {fleaMarkets.map((m, idx) => (
              <div
                key={idx}
                className="bg-[#15151D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-bvg-yellow/40 transition-metro space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-lg bg-bvg-yellow/10 text-bvg-yellow border border-bvg-yellow/20">
                      {m.badge}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {m.district}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-bvg-yellow transition-colors">
                      {m.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center space-x-1 text-emerald-400">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{m.time}</span>
                      </span>
                      <span>•</span>
                      <span className="text-gray-300">{m.scale}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {m.description}
                  </p>

                  {/* Pair Recommendation Box */}
                  {m.pairedWith && (
                    <div className="bg-bvg-yellow/10 border border-bvg-yellow/30 rounded-xl p-2.5 text-xs text-bvg-yellow flex items-start space-x-2">
                      <Layers className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="block text-[11px] uppercase tracking-wider">Double Sunday Hack:</strong>
                        <span className="text-[11px] text-gray-200 leading-tight">{m.pairedWith}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-bvg-dark/80 rounded-xl p-3 border border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">Vibe:</span>
                      <span className="text-white font-medium">{m.vibe}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gray-400">BVG Transit:</span>
                      <span className="text-bvg-yellow font-medium">{m.transit}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <a
                    href={m.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(m.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-bvg-gray/60 hover:bg-bvg-yellow hover:text-bvg-dark text-gray-200 text-xs font-bold transition-metro"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Open Exact Location on Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: SWIMMING LAKES (BADESEEN) */}
      {activeCategory === 'lakes' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {lakes.map((l, idx) => (
              <div
                key={idx}
                className="bg-[#15151D] border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-400/50 transition-metro space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center space-x-1">
                      <Waves className="w-3 h-3" />
                      <span>{l.waterQuality}</span>
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {l.borough}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {l.name}
                    </h3>
                    <div className="text-xs text-cyan-300 mt-0.5 font-medium flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{l.travelTimeAlex}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {l.description}
                  </p>

                  <div className="bg-bvg-dark/80 rounded-xl p-3 border border-white/5 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 block">
                      Transit & Shore Tip:
                    </span>
                    <p className="text-[11px] text-gray-300">
                      {l.tip}
                    </p>
                    <div className="text-[10px] text-gray-400 pt-1 border-t border-white/5">
                      <strong>Line:</strong> {l.transit}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2 px-4 rounded-xl bg-bvg-gray/60 hover:bg-cyan-500 hover:text-bvg-dark text-gray-200 text-xs font-bold transition-metro"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Navigate to Shore via Transit</span>
                    <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: OPEN AIR CINEMAS (FREILUFTKINO) */}
      {activeCategory === 'cinemas' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {openAirCinemas.map((c, idx) => (
              <div
                key={idx}
                className="bg-[#15151D] border border-white/10 rounded-2xl p-5 flex flex-col justify-between hover:border-bvg-yellow/40 transition-metro space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-xl bg-bvg-yellow/10 border border-bvg-yellow/20 flex items-center justify-center text-bvg-yellow">
                    <Film className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {c.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {c.location}
                    </p>
                  </div>

                  <div className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 inline-block">
                    {c.format}
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed">
                    {c.atmosphere}
                  </p>

                  <div className="text-[11px] text-gray-400 pt-1 border-t border-white/5">
                    <strong>Highlight:</strong> {c.highlight}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-bvg-gray/60 hover:bg-bvg-yellow hover:text-bvg-dark text-gray-200 text-xs font-bold transition-metro"
                  >
                    <span>View Showtimes on Map</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: CLUB CULTURE & AWARENESS */}
      {activeCategory === 'clubs' && (
        <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
            <span className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Music className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-white">
                Berlin Club Culture, Door Policy & Awareness
              </h3>
              <p className="text-xs text-gray-400">
                Berlin’s electronic music scene is protected as UNESCO cultural heritage. Understanding the unwritten rules ensures a respectful experience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-bvg-dark/70 border border-white/5 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold uppercase text-purple-400 flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Strict Photography Ban</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Stickers are placed over phone cameras at the door (e.g. Berghain, KitKat, Tresor, Sisyphos). Never take photos or videos inside. What happens inside stays inside to protect everyone's freedom and privacy.
              </p>
            </div>

            <div className="bg-bvg-dark/70 border border-white/5 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold uppercase text-bvg-yellow flex items-center space-x-1.5">
                <Compass className="w-4 h-4" />
                <span>Door Etiquette & Vibe</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Arrive in small groups (1-2 people). Know which DJ is playing. Avoid being loud or visibly drunk in the queue. Dress authentically to yourself rather than wearing a "costume." If rejected, accept it politely without arguing.
              </p>
            </div>

            <div className="bg-bvg-dark/70 border border-white/5 p-4 rounded-xl space-y-2">
              <h4 className="text-xs font-bold uppercase text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Awareness Teams & Consent</span>
              </h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Venues have active Awareness Teams wearing visible vests. Zero tolerance for harassment, racism, homophobia, or non-consensual touch. If you or someone around you feels unsafe, notify staff immediately.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 flex items-center justify-between">
            <div className="text-xs text-purple-200">
              Check listings and lineups directly on Resident Advisor (RA Guide Berlin).
            </div>
            <a
              href="https://ra.co/events/de/berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-colors"
            >
              <span>Explore RA Berlin</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
