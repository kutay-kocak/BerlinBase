import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/berlin_housing_mock.json', 'utf8'));

let sql = '-- ==========================================================\n';
sql += '-- BerlinBase: All 22 Districts Complete fact_listings Dataset\n';
sql += '-- ==========================================================\n\n';
sql += 'DROP TABLE IF EXISTS fact_listings CASCADE;\n\n';
sql += 'CREATE TABLE fact_listings (\n';
sql += '    listing_id SERIAL PRIMARY KEY,\n';
sql += '    district_name VARCHAR(60) NOT NULL,\n';
sql += '    borough VARCHAR(60) NOT NULL,\n';
sql += '    inside_ringbahn BOOLEAN NOT NULL,\n';
sql += '    property_type VARCHAR(20) CHECK (property_type IN (\'Room\', \'Apartment\')),\n';
sql += '    lease_type VARCHAR(20) DEFAULT \'unbefristet\',\n';
sql += '    rental_duration_days INT DEFAULT 365,\n';
sql += '    is_swap_only BOOLEAN DEFAULT false,\n';
sql += '    wbs_required BOOLEAN DEFAULT false,\n';
sql += '    student_dorm_only BOOLEAN DEFAULT false,\n';
sql += '    anmeldung_possible BOOLEAN DEFAULT true,\n';
sql += '    is_furnished BOOLEAN DEFAULT false,\n';
sql += '    size_sqm NUMERIC(5,2) NOT NULL,\n';
sql += '    cold_rent_eur NUMERIC(8,2) NOT NULL,\n';
sql += '    warm_rent_eur NUMERIC(8,2) NOT NULL\n';
sql += ');\n\n';

const values = data.map(d => {
  const isSwap = !!d.is_swap_only;
  const isWbs = !!d.wbs_required;
  const isDorm = !!d.student_dorm_only;
  const anm = d.anmeldung_possible !== false;
  const furn = !!d.is_furnished;
  const dur = d.rental_duration_days || 365;
  const lease = d.lease_type || 'unbefristet';
  const name = d.district_name.replace(/'/g, "''");
  const borough = (d.borough || '').replace(/'/g, "''");
  return `('${name}', '${borough}', ${d.inside_ringbahn}, '${d.property_type}', '${lease}', ${dur}, ${isSwap}, ${isWbs}, ${isDorm}, ${anm}, ${furn}, ${d.size_sqm}, ${d.cold_rent_eur}, ${d.warm_rent_eur})`;
});

sql += 'INSERT INTO fact_listings (district_name, borough, inside_ringbahn, property_type, lease_type, rental_duration_days, is_swap_only, wbs_required, student_dorm_only, anmeldung_possible, is_furnished, size_sqm, cold_rent_eur, warm_rent_eur) VALUES\n' + values.join(',\n') + ';\n';

fs.writeFileSync('scripts/seed_full_22_districts.sql', sql, 'utf8');
console.log('Saved seed_full_22_districts.sql with', values.length, 'listings.');
