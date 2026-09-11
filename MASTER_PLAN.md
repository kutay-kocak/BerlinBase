# BerlinBase: Uçtan Uca Master Proje Spesifikasyonu ve 14 Günlük Sprint Kılavuzu

Bu doküman; BerlinBase platformunun mimarisini, veri modellerini, siber güvenlik protokollerini, sayfa bazlı içeriklerini ve 14 günlük detaylı geliştirme yol haritasını içerir. Antigravity ajanı tüm geliştirmelerde bu dosyayı ana referans alır.

---

## BÖLÜM 1: Sistem Mimarisi, Marka Kimliği ve Siber Güvenlik

### 1. Temel Parametreler ve Teknoloji Yığını

* **Proje Adı:** BerlinBase
* **Slogan:** Your Data-Driven Landing Hub in Berlin
* **Frontend:** React (Vite tabanlı), Tailwind CSS, Lucide-react (Modern ikon kütüphanesi)
* **Harita Altyapısı:** Leaflet.js / OpenStreetMap + Berlin İlçeleri GeoJSON poligon katmanı
* **Veritabanı & Analitik:** PostgreSQL / Supabase, Power BI Desktop (Web'e gömülü iframe)
* **Yapay Zekâ Motoru:** Google Gemini 1.5 Flash API (Serverless proxy üzerinden JSON çıktılı)
* **Tasarım Dili (BVG Teması):**
* `bvg-yellow`: `#F0D722` (Vurgular, aktif sekmeler, CTA butonları)
* `bvg-dark`: `#1A1A24` (Ana arka plan, koyu mod yüzeyi)
* `bvg-gray`: `#2C2D35` (Kartlar, paneller, kenarlıklar)
* `bvg-light`: `#F8F9FA` (Ana metinler, açık etiketler)



### 2. Siber Güvenlik ve Veri Koruma İlkeleri

* **Sıfır PII (Kişisel Veri Saklamama):** Kullanıcıdan ad, soyad, e-posta veya kimlik bilgisi kesinlikle talep edilmez. Kullanıcı kayıt/oturum veritabanı kurulmaz.
* **İstemci Taraflı İzolasyon (Client-Side State):** Anket yanıtları ve filtreleme tercihleri sadece kullanıcının kendi tarayıcısında (`sessionStorage`) anlık işlenir. Tarayıcı kapandığında silinir; GDPR/DSGVO yükümlülüğü doğmaz.
* **Gizli Anahtar Yönetimi (Secret Hygiene):** Gemini API anahtarı veya veritabanı bağlantı bilgileri React frontend kodunun içine yazılmaz. Vercel Serverless Function (`/api/chat.js`) backend görevi görür; API anahtarını güvenli ortam değişkenlerinden (`process.env.GEMINI_API_KEY`) okur.
* **XSS ve Girdi Temizleme (Sanitization):** Yapay zekâdan gelen metinler doğrudan ekrana `innerHTML` ile basılmaz. İstemci tarafında `DOMPurify` ile sterilize edilir.
* **DDoS ve Maliyet Koruması (Rate Limiting):** Gemini API endpoint'ine IP başına dakikada maksimum 5-10 sorgu sınırı ve kullanıcı başına günlük 5 sorgu hakkı tanımlanır. Soru başına yanıt uzunluğu `max_tokens: 350` ile kısıtlanır.
* **Dış Bağlantı Hijyeni:** Sitedeki tüm harici yönlendirmelerde `target="_blank" rel="noopener noreferrer"` zorunludur.
* **Iframe İzolasyonu:** Power BI raporu `sandbox="allow-scripts allow-same-origin"` kısıtlamasıyla gömülür.

---

## BÖLÜM 2: Altı Ana Sekmenin (Tabs) Mimari ve İçerik Kurgusu

### Sekme 1: Housing Guide (Konut ve Kiralama Rehberi)

* **Konut Hakkında Bilinmesi Gereken 4 Temel Sütun (Akordeon Kartlar):**
1. *The Housing Crisis & Rental Market Reality:* Arz-talep dengesizliği, ilanların saatler içinde kapanması, tek bir ilana yüzlerce başvuru gelmesi ve gerçekçi piyasa beklentileri.
2. *Bureaucracy & The Golden Key (Anmeldung):* İkamet kaydı olmadan Vergi Kimlik Numarası (*Steuer-ID*), yerel banka hesabı ve sağlık sigortası süreçlerinin kilitlenmesi; geçici konaklamalarda *"Anmeldung possible"* ibaresinin önemi.
3. *Rental Contracts Explained:* *Kaltmiete* (saf kira) vs. *Warmmiete* (ısınma ve bina giderleri dahil sıcak kira); enflasyona endeksli *Indexmiete*, yıllık otomatik artan *Staffelmiete* ve yasal kira tavanı koruması *Mietpreisbremse*.
4. *The Tenant Dossier (Bewerbungsmappe):* Alman ev sahiplerinin talep ettiği zorunlu evraklar: *SCHUFA* kredi skoru, son 3 aylık maaş bordrosu (*Gehaltsnachweise*), önceki ev sahibinden borçsuzluk belgesi (*Mietschuldenfreiheitsbescheinigung*) ve kimlik fotokopisi.


* **Kategorize Edilmiş Emlak Portalları:**
* *Oda & Paylaşımlı Daire:* WG-Gesucht, Kleinanzeigen
* *Komple Daire Portalları:* ImmoScout24, Immowelt, HousingAnywhere
* *Belediye Şirketleri (Städtische Wohnungsbaugesellschaften):* Gewobag, Howoge, degewo, Stadt und Land
* *Uzun Vadeli Alternatifler:* *Genossenschaften* (Hisseli konut kooperatifleri — uzun vadeli oturumda ucuz ve ömür boyu kiralama garantisi) ve Deutsche Wohnen.


* **Bilgi, Topluluk ve Dolandırıcılık Uyarı Kutuları:**
* 💡 **WBS (Wohnberechtigungsschein) Bilgi Kutusu:** Düşük gelirli kişilerin (öğrenciler ve yeni çalışanlar dahil) belediye destekli uygun fiyatlı sosyal konutları kiralamasını sağlayan resmi belgedir. Alman vatandaşı olma zorunluluğu yoktur; oturum izni olanlar veya AB vatandaşları da gelir şartlarını sağlarsa başvurabilir.
* 🎓 **Öğrenci & Topluluk Ağları Kutusu:** Öğrenci yurtları için *"Studierendenwerk Wohnbörse + Berlin"* araması yapılmalıdır. Facebook expat grupları, WhatsApp/Telegram ağları ve üniversite panoları hızlı oda bulmada kritiktir.
* ⚠️ **Scam Alert (Dolandırıcılık Uyarısı):** *"Don't transfer a deposit just because someone sent photos and a contract. If someone refuses a viewing, pressures you to pay immediately, or offers a suspiciously cheap room, slow down."*
* 🛡️ **All About Berlin Güven Rozeti:** *"Detailed legal rights, contract checks, and official bureaucracy guides can be explored directly on [All About Berlin](https://www.google.com/search?q=https://allaboutberlin.com)."*



### Sekme 2: Useful Apps & Life Hacks (Faydalı Uygulamalar ve Tasarruf)

* **Düşük Komisyonlu Para Transferi:**
* *Wise:* Reel piyasa kuru ve şeffaf düşük komisyonla çoklu para birimi hesabı.
* *TAPTAP Send:* Belirli ülkelere sıfıra yakın masrafla doğrudan mobil bakiye/hesap transferi.


* **Tasarruf, İade ve Günlük Yaşam:**
* *Cashback & Fetch Rewards:* Market fişlerini taratarak nakit iade/puan toplama ve bütçe optimizasyonu.
* *Too Good To Go:* Restoran, kafe ve fırınlardan kalan taze yiyecekleri 3'te 1 fiyatına alma uygulaması.


* **Taşınma, İkinci El ve Lojistik:**
* *Lalamove:* Sokakta ücretsiz bırakılan (*zu verschenken*) mobilyaları taşımak veya ev nakliyesi için anlık kamyonet/kurye servisi.
* *Kleinanzeigen:* İkinci el eşya, ücretsiz ev araçları ve bisiklet için 1 numaralı platform.


* **Abonelik Optimizasyon Stratejisi:**
* *Sözleşme Yenileme Stratejisi (Check24 / Verivox):* Elektrik, internet ve cep telefonu sözleşmelerini 1-2 yılda bir sağlayıcı değiştirerek yenileme kuralı. "Yeni müşteri bonusları" (*Neukundenbonus*) ile yıllık 300-500€ net tasarruf sağlama.



### Sekme 3: Map & Price Analytics (İnteraktif Harita ve Veri Analitiği)

* **Dinamik Fiyat Anahtarı (Toggle Switch):** "Room (WG Zimmer)" vs. "Entire Apartment (1-2 Zimmer)" seçimi. Tıklandığı an harita üzerindeki tüm mahalle poligonlarının renkleri ve ortalama fiyatları anlık güncellenir.
* **Eşyalı/Eşyasız Çarpanı (Multiplier):** Furnished vs. Unfurnished seçimiyle fiyat makasını yansıtma.
* **Mahalle Hover Tooltip'i (Üzerine Gelince Açılan 5 Metrik):**
1. *Ortalama Kira:* WG odası (€) veya Komple Daire (€) medyan değeri.
2. *Flat-Hunting Difficulty Score:* 1 (Makul) ile 5 (Aşırı Zor) arası kiralık yer bulma rekabet indeksi.
3. *Genel Vibe Etiketleri:* Mahallenin 3-4 karakteristik özelliği (`vibes.json`).
4. *Anmeldung Çıkma Kolaylığı:* Kiralık yerlerde resmi ikamet kaydı alma kolaylığı skoru (1-5).
5. *Süpermarket & Günlük Yaşam Ağı:* Organik Bio marketler, indirim marketleri (Lidl, Aldi) ve Späti yoğunluğu.


* **Gömülü Power BI Paneli (Embed Area):**
* Mahalle bazında son 1 yılda gerçekleşen kira zam oranları (YoY % Change).
* 5 yıllık tarihsel kira artış trend çizgisi.



### Sekme 4: Best Neighborhood for You (Karar Destek Anketi)

* **Soru 1 (Katı Filtreleyici Soru / Killer Filter - Bütçe):**
* İkili kontrol: 100€ adımlarla çalışan Range Slider + Manuel Sayısal Giriş Kutusu.
* Bütçe yetersiz kalan mahalleleri sonuç havuzundan doğrudan eler.


* **Soru 2: Ulaşım ve Merkezilik (Ringbahn Durumu):**
* *Seçenekler:* A) Kesinlikle Ring içi (Merkezi), B) Ring hattına 15-20 dk banliyöler de uyar, C) Şehir dışı / Yeşillikler içinde olsun (Steglitz, Köpenick, Spandau vb.).


