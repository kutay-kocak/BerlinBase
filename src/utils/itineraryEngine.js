import { DISTRICT_CLUSTERS, BERLIN_EVENTS } from '../data/itinerary/itineraryCatalog';

/**
 * Deterministic Itinerary Generation Engine
 * Groups activities strictly by geographic district clusters to minimize transit time.
 */
export function generateItineraryPlan({
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
  activeBerlinEvents,
  districtClusters = DISTRICT_CLUSTERS
}) {
  const clusterKeys = ['mitte', 'kreuzberg', 'friedrichshain', 'prenzlauer_berg'];
  const days = [];

  for (let i = 0; i < dayCount; i++) {
    const dayNum = i + 1;
    const clusterKey = clusterKeys[i % clusterKeys.length];
    const cluster = districtClusters[clusterKey];
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

  return {
    dayCount,
    startDate: startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    endDate: endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    days,
    events: activeBerlinEvents,
    isRainMode,
    budgetTier
  };
}

/**
 * Substitute single stop with next curated venue in same neighborhood and category
 */
export function substituteItineraryStop({
  prevPlan,
  dayIdx,
  stopIdx,
  museumType,
  clubGenre,
  districtClusters = DISTRICT_CLUSTERS
}) {
  if (!prevPlan) return prevPlan;

  const newDays = [...prevPlan.days];
  const targetDay = { ...newDays[dayIdx] };
  const newStops = [...targetDay.stops];
  const currentStop = newStops[stopIdx];

  const cluster = districtClusters[currentStop.clusterKey];
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
}

/**
 * Export plan as iCalendar (.ics) file
 */
export function exportItineraryToICS({ generatedPlan, startDate }) {
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
      let [timeStr, modifier] = stop.time.split(' ');
      let [hours, minutes] = timeStr.split(':');
      if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours, 10) + 12);
      if (modifier === 'AM' && hours === '12') hours = '00';
      hours = hours.padStart(2, '0');
      minutes = minutes.padStart(2, '0');

      const dtStart = `${yyyy}${mm}${dd}T${hours}${minutes}00`;
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
}

/**
 * Open printable PDF dossier in new window
 */
export function exportItineraryToPDF({ generatedPlan }) {
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
}
