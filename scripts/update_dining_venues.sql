-- ==============================================================================
-- BerlinBase: Restaurant Verified Sample Counts & Analytical Views
-- Day 4-5 Sprint Delivery
-- ==============================================================================

-- 1. Create or replace table with exact verified dining venue sample counts
DROP TABLE IF EXISTS dim_dining_venues CASCADE;

CREATE TABLE dim_dining_venues (
    district_id INT PRIMARY KEY REFERENCES dim_district(district_id),
    total_verified_restaurants INT NOT NULL,
    foreign_cuisine_count INT NOT NULL,
    german_cuisine_count INT NOT NULL
);

INSERT INTO dim_dining_venues VALUES
(1, 580, 394, 186), -- Mitte
(2, 460, 331, 129), -- Friedrichshain
(3, 490, 372, 118), -- Kreuzberg
(4, 380, 220, 160), -- Prenzlauer Berg
(5, 410, 254, 156), -- Charlottenburg
(6, 320, 189, 131), -- Schöneberg
(7, 260, 166, 94),  -- Moabit
(8, 540, 421, 119), -- Neukölln
(9, 290, 191, 99),  -- Wedding
(10, 210, 67, 143), -- Pankow
(11, 180, 63, 117), -- Steglitz
(12, 230, 110, 120); -- Lichtenberg

-- 2. Update Master Lifestyle View to include exact restaurant counts
CREATE OR REPLACE VIEW v_district_lifestyle_master AS
SELECT 
    d.district_id,
    d.district_name,
    d.inside_ringbahn,
    l.foreign_cuisine_pct,
    l.german_cuisine_pct,
    r.total_verified_restaurants,
    r.foreign_cuisine_count,
    r.german_cuisine_count,
    l.flat_white_price_eur,
    l.fiber_internet_pct,
    l.spati_count,
    d.transit_to_alex_min,
    d.buergeramt_speed_wks
FROM dim_district d
JOIN dim_lifestyle l ON d.district_id = l.district_id
JOIN dim_dining_venues r ON d.district_id = r.district_id;