* **Soru 3: Gece Hayatı ve Sosyal Yaşam Ritmi:**
* *Seçenekler:* A) Sabahın ilk ışıklarına kadar techno kulüpler, barlar (Friedrichshain, Kreuzberg, Neukölln), B) Butik kafelerde kahve, şarap barları, sanat galerileri (Prenzlauer Berg, Mitte), C) Evde sakinlik veya yerel bir pub/bira bahçesi (Charlottenburg, Schöneberg, Moabit).


* **Soru 4: Çevre Tercihi (Çoklu Seçim / Multi-Select):**
* *Kutucuklar:* Dinamik ve çok kültürlü sokaklar, Geniş parklar ve yeşil alanlar, Kanal kenarı yürüyüş rotaları, Tarihi Altbau mimarisi, Ucuz sokak pazarları, Bisiklet yolları.


* **Soru 5: Öncelikli Yaşam Tarzı / Persona:**
* *Seçenekler:* A) Öğrenci / Stajyer (Düşük bütçe + canlı ortam), B) Tech / Startup çalışanı (Uluslararası çevre + hipster mekanlar), C) Aile / Çift (Geniş ev + kreş + sessizlik).


* **Çıktı Ekranı (Result Screen):**
* En yüksek puanı alan ilk 3 mahalle (% Eşleşme Oranı ile).
* Her mahalle için şeffaf **"+ / -" (Pros & Cons) Karşılaştırma Tablosu**.
* "Haritada Gör" butonu ile harita sekmesinde ilgili semti odaklama.



