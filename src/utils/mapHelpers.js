import { DISTRICT_COORDINATES, DISTRICT_SCORES } from '../data/map/districtGeoData';

/**
 * Enriches raw district lifestyle and rental datasets with geospatial coordinates,
 * difficulty scores, vibes, and multi-hub transit matrix.
 */
export function enrichDistrictData({
  districtsLifestyle = [],
  rentalsByRoom = [],
  vibesData = {},
  districtCoordinates = DISTRICT_COORDINATES,
  districtScores = DISTRICT_SCORES
}) {
  return districtsLifestyle.map(d => {
    const coords = districtCoordinates[d.district_name] || [52.52, 13.40];
    const scores = districtScores[d.district_name] || {
      difficulty: 3,
      difficultyLabel: "Moderate",
      anmeldungWeeks: 4,
      anmeldungEase: 3,
      supermarketDensity: "High"
    };
    const vibeEntry = vibesData[d.district_name] || vibesData[d.district_name.replace('Mitte (Moabit)', 'Moabit')] || {
      tags: ["Berlin Kiez", "Connected"],
      spati_density: "High"
    };

    const wg = rentalsByRoom.find(r => r.district_name === d.district_name && r.room_category === 'WG Room');
    const studio = rentalsByRoom.find(r => r.district_name === d.district_name && r.room_category === '1-Room Studio (1+0)');
    const flat = rentalsByRoom.find(r => r.district_name === d.district_name && r.room_category === '1-Bedroom Flat (1+1 / 1+2)');

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
}

/**
 * Dynamic visual styling helper with distinct 4-tier relative scales (Green, Yellow, Orange, Red)
 */
export function getMarkerStyle(item, selectedMetric, selectedRoomFilter, allDistricts = []) {
  let radius = 18;
  let fillColor = '#F0D722';
  let borderColor = '#ffffff';

  if (selectedMetric === 'transit') {
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
    const getRentVal = (d) => {
      if (!d) return 0;
      if (selectedRoomFilter === 'WG Room') return d.rent_wg;
      if (selectedRoomFilter === '1-Room Studio (1+0)') return d.rent_studio;
      return d.rent_flat;
    };

    const r = getRentVal(item);

    if (allDistricts && allDistricts.length > 0) {
      // Dynamic Quartile & Percentile Ranking:
      // Extracts active rents for all 22 districts and sorts ascending
      const allRents = allDistricts.map(d => getRentVal(d)).filter(Boolean).sort((a, b) => a - b);
      const minR = allRents[0] || 450;
      const maxR = allRents[allRents.length - 1] || 2500;
      
      // Proportional balanced radius (14px to 24px) avoiding oversized visual bloat
      radius = 14 + ((r - minR) / (maxR - minR || 1)) * 10;

      // Equal 25% quartile distribution:
      // rank / (n - 1) partitions districts into 4 equal tiers (~5-6 districts each)
      // Using indexOf ensures identical rent values share the exact same quartile tier
      const rank = allRents.indexOf(r);
      const percentile = rank / Math.max(1, allRents.length - 1);

      if (percentile < 0.25) {
        fillColor = '#10b981'; // Green: Lowest 25% (Affordable)
      } else if (percentile < 0.50) {
        fillColor = '#eab308'; // Yellow: 25% - 50% (Moderate)
      } else if (percentile < 0.75) {
        fillColor = '#ea580c'; // Orange: 50% - 75% (High)
      } else {
        fillColor = '#dc2626'; // Red: Top 25% (High / Premium)
      }
    } else {
      // Fallback
      if (r <= 600) fillColor = '#10b981';
      else if (r <= 1000) fillColor = '#eab308';
      else if (r <= 1500) fillColor = '#ea580c';
      else fillColor = '#dc2626';
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
    radius: Math.max(10, Math.min(26, Math.round(radius * 0.85)))
  };
}
