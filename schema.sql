-- ============================================================
-- BerlinBase: PostgreSQL Relational Schema & Analytical Models
-- Day 3 of 14-Day Sprint (MVP Star-Schema Architecture)
-- ============================================================

-- 1. Dim Neighborhood (Boyut Tablosu)
CREATE TABLE IF NOT EXISTS dim_neighborhood (
    district_id SERIAL PRIMARY KEY,
    district_name VARCHAR(50) NOT NULL UNIQUE,
    borough VARCHAR(50) NOT NULL,
    inside_ringbahn BOOLEAN NOT NULL DEFAULT true,
    hunting_difficulty_score INT CHECK (hunting_difficulty_score BETWEEN 1 AND 5),
    anmeldung_ease_score INT CHECK (anmeldung_ease_score BETWEEN 1 AND 5),
    anmeldung_speed_wks INT DEFAULT 4,
    supermarket_density VARCHAR(20) DEFAULT 'High',
    spati_density VARCHAR(20) DEFAULT 'High',
    spati_count INT DEFAULT 80,
    transit_to_alex_min INT DEFAULT 15,
    current_avg_doner_eur NUMERIC(4,2) DEFAULT 7.50
);

-- 2. Fact Listings (İlanlar Olgusu - Derin Zaman Serisi)
CREATE TABLE IF NOT EXISTS fact_listings (
    listing_id SERIAL PRIMARY KEY,
    district_id INT REFERENCES dim_neighborhood(district_id),
    year INT NOT NULL,
    listing_date DATE NOT NULL,
    property_type VARCHAR(20) CHECK (property_type IN ('Room', 'Apartment')),
    is_furnished BOOLEAN DEFAULT false,
    size_sqm NUMERIC(5,2) NOT NULL,
    cold_rent_eur NUMERIC(8,2) NOT NULL,
    warm_rent_eur NUMERIC(8,2) NOT NULL,
    effective_m2_cold NUMERIC(6,2) GENERATED ALWAYS AS (ROUND(cold_rent_eur / size_sqm, 2)) STORED
);

-- 3. Fact Price Trends (Tarihsel Fiyat ve Zam Analizi Tablosu)
CREATE TABLE IF NOT EXISTS fact_price_trends (
    trend_id SERIAL PRIMARY KEY,
    district_id INT REFERENCES dim_neighborhood(district_id),
    year INT NOT NULL,
    property_type VARCHAR(20) CHECK (property_type IN ('Room', 'Apartment')),
    avg_warm_rent_eur NUMERIC(8,2) NOT NULL,
    yoy_increase_percentage NUMERIC(5,2)
);

-- ============================================================
-- ADVANCED ANALYTICAL WINDOW FUNCTION QUERIES
-- ============================================================

-- SORGULU ANALİZ 1: Mahalle ve Konut Tipine Göre Yıllık Zam Oranı (YoY %) Hesabı (LAG Window Function)
SELECT 
    d.district_name,
    t.property_type,
    t.year,
    t.avg_warm_rent_eur,
    LAG(t.avg_warm_rent_eur, 1) OVER (
        PARTITION BY d.district_name, t.property_type 
        ORDER BY t.year
    ) AS prev_year_rent,
    ROUND(
        ((t.avg_warm_rent_eur - LAG(t.avg_warm_rent_eur, 1) OVER (PARTITION BY d.district_name, t.property_type ORDER BY t.year)) 
        / LAG(t.avg_warm_rent_eur, 1) OVER (PARTITION BY d.district_name, t.property_type ORDER BY t.year)) * 100, 
        2
    ) AS calculated_yoy_growth_pct
FROM fact_price_trends t
JOIN dim_neighborhood d ON t.district_id = d.district_id
ORDER BY d.district_name, t.property_type, t.year;

-- SORGULU ANALİZ 2: 2026 Yılında Semtlerin Kira Pahallılığına Göre Sıralanması (DENSE_RANK Window Function)
SELECT 
    d.district_name,
    d.borough,
    f.property_type,
    ROUND(AVG(f.warm_rent_eur), 2) AS avg_warm_rent,
    ROUND(AVG(f.effective_m2_cold), 2) AS avg_cold_m2,
    DENSE_RANK() OVER (
        PARTITION BY f.property_type 
        ORDER BY AVG(f.warm_rent_eur) DESC
    ) AS district_expense_rank
FROM fact_listings f
JOIN dim_neighborhood d ON f.district_id = d.district_id
WHERE f.year = 2026
GROUP BY d.district_name, d.borough, f.property_type
ORDER BY f.property_type, district_expense_rank;

-- SORGULU ANALİZ 3: WG Odası ile Komple Daire Arasındaki Metrekare Makası (Spread/Premium Analizi)
WITH m2_summary AS (
    SELECT 
        d.district_name,
        d.inside_ringbahn,
        f.property_type,
        AVG(f.effective_m2_cold) AS avg_m2
    FROM fact_listings f
    JOIN dim_neighborhood d ON f.district_id = d.district_id
    WHERE f.year = 2026
    GROUP BY d.district_name, d.inside_ringbahn, f.property_type
)
SELECT 
    r.district_name,
    r.inside_ringbahn,
    ROUND(r.avg_m2, 2) AS room_m2_eur,
    ROUND(a.avg_m2, 2) AS apt_m2_eur,
    ROUND(r.avg_m2 - a.avg_m2, 2) AS room_premium_per_m2,
    ROUND(((r.avg_m2 - a.avg_m2) / a.avg_m2) * 100, 1) AS room_premium_percentage
FROM m2_summary r
JOIN m2_summary a ON r.district_name = a.district_name AND a.property_type = 'Apartment'
WHERE r.property_type = 'Room'
ORDER BY room_premium_percentage DESC;