### Sekme 5: Activities & Flea Markets (Kültür ve Etkinlikler)

* **Pazar Günü Bit Pazarları (Sunday Flea Markets):**
* *Mauerpark (Prenzlauer Berg):* Büyük ölçek, vintage giyim, plaklar, canlı karaoke | Pazar 10:00-18:00 | Doğrudan Google Maps pini.
* *Boxhagener Platz (Friedrichshain):* Orta ölçek, kitap, retro mobilya, antika ve brunch kafeleri | Pazar 10:00-18:00 | Doğrudan Google Maps pini.
* *Arkonaplatz (Mitte):* Butik, 60'lar-70'ler retro tasarım ürünleri | Pazar 10:00-16:00 | Doğrudan Google Maps pini.
* *Nowkoelln Flowmarkt (Neukölln):* Kanal kenarı, genç tasarımcılar, müzik ve sokak lezzetleri | 2 haftada bir Pazar | Doğrudan Google Maps pini.


* **Açık Hava Sinemaları (Freiluftkino):** Kreuzberg, Friedrichshain ve Rehberge parklarında orijinal dilde / İngilizce altyazılı (OmU) film gösterim rehberi.
* **Yazlık Kaçış Noktaları (Badeseen):** Toplu taşımayla kolay ulaşılan yüzme gölleri (Schlachtensee, Krumme Lanke).
* **Kulüp Kültürü & Farkındalık (Awareness):** Resident Advisor rehberliği yanında kapı politikaları (*Door Policy*), fotoğraf yasağı ve temel kulüp görgü kuralları çağrışımları.

