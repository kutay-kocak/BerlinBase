import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  Building,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import analyticsData from '../data/berlinbase_master_analytics.json';

export default function AIBerlinBuddy() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'alex',
      text: "Servus and welcome to Berlin! I'm Alex, your local Relocation Buddy. 🍻\n\nHunting for an apartment here can feel like the wild west, but don't sweat it. From Anmeldung hacks and SCHUFA workarounds to WG casting etiquette and neighborhood vibes, we'll navigate it all step by step.\n\nPick a quick question below or ask me anything on your mind!"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Ready prompt suggestions in clean 100% English
  const quickPrompts = [
    "I can't find an Anmeldung slot, insider tip?",
    "Can I sign a lease without a SCHUFA credit record?",
    "What is the real difference between Kaltmiete & Warmmiete?"
  ];

  // Tailored responses adhering strictly to Persona Style 1 (Local & Friendly Berlin Expat - "Alex")
  // Dynamically replies in Turkish, German, or English based on user's query language
  const getBuddyResponse = (userText) => {
    const lower = userText.toLowerCase();

    // Language detection heuristics
    const isTurkish = /[çğıöşü]/i.test(userText) || 
      lower.includes('merhaba') || lower.includes('nasılsın') || lower.includes('selam') ||
      lower.includes('nedir') || lower.includes('ev') || lower.includes('kira') ||
      lower.includes('neresi') || lower.includes('tavsiye') || lower.includes('nasıl') ||
      lower.includes('hangi') || lower.includes('semt') || lower.includes('mahalle');

    const isGerman = lower.includes('hallo') || lower.includes('guten tag') || lower.includes('wie') ||
      lower.includes('wohnung') || lower.includes('miete') || lower.includes('bezirk') ||
      lower.includes('bitte') || lower.includes('danke') || lower.includes('tipp') ||
      lower.includes('bürgeramt') || lower.includes('termin');

    // Arabic detection (Arabic script or common transliterated words)
    const isArabic = /[\u0600-\u06FF]/.test(userText) ||
      lower.includes('marhaban') || lower.includes('salam') || lower.includes('shukran') ||
      lower.includes('kayfa') || lower.includes('ijar') || lower.includes('shiqqa');

    // Ukrainian / Russian detection (Cyrillic script)
    const isUkrainian = /[\u0400-\u04FF]/.test(userText);

    // Polish detection (Polish diacritics or keywords)
    const isPolish = /[ąćęłńóśźż]/i.test(userText) ||
      lower.includes('cześć') || lower.includes('dzien dobry') || lower.includes('mieszkanie') ||
      lower.includes('wynajem') || lower.includes('dzielnica') || lower.includes('meldunek');

    // 1. TURKISH RESPONSES
    if (isTurkish) {
      if (lower.includes('anmeldung') || lower.includes('randevu') || lower.includes('buergeramt') || lower.includes('bürgeramt') || lower.includes('slot')) {
        return "Ah, meşhur Berlin Anmeldung macerası! 😂 Hiç panik yapma, sana yerel expat hilesini veriyorum:\n\n1. Hafta içi her sabah 07:50 - 08:15 arasında service.berlin.de Bürgeramt randevu sayfasını aç ve F5 yap. İptal edilen randevular bu saatlerde sisteme düşer.\n2. Sadece kendi oturduğun semtle sınırlı değilsin! Spandau, Reinickendorf veya Marzahn gibi çevre ilçelerden alacağın randevu da tamamen geçerlidir ve aynı gün boş yer bulmak çok daha kolaydır.\n3. Yanında mutlaka ev sahibinin imzaladığı 'Wohnungsgeberbestätigung' ve pasaportun olsun, aksi halde işlem yapamazlar!";
      }

      if (lower.includes('schufa') || lower.includes('kredi') || lower.includes('skor') || lower.includes('kayıt')) {
        return "Klasik Berlin expat açmazı: 'Almanya'ya yeni geldim, nasıl SCHUFA geçmişim olsun?' 😅\n\nEv sahiplerine karşı elini güçlendirecek taktikler:\n• Yine de resmi bir SCHUFA Auskunft siparişi ver. Almanya'da ödenmemiş borcun olmadığı için 'Pozitif / Olumsuz kayıt yok' yazısı çıkar, bunu başvuru dosyana (dossier) mutlaka ekle.\n• En büyük kozun: İş sözleşmen (Arbeitsvertrag) ve son 3 aylık maaş bordron (veya bloke hesap / birikim dökümün).\n• WG (paylaşımlı ev) arıyorsan, kredi skorundan çok ev arkadaşlarınla uyumun, enerjin ve temizliğin 10 kat daha önemlidir!";
      }

      if (lower.includes('kalt') || lower.includes('warm') || lower.includes('kira') || lower.includes('fatura') || lower.includes('aidat')) {
        return "İşte bu yüzden BerlinBase üzerinde 'Total Monthly Rent (Her Şey Dahil)' standardını uyguluyoruz! 👍\n\n• Kaltmiete (Soğuk Kira): Yalnızca 4 duvarın çıplak kira bedelidir.\n• Warmmiete (Sıcak Kira): Kaltmiete + Nebenkosten (çöp, su, bina bakımı ve tahmini ısınma avansı).\n• DİKKAT: Elektrik (Strom) ve Ev İnterneti (WLAN) neredeyse hiçbir zaman Warmmiete içine dahil değildir! Check24 üzerinden kendin sözleşme yapmalısın.\n• Yıl sonunda 'Nebenkostenabrechnung' gelir: Az yaktıysan iade alırsın, çok yaktıysan ek fatura çıkar.";
      }

      if (lower.includes('yazılım') || lower.includes('fiber') || lower.includes('developer') || lower.includes('internet') || lower.includes('hızlı')) {
        return "Süper soru! Berlin'deki arkadaşlarımın yarısı yazılımcı ve uzaktan çalışıyor. 🚀\n\n• En Yüksek Fiber (FTTH) Semtleri: Mitte (%68 fiber) ve Friedrichshain (%62 fiber). Hem gigabit hız var, hem üçüncü nesil kahveciler hem de teknoloji ofislerine adım mesafesi.\n• Alternatif Canlı Semtler: Kreuzberg ve Neukölln (özellikle Maybachufer ve Weserstraße çevresi).\n• Uyarı: Charlottenburg ve Steglitz gibi daha geleneksel dış semtlerde fiber kapsama oranı %40'ın altındadır. Ev tutmadan önce Telekom veya Vodafone üzerinden adres sorgusu yapmayı unutma!";
      }

      return `Harika bir konu! "${userText}" hakkında konuşmak gerekirse: Berlin ilk başta bürokrasisiyle göz korkutsa da kuralları öğrenince Batı Avrupa'nın en özgür ve keyifli başkentidir. Başvuru dosyan (Bewerbungsmappe) PDF olarak her an hazır olsun, WG-Gesucht bildirimlerini aç ve aklına takılan diğer konuları sormaktan çekinme!`;
    }

    // 2. ARABIC RESPONSES (العربية)
    if (isArabic) {
      if (lower.includes('anmeldung') || userText.includes('تسجيل') || userText.includes('موعد') || userText.includes('بلدية')) {
        return "أهلاً بك في برلين! مرحلة الـ Anmeldung قد تبدو معقدة في البداية، لكن إليك السر المحلي: 🌟\n\n1. ادخل إلى موقع service.berlin.de كل صباح بين الساعة 07:50 و 08:15 واضغط تحديث (F5). تظهر المواعيد اليومية الملغاة في هذا الوقت بالتحديد.\n2. لست ملزماً ببلدية منطقتك! يمكنك حجز موعد في أي Bürgeramt في برلين (مثل Spandau أو Reinickendorf) وله نفس القيمة القانونية.\n3. تأكد من إحضار ورقة Wohnungsgeberbestätigung الموقعة من صاحب السكن وجواز سفرك.";
      }

      if (lower.includes('schufa') || userText.includes('شوفي') || userText.includes('ائتمان') || userText.includes('عقد')) {
        return "مسألة الشوفا (SCHUFA) للوافدين الجدد! 🤝\n\n• اطلب استعلام SCHUFA الرسمي على أي حال، وبما أنه ليس لديك ديون سابقة في ألمانيا فسيظهر سجلك نظيفاً وإيجابياً، وهذا يريح المؤجر.\n• قوتك الأساسية في برلين هي عقد العمل (Arbeitsvertrag) وكشف حساب آخر 3 رواتب.\n• وفي السكن المشترك (WG)، التواصل الإيجابي والنظافة أهم بكثير من تقارير الائتمان!";
      }

      return `أهلاً بك! بخصوص استفسارك "${userText}": برلين مدينة متعددة الثقافات ومميزة جداً، خاصة في مناطق مثل نويكولن (Neukölln) وكروزبرغ (Kreuzberg). جهز ملف التقديم كاملاً، ولا تتردد في سؤالي عن أي شيء يخص السكن أو المعيشة!`;
    }

    // 3. UKRAINIAN RESPONSES (Українська)
    if (isUkrainian) {
      if (lower.includes('anmeldung') || userText.includes('прописка') || userText.includes('реєстрація') || userText.includes('термін')) {
        return "Привіт і ласкаво просимо до Берліна! ✌️ Отримати термін на реєстрацію (Anmeldung) реально:\n\n1. Щоранку в будні між 07:50 та 08:15 відкривайте портал service.berlin.de та оновлюйте сторінку (F5) — саме тоді з'являються скасовані записи на той самий день.\n2. Ви можете обрати будь-який Bürgeramt у Берліні (наприклад, Spandau, Marzahn або Reinickendorf), реєстрація діє однаково по всьому місту.\n3. Обов'язково візьміть підписаний орендодавцем документ 'Wohnungsgeberbestätigung' та паспорт!";
      }

      return `Вітаю! Щодо "${userText}": пошук житла в Берліні вимагає терпіння, але з правильними документами все вийде. Підготуйте резюме орендаря (Bewerbungsmappe) та звертайте увагу на такі райони, як Friedrichshain, Wedding чи Pankow. Запитуйте мене про будь-що!`;
    }

    // 4. POLISH RESPONSES (Polski)
    if (isPolish) {
      if (lower.includes('anmeldung') || userText.includes('meldun') || userText.includes('termin')) {
        return "Cześć! Rejestracja zameldowania (Anmeldung) w Berlinie: 🚀\n\n1. Sprawdzaj portal service.berlin.de w dni robocze między 07:50 a 08:15 rano – wtedy zwalniają się anulowane terminy na dany dzień.\n2. Nie musisz meldować się w swojej dzielnicy! Możesz wybrać dowolny Bürgeramt w Berlinie (np. Spandau, Reinickendorf).\n3. Pamiętaj o podpisanym przez właściciela formularzu 'Wohnungsgeberbestätigung' i paszporcie!";
      }

      return `Cześć! W temacie "${userText}": Berlin jest świetnym i bardzo otwartym miastem. Przygotuj kompletny pakiet dokumentów najemcy (Bewerbungsmappe) i włącz powiadomienia w WG-Gesucht / ImmoScout24. Pytaj śmiało o dzielnice i koszty!`;
    }

    // 5. GERMAN RESPONSES
    if (isGerman) {
      if (lower.includes('anmeldung') || lower.includes('termin') || lower.includes('bürgeramt') || lower.includes('slot')) {
        return "Servus! Der legendäre Kampf um den Bürgeramt-Termin in Berlin! 😂 Hier ist der bewährte Insider-Tipp:\n\n1. Öffne jeden Werktagmorgen zwischen 07:50 und 08:15 Uhr das Berliner Service-Portal und aktualisiere (F5). Stornierte Tagestermine werden genau dann freigeschaltet.\n2. Du musst NICHT zwingend in deinem eigenen Bezirk zum Amt! Ein Termin in Spandau, Reinickendorf oder Marzahn ist rechtlich absolut identisch.\n3. Vergiss auf keinen Fall die unterschriebene Wohnungsgeberbestätigung und deinen Pass!";
      }

      if (lower.includes('schufa') || lower.includes('bonität')) {
        return "Das typische Dilemma für Neuankömmlinge in Berlin! 😅\n\n• Beantrage trotzdem eine offizielle SCHUFA-Auskunft. Da du keine Negativmerkmale hast, steht dort ein positiver Vermerk – das beruhigt Vermieter ungemein.\n• Deine stärkste Waffe: Der unterzeichnete Arbeitsvertrag und Gehaltsnachweise der letzten 3 Monate.\n• Bei WG-Castings zählt deine Sympathie und Verlässlichkeit oft deutlich mehr als die Auskunftei!";
      }

      if (lower.includes('kaltmiete') || lower.includes('warmmiete') || lower.includes('nebenkosten')) {
        return "Genau aus diesem Grund berechnen wir bei BerlinBase immer die Gesamtmiete (All-in Rent)! 👍\n\n• Kaltmiete: Nur die reine Wohnfläche ohne Nebenkosten.\n• Warmmiete: Kaltmiete zzgl. Nebenkosten (Wasser, Müllabfuhr, Hausmeister und Heizkostenvorauszahlung).\n• WICHTIG: Strom und Internet/WLAN sind fast nie in der Warmmiete enthalten und müssen separat angemeldet werden.\n• Einmal im Jahr kommt die Nebenkostenabrechnung für die genauen Heizkosten.";
      }

      return `Vielen Dank für deine Nachricht zu "${userText}"! Berlin hat zwar seine bürokratischen Eigenheiten, ist aber eine der lebendigsten Städte Europas. Bereite deine vollständige Bewerbungsmappe vor und lass mich wissen, wenn du weitere Fragen hast!`;
    }

    // 3. ENGLISH RESPONSES (DEFAULT)
    if (lower.includes('anmeldung') || lower.includes('appointment') || lower.includes('buergeramt') || lower.includes('slot')) {
      return "Ah, the legendary Anmeldung struggle! 😂 Don't panic, here is the golden Berlin insider strategy:\n\n1. Every weekday morning between 07:50 AM and 08:15 AM, open service.berlin.de Bürgeramt booking portal and refresh (F5). Same-day cancellations drop in real-time.\n2. You are NOT restricted to your own district! A Bürgeramt appointment in outer boroughs like Spandau, Reinickendorf, or Marzahn is legally identical and often has open slots today.\n3. Make sure you bring your landlord's signed 'Wohnungsgeberbestätigung' and passport—without it, they cannot process you!";
    }

    if (lower.includes('schufa') || lower.includes('credit') || lower.includes('score') || lower.includes('record')) {
      return "The classic expat catch-22: 'I just landed in Germany, how could I have a credit record?' 😅\n\nHere is how you handle landlords:\n• Order an official SCHUFA Auskunft anyway. Since you have no unpaid German debts, it will state 'Positive / No negative records found'—put this straight into your dossier.\n• Your primary superpower: Your German employment contract (Arbeitsvertrag) and latest 3 salary slips (or bank proof of savings).\n• If applying for a WG (shared flat), your vibe, cleanliness, and communication style matter 10x more than credit bureaus!";
    }

    if (lower.includes('kalt') || lower.includes('warm') || lower.includes('rent') || lower.includes('utility') || lower.includes('bill')) {
      return "This is exactly why BerlinBase enforces our 'Total Monthly Rent (All-in)' standard! 👍\n\n• Kaltmiete (Cold Rent): The bare cost of the 4 walls alone.\n• Warmmiete (Warm Rent): Kaltmiete + Nebenkosten (operating costs: garbage, water, stairwell maintenance, and heating advance payment).\n• IMPORTANT: Electricity (Strom) and Home Internet (WLAN) are almost NEVER included in Warmmiete! You must sign your own contracts via Check24.\n• At the end of the year, you receive the 'Nebenkostenabrechnung'—if you used less heating you get a refund, if you used more, you receive a supplementary bill.";
    }

    if (lower.includes('software') || lower.includes('fiber') || lower.includes('developer') || lower.includes('home-office') || lower.includes('tech') || lower.includes('engineer')) {
      return "Awesome question! Half my expat circle are software engineers and remote workers. 🚀\n\n• Top Gigabit Hubs: Mitte (%68 FTTH coverage) and Friedrichshain (%62 FTTH coverage). You get blazing fiber, specialty flat whites, and doorstep access to tech hubs.\n• Creative & Energetic Alternative: Kreuzberg and Neukölln (especially around Weserstraße and Maybachufer).\n• Warning: Outer residential boroughs like Charlottenburg and Steglitz average under %40 fiber coverage. Always run an address broadband check on Telekom or Vodafone before signing!";
    }

    // Check if user specifically asked about a Berlin district
    const matchedDistrict = analyticsData.districts_lifestyle.find(d => 
      lower.includes(d.district_name.toLowerCase()) || 
      (d.district_name === "Prenzlauer Berg" && lower.includes("prenzlauer")) ||
      (d.district_name === "Mitte (Moabit)" && lower.includes("moabit"))
    );

    if (matchedDistrict) {
      const wg = analyticsData.rentals_by_room.find(r => r.district_name === matchedDistrict.district_name && r.room_category === 'WG Room');
      const flat = analyticsData.rentals_by_room.find(r => r.district_name === matchedDistrict.district_name && r.room_category === '1-Bedroom Flat (1+1 / 1+2)');
      
      return `Here is the real-time BerlinBase data dossier for **${matchedDistrict.district_name}** (${matchedDistrict.borough} Borough):\n\n` +
        `• **Average All-in Monthly Rent:** WG Room: €${wg ? wg.average_monthly_rent_eur : 'N/A'} | 1-Bed Flat: €${flat ? flat.average_monthly_rent_eur : 'N/A'}\n` +
        `• **Transit to Alexanderplatz:** ~${matchedDistrict.transit_to_alex_min} minutes\n` +
        `• **Gigabit Fiber Coverage:** %${matchedDistrict.fiber_internet_pct} FTTH\n` +
        `• **Dining & Culture:** %${matchedDistrict.foreign_cuisine_pct} International Restaurants (${matchedDistrict.primary_cuisine})\n` +
        `• **Hotspot:** ${matchedDistrict.top_street_hotspot}\n` +
        `• **Local Spätis:** ${matchedDistrict.spati_count} late-night shops\n\n` +
        `Alex's Tip: ${matchedDistrict.inside_ringbahn ? 'Located inside the Ringbahn (Zone A). Expect intense viewing competition—always submit your dossier within the first 15 minutes of an ad dropping!' : 'Located in the peaceful outer ring (Zone B). You get significantly more square meters and lower competition!'}`;
    }

    // Default friendly response
    return `Great topic! Regarding "${userText}": Berlin has its quirks and bureaucracy, but once you know the playbook, it is one of the most exciting and affordable capitals in Western Europe. Keep your tenant dossier PDF ready, enable instant push alerts on WG-Gesucht/ImmoScout24, and feel free to ask me anything else about districts or relocation steps!`;
  };

  const handleSend = (textToSend = inputVal) => {
    if (!textToSend.trim()) return;

    // Sanitize user text with DOMPurify (Master Plan Day 13 Security Audit)
    const cleanUserText = DOMPurify.sanitize(textToSend.trim());

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: cleanUserText
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const rawReply = getBuddyResponse(cleanUserText);
      const cleanReply = DOMPurify.sanitize(rawReply);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'alex',
        text: cleanReply
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <div className="bg-[#15151D] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-bvg-yellow flex items-center justify-center text-bvg-dark font-black shadow-lg shadow-bvg-yellow/10">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-black text-white tracking-tight">
                AI Berlin Buddy (Alex)
              </h2>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Persona: Friendly Local Expat</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Anmeldung hacks, SCHUFA guidance, neighborhood vibes, and apartment hunting advice.
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="inline-flex items-center space-x-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg bg-bvg-gray/50 border border-white/5 hover:border-white/20 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset Chat</span>
        </button>
      </div>

      {/* Quick Prompt Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        <span className="text-[11px] font-bold text-gray-400 uppercase whitespace-nowrap flex items-center space-x-1">
          <Sparkles className="w-3 h-3 text-bvg-yellow" />
          <span>Quick Prompts:</span>
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p)}
            className="text-xs bg-bvg-gray/60 hover:bg-bvg-gray text-gray-200 hover:text-bvg-yellow px-3 py-1.5 rounded-lg border border-white/10 hover:border-bvg-yellow/40 whitespace-nowrap transition-metro"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-[#121218] border border-white/5 rounded-xl p-4 sm:p-5 min-h-[380px] max-h-[460px] overflow-y-auto space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                m.sender === 'user'
                  ? 'bg-bvg-yellow text-bvg-dark font-semibold rounded-br-none shadow-md'
                  : 'bg-bvg-gray/70 text-gray-200 border border-white/10 rounded-bl-none shadow-sm'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-bvg-gray/50 text-gray-400 text-xs px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bvg-yellow animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-bvg-yellow animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-bvg-yellow animate-bounce [animation-delay:0.4s]"></span>
              <span className="ml-1 text-[11px] text-gray-400">Alex is typing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask Alex anything about Berlin (e.g., Neukölln living, dossier prep, Anmeldung)..."
          className="flex-1 bg-bvg-gray/50 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-bvg-yellow transition-metro"
        />
        <button
          type="submit"
          className="bg-bvg-yellow hover:bg-yellow-400 text-bvg-dark font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 transition-metro shadow-md shadow-bvg-yellow/20"
        >
          <span>Send</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
