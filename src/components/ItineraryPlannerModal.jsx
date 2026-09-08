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

// Curated Places strictly grouped by Geographic District Clusters to minimize travel time
// All Cafes strictly verified 4.2★+ Google Maps ratings!
const DISTRICT_CLUSTERS = {
  mitte: {
    id: 'mitte',
    zoneName: 'Central Mitte & Museum Island',
    focus: 'World-Class Museums, Historic Cold War & Third-Wave Coffee',
    cafes: [
      { name: 'The Barn (Auguststraße)', rating: 4.5, area: 'Mitte', price: '€€', specialty: 'Pioneering specialty roastery with pristine pour-overs & single origins', mapQuery: 'The Barn Auguststraße Berlin', indoor: true },
      { name: 'Distrikt Coffee', rating: 4.4, area: 'Mitte', price: '€€', specialty: 'Acclaimed artisanal flat whites, fluffy buttermilk pancakes & brunch', mapQuery: 'Distrikt Coffee Bergstraße Berlin', indoor: true },
      { name: 'Refinery High End Coffee', rating: 4.5, area: 'Mitte', price: '€€', specialty: 'Minimalist espresso bar serving outstanding Scandinavian roast profiles', mapQuery: 'Refinery High End Coffee Berlin', indoor: true },
      { name: '19grams Alex (Karl-Liebknecht)', rating: 4.6, area: 'Mitte', price: '€€', specialty: 'Spacious specialty lab with in-house roastery near Alexanderplatz', mapQuery: '19grams Alex Berlin', indoor: true }
    ],
    cafes_splurge: [
      { name: 'House of Small Wonder', rating: 4.5, area: 'Mitte', price: '€€€', specialty: 'Botanical greenhouse sanctuary with Japanese-influenced premium brunch', mapQuery: 'House of Small Wonder Berlin', indoor: true },
      { name: 'Café Einstein Stammhaus (Kurfürstenstr.)', rating: 4.4, area: 'Tiergarten/Mitte', price: '€€€', specialty: 'Grand Viennese coffee palace with apple strudel in 1878 villa', mapQuery: 'Café Einstein Berlin', indoor: true }
    ],
    museums: {
      art: [
        { name: 'Hamburger Bahnhof (Contemporary Art)', area: 'Mitte (Moabit)', mapQuery: 'Hamburger Bahnhof Berlin', indoor: true },
        { name: 'Alte Nationalgalerie', area: 'Mitte (Museum Island)', mapQuery: 'Alte Nationalgalerie Berlin', indoor: true },
        { name: 'Bode-Museum (Sculpture & Byzantine)', area: 'Mitte (Museum Island)', mapQuery: 'Bode Museum Berlin', indoor: true }
      ],
      history: [
        { name: 'DDR Museum (Everyday Socialist Life)', area: 'Mitte', mapQuery: 'DDR Museum Berlin', indoor: true },
        { name: 'Deutsches Historisches Museum (DHM)', area: 'Mitte', mapQuery: 'Deutsches Historisches Museum Berlin', indoor: true },
        { name: 'Futurium (House of Futures & AI)', area: 'Mitte (Regierungsviertel)', mapQuery: 'Futurium Berlin', indoor: true }
      ],
      general: [
        { name: 'Neues Museum (Bust of Nefertiti)', area: 'Mitte (Museum Island)', mapQuery: 'Neues Museum Berlin', indoor: true },
        { name: 'Pergamonmuseum. Das Panorama', area: 'Mitte (Museum Island)', mapQuery: 'Pergamonmuseum Das Panorama Berlin', indoor: true },
        { name: 'Futurium (House of Futures & AI)', area: 'Mitte (Regierungsviertel)', mapQuery: 'Futurium Berlin', indoor: true }
      ]
    },
    doner: [
      { name: 'K’Ups Gemüsekebap (Torstraße/Mitte)', area: 'Mitte', price: '€', note: 'Top-tier crisp vegetables, artisanal baked bread & fresh garlic sauce', mapQuery: 'K’Ups Gemüsekebap Berlin', indoor: true },
      { name: 'Hisar Fresh Food', area: 'Mitte / Tiergarten', price: '€', note: 'Juicy spiced meat and homemade lavash bread', mapQuery: 'Hisar Fresh Food Berlin', indoor: true },
      { name: 'Rosenthaler Grill und Schlemmerbuffet', area: 'Mitte', price: '€', note: 'Legendary Rosenthaler Platz late-night döner favorite', mapQuery: 'Rosenthaler Grill Berlin', indoor: true }
    ],
    splurge_dining: [
      { name: 'Grill Royal (Riverside Dining)', area: 'Mitte (Spree waterfront)', price: '€€€€', note: 'Premier dry-aged steaks, high-profile crowd & Spree views', mapQuery: 'Grill Royal Berlin', indoor: true },
      { name: 'Katz Orange', area: 'Mitte (Bergstraße)', price: '€€€', note: 'Slow-cooked gourmet cuisine in charming romantic brick courtyard', mapQuery: 'Katz Orange Berlin', indoor: true },
      { name: 'Cookies Cream (Michelin Star Vegetarian)', area: 'Mitte', price: '€€€€', note: 'Hidden chic industrial Michelin-starred vegetarian dining experience', mapQuery: 'Cookies Cream Berlin', indoor: true }
    ],
    cold_war: [
      { name: 'Gedenkstätte Berliner Mauer (Bernauer Str.)', area: 'Mitte', note: 'Original preserved border strip, watchtower & documentation center', mapQuery: 'Gedenkstätte Berliner Mauer Berlin', indoor: false, rainAlt: 'Tränenpalast Indoor Border Exhibition' },
      { name: 'Checkpoint Charlie & Black Box', area: 'Mitte', note: 'Historic Cold War tank standoff border crossing', mapQuery: 'Checkpoint Charlie Berlin', indoor: false, rainAlt: 'Mauermuseum Checkpoint Charlie' },
      { name: 'Tränenpalast (Palace of Tears)', area: 'Mitte (Friedrichstraße)', note: 'Emotional historic border crossing terminal between East & West', mapQuery: 'Tränenpalast Berlin', indoor: true }
    ],
    beer_gardens: [
      { name: 'Zollpackhof Biergarten', area: 'Mitte (Regierungsviertel)', price: '€€', note: 'Historic riverside beer garden beneath massive horse chestnut trees facing the Chancellery', mapQuery: 'Zollpackhof Berlin', indoor: false, rainAlt: 'Zollpackhof Indoor Brauhaus Vaults' },
      { name: 'Schleusenkrug', area: 'Tiergarten / Mitte border', price: '€€', note: 'Charming waterside garden terrace beside the river lock', mapQuery: 'Schleusenkrug Berlin', indoor: false, rainAlt: 'Brauhaus Georgbræu Nikolaiviertel' }
    ],
    splurge_bars: [
      { name: 'Bar Tausend (Hidden under S-Bahn)', area: 'Mitte (Schiffbauerdamm)', price: '€€€', note: 'Stealth iron door entry beneath the railway, bespoke mixology & live jazz', mapQuery: 'Bar Tausend Berlin', indoor: true },
      { name: 'Newton Bar', area: 'Mitte (Gendarmenmarkt)', price: '€€€', note: 'Glamorous leather lounge with massive Helmut Newton photography & champagne', mapQuery: 'Newton Bar Berlin', indoor: true }
    ],
    clubs: {
      house: [
        { name: 'Tresor (Globus Floor)', area: 'Mitte', note: 'Uptempo house and warm groove rhythms on the upper Globus floor', indoor: true },
        { name: 'KitKatClub (Symbiotikka/PiepShow)', area: 'Mitte', note: 'Wild legendary counter-culture dance music landmark', indoor: true }
      ],
      hard_techno: [
        { name: 'Tresor (The Vault)', area: 'Mitte', note: 'Historic industrial bank vault with pitch-black strobe & intense bass', indoor: true },
        { name: 'Kraftwerk Berlin (OHM)', area: 'Mitte', note: 'Intimate experimental and heavy electronic beats inside former battery room', indoor: true }
      ],
      non_techno: [
        { name: 'Sage Club (Rock Nights)', area: 'Mitte', note: 'Live rock bands, indie anthems and covered lounge', indoor: true }
      ]
    },
    boat_tours: [
      { name: 'Historic City Center Spree Cruise', area: 'Mitte (Friedrichstraße)', note: 'Panoramic cruise past Reichstag, Museum Island, and Berlin Cathedral (Glass-covered heated cabin)', mapQuery: 'Friedrichstraße Boat Dock Berlin', indoor: true }
    ]
  },
  kreuzberg: {
    id: 'kreuzberg',
    zoneName: 'Kreuzberg & Landwehr Canal',
    focus: 'Kiez Culture, Third-Wave Bakeries, Modern Art & Iconic Street Food',
    cafes: [
      { name: 'Five Elephant (Reichenberger Str.)', rating: 4.6, area: 'Kreuzberg', price: '€€', specialty: 'World-famous Philadelphia cheesecake paired with stellar light single roasts', mapQuery: 'Five Elephant Kreuzberg Berlin', indoor: true },
      { name: 'Bonanza Coffee Roasters (Adalbertstr.)', rating: 4.5, area: 'Kreuzberg', price: '€€', specialty: 'Architectural industrial brick courtyard sanctuary with smooth flat whites', mapQuery: 'Bonanza Coffee Roasters Adalbertstr Berlin', indoor: true },
      { name: 'Companion Coffee & Tea', rating: 4.5, area: 'Kreuzberg (Oranienstr.)', price: '€€', specialty: 'Exceptional specialty direct-trade teas and masterfully pulled espressos', mapQuery: 'Companion Coffee Berlin', indoor: true },
      { name: 'Populus Coffee', rating: 4.7, area: 'Kreuzberg (Maybachufer)', price: '€€', specialty: 'Finnish-inspired specialty coffee roasters on the scenic canal bank', mapQuery: 'Populus Coffee Berlin', indoor: true }
    ],
    cafes_splurge: [
      { name: 'Kaffeebar Berlin (Graefekiez)', rating: 4.6, area: 'Kreuzberg', price: '€€€', specialty: 'Artisan brioche French toast, organic bowls and specialty coffee in upscale Graefekiez', mapQuery: 'Kaffeebar Berlin', indoor: true }
    ],
    museums: {
      art: [
        { name: 'Berlinische Galerie', area: 'Kreuzberg', mapQuery: 'Berlinische Galerie Berlin', indoor: true },
        { name: 'Gropius Bau (Exhibitions)', area: 'Kreuzberg', mapQuery: 'Gropius Bau Berlin', indoor: true },
        { name: 'König Galerie (St. Agnes Church)', area: 'Kreuzberg', mapQuery: 'König Galerie Berlin', indoor: true }
      ],
      history: [
        { name: 'Jewish Museum Berlin (Daniel Libeskind)', area: 'Kreuzberg', mapQuery: 'Jewish Museum Berlin', indoor: true },
        { name: 'Topography of Terror (SS/Gestapo Headquarters)', area: 'Kreuzberg', mapQuery: 'Topography of Terror Berlin', indoor: true },
        { name: 'Deutsches Technikmuseum', area: 'Kreuzberg', mapQuery: 'Deutsches Technikmuseum Berlin', indoor: true }
      ],
      general: [
        { name: 'Deutsches Technikmuseum', area: 'Kreuzberg', mapQuery: 'Deutsches Technikmuseum Berlin', indoor: true },
        { name: 'Jewish Museum Berlin', area: 'Kreuzberg', mapQuery: 'Jewish Museum Berlin', indoor: true },
        { name: 'Berlinische Galerie', area: 'Kreuzberg', mapQuery: 'Berlinische Galerie Berlin', indoor: true }
      ]
    },
    doner: [
      { name: 'Mustafa’s Gemüsekebap', area: 'Kreuzberg (Mehringdamm)', price: '€', note: 'The world-famous roasted veggies, feta cheese & lemon juice kebab', mapQuery: 'Mustafas Gemüsekebap Berlin', indoor: false, rainAlt: 'Markthalle Neun Indoor Street Food Hall' },
      { name: 'Tadim Döner (Kottbusser Tor)', area: 'Kreuzberg', price: '€', note: 'Authentic 100% seasoned veal döner with crispy house-baked pide', mapQuery: 'Tadim Döner Berlin', indoor: true },
      { name: 'Imren Grill (Boppstraße)', area: 'Kreuzberg', price: '€', note: 'Cinnamon-infused beef skewer with beef tallow basting (Connoisseur choice)', mapQuery: 'Imren Grill Boppstraße Berlin', indoor: true }
    ],
    splurge_dining: [
      { name: 'Nobelhart & Schmutzig (Michelin Star)', area: 'Kreuzberg (Friedrichstraße)', price: '€€€€', note: 'Radically local Michelin 1-star counter dining with 10-course culinary symphony', mapQuery: 'Nobelhart Schmutzig Berlin', indoor: true },
      { name: 'Tim Raue (2 Michelin Stars)', area: 'Kreuzberg (Checkpoint Charlie)', price: '€€€€', note: 'World 50 Best restaurant blending Asian explosive flavors with German discipline', mapQuery: 'Restaurant Tim Raue Berlin', indoor: true },
      { name: 'Hallesches Haus Dining', area: 'Kreuzberg (Tempelhofer Ufer)', price: '€€€', note: 'Refined seasonal European dining inside dramatic 19th-century post office hall', mapQuery: 'Hallesches Haus Berlin', indoor: true }
    ],
    cold_war: [
      { name: 'Topography of Terror (Preserved Outer Wall)', area: 'Kreuzberg', note: 'Long stretch of authentic Berlin Wall ruins alongside Gestapo excavations', mapQuery: 'Topography of Terror Berlin', indoor: true },
      { name: 'Bethaniendamm Border Strip', area: 'Kreuzberg', note: 'Historic boundary path between Kreuzberg (West) and Mitte/Friedrichshain (East)', mapQuery: 'Bethaniendamm Berlin', indoor: false, rainAlt: 'Künstlerhaus Bethanien Indoor Art Studios' }
    ],
    beer_gardens: [
      { name: 'BRLO Brwhouse (Gleisdreieck Park)', area: 'Kreuzberg', price: '€€', note: 'Modern craft beer temple built from 38 upcycled shipping containers (has huge indoor industrial taproom)', mapQuery: 'BRLO Brwhouse Berlin', indoor: true },
      { name: 'Golgatha Biergarten (Viktoriapark)', area: 'Kreuzberg', price: '€€', note: 'Sunlit rustic beer terrace atop the highest natural hill in Kreuzberg', mapQuery: 'Golgatha Biergarten Berlin', indoor: false, rainAlt: 'Vagabund Brauerei Indoor Taproom' }
    ],
    splurge_bars: [
      { name: 'Velvet Bar (Seasonal Botany Cocktails)', area: 'Neukölln/Kreuzberg border', price: '€€€', note: 'Named Germany’s Bar of the Year for botanical distillates made from wild foraged plants', mapQuery: 'Velvet Bar Berlin', indoor: true },
      { name: 'Limonadier', area: 'Kreuzberg (Bergmannkiez)', price: '€€€', note: 'Glamorous 1920s speakeasy salon crafting artisanal house sodas and cocktails', mapQuery: 'Limonadier Berlin', indoor: true }
    ],
    clubs: {
      house: [
        { name: 'Watergate', area: 'Kreuzberg (Oberbaumbrücke)', note: 'Floor-to-ceiling LED ceiling with breathtaking Spree views & melodic house', indoor: true },
        { name: 'Club der Visionäre', area: 'Kreuzberg (Canal)', note: 'Intimate wooden deck over the water for sunlit minimal & microhouse', indoor: false, rainAlt: 'Chalet / Hoppetosse Heated Party Boat' }
      ],
      hard_techno: [
        { name: 'SO36 (Techno/Electro Nights)', area: 'Kreuzberg', note: 'High-energy counterculture clubbing on vibrant Oranienstraße', indoor: true },
        { name: 'Gretchen', area: 'Kreuzberg', note: 'Bass-heavy electronic music, drum & bass and dark electro in historic stables', indoor: true }
      ],
      non_techno: [
        { name: 'SO36', area: 'Kreuzberg (Oranienstraße)', note: 'Legendary punk, roller-disco and queer celebration institution', indoor: true }
      ]
    },
    boat_tours: [
      { name: 'Landwehrkanal & Spree Historic Cruise', area: 'Kreuzberg (Urbanhafen dock)', note: 'Scenic tour passing through 64 bridges, canal locks & willows (Weather-proof saloon)', mapQuery: 'Urbanhafen Berlin', indoor: true }
    ]
  },
  friedrichshain: {
    id: 'friedrichshain',
    zoneName: 'Friedrichshain & Urban Spree Waterfront',
    focus: 'East Side Gallery, Industrial RAW-Gelände & World Techno Hub',
    cafes: [
      { name: 'Silo Coffee', rating: 4.4, area: 'Friedrichshain (Boxhagener Str.)', price: '€€', specialty: 'Aussie-style brunch pioneer with house-roasted specialty coffees', mapQuery: 'Silo Coffee Berlin', indoor: true },
      { name: 'Happy Baristas', rating: 4.5, area: 'Friedrichshain (Ostkreuz)', price: '€€', specialty: 'Creative nitro cold brews, single origin batch brews & matcha', mapQuery: 'Happy Baristas Berlin', indoor: true },
      { name: 'Coffee Profilers', rating: 4.4, area: 'Friedrichshain (Karl-Marx-Allee)', price: '€€', specialty: 'Award-winning baristas & exquisite espresso flavor profiles', mapQuery: 'Coffee Profilers Berlin', indoor: true },
      { name: '19grams Boxi', rating: 4.5, area: 'Friedrichshain (Boxhagener Platz)', price: '€€', specialty: 'Neighborhood favorite with lively square view & artisanal beans', mapQuery: '19grams Boxhagener Berlin', indoor: true }
    ],
    cafes_splurge: [
      { name: 'Michelberger Restaurant & Café', rating: 4.5, area: 'Friedrichshain (Warschauer Str.)', price: '€€€', specialty: 'Creative organic culinary hotel lounge with fireplace and specialty roast', mapQuery: 'Michelberger Hotel Berlin', indoor: true }
    ],
    museums: {
      art: [
        { name: 'Urban Nation Museum (Urban Art)', area: 'Urban Art', mapQuery: 'Urban Nation Berlin', indoor: true },
        { name: 'Kühlhaus Berlin', area: 'Friedrichshain border', mapQuery: 'Kühlhaus Berlin', indoor: true },
        { name: 'East Side Gallery Open Art', area: 'Friedrichshain', mapQuery: 'East Side Gallery Berlin', indoor: false, rainAlt: 'The Wall Museum East Side Gallery' }
      ],
      history: [
        { name: 'Computerspielemuseum (Vintage Gaming & Tech)', area: 'Friedrichshain (Karl-Marx-Allee)', mapQuery: 'Computerspielemuseum Berlin', indoor: true },
        { name: 'The Wall Museum East Side Gallery', area: 'Friedrichshain', mapQuery: 'The Wall Museum East Side Gallery Berlin', indoor: true },
        { name: 'Stasi Museum (Normannenstraße)', area: 'Lichtenberg / F’hain border', mapQuery: 'Stasi Museum Berlin', indoor: true }
      ],
      general: [
        { name: 'Computerspielemuseum', area: 'Friedrichshain', mapQuery: 'Computerspielemuseum Berlin', indoor: true },
        { name: 'The Wall Museum East Side Gallery', area: 'Friedrichshain', mapQuery: 'The Wall Museum East Side Gallery Berlin', indoor: true }
      ]
    },
    doner: [
      { name: 'Döner Dach (Simon-Dach-Straße)', area: 'Friedrichshain', price: '€', note: 'Generous portions, crispy sesame bread & fiery hot sauce on party strip', mapQuery: 'Döner Dach Berlin', indoor: true },
      { name: 'Gemüse Kebab am Boxi', area: 'Friedrichshain', price: '€', note: 'Fresh grilled zucchini, peppers & goat cheese crumbled over tender chicken', mapQuery: 'Gemüse Kebab Boxhagener Berlin', indoor: true }
    ],
    splurge_dining: [
      { name: 'Michelberger Farm-to-Table Restaurant', area: 'Friedrichshain', price: '€€€', note: 'Regenerative bio-farm produce crafted into inventive small plates and organic wines', mapQuery: 'Michelberger Restaurant Berlin', indoor: true },
      { name: 'Goldies Smashburger (Gourmet Street Food)', area: 'Friedrichshain', price: '€€', note: 'Created by Michelin-starred chefs, the crispiest dry-aged smashburgers in Germany', mapQuery: 'Goldies Smashburger Berlin', indoor: true }
    ],
    cold_war: [
      { name: 'East Side Gallery', area: 'Friedrichshain', note: '1.3 km preserved open-air Berlin Wall gallery featuring The Fraternal Kiss', mapQuery: 'East Side Gallery Berlin', indoor: false, rainAlt: 'The Wall Museum (Covered Gallery)' },
      { name: 'Oberbaumbrücke', area: 'Friedrichshain / Kreuzberg', note: 'Iconic double-deck red brick bridge that served as Cold War checkpoint', mapQuery: 'Oberbaumbrücke Berlin', indoor: false, rainAlt: 'Computerspielemuseum Indoor Exhibition' },
      { name: 'Karl-Marx-Allee Socialist Boulevard', area: 'Friedrichshain', note: 'Monolithic Soviet-era Wedding-cake monumental architecture', mapQuery: 'Karl Marx Allee Berlin', indoor: false, rainAlt: 'Kino International Historic GDR Cinema' }
    ],
    beer_gardens: [
      { name: 'Biergarten Jockel', area: 'Friedrichshain / Kreuzberg border', price: '€€', note: 'Lush canal-side garden terrace with wood-fired pizza and German tap beers', mapQuery: 'Biergarten Jockel Berlin', indoor: false, rainAlt: 'Hops & Barley Microbrewery (Covered taproom)' },
      { name: 'Cassiopeia Beer Garden (RAW)', area: 'Friedrichshain', price: '€€', note: 'Gritty industrial graffiti courtyard with chill outdoor seating and craft brews', mapQuery: 'Cassiopeia Berlin', indoor: false, rainAlt: 'Doldenblütler Craft Beer Bar' }
    ],
    splurge_bars: [
      { name: 'Fairytale Bar (Speakeasy)', area: 'Friedrichshain (Am Friedrichshain)', price: '€€€', note: 'Ring the doorbell into an Alice-in-Wonderland magical world of smoke and artisanal elixirs', mapQuery: 'Fairytale Bar Berlin', indoor: true }
    ],
    clubs: {
      house: [
        { name: 'Sisyphos', area: 'Rummelsburg / F’hain border', note: 'Legendary outdoor playground with open-air sand beach & warm melodic house', indoor: true },
        { name: 'Renate (Salon zur Wilden Renate)', area: 'Friedrichshain', note: 'Quirky multi-room labyrinthine house club with cozy attic & garden', indoor: true }
      ],
      hard_techno: [
        { name: 'Berghain / Panorama Bar', area: 'Friedrichshain', note: 'World temple of techno. Strict door policy: know the DJ, wear black, solo/duo', indoor: true },
        { name: 'About Blank', area: 'Friedrichshain (Ostkreuz)', note: 'Dark multi-room techno floors & sprawling leafy outdoor garden', indoor: true }
      ],
      non_techno: [
        { name: 'Cassiopeia', area: 'Friedrichshain (RAW)', note: 'High energy 90s/2000s party, hip hop & indie rock floors', indoor: true },
        { name: 'Astra Kulturhaus', area: 'Friedrichshain (RAW)', note: 'Live music concerts, indie and alternative party nights', indoor: true }
      ]
    },
    boat_tours: [
      { name: 'East Side Spree & Mediaspree Cruise', area: 'Friedrichshain (Mercedes Platz dock)', note: 'River views of the Wall, Molecule Man, and historic harbor', mapQuery: 'Mercedes Platz Berlin', indoor: true }
    ]
  },
  prenzlauer_berg: {
    id: 'prenzlauer_berg',
    zoneName: 'Prenzlauer Berg & Tiergarten Greens',
    focus: 'Historic Beer Gardens, Bohemian Boutiques, Green Parks & Roasteries',
    cafes: [
      { name: 'Bonanza Coffee Heroes (Oderberger Str.)', rating: 4.5, area: 'Prenzlauer Berg', price: '€€', specialty: 'The birthplace of Berlin third-wave coffee on tree-lined Oderberger', mapQuery: 'Bonanza Coffee Oderberger Str Berlin', indoor: true },
      { name: 'Godshot Espresso Bar', rating: 4.6, area: 'Prenzlauer Berg', price: '€€', specialty: 'Serious espresso craftsmanship with exquisite micro-batch beans', mapQuery: 'Godshot Berlin', indoor: true },
      { name: 'No Fire No Glory', rating: 4.5, area: 'Prenzlauer Berg (Rykestr.)', price: '€€', specialty: 'Charming terrace coffee bar facing the famous Water Tower', mapQuery: 'No Fire No Glory Berlin', indoor: true },
      { name: 'Café Anna Blume', rating: 4.4, area: 'Prenzlauer Berg (Kollwitzkiez)', price: '€€', specialty: 'Famous 3-tier breakfast towers with floral arrangements & specialty brew', mapQuery: 'Café Anna Blume Berlin', indoor: true }
    ],
    cafes_splurge: [
      { name: 'The Barn Roastery (Schönhauser Allee)', rating: 4.6, area: 'Prenzlauer Berg', price: '€€€', specialty: 'Spacious glass flagship roastery with cupping sessions and rare geisha coffees', mapQuery: 'The Barn Roastery Berlin', indoor: true }
    ],
    museums: {
      art: [
        { name: 'Kulturbrauerei Museum & Arts', area: 'Prenzlauer Berg', mapQuery: 'Kulturbrauerei Berlin', indoor: true },
        { name: 'Museum Pankow', area: 'Prenzlauer Berg', mapQuery: 'Museum Pankow Berlin', indoor: true }
      ],
      history: [
        { name: 'Museum in der Kulturbrauerei (Everyday Life in the GDR)', area: 'Prenzlauer Berg', mapQuery: 'Museum in der Kulturbrauerei Berlin', indoor: true },
        { name: 'Gedenkstätte Berliner Mauer (Mauerpark border)', area: 'Prenzlauer Berg', mapQuery: 'Gedenkstätte Berliner Mauer Berlin', indoor: false, rainAlt: 'Zeiss Major Planetarium (Full Dome Show)' }
      ],
      general: [
        { name: 'Museum in der Kulturbrauerei', area: 'Prenzlauer Berg', mapQuery: 'Museum in der Kulturbrauerei Berlin', indoor: true },
        { name: 'Zeiss Major Planetarium', area: 'Prenzlauer Berg', mapQuery: 'Zeiss Grossplanetarium Berlin', indoor: true }
      ]
    },
    doner: [
      { name: 'Rüyam Gemüse Kebab #2', area: 'Prenzlauer Berg (Schönhauser Allee)', price: '€', note: 'Consistently voted Berlin’s friendliest and best chicken gemüsekebap with fresh mint', mapQuery: 'Rüyam Gemüse Kebab Schönhauser Allee Berlin', indoor: true },
      { name: 'K’Ups Gemüsekebap', area: 'Prenzlauer Berg (Kastanienallee)', price: '€', note: 'Fluffy sourdough toasted flatbread with baked caramelized carrots & eggplant', mapQuery: 'K’Ups Gemüsekebap Berlin', indoor: true }
    ],
    splurge_dining: [
      { name: 'Mrs Robinson’s', area: 'Prenzlauer Berg (Pappelallee)', price: '€€€€', note: 'Exquisite modern Asian & European tasting menus celebrated for creative umami pairings', mapQuery: 'Mrs Robinsons Berlin', indoor: true },
      { name: 'Gugelhof (Historic Alsatian Dining)', area: 'Prenzlauer Berg (Kollwitzplatz)', price: '€€€', note: 'Iconic gourmet tavern where Bill Clinton dined with Chancellor Gerhard Schröder', mapQuery: 'Gugelhof Berlin', indoor: true }
    ],
    cold_war: [
      { name: 'Bornholmer Straße (Bösebrücke Border)', area: 'Prenzlauer Berg', note: 'The exact historical border crossing where the Berlin Wall first opened on Nov 9, 1989', mapQuery: 'Platz des 9. November 1989 Berlin', indoor: false, rainAlt: 'Museum in der Kulturbrauerei' },
      { name: 'Mauerpark Preserved Hinterland Wall', area: 'Prenzlauer Berg', note: 'Historic death strip transformed into colorful graffiti park and open-air flea market', mapQuery: 'Mauerpark Berlin', indoor: false, rainAlt: 'Museum Pankow Indoor Exhibition' }
    ],
    beer_gardens: [
      { name: 'Prater Biergarten', area: 'Prenzlauer Berg (Kastanienallee)', price: '€€', note: 'Berlin’s oldest and most iconic beer garden (since 1837) under giant chestnut trees', mapQuery: 'Prater Biergarten Berlin', indoor: false, rainAlt: 'Prater Indoor Restaurant & Gaststätte' },
      { name: 'Pfefferberg Biergarten', area: 'Prenzlauer Berg (Schönhauser Allee)', price: '€€', note: 'Elevated industrial terrace serving house-brewed craft beers', mapQuery: 'Pfefferberg Berlin', indoor: true }
    ],
    splurge_bars: [
      { name: 'Beckett’s Kopf (Hidden Parlour)', area: 'Prenzlauer Berg (Pappelallee)', price: '€€€', note: 'Ring the bell beneath the portrait of Samuel Beckett for world-class bespoke cocktails', mapQuery: 'Becketts Kopf Berlin', indoor: true }
    ],
    clubs: {
      house: [
        { name: 'Frannz Club (Kulturbrauerei)', area: 'Prenzlauer Berg', note: 'Eclectic dance parties, soul, funk and accessible house rhythms', indoor: true }
      ],
      hard_techno: [
        { name: 'Tresor (via direct U2 line)', area: 'Mitte connection', note: 'Quick 12-minute ride to Berlin’s premier industrial techno vault', indoor: true }
      ],
      non_techno: [
        { name: 'Kesselhaus (Kulturbrauerei)', area: 'Prenzlauer Berg', note: 'Concerts, alternative rock and indie celebrations in a vast 19th-century brick brewery', indoor: true }
      ]
    },
    boat_tours: [
      { name: 'Spree City Tour (Mitte Border)', area: 'Spree River', note: 'Panoramic boat ride along the scenic bend of the river Spree', mapQuery: 'Friedrichstraße Boat Dock Berlin', indoor: true }
    ]
  }
};

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
    const clusterKeys = ['mitte', 'kreuzberg', 'friedrichshain', 'prenzlauer_berg'];
    const days = [];

    for (let i = 0; i < dayCount; i++) {
      const dayNum = i + 1;
      const clusterKey = clusterKeys[i % clusterKeys.length];
      const cluster = DISTRICT_CLUSTERS[clusterKey];
      const dayStops = [];

      // 1. Specialty Café (Budget: Classic 4.2★+ | Splurge: Botanical/Chic Salon)
      if (selectedActivities.cafes) {
        const cafePool = (budgetTier === 'splurge' && cluster.cafes_splurge?.length > 0) 
          ? cluster.cafes_splurge 
          : cluster.cafes;
        const cafe = cafePool[0];
        dayStops.push({
          categoryKey: budgetTier === 'splurge' ? 'cafes_splurge' : 'cafes',
          clusterKey,
          currentAltIdx: 0,
          time: '09:30 AM',
          type: budgetTier === 'splurge' ? '✨ Luxury Brunch & Specialty Coffee' : '☕ Specialty Coffee & Breakfast',
          title: cafe.name,
          rating: cafe.rating,
          price: cafe.price,
          location: cafe.area,
          detail: cafe.specialty,
          mapsQuery: cafe.mapQuery,
          isIndoor: cafe.indoor
        });
      }

      // 2. Museums (strictly in this neighborhood)
      if (selectedActivities.museums && (i % 2 === 0 || tempo === 'efficient')) {
        const museumPool = cluster.museums[museumType] || cluster.museums.general;
        for (let mIdx = 0; mIdx < museumsPerDay; mIdx++) {
          const mus = museumPool[mIdx % museumPool.length];
          dayStops.push({
            categoryKey: 'museums',
            clusterKey,
            currentAltIdx: mIdx % museumPool.length,
            time: mIdx === 0 ? '11:00 AM' : '02:45 PM',
            type: `🏛️ ${museumType === 'art' ? 'Art Gallery' : museumType === 'history' ? 'Cold War / History Museum' : 'Cultural Landmark'}`,
            title: mus.name,
            location: mus.area,
            detail: 'Allow ~1.5 to 2 hours. Advance online reservation recommended.',
            mapsQuery: mus.mapQuery,
            isIndoor: mus.indoor !== false
          });
        }
      }

      // 3. Lunch (Budget: Döner/Street food | Splurge: Fine Dining / Michelin Bistro)
      if (selectedActivities.doner) {
        if (budgetTier === 'splurge' && cluster.splurge_dining?.length > 0) {
          const dining = cluster.splurge_dining[0];
          dayStops.push({
            categoryKey: 'splurge_dining',
            clusterKey,
            currentAltIdx: 0,
            time: '01:30 PM',
            type: '🍽️ Splurge Gourmet Lunch / Bistro',
            title: dining.name,
            price: dining.price,
            location: dining.area,
            detail: dining.note,
            mapsQuery: dining.mapQuery,
            isIndoor: dining.indoor
          });
        } else {
          let don = cluster.doner[0];
          let detailText = don.note;
          // Rain mode adaptation
          if (isRainMode && don.indoor === false && don.rainAlt) {
            detailText = `☔ Rain Contingency Active: Swapped to covered dining (${don.rainAlt}). Original: ${don.note}`;
          }
          dayStops.push({
            categoryKey: 'doner',
            clusterKey,
            currentAltIdx: 0,
            time: '01:30 PM',
            type: '🥙 Iconic Street Food Lunch',
            title: isRainMode && don.rainAlt ? `${don.name} (${don.rainAlt})` : don.name,
            price: don.price,
            location: don.area,
            detail: detailText,
            mapsQuery: don.mapQuery,
            isIndoor: isRainMode || don.indoor
          });
        }
      }

      // 4. Cold War / Memorial or Boat Tour (strictly in this neighborhood)
      if (selectedActivities.cold_war && cluster.cold_war?.length > 0) {
        let cw = cluster.cold_war[0];
        let cwTitle = cw.name;
        let cwDetail = cw.note;

        // If rain mode is on and spot is outdoors, adapt to covered indoor memorial alternative
        if (isRainMode && !cw.indoor && cw.rainAlt) {
          cwTitle = `${cw.rainAlt} (Indoor Memorial)`;
          cwDetail = `☔ Rain Mode Active: Visiting indoor exhibition rather than uncovered outdoor strip. ${cw.note}`;
        }

        dayStops.push({
          categoryKey: 'cold_war',
          clusterKey,
          currentAltIdx: 0,
          time: '04:00 PM',
          type: '🧱 Cold War & Memorial Site',
          title: cwTitle,
          location: cw.area,
          detail: cwDetail,
          mapsQuery: isRainMode && cw.rainAlt ? `${cw.rainAlt} Berlin` : cw.mapQuery,
          isIndoor: isRainMode || cw.indoor
        });
      } else if (selectedActivities.boat_tours && cluster.boat_tours?.length > 0) {
        const boat = cluster.boat_tours[0];
        dayStops.push({
          categoryKey: 'boat_tours',
          clusterKey,
          currentAltIdx: 0,
          time: '04:15 PM',
          type: '🚢 Scenic Spree River Cruise',
          title: boat.name,
          location: boat.area,
          detail: boat.note,
          mapsQuery: boat.mapQuery,
          isIndoor: true
        });
      }

      // 5. Evening Drink: Beer Garden or Splurge Speakeasy / Craft Bar
      if (selectedActivities.beer_gardens && (tempo !== 'chill' || i % 2 === 0)) {
        if (budgetTier === 'splurge' && cluster.splurge_bars?.length > 0) {
          const bar = cluster.splurge_bars[0];
          dayStops.push({
            categoryKey: 'splurge_bars',
            clusterKey,
            currentAltIdx: 0,
            time: '06:00 PM',
            type: '🍸 High-End Speakeasy & Cocktails',
            title: bar.name,
            price: bar.price,
            location: bar.area,
            detail: bar.note,
            mapsQuery: bar.mapQuery,
            isIndoor: bar.indoor
          });
        } else if (cluster.beer_gardens?.length > 0) {
          let bg = cluster.beer_gardens[0];
          let bgTitle = bg.name;
          let bgDetail = bg.note;

          if (isRainMode && !bg.indoor && bg.rainAlt) {
            bgTitle = `${bg.rainAlt} (Heated Indoor)`;
            bgDetail = `☔ Rain Contingency: Swapped to cozy covered taproom/vaults. ${bg.note}`;
          }

          dayStops.push({
            categoryKey: 'beer_gardens',
            clusterKey,
            currentAltIdx: 0,
            time: '06:00 PM',
            type: isRainMode ? '🍺 Craft Beer & Covered Vault Chill' : '🍺 Craft Beer & Garden Chill',
            title: bgTitle,
            price: bg.price,
            location: bg.area,
            detail: bgDetail,
            mapsQuery: isRainMode && bg.rainAlt ? `${bg.rainAlt} Berlin` : bg.mapQuery,
            isIndoor: isRainMode || bg.indoor
          });
        }
      }

      // 6. Club Nightlife (strictly in this neighborhood or close corridor)
      if (selectedActivities.clubs && (i === dayCount - 1 || i === 1)) {
        const clubsForGenre = cluster.clubs[clubGenre] || cluster.clubs.house;
        const mainClub = clubsForGenre[0];
        const backupClub = clubsForGenre[1] || clubsForGenre[0];

        dayStops.push({
          categoryKey: 'clubs',
          clusterKey,
          currentAltIdx: 0,
          time: '11:45 PM',
          type: '🪩 Berlin Nightlife & Club Experience',
          title: mainClub.name,
          location: mainClub.area,
          detail: `${mainClub.note}. Backup B-Plan: ${backupClub.name} (${backupClub.area}).`,
          mapsQuery: `${mainClub.name} Berlin`,
          doorWarning: 'Strict door policy: arrive sober, in group of 1-2, know the DJ lineup.',
          isIndoor: true
        });
      }

      // Google Maps Route URL
      const mapsStops = dayStops.map(s => encodeURIComponent(s.mapsQuery)).join('/');
      const googleMapsRouteUrl = `https://www.google.com/maps/dir/${mapsStops}`;

      // Google Maps Multi-Place Search List URL
      const googleMapsListUrl = `https://www.google.com/maps/search/${encodeURIComponent(cluster.zoneName + ' ' + dayStops.map(s => s.title.split(' (')[0]).join(' '))}`;

      days.push({
        dayNumber: dayNum,
        title: `Berlin Day ${dayNum} Trip: ${cluster.zoneName}`,
        zone: cluster.zoneName,
        focus: cluster.focus,
        stops: dayStops,
        mapsRouteUrl: googleMapsRouteUrl,
        mapsListUrl: googleMapsListUrl
      });
    }

    setGeneratedPlan({
      dayCount,
      startDate: startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      endDate: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      days,
      events: activeBerlinEvents,
      isRainMode,
      budgetTier
    });
  };

  // Substitute stop handler: picks the next vetted alternative venue in the SAME category and SAME neighborhood
  const handleSubstituteStop = (dayIdx, stopIdx) => {
    setGeneratedPlan(prevPlan => {
      if (!prevPlan) return prevPlan;

      const newDays = [...prevPlan.days];
      const targetDay = { ...newDays[dayIdx] };
      const newStops = [...targetDay.stops];
      const currentStop = newStops[stopIdx];

      const cluster = DISTRICT_CLUSTERS[currentStop.clusterKey];
      if (!cluster) return prevPlan;

      let pool = [];
      if (currentStop.categoryKey === 'museums') {
        pool = cluster.museums[museumType] || cluster.museums.general;
      } else if (currentStop.categoryKey === 'clubs') {
        pool = cluster.clubs[clubGenre] || cluster.clubs.house;
      } else {
        pool = cluster[currentStop.categoryKey] || [];
      }

      if (pool.length <= 1) return prevPlan;

      const nextIdx = (currentStop.currentAltIdx + 1) % pool.length;
      const nextItem = pool[nextIdx];

      newStops[stopIdx] = {
        ...currentStop,
        currentAltIdx: nextIdx,
        title: nextItem.name,
        rating: nextItem.rating || null,
        price: nextItem.price || currentStop.price,
        location: nextItem.area,
        detail: nextItem.specialty || nextItem.note || currentStop.detail,
        mapsQuery: nextItem.mapQuery || `${nextItem.name} Berlin`
      };

      targetDay.stops = newStops;
      
      const mapsStops = newStops.map(s => encodeURIComponent(s.mapsQuery)).join('/');
      targetDay.mapsRouteUrl = `https://www.google.com/maps/dir/${mapsStops}`;
      targetDay.mapsListUrl = `https://www.google.com/maps/search/${encodeURIComponent(targetDay.zone + ' ' + newStops.map(s => s.title.split(' (')[0]).join(' '))}`;

      newDays[dayIdx] = targetDay;

      return {
        ...prevPlan,
        days: newDays
      };
    });
  };

  // 1. OFFLINE EXPORT: Download .ICS (Apple & Google Calendar Sync)
  const handleExportICS = () => {
    if (!generatedPlan) return;

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//BerlinBase//Smart Itinerary Planner//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:BerlinBase Trip Itinerary',
      'X-WR-TIMEZONE:Europe/Berlin'
    ];

    const curYear = startDate.getFullYear();
    const curMonth = startDate.getMonth();
    const curDate = startDate.getDate();

    generatedPlan.days.forEach((day, dIdx) => {
      const eventDate = new Date(curYear, curMonth, curDate + dIdx);
      const yyyy = eventDate.getFullYear();
      const mm = String(eventDate.getMonth() + 1).padStart(2, '0');
      const dd = String(eventDate.getDate()).padStart(2, '0');

      day.stops.forEach((stop, sIdx) => {
        // Parse time: "09:30 AM" -> HHmm
        let [timeStr, modifier] = stop.time.split(' ');
        let [hours, minutes] = timeStr.split(':');
        if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours, 10) + 12);
        if (modifier === 'AM' && hours === '12') hours = '00';
        hours = hours.padStart(2, '0');
        minutes = minutes.padStart(2, '0');

        const dtStart = `${yyyy}${mm}${dd}T${hours}${minutes}00`;
        // End time roughly +2 hours
        const endHours = String((parseInt(hours, 10) + 2) % 24).padStart(2, '0');
        const dtEnd = `${yyyy}${mm}${dd}T${endHours}${minutes}00`;

        icsContent.push('BEGIN:VEVENT');
        icsContent.push(`UID:berlinbase-${dIdx}-${sIdx}-${Date.now()}@berlinbase.de`);
        icsContent.push(`SUMMARY:Day ${day.dayNumber}: ${stop.title}`);
        icsContent.push(`DESCRIPTION:${stop.type} - ${stop.detail.replace(/\n/g, ' ')}`);
        icsContent.push(`LOCATION:${stop.location}, Berlin`);
        icsContent.push(`DTSTART:${dtStart}`);
        icsContent.push(`DTEND:${dtEnd}`);
        icsContent.push('STATUS:CONFIRMED');
        icsContent.push('END:VEVENT');
      });
    });

    icsContent.push('END:VCALENDAR');

    const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `BerlinBase_Trip_${generatedPlan.dayCount}Days.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. OFFLINE EXPORT: Printable PDF Dossier (Styled Offline Document)
  const handleExportPDF = () => {
    if (!generatedPlan) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to export printable PDF.');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>BerlinBase - ${generatedPlan.dayCount} Day Berlin Itinerary</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #111; line-height: 1.4; padding: 24px; }
          .header { border-bottom: 3px solid #F0D722; padding-bottom: 12px; margin-bottom: 20px; }
          h1 { margin: 0; font-size: 24px; color: #111; }
          .meta { color: #555; font-size: 13px; margin-top: 4px; }
          .badge { display: inline-block; background: #F0D722; color: #111; padding: 2px 8px; font-weight: bold; border-radius: 4px; font-size: 11px; margin-right: 6px; }
          .day-card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 20px; page-break-inside: avoid; }
          .day-title { font-size: 16px; font-weight: bold; color: #1a1a24; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 12px; }
          .stop { display: flex; margin-bottom: 10px; font-size: 13px; }
          .time { width: 80px; font-weight: bold; color: #444; }
          .stop-content { flex: 1; }
          .stop-name { font-weight: bold; color: #000; }
          .stop-detail { color: #666; font-size: 12px; margin-top: 2px; }
          .footer { font-size: 11px; color: #888; text-align: center; border-top: 1px solid #eee; padding-top: 12px; margin-top: 30px; }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🧭 BerlinBase Smart Trip Itinerary (${generatedPlan.dayCount} Days)</h1>
          <div class="meta">
            Dates: <strong>${generatedPlan.startDate} – ${generatedPlan.endDate}</strong> | 
            Mode: ${generatedPlan.isRainMode ? '☔ Rain Contingency Active' : '☀️ Standard Weather'} | 
            Tier: ${generatedPlan.budgetTier === 'splurge' ? '✨ Luxury & Michelin Splurge' : '💶 Authentic Local Value'}
          </div>
        </div>

        ${generatedPlan.days.map(d => `
          <div class="day-card">
            <div class="day-title">Day ${d.dayNumber}: ${d.title}</div>
            <div style="font-size: 12px; color: #555; margin-bottom: 12px;">Zone focus: ${d.focus}</div>
            ${d.stops.map(s => `
              <div class="stop">
                <div class="time">${s.time}</div>
                <div class="stop-content">
                  <div class="stop-name">
                    ${s.title} ${s.rating ? `<span style="color:#d97706;">(★ ${s.rating})</span>` : ''} ${s.price ? `<span style="color:#059669;">[${s.price}]</span>` : ''}
                  </div>
                  <div class="stop-detail">${s.type} • ${s.detail} (Area: ${s.location})</div>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}

        <div class="footer">
          Generated with BerlinBase AI Travel Engine • Offline Printable PDF Copy
        </div>

        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
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
                {/* Weather Contingency Toggle */}
                <div className="bg-bvg-gray/30 border border-white/10 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center space-x-1.5">
                      <CloudRain className="w-4 h-4 text-blue-400" />
                      <span>Rain Contingency B-Plan</span>
                    </span>
                    <button
                      onClick={() => setIsRainMode(!isRainMode)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center space-x-1.5 ${
                        isRainMode 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                          : 'bg-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {isRainMode ? (
                        <>
                          <CloudRain className="w-3.5 h-3.5" />
                          <span>Active ☔</span>
                        </>
                      ) : (
                        <>
                          <Sun className="w-3.5 h-3.5" />
                          <span>Sunny Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    {isRainMode 
                      ? '☔ Automatically reroutes outdoor parks & open-air memorials to covered vaults, heated glass boats and indoor galleries.' 
                      : 'Standard outdoor & open-air itinerary with riverside beer gardens.'}
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