### Sekme 6: AI Berlin Buddy (Yapay Zekâ Danışmanı)

* Google Gemini 1.5 Flash destekli doğal dil asistanı.
* Kullanıcının serbest metin olarak girdiği bütçe ve yaşam tarzı beklentisini alarak yapılandırılmış JSON çıktısı üretir:
`{ "recommendedDistrict": "Neukölln", "matchReason": "...", "suggestedSundayPlan": "..." }`

---

## BÖLÜM 3: Veri Şemaları ve Mahalle Sözlüğü

### 1. PostgreSQL Veritabanı Şeması (`schema.sql`)

```sql
-- 1. Mahalle Boyut Tablosu
CREATE TABLE dim_neighborhood (
    district_id SERIAL PRIMARY KEY,
    district_name VARCHAR(50) NOT NULL UNIQUE,
    borough VARCHAR(50) NOT NULL,
    inside_ringbahn BOOLEAN NOT NULL DEFAULT true,
    hunting_difficulty_score INT CHECK (hunting_difficulty_score BETWEEN 1 AND 5),
    anmeldung_ease_score INT CHECK (anmeldung_ease_score BETWEEN 1 AND 5),
    supermarket_density VARCHAR(20) DEFAULT 'High',
    spati_density VARCHAR(20) DEFAULT 'High'
);

-- 2. İlanlar Olgusu (Fact Table)
CREATE TABLE fact_listings (
    listing_id SERIAL PRIMARY KEY,
    district_id INT REFERENCES dim_neighborhood(district_id),
    property_type VARCHAR(20) CHECK (property_type IN ('Room', 'Apartment')),
    is_furnished BOOLEAN DEFAULT false,
    cold_rent_eur NUMERIC(8,2) NOT NULL,
    warm_rent_eur NUMERIC(8,2) NOT NULL,
    size_sqm NUMERIC(5,2) NOT NULL,
    listing_date DATE NOT NULL
);

-- 3. Tarihsel Fiyat ve Zam Analizi Tablosu
CREATE TABLE fact_price_trends (
    trend_id SERIAL PRIMARY KEY,
    district_id INT REFERENCES dim_neighborhood(district_id),
    year INT NOT NULL,
    property_type VARCHAR(20) CHECK (property_type IN ('Room', 'Apartment')),
    avg_warm_rent_eur NUMERIC(8,2) NOT NULL,
    yoy_increase_percentage NUMERIC(5,2)
);

-- Örnek Analitik Pencere Fonksiyonu: Yıllık Zam Oranlarını Hesaplama
SELECT 
    d.district_name,
    t.property_type,
    t.year,
    t.avg_warm_rent_eur,
    LAG(t.avg_warm_rent_eur, 1) OVER (PARTITION BY d.district_id, t.property_type ORDER BY t.year) AS prev_year_rent,
    ROUND(((t.avg_warm_rent_eur - LAG(t.avg_warm_rent_eur, 1) OVER (PARTITION BY d.district_id, t.property_type ORDER BY t.year)) 
           / LAG(t.avg_warm_rent_eur, 1) OVER (PARTITION BY d.district_id, t.property_type ORDER BY t.year)) * 100, 2) AS calculated_yoy_growth
FROM fact_price_trends t
JOIN dim_neighborhood d ON t.district_id = d.district_id
WHERE t.year = 2026;

```

### 2. Berlin Mahalle Vibe Sözlüğü (`src/data/vibes.json`)

```json
{
  "Mitte": ["Suits & Tech Hub", "High Rent", "Central & Walkable", "Tourist Hotspots"],
  "Kreuzberg": ["Alternative Culture", "Techno & Bars", "Canal Walks", "Diverse Street Food"],
  "Neukölln": ["Vibrant & Grungy", "Artists & Expats", "Busy Spätis", "Rapidly Gentrifying"],
  "Friedrichshain": ["Nightlife Capital", "Boxhagener Foodies", "RAW-Gelände", "Young Professionals"],
  "Prenzlauer Berg": ["Baby Strollers", "Organic Bakeries", "Restored Altbau", "Peaceful Green Squares"],
  "Charlottenburg": ["Classic Elegance", "Boulevards & Boutiques", "Quiet Residential", "Expat Families"],
  "Schöneberg": ["Historic Queer Center", "Weekly Markets", "Cozy Neighborhood Feel", "Well Connected"],
  "Wedding": ["Up-and-Coming", "Budget Friendly", "Industrial Vibe", "Multicultural Hub"],
  "Moabit": ["Waterfront Paths", "Affordable Pockets", "Central Transit", "Traditional Working Class"],
  "Pankow": ["Family Haven", "Quiet Tram Lines", "Abundant Parks", "Suburban Comfort"],
  "Lichtenberg": ["Plattenbau & Space", "Asian Community Hub", "Lower Rents", "Raw Post-Soviet Charm"],
  "Steglitz": ["Green & Calm", "Schlossstraße Shopping", "Academic Vibe", "Quiet Family Living"]
}

```

