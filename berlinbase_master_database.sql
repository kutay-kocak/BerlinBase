-- ==========================================================
-- BerlinBase Master Database Schema & Data Dump (2026)
-- Complete Dataset for All 22 Berlin Districts (Zone A + Zone B)
-- Designed Specifically for PostgreSQL 16 & Power BI DirectQuery
-- ==========================================================

DROP TABLE IF EXISTS district_transit_hubs CASCADE;
DROP TABLE IF EXISTS district_rentals CASCADE;
DROP TABLE IF EXISTS districts CASCADE;

-- 1. Districts Master Table
CREATE TABLE districts (
    district_id INTEGER PRIMARY KEY,
    district_name VARCHAR(60) NOT NULL UNIQUE,
    borough VARCHAR(60) NOT NULL,
    inside_ringbahn BOOLEAN NOT NULL,
    foreign_cuisine_pct NUMERIC(5,2),
    german_cuisine_pct NUMERIC(5,2),
    total_verified_restaurants INTEGER,
    flat_white_price_eur NUMERIC(4,2),
    fiber_internet_pct NUMERIC(5,2),
    spati_count INTEGER,
    transit_to_alex_min INTEGER,
    buergeramt_speed_wks INTEGER,
    primary_cuisine VARCHAR(120),
    top_street_hotspot VARCHAR(120)
);

-- 2. Rental Averages by Room Category Table
CREATE TABLE district_rentals (
    rental_id SERIAL PRIMARY KEY,
    district_name VARCHAR(60) NOT NULL,
    room_category VARCHAR(60) NOT NULL,
    average_monthly_rent_eur NUMERIC(7,2),
    sample_count INTEGER,
    FOREIGN KEY (district_name) REFERENCES districts (district_name) ON DELETE CASCADE
);

-- 3. Transit Matrix to All 6 Major Berlin Rail Hubs Table
CREATE TABLE district_transit_hubs (
    hub_id SERIAL PRIMARY KEY,
    district_name VARCHAR(60) NOT NULL,
    mins_to_hauptbahnhof INTEGER,
    mins_to_alexanderplatz INTEGER,
    mins_to_ostkreuz INTEGER,
    mins_to_suedkreuz INTEGER,
    mins_to_gesundbrunnen INTEGER,
    mins_to_zoo_garten INTEGER,
    mins_to_spandau INTEGER,
    FOREIGN KEY (district_name) REFERENCES districts (district_name) ON DELETE CASCADE
);

