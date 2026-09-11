// District spatial coordinates (Lat, Lng) for all 22 Berlin districts (12 core + 10 outer)
export const DISTRICT_COORDINATES = {
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
export const MAJOR_STATIONS = [
  { id: 'hauptbahnhof', name: 'Berlin Hauptbahnhof', short: 'Hbf', coords: [52.5250, 13.3694], role: 'Central Cross-Rail & ICE Hub' },
  { id: 'alexanderplatz', name: 'Alexanderplatz', short: 'Alex', coords: [52.5219, 13.4132], role: 'East City Center & U/S-Bahn Pulse' },
  { id: 'ostkreuz', name: 'Ostkreuz', short: 'Ostkreuz', coords: [52.5030, 13.4690], role: 'Eastern Ring Junction & Regional Hub' },
  { id: 'suedkreuz', name: 'Südkreuz', short: 'Südkreuz', coords: [52.4754, 13.3653], role: 'Southern Ring Hub & Airport Corridor' },
  { id: 'gesundbrunnen', name: 'Gesundbrunnen', short: 'Gesundbrunnen', coords: [52.5489, 13.3762], role: 'Northern Cross-Rail & Ring Interchange' },
  { id: 'zoo_garten', name: 'Zoologischer Garten', short: 'Zoo', coords: [52.5073, 13.3324], role: 'West City Center & Regional Express' },
  { id: 'spandau', name: 'Berlin-Spandau', short: 'Spandau', coords: [52.5344, 13.1975], role: 'Western High-Speed ICE Gateway' }
];

// S41/S42 Berlin Ringbahn precise coordinate polygon loop (Zone A boundary)
export const RINGBAHN_COORDINATES = [
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
export const NIGHT_TRANSIT_LINES = [
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
export const DISTRICT_SCORES = {
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