---

## BÖLÜM 4: 14 Günlük Detaylı Sprint Yol Haritası ve Günlük Görevler

```
[HAFTA 1: TEMEL MİMARİ, VERİ VE ANALİTİK]
Gün 1-2   : Temel İskelet, Tailwind BVG Teması, 6 Sekmeli Navigasyon & Mock Emlak Veri Seti
Gün 3-4   : SQL Modelleme, PostgreSQL Şemaları ve Pencere Fonksiyonları
Gün 5-6   : Power BI Dashboard Tasarımı, DAX Metrikleri ve Güvenli Web Embed Yapılandırması
Gün 7     : Housing Guide ve Useful Apps Sekmelerinin Geliştirilmesi, BerlinBase Logo Entegrasyonu

[HAFTA 2: UI/UX, İNTERAKTİF HARİTA, ANKET VE AI]
Gün 8-9   : Leaflet.js İnteraktif Haritası, GeoJSON Mahalle Poligonları, 5 Hover Metriği & Toggle
Gün 10-11 : Karar Destek Anketi Wizard Arayüzü, Ağırlıklı Puanlama Motoru ve Pros/Cons Matrisi
Gün 12    : Gemini 1.5 Flash Serverless Endpoint (/api/chat.js) ve AI Buddy Arayüzü
Gün 13    : Siber Güvenlik Denetimi (DOMPurify XSS temizliği, Rate limiting, Secret taraması)
Gün 14    : Vercel Canlı Dağıtımı, GitHub Portföy README Dokümantasyonu ve Demo Sunumu

```

---

### GÜN 1: Temel İskelet, BVG Teması ve Sekmeli Navigasyon (Mevcut Gün)

* **Major Hedef:** Projeyi sıfır hatayla ayağa kaldırmak ve 6 sekmeli gezinme durumunu (`activeTab`) oluşturmak.
* **Minor Görevler:**
* `berlin-relocation-guide` klasöründeki `tailwind.config.js` dosyasına BVG renklerini (`#F0D722`, `#1A1A24`, `#2C2D35`) işlemek.
* `src/index.css` dosyasını Tailwind direktifleriyle güncellemek.
* `src/App.jsx` içinde `Navbar` bileşenini yazıp `activeTab` mantığıyla 6 sekmenin yer tutucu (placeholder) kartlarını bağlamak.
* Lucide-react ikonlarını navbar butonlarına entegre etmek.


* **Antigravity Görev Prompt'u:**
> `"GÜN 1: Çalışma alanındaki tailwind.config.js ve src/index.css yapılandırmasını doğrula. src/App.jsx içinde 6 ana sekmemizi (housing, apps, map, quiz, activities, buddy) içeren, BVG sarısı ve lacivert temalı, mobil uyumlu modern bir Navbar ve sekme geçiş state'ini oluştur."`



---

### GÜN 2: Berlin Emlak Veri Setinin Yapılandırılması ve Temizlenmesi

* **Major Hedef:** Harita ve analitik motorunda kullanılacak gerçekçi, 1.000+ satırlık Berlin konut veri setini JSON ve CSV formatında üretmek.
* **Minor Görevler:**
* Berlin'in 12 ana bölgesi için oda (WG) ve komple daire (Apartment) fiyat aralıklarını gerçek piyasa değerlerine göre modellemek.
* Sütunlar: `district_name`, `property_type` (Room/Apartment), `is_furnished` (true/false), `cold_rent`, `warm_rent`, `size_sqm`, `listing_date`.
* Veriyi temizleyip `src/data/berlin_housing_mock.json` ve `berlin_housing.csv` olarak kaydetmek.


* **Antigravity Görev Prompt'u:**
> `"GÜN 2: Berlin emlak piyasasını (WG ve komple daire, eşyalı/eşyasız, soğuk/sıcak kira) birebir yansıtan 1.000 satırlık temiz bir mock veri seti üreten Python veya JS script'i yaz. Çıktıyı src/data/berlin_housing_mock.json ve berlin_housing.csv olarak kaydet."`