-- ==========================================================
-- INSERT DATA: 22 Districts Master
-- ==========================================================
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (1, 'Mitte', 'Mitte', TRUE, 68, 32, 584, 4.51, 68, 147, 6, 5, 'Contemporary Asian & Global Fusion', 'Torstraße & Rosenthaler Platz');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (2, 'Friedrichshain', 'Friedrichshain-Kreuzberg', TRUE, 72, 28, 460, 4.35, 62, 135, 10, 6, 'Vietnamese & East Asian Vegan', 'Boxhagener Platz & Simon-Dach-Straße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (3, 'Kreuzberg', 'Friedrichshain-Kreuzberg', TRUE, 76, 24, 489, 4.21, 58, 158, 14, 6, 'Turkish & Anatolian Traditional', 'Kottbusser Damm & Oranienstraße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (4, 'Prenzlauer Berg', 'Pankow', TRUE, 58, 42, 382, 4.38, 54, 112, 12, 4, 'Mediterranean & Italian Trattorias', 'Kastanienallee & Kollwitzplatz');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (5, 'Charlottenburg', 'Charlottenburg-Wilmersdorf', TRUE, 62, 38, 410, 4.12, 38, 84, 22, 4, 'Authentic Chinese & Szechuan', 'Kantstraße (Chinatown of Berlin)');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (6, 'Schöneberg', 'Tempelhof-Schöneberg', TRUE, 59, 41, 316, 3.99, 46, 93, 19, 4, 'Levantine, Syrian & Israeli', 'Goltzstraße & Akazienstraße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (7, 'Mitte (Moabit)', 'Mitte', TRUE, 64, 36, 263, 3.63, 42, 76, 18, 5, 'Middle Eastern & Turkish Grill', 'Turmstraße & Arminiusmarkthalle');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (8, 'Neukölln', 'Neukölln', TRUE, 78, 22, 536, 3.91, 51, 173, 18, 7, 'Arabic, Lebanese & Syrian Street Food', 'Sonnenallee (Arabische Straße) & Weserstraße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (9, 'Wedding', 'Mitte', TRUE, 66, 34, 290, 3.24, 45, 111, 16, 5, 'Turkish Ocakbaşı & West African', 'Müllerstraße & Leopoldplatz');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (10, 'Pankow', 'Pankow', FALSE, 32, 68, 208, 3.77, 49, 30, 25, 3, 'Traditional German Cuisine & Bakeries', 'Florastraße & Pankow Rathaus');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (11, 'Steglitz', 'Steglitz-Zehlendorf', FALSE, 35, 65, 183, 3.7, 36, 26, 32, 3, 'Classic German & Bavarian Wirtshaus', 'Schloßstraße & Steglitz Zentrum');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (12, 'Lichtenberg', 'Lichtenberg', FALSE, 48, 52, 233, 3.41, 55, 47, 24, 3, 'Vietnamese (Largest in Europe)', 'Dong Xuan Center & Herzbergstraße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (13, 'Karlshorst', 'Lichtenberg', FALSE, 38, 62, 78, 3.4, 54, 18, 16, 2, 'Cozy German Bistros & Russian/Georgian Delis', 'Treskowallee & S-Bahnhof Karlshorst');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (14, 'Tempelhof', 'Tempelhof-Schöneberg', FALSE, 52, 48, 164, 3.6, 52, 42, 18, 3, 'Turkish Grills, Levantine & German Wirtshaus', 'Tempelhofer Damm & Tempelhofer Feld');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (15, 'Alt-Treptow', 'Treptow-Köpenick', FALSE, 64, 36, 112, 3.9, 58, 36, 12, 3, 'Third-Wave Coffee & Mediterranean Fusion', 'Treptower Park & Am Flutgraben');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (16, 'Weißensee', 'Pankow', FALSE, 42, 58, 96, 3.6, 50, 24, 18, 3, 'Traditional German Bakeries & Italian Trattorias', 'Weißer See & Berliner Allee');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (17, 'Rummelsburg', 'Lichtenberg', FALSE, 46, 54, 68, 3.7, 60, 20, 14, 2, 'Waterside Modern European & Craft Beer', 'Rummelsburger Bucht & Paul-Zobel-Straße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (18, 'Spandau (Zentrum)', 'Spandau', FALSE, 44, 56, 195, 3.3, 46, 38, 24, 2, 'Havel River Seafood, Turkish & Historic German', 'Altstadt Spandau & Carl-Schurz-Straße');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (19, 'Köpenick (Altstadt)', 'Treptow-Köpenick', FALSE, 36, 64, 142, 3.4, 48, 22, 24, 2, 'Waterfront Brauhaus & Smoked River Fish', 'Schlossplatz Köpenick & Dammbrücke');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (20, 'Reinickendorf (Tegel)', 'Reinickendorf', FALSE, 40, 60, 130, 3.3, 44, 28, 25, 2, 'German Lakeside Gastronomy & Greek Tavernas', 'Greenwichpromenade Tegel & Berliner Str.');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (21, 'Lichtenrade', 'Tempelhof-Schöneberg', FALSE, 32, 68, 65, 3.2, 42, 14, 28, 2, 'Classic German Bakeries & Beer Gardens', 'Bahnhofstraße Lichtenrade');
INSERT INTO districts (district_id, district_name, borough, inside_ringbahn, foreign_cuisine_pct, german_cuisine_pct, total_verified_restaurants, flat_white_price_eur, fiber_internet_pct, spati_count, transit_to_alex_min, buergeramt_speed_wks, primary_cuisine, top_street_hotspot) VALUES (22, 'Marzahn (Zentrum)', 'Marzahn-Hellersdorf', FALSE, 35, 65, 88, 3.1, 56, 26, 23, 2, 'Eastern European Delis, Vietnamese & German Comfort', 'Marzahner Promenade & Gärten der Welt');

-- ==========================================================
-- INSERT DATA: Rental Benchmarks by Room Category
-- ==========================================================
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Mitte', 'WG Room', 702, 46);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Mitte', '1-Room Studio (1+0)', 1057, 8);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Mitte', '1-Bedroom Flat (1+1 / 1+2)', 1809, 48);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Friedrichshain', 'WG Room', 617, 57);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Friedrichshain', '1-Room Studio (1+0)', 1015, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Friedrichshain', '1-Bedroom Flat (1+1 / 1+2)', 1724, 46);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Kreuzberg', 'WG Room', 629, 52);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Kreuzberg', '1-Room Studio (1+0)', 1036, 15);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Kreuzberg', '1-Bedroom Flat (1+1 / 1+2)', 1699, 52);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Prenzlauer Berg', 'WG Room', 655, 43);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Prenzlauer Berg', '1-Room Studio (1+0)', 1003, 10);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Prenzlauer Berg', '1-Bedroom Flat (1+1 / 1+2)', 1662, 42);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Charlottenburg', 'WG Room', 603, 61);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Charlottenburg', '1-Room Studio (1+0)', 908, 19);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Charlottenburg', '1-Bedroom Flat (1+1 / 1+2)', 1565, 64);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Schöneberg', 'WG Room', 582, 47);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Schöneberg', '1-Room Studio (1+0)', 948, 18);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Schöneberg', '1-Bedroom Flat (1+1 / 1+2)', 1530, 45);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Mitte (Moabit)', 'WG Room', 427, 5);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Mitte (Moabit)', '1-Room Studio (1+0)', 848, 3);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Mitte (Moabit)', '1-Bedroom Flat (1+1 / 1+2)', 1310, 5);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Neukölln', 'WG Room', 561, 42);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Neukölln', '1-Room Studio (1+0)', 908, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Neukölln', '1-Bedroom Flat (1+1 / 1+2)', 1566, 41);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Wedding', 'WG Room', 538, 68);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Wedding', '1-Room Studio (1+0)', 787, 13);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Wedding', '1-Bedroom Flat (1+1 / 1+2)', 1352, 45);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Pankow', 'WG Room', 534, 43);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Pankow', '1-Room Studio (1+0)', 768, 19);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Pankow', '1-Bedroom Flat (1+1 / 1+2)', 1284, 58);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Steglitz', 'WG Room', 495, 49);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Steglitz', '1-Room Studio (1+0)', 837, 13);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Steglitz', '1-Bedroom Flat (1+1 / 1+2)', 1213, 71);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Lichtenberg', 'WG Room', 483, 47);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Lichtenberg', '1-Room Studio (1+0)', 741, 15);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Lichtenberg', '1-Bedroom Flat (1+1 / 1+2)', 1212, 57);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Karlshorst', 'WG Room', 520, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Karlshorst', '1-Room Studio (1+0)', 790, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Karlshorst', '1-Bedroom Flat (1+1 / 1+2)', 1140, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Tempelhof', 'WG Room', 580, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Tempelhof', '1-Room Studio (1+0)', 880, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Tempelhof', '1-Bedroom Flat (1+1 / 1+2)', 1290, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Alt-Treptow', 'WG Room', 640, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Alt-Treptow', '1-Room Studio (1+0)', 960, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Alt-Treptow', '1-Bedroom Flat (1+1 / 1+2)', 1420, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Weißensee', 'WG Room', 550, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Weißensee', '1-Room Studio (1+0)', 850, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Weißensee', '1-Bedroom Flat (1+1 / 1+2)', 1240, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Rummelsburg', 'WG Room', 610, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Rummelsburg', '1-Room Studio (1+0)', 930, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Rummelsburg', '1-Bedroom Flat (1+1 / 1+2)', 1380, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Spandau (Zentrum)', 'WG Room', 490, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Spandau (Zentrum)', '1-Room Studio (1+0)', 760, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Spandau (Zentrum)', '1-Bedroom Flat (1+1 / 1+2)', 1080, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Köpenick (Altstadt)', 'WG Room', 510, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Köpenick (Altstadt)', '1-Room Studio (1+0)', 780, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Köpenick (Altstadt)', '1-Bedroom Flat (1+1 / 1+2)', 1120, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Reinickendorf (Tegel)', 'WG Room', 500, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Reinickendorf (Tegel)', '1-Room Studio (1+0)', 770, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Reinickendorf (Tegel)', '1-Bedroom Flat (1+1 / 1+2)', 1110, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Lichtenrade', 'WG Room', 480, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Lichtenrade', '1-Room Studio (1+0)', 740, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Lichtenrade', '1-Bedroom Flat (1+1 / 1+2)', 1060, 22);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Marzahn (Zentrum)', 'WG Room', 460, 28);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Marzahn (Zentrum)', '1-Room Studio (1+0)', 710, 14);
INSERT INTO district_rentals (district_name, room_category, average_monthly_rent_eur, sample_count) VALUES ('Marzahn (Zentrum)', '1-Bedroom Flat (1+1 / 1+2)', 1020, 22);

