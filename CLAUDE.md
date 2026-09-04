# Project: BerliNest (MVP)
Duration: 14 Days Sprint
Stack: React (Vite), Tailwind CSS (BVG Yellow Theme), Lucide-react, Leaflet.js, Power BI (Embedded), Google Gemini 1.5 Flash (API)

## Core Architectural & Security Principles
- Zero PII: Never collect, store, or transmit personal user credentials or identities.
- Client-Side Isolation: Process Decision Quiz scores entirely in browser memory.
- Safe Outbound Links: Every external reference must enforce target="_blank" rel="noopener noreferrer".
- Secret Hygiene: Keep all third-party API keys outside source control via environment variables.
- XSS Prevention: Sanitize any AI-generated response before rendering to the DOM.

## Design & Theme (BVG Inspired)
- Primary Brand Color: BVG Yellow (`#F0D722`)
- Dark Contrast: Deep Slate / Navy (`#1A1A24`)
- Clean, high-contrast, modern UI with clear visual hierarchy.

## Page Layout & Navigation (Tabs)
1. Housing Guide:
   - 4 Crucial Pillars:
     1. The Housing Crisis & Market Reality
     2. Bureaucracy & The Golden Key (Anmeldung)
     3. Rental Contracts (Kalt vs. Warm, Staffelmiete, Indexmiete, Mietpreisbremse)
     4. The Tenant Dossier (Bewerbungsmappe: SCHUFA, Gehaltsnachweise, etc.)
   - Categorized Portals:
     * Rooms & Shared Flats: WG-Gesucht, Kleinanzeigen
     * Apartments: ImmoScout24, Immowelt, HousingAnywhere
     * Municipal Housing Companies: Gewobag, Howoge, degewo, Stadt und Land
     * Long-Term Vision (Sub-category): Genossenschaften (Housing Cooperatives) & Deutsche Wohnen
   - Information & Warning Callouts:
     * WBS (Wohnberechtigungsschein): Eligibility for low-income expats/EU citizens.
     * Student & Community Networks: Studierendenwerk Wohnbörse, university boards, Telegram/WhatsApp groups.
     * Strict Scam Alert Box: Clear warnings against wire transfers, remote-only viewings, and suspicious deposits.
     * Authority Reference Badge: Prominent trust card linking directly to All About Berlin.
2. Useful Apps & Life Hacks:
   - Money Transfers: Wise, TAPTAP Send
   - Savings & Cashback: Fetch rewards, Cashback apps, Too Good To Go
   - Moving & Second-Hand: Lalamove, Kleinanzeigen
   - Contract Switching Strategy: Check24 & Verivox 1-2 year renewal rules for electricity/broadband.
3. Map & Price Analytics:
   - Dynamic Property Toggle: Room (WG) vs. Entire Apartment mode.
   - Furnished vs. Unfurnished pricing multiplier filter.
   - Interactive district boundaries with hover tooltips displaying:
     * Average Rent (WG vs. Flat)
     * Flat-Hunting Difficulty Score (1-5)
     * General Kiez Vibe Tags (curated dictionary)
     * Anmeldung Registration Ease
     * Supermarkets & Daily Life Network (Organic Bio stores, Discounters, Späti density)
   - Power BI Embedded Dashboard: YoY rent percentage increases and 5-year historical trends.
4. Best Neighborhood for You (Decision Quiz):
   - Question 1 (Strict Killer Filter): Monthly budget with dual component (Dual Range Slider + Manual Numeric Input with €100 steps).
   - 3-4 High-impact Lifestyle Questions with multi-select support where applicable.
   - Outcome Screen: Ranked top 3 districts, % Match score, and transparent Pros & Cons (+ / -) comparison matrix.
5. Activities:
   - Curated Sunday Flea Markets (Flohmärkte): Mauerpark, Boxhagener Platz, Arkonaplatz, Nowkoelln (table with sizes, product focuses, hours, direct Google Maps pins).
   - Open-Air Cinemas (Freiluftkino): Seasonal outdoor cinema locations with English original/subtitle info.
6. AI Berlin Buddy:
   - Natural language lifestyle matching powered by Google Gemini 1.5 Flash backend endpoint.

## Component Conventions
- Maintain modular files inside `src/components/`.
- Ensure mobile responsiveness across all viewports using Tailwind utility classes.