---

### GÜN 3: SQL Modelleme ve İleri Düzey Analitik Sorgular

* **Major Hedef:** İlişkisel veritabanı şemasını kurup mahalle bazlı kira artış ve zam analiz sorgularını yazmak.
* **Minor Görevler:**
* `dim_neighborhood`, `fact_listings` ve `fact_price_trends` tablolarını oluşturacak `schema.sql` dosyasını hazırlamak.
* Son 1 yıldaki kira değişim yüzdesini hesaplayan SQL pencere fonksiyonlarını (`LAG()`, `RANK()`) kodlamak.
* WG odası tutmak ile stüdyo daire tutmak arasındaki metrekare fiyat makasını hesaplayan analitik sorguları yazmak.


* **Antigravity Görev Prompt'u:**
> `"GÜN 3: Hazırladığımız veri modeli için schema.sql dosyasını oluştur. Mahalle bazında yıllık kira artış oranlarını (YoY %) hesaplayan ve WG vs. daire m² makasını kıyaslayan PostgreSQL pencere fonksiyonu sorgularını yaz."`



---

### GÜN 4: SQL Verilerini Doğrulama ve Power BI Veri Modeli Hazırlığı

* **Major Hedef:** SQL çıktısını Power BI Desktop için optimize edilmiş Yıldız Şema (Star Schema) yapısına getirmek.
* **Minor Görevler:**
* CSV/SQL verilerini Power BI Desktop'a yüklemek.
* DAX metriklerini yazmak: `Median Rent = MEDIAN(fact_listings[warm_rent_eur])`, `YoY Rent Growth % = DIVIDE([Current Year] - [Prev Year], [Prev Year])`.
* Aykırı değerleri (outliers) temizleyen Power Query filtrelerini tanımlamak.


* **Uygulama Adımı:** Power BI Desktop üzerinde `berlin_housing.csv` dosyasını içeri aktarın ve DAX formüllerini modele ekleyin.

---

### GÜN 5: Power BI Dashboard Tasarımı

* **Major Hedef:** Kullanıcıların mahalle bazlı zam oranlarını inceleyebileceği interaktif bir analitik panel tasarlamak.
* **Minor Görevler:**
* Son 1 yılda en çok ve en az zam alan semtleri gösteren yatay çubuk grafik (Bar Chart).
* 5 yıllık tarihsel kira artışını gösteren çizgi grafik (Line Chart).
* Room vs. Apartment filtre dilimleyicileri (Slicers).
* Kullanıcı bütçesini simüle eden parametre (What-If Parameter).


* **Uygulama Adımı:** Power BI Desktop'ta BVG temasına uygun sarı/koyu lacivert arka plan tasarımını tamamlayıp raporu kaydedin.

---

### GÜN 6: Power BI Web Yayını ve Iframe Entegrasyonu

* **Major Hedef:** Power BI raporunu genel web'e açıp React projesine güvenle gömmek.
* **Minor Görevler:**
* Power BI Desktop üzerinden *File > Publish to Power BI Service* adımıyla raporu yayınlamak.
* Power BI Service üzerinden *File > Embed Report > Publish to Web (Public)* seçeneğiyle iframe URL'sini almak.
* React içinde `src/components/AnalyticsEmbed.jsx` bileşeni oluşturup iframe'i `sandbox="allow-scripts allow-same-origin"` etiketiyle ekrana yerleştirmek.


* **Antigravity Görev Prompt'u:**
> `"GÜN 6: src/components/AnalyticsEmbed.jsx bileşenini oluştur. Power BI iframe'ini responsive, mobil uyumlu ve sandbox güvenlik parametreleriyle sarmalayan temiz bir UI kartı tasarla."`



---

### GÜN 7: Housing Guide & Useful Apps Sekmelerinin Geliştirilmesi ve BerlinBase Logosu

* **Major Hedef:** Konut ve uygulama sekmelerini tam metinleriyle, bilgi kutularıyla ve yeni logoyla eksiksiz inşa etmek.
* **Minor Görevler:**
* Minimalist çatı ve yuva formunu harmanlayan modern bir SVG logo tasarlayıp Navbar'a eklemek.
* `HousingGuide.jsx` bileşeninde 4 Sütun akordeonunu, kategorize portal kartlarını (WG-Gesucht, ImmoScout24, Genossenschaften vb.) kodlamak.
* WBS, Studierendenwerk ve Scam Alert uyarı kutularını dikkat çekici renklerle yerleştirmek.
* All About Berlin yönlendirme rozetini eklemek.
* `UsefulApps.jsx` bileşeninde Wise, TAPTAP Send, Cashback, Too Good To Go, Lalamove ve Check24 kartlarını oluşturmak.


