// Major annual Berlin events detector
export // Major annual Berlin events detector
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

// Curated Places strictly grouped by Geographic District Clusters
export // Curated Places strictly grouped by Geographic District Clusters to minimize travel time
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