-- ==========================================================
-- INSERT DATA: 6 Major Rail Hubs Transit Matrix
-- ==========================================================
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Mitte', 4, 4, 11, 14, 8, 10, 21);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Friedrichshain', 16, 10, 4, 16, 14, 21, 28);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Kreuzberg', 14, 12, 12, 12, 16, 16, 26);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Prenzlauer Berg', 15, 10, 14, 22, 6, 20, 27);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Charlottenburg', 10, 18, 25, 14, 16, 4, 14);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Schöneberg', 12, 18, 18, 4, 19, 8, 23);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Mitte (Moabit)', 5, 14, 20, 18, 10, 8, 18);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Neukölln', 19, 16, 12, 10, 20, 21, 32);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Wedding', 8, 14, 20, 20, 4, 14, 20);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Pankow', 20, 18, 18, 26, 8, 24, 30);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Steglitz', 18, 28, 26, 8, 25, 16, 28);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Lichtenberg', 22, 16, 5, 21, 16, 27, 34);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Karlshorst', 22, 16, 6, 20, 24, 29, 38);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Tempelhof', 16, 18, 14, 4, 22, 18, 32);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Alt-Treptow', 18, 12, 3, 12, 16, 24, 35);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Weißensee', 26, 18, 20, 32, 14, 34, 42);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Rummelsburg', 20, 14, 2, 16, 18, 26, 36);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Spandau (Zentrum)', 14, 23, 30, 22, 19, 11, 2);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Köpenick (Altstadt)', 30, 24, 14, 26, 28, 36, 45);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Reinickendorf (Tegel)', 20, 25, 31, 28, 15, 24, 22);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Lichtenrade', 22, 28, 29, 14, 28, 25, 38);
INSERT INTO district_transit_hubs (district_name, mins_to_hauptbahnhof, mins_to_alexanderplatz, mins_to_ostkreuz, mins_to_suedkreuz, mins_to_gesundbrunnen, mins_to_zoo_garten, mins_to_spandau) VALUES ('Marzahn (Zentrum)', 29, 23, 15, 30, 25, 35, 44);