* **Antigravity Görev Prompt'u:**
> `"GÜN 7: Navbar için BerlinBase yuva temalı SVG logoyu kodla. src/components/HousingGuide.jsx ve src/components/UsefulApps.jsx bileşenlerini MASTER_PLAN.md içerisindeki tüm bilgi kutuları, portal linkleri ve Check24 stratejisiyle eksiksiz inşa et."`



---

### GÜN 8: Leaflet.js İnteraktif Haritası ve GeoJSON Sınırları

* **Major Hedef:** Berlin'in mahalle poligonlarını harita üzerinde çizdirmek ve Ringbahn hattını görselleştirmek.
* **Minor Görevler:**
* `leaflet` ve `react-leaflet` paketlerini kurmak: `npm install leaflet react-leaflet`.
* Berlin'in 12 bölgesini içeren açık kaynak GeoJSON dosyasını `src/data/berlin_districts.json` olarak kaydetmek.
* Haritayı Berlin koordinatlarına (`lat: 52.5200, lng: 13.4050`) sabitlemek ve zoom sınırlarını belirlemek.
* Ringbahn tren hattını harita üstünde sarı kesikli çizgiyle vurgulamak.


* **Antigravity Görev Prompt'u:**
> `"GÜN 8: react-leaflet kullanarak src/components/DistrictMap.jsx bileşenini oluştur. Berlin mahalle sınırlarını GeoJSON üzerinden çizdir, Ringbahn hattını belirginleştir ve harita sınırlarını Berlin ile kilitle."`



---

### GÜN 9: Harita Hover Tooltip'leri ve Room/Flat Fiyat Dönüşümü

* **Major Hedef:** Fare mahallenin üzerine geldiğinde dinamik veri kartının açılmasını ve Room/Apartment butonuna basıldığında fiyatların anında güncellenmesini sağlamak.
* **Minor Görevler:**
* Haritanın üzerine "Room (WG)" ve "Entire Apartment" seçim butonunu (Toggle) yerleştirmek.
* Hover durumunda açılan Tooltip'e şu 5 metriği bağlamak: Ortalama Kira, Hunting Difficulty (1-5), Anmeldung Kolaylığı (1-5), Vibe Etiketleri (`vibes.json`'dan) ve Süpermarket/Späti Yoğunluğu.
* Seçilen property tipine göre mahalle poligonlarının renk yoğunluğunu dinamik olarak değiştirmek (Choropleth efekti).


* **Antigravity Görev Prompt'u:**
> `"GÜN 9: DistrictMap.jsx bileşenine Room/Apartment toggle'ı ekle. Mahallelerin üzerine fareyle gelindiğinde (hover) ortalama kira, zorluk skoru, vibe etiketleri ve anmeldung kolaylığını gösteren şık bir Tooltip kartı bağla."`



---

### GÜN 10: "Best Neighborhood for You" Karar Destek Anketi (Arayüz)

* **Major Hedef:** Kullanıcıyı yormayan, adım adım (Step-by-Step Wizard) çalışan modern bir karar anketi tasarlamak.
* **Minor Görevler:**
* `src/components/NeighborhoodQuiz.jsx` bileşenini kurmak.
* Soru 1'e 100€ adımlarla çalışan çift kontrollü Slider + Manuel Sayısal Giriş bileşenini yerleştirmek.
* Kalan 4 yaşam tarzı sorusunu çoklu seçim (multi-select) destekli modern kartlarla kodlamak.
* Üste şık bir İlerleme Çubuğu (Progress Bar) eklemek.


* **Antigravity Görev Prompt'u:**
> `"GÜN 10: src/components/NeighborhoodQuiz.jsx bileşenini oluştur. Soru 1'de 100€ aralıklı bütçe slider'ı ve sayısal input kutusu olan, kalan adımlarda yaşam tarzı tercihlerini toplayan aşamalı bir Quiz arayüzü kodla."`



---

### GÜN 11: Ağırlıklı Puanlama Motoru ve Pros/Cons Karşılaştırma Matrisi

* **Major Hedef:** Anket yanıtlarını analiz edip en uygun 3 mahalleyi hesaplayan ve artı/eksi tablosunu basan algoritmayı yazmak.
* **Minor Görevler:**
* İstemci taraflı puanlama fonksiyonunu (`calculateMatches(answers)`) kodlamak.
* Bütçesi kullanıcının girdiği limitin üzerinde kalan mahallelere katı eleme (hard-filter) uygulamak.
* Sonuç ekranında: Top 3 mahalle, % Eşleşme Oranı ve her biri için şeffaf bir **"+ / -" (Pros & Cons) Karşılaştırma Tablosu** göstermek.


* **Antigravity Görev Prompt'u:**
> `"GÜN 11: Quiz için ağırlıklı skorlama algoritmasını yaz. Bütçeyi aşanları filtrele, en uygun ilk 3 mahalleyi % eşleşme oranı ve net bir Pros/Cons (+ / -) karşılaştırma tablosu ile sonuç ekranında göster."`



---

### GÜN 12: Gemini 1.5 Flash API Entegrasyonu ve AI Berlin Buddy Sekmesi

* **Major Hedef:** Kullanıcının serbest metin olarak yazdığı yaşam tarzına göre tavsiye veren yapay zekâ asistanını bağlamak.
* **Minor Görevler:**
* Vercel Serverless Function yapısında `/api/chat.js` dosyasını oluşturup Gemini API çağrısını sunucu tarafında yapmak.
* Sistem prompt'unda Berlin mahalle karakterlerini modele tanıtıp yapılandırılmış JSON çıktısı talep etmek.
* `src/components/AIBuddy.jsx` arayüzünde temiz bir sohbet/öneri paneli oluşturmak.


* **Antigravity Görev Prompt'u:**
> `"GÜN 12: Google Gemini 1.5 Flash modelini bağlayan serverless API endpoint'i (/api/chat.js) ve frontend tarafında src/components/AIBuddy.jsx sohbet bileşenini oluştur. Yanıtları JSON formatında alıp semt önerisi ve pazar günü planı olarak render et."`



---

### GÜN 13: Siber Güvenlik Testleri ve Kod İncelemesi (Security Audit)

* **Major Hedef:** Sitedeki tüm güvenlik açıklarını kapatmak ve veri sızıntısı risklerini sıfırlamak.
* **Minor Görevler:**
* Yapay zekâdan gelen metinler için `DOMPurify` entegrasyonunu doğrulamak (XSS testi).
* Chat endpoint'ine IP başına dakikalık sorgu limiti (Rate Limiting) tanımlamak.
* Tüm harici bağlantılarda `target="_blank" rel="noopener noreferrer"` kontrolü yapmak.
* Kod tabanında yanlışlıkla kalmış API anahtarı veya hassas veri taraması yapmak.


* **Antigravity Görev Prompt'u:**
> `"GÜN 13: Proje genelinde güvenlik denetimi yap. AI yanıtlarını DOMPurify ile temizle, harici linklerin rel='noopener noreferrer' içerdiğini doğrula, hassas anahtarların kodda kalmadığını teyit et."`



---

### GÜN 14: Vercel Dağıtımı (Deploy), GitHub Dokümantasyonu ve Sunum

* **Major Hedef:** Projeyi canlı web adresine taşımak ve GitHub'da işe alım yöneticilerini etkileyecek profesyonel bir portföy reposuna dönüştürmek.
* **Minor Görevler:**
* Projeyi GitHub'a push'lamak ve Vercel hesabına bağlayarak canlı yayına almak.
* GitHub `README.md` dosyasını hazırlamak: Mimari akış diyagramı, kullanılan teknolojiler, SQL şemaları, Power BI görselleri ve canlı demo bağlantısı.
* Ekran görüntüleri ve kısa bir animasyonlu GIF ekleyerek projeyi tamamlamak.


* **Antigravity Görev Prompt'u:**
> `"GÜN 14: BerlinBase için profesyonel bir GitHub README.md dosyası oluştur. Mimari diyagramı, tech-stack detaylarını, SQL analitik örneklerini ve Power BI kurgusunu içeren zengin bir portföy dokümantasyonu yaz."`



---

## BÖLÜM 5: Risk Yönetimi ve Hukuki Uyarılar

1. **Power BI Web Yayını Gizliliği:** "Publish to Web" raporu kamuya açıktır. Raporda kişisel veya gizli veri kesinlikle barındırılmaz; yalnızca kamuya açık sentetik mahalle ortalamaları yer alır.
2. **Web Scraping Hukuki Engelleri:** Emlak sitelerinin Kullanım Koşulları (Terms of Service) ihlal edilmez. Bot yazıp IP bloklanması yaşamak yerine Kaggle ve Open Data Berlin temelli temizlenmiş sentetik veri seti kullanılır.
3. **Gemini API Kotası ve Bot Koruması:** İstemci tarafında günde en fazla 5 sorgu sınırlaması, sunucuda IP bazlı rate-limiting ve maksimum 350 token yanıt limitiyle bütçe ve kota tam koruma altına alınır.