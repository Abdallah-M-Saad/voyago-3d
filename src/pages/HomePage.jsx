import { useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

const SHOWCASE_CARDS = [
  {
    id: "luxor-aswan-nile",
    titleAr: "أوديسا النيل والأقصر الذهبية",
    titleEn: "Luxor & Aswan Nile Odyssey",
    placeAr: "الأقصر وأسوان، مصر",
    placeEn: "Luxor & Aswan, Egypt",
    tagAr: "إعلان موسمي • خصم 20%",
    tagEn: "SEASONAL AD • 20% OFF",
    descAr: "إبحار خاص بين المعابد التاريخية وشروق المنطاد وسط أجواء ذهبية لا تُنسى.",
    descEn: "Private Nile cruising between ancient temples and golden sunrise balloons.",
    price: "$1,250",
    image:
      "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kyoto-zen-nights",
    titleAr: "كيوتو ووهج الخريف البرتقالي",
    titleEn: "Kyoto Autumn & Zen Nights",
    placeAr: "كيوتو، اليابان",
    placeEn: "Kyoto, Japan",
    tagAr: "الأكثر طلباً هذا الشهر",
    tagEn: "TOP PICK THIS MONTH",
    descAr: "معابد هادئة، أزقة تقليدية، وإطلالات خريفية دافئة تنسجم مع هوية الموقع.",
    descEn: "Quiet shrines, historic alleys, and warm autumn hues crafted for slow travel.",
    price: "$2,400",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "amalfi-golden-coast",
    titleAr: "ساحل أمالفي وغروب المتوسط",
    titleEn: "Amalfi Golden Coast",
    placeAr: "أمالفي، إيطاليا",
    placeEn: "Amalfi, Italy",
    tagAr: "باقة VIP شاملة",
    tagEn: "VIP CURATED PACKAGE",
    descAr: "منحدرات مطلة على البحر، رحلات بحرية خاصة، وغروب يجمع العنابي والذهب.",
    descEn: "Cliffside vistas, private boat tours, and sunset horizons in warm tones.",
    price: "$1,980",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "petra-wadi-rum",
    titleAr: "البتراء وصحراء وادي رم",
    titleEn: "Petra & Wadi Rum Desert",
    placeAr: "البتراء ووادي رم، الأردن",
    placeEn: "Petra & Wadi Rum, Jordan",
    tagAr: "مغامرة صحراوية فاخرة",
    tagEn: "LUXURY DESERT ESCAPE",
    descAr: "ليالي هادئة تحت النجوم في مخيمات راقية ومغامرات وسط الصخور الوردية.",
    descEn: "Starlit nights in boutique desert camps and dramatic canyon trails.",
    price: "$1,120",
    image:
      "https://images.unsplash.com/photo-1548786811-dd6e45371a8e?auto=format&fit=crop&w=1200&q=80",
  },
];

const DUAL_ADS = [
  {
    badgeAr: "إعلان خاص • الحجز المبكر",
    badgeEn: "FEATURED AD • EARLY BIRD",
    titleAr: "وفر حتى 25% على رحلات الشتاء والعطلات القادمة",
    titleEn: "Save up to 25% on Winter Escapes & Holiday Trips",
    descAr: "احجز مبكراً واختر وجهتك والعدد والمدة في ثوانٍ عبر تجربة حجز سلسة وواضحة.",
    descEn: "Book ahead and customize your destination, date, and guests in seconds.",
    ctaAr: "احجز العرض الآن",
    ctaEn: "Claim Offer",
    targetPage: "booking",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    badgeAr: "إعلان المنصة • رحلات مخصصة",
    badgeEn: "PLATFORM AD • TAILORED TOURS",
    titleAr: "استكشف وجهات متنوعة بين البحر والصحراء والمدن العريقة",
    titleEn: "Explore Coastal, Desert & Heritage Destinations",
    descAr: "فلتر وابحث بسهولة وقارن الخيارات واحفظ رحلاتك المفضلة في قائمة واحدة.",
    descEn: "Search, filter, save favorites, and plan your route effortlessly.",
    ctaAr: "تصفح الوجهات",
    ctaEn: "Explore Now",
    targetPage: "explore",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
  },
];

const MOOD_GALLERY = [
  {
    id: "luxor-aswan-nile",
    labelAr: "رحلات تاريخية وثقافية",
    labelEn: "Heritage & Culture",
    subAr: "معابد، قصص، وتجارب أصيلة",
    subEn: "Temples, stories & timeless roots",
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "amalfi-golden-coast",
    labelAr: "غروب وبحار دافئة",
    labelEn: "Golden Sunsets & Seas",
    subAr: "إطلالات ساحلية واسترخاء كامل",
    subEn: "Coastal horizons & serene views",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "kyoto-zen-nights",
    labelAr: "هدوء وسكينة الطبيعة",
    labelEn: "Calm & Scenic Nature",
    subAr: "أجواء شاعرية بعيداً عن الزحام",
    subEn: "Peaceful landscapes & slow pace",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80",
  },
];

const PLATFORM_FEATURES = [
  {
    icon: "✨",
    titleAr: "إعلانات وعروض حصرية أولاً بأول",
    titleEn: "Featured Campaigns & Seasonal Offers",
    descAr: "نبرز أقوى الباقات والخصومات الموسمية في واجهة واضحة وسريعة التفاعل.",
    descEn: "Highlight top seasonal packages and offers in clear, engaging visual cards.",
  },
  {
    icon: "🌗",
    titleAr: "وضع ليلي عنابي وصباحي دافئ",
    titleEn: "Burgundy Night & Warm Morning Modes",
    descAr: "بدّل بين الوضعين بالأباجورة التفاعلية في أي لحظة أثناء التصفح.",
    descEn: "Switch smoothly between both themes using the interactive lamp anytime.",
  },
  {
    icon: "⚡",
    titleAr: "محاكاة حجز فورية عبر Fake API",
    titleEn: "Live Booking Simulation via Fake API",
    descAr: "جرّب إنشاء الحجوزات وإلغائها وتتبع حالة الطلبات لحظة بلحظة.",
    descEn: "Create or cancel mock bookings and inspect live API responses in real time.",
  },
];

const TRAVELER_STORIES = [
  {
    nameAr: "كريم محمود",
    nameEn: "Karim Mahmoud",
    tripAr: "أوديسا النيل والأقصر",
    tripEn: "Luxor & Aswan Nile",
    quoteAr: "«الألوان والاتساع في الموقع عاطيين إحساس فخم جداً، وتجربة الحجز واضحة وسريعة.»",
    quoteEn: "“The warm palette and spacious layout make browsing and booking effortless.”",
  },
  {
    nameAr: "سلمى حسن",
    nameEn: "Salma Hassan",
    tripAr: "كيوتو ووهج الخريف",
    tripEn: "Kyoto Autumn",
    quoteAr: "«أعجبني إن الصور كبيرة وواضحة وفيه عروض وإعلانات متوزعة بشكل مريح للعين.»",
    quoteEn: "“Large crisp photos and well-placed spotlight banners keep scrolling engaging.”",
  },
  {
    nameAr: "يوسف طارق",
    nameEn: "Youssef Tarek",
    tripAr: "ساحل أمالفي",
    tripEn: "Amalfi Coast",
    quoteAr: "«التبديل بين الوضع الليلي والنهاري والعربي والإنجليزي شغال بسلاسة ملحوظة.»",
    quoteEn: "“Switching between night/morning modes and Arabic/English feels super smooth.”",
  },
];

const FAQ_ITEMS = [
  {
    id: "faq-1",
    qAr: "إزاي أحجز رحلة أو فندق من خلال الموقع؟",
    qEn: "How can I book a trip or a hotel on Voyago 3D?",
    aAr: "تقدر تضغط على زر «احجز» أو «احجز الفندق» في أي بطاقة، أو تدخل مباشرة على صفحة «بناء الحجز»، وتبدّل بين حجز رحلة أو فندق، وتختار التاريخ وعدد الليالي والأفراد ثم تؤكد الحجز.",
    aEn: "Click Book or Book Hotel on any card, or open Booking to switch between trips and hotels, pick your dates, nights, and guests, and confirm.",
  },
  {
    id: "faq-2",
    qAr: "هل أقدر أعدّل أو ألغي حجز بعد تأكيده؟",
    qEn: "Can I cancel a booking after confirming it?",
    aAr: "أيوة، ادخل على صفحة «رحلاتي» وهتلاقي كل الحجوزات المسجلة مع زر «إلغاء الحجز» لتحديث حالة الحجز فوراً وتتبع العملية في سجل الـ Fake API.",
    aEn: "Yes. Open My Trips to view all bookings and click Cancel to update booking status and log the mock API action.",
  },
  {
    id: "faq-3",
    qAr: "كيف يُحسب سعر حجز الفندق في الصفحة؟",
    qEn: "How is the hotel stay price calculated?",
    aAr: "السعر التقديري بيُحسب بناءً على سعر الليلة للفندق مضروباً في عدد الليالي وعدد الغرف المطلوبة بحسب عدد الضيوف.",
    aEn: "Estimated total is calculated from the hotel's nightly rate multiplied by nights and rooms based on guest count.",
  },
  {
    id: "faq-4",
    qAr: "إزاي أبدّل بين الوضع الليلي والصباحي أو أغير اللغة؟",
    qEn: "How do I switch between Night/Morning modes or change language?",
    aAr: "من الشريط العلوي تقدر تضغط على الأباجورة للتبديل بين الوضع الليلي العنابي والصباحي الدافئ، وزر اللغة للتبديل الفوري بين العربية والإنجليزية مع حفظ اختياراتك.",
    aEn: "Use the lamp fixture in the navbar to toggle Night and Morning themes, and the language button to switch between Arabic and English.",
  },
  {
    id: "faq-5",
    qAr: "إيه فكرة الـ Fake API Inspector في صفحة الحجز؟",
    qEn: "What is the Fake API Inspector in the Booking page?",
    aAr: "أداة بتعرض سجل لحظي لطلبات المحاكاة (GET / POST / PATCH) وحالة الاستجابة والوقت عشان تتابع حركة البيانات أثناء التجربة.",
    aEn: "It displays live simulated requests (GET / POST / PATCH), status codes, and timestamps as you interact with bookings.",
  },
];

export default function HomePage() {
  const {
    lang,
    t,
    navigateTo,
    trips = [],
    hotels = [],
    savedIds = [],
    toggleSaved,
    bookings = [],
    setSearchPreset,
  } = useApp();

  const isAr = lang === "ar";
  const confirmedCount = bookings.filter((b) => b.status !== "cancelled").length;

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(FAQ_ITEMS[0].id);

  const searchableItems = useMemo(() => {
    const tripEntries = (trips.length ? trips : SHOWCASE_CARDS).map((tr) => ({
      id: tr.id,
      type: "trip",
      badgeAr: "رحلة",
      badgeEn: "Trip",
      titleAr: tr.title || tr.titleAr || tr.name,
      titleEn: tr.name || tr.titleEn || tr.title,
      subAr: tr.location || tr.placeAr || "",
      subEn: tr.location || tr.placeEn || "",
      price: tr.price ? `$${Number(tr.price).toLocaleString()}` : "",
    }));

    const hotelEntries = hotels.map((ht) => ({
      id: ht.id,
      type: "hotel",
      badgeAr: "فندق",
      badgeEn: "Hotel",
      titleAr: ht.nameAr,
      titleEn: ht.nameEn,
      subAr: ht.cityAr,
      subEn: ht.cityEn,
      price: `$${ht.pricePerNight}/${isAr ? "ليلة" : "night"}`,
    }));

    return [...tripEntries, ...hotelEntries];
  }, [trips, hotels, isAr]);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return searchableItems.slice(0, 4);

    const startsWithMatches = searchableItems.filter((item) =>
      [item.titleAr, item.titleEn, item.subAr, item.subEn]
        .filter(Boolean)
        .some((txt) => txt.toLowerCase().startsWith(q))
    );

    const includesMatches = searchableItems.filter(
      (item) =>
        !startsWithMatches.some((s) => s.id === item.id) &&
        [item.titleAr, item.titleEn, item.subAr, item.subEn]
          .filter(Boolean)
          .some((txt) => txt.toLowerCase().includes(q))
    );

    return [...startsWithMatches, ...includesMatches].slice(0, 6);
  }, [searchQuery, searchableItems]);

  const handleSelectSuggestion = (item) => {
    const label = isAr ? item.titleAr : item.titleEn;
    setSearchQuery(label);
    setIsSearchFocused(false);
    if (typeof setSearchPreset === "function") {
      setSearchPreset((prev) => ({ ...prev, query: label }));
    }

    if (item.type === "hotel") {
      navigateTo("booking", {
        bookingDraft: { bookingType: "hotel", hotelId: item.id, nights: 3 },
      });
    } else {
      navigateTo("booking", {
        destinationId: item.id,
        bookingDraft: { bookingType: "trip", destinationId: item.id },
      });
    }
  };

  return (
    <div style={{ display: "grid", gap: "48px", paddingBottom: "36px" }}>
      {/* ===== 1. Hero Section كبير بصورة بانورامية + بحث باقتراحات فورية ===== */}
      <section
        style={{
          position: "relative",
          borderRadius: "30px",
          border: "1px solid var(--border-subtle)",
          background: "var(--bg-card)",
          backdropFilter: "blur(16px)",
          boxShadow: "0 24px 60px var(--glow-soft)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          alignItems: "center",
        }}
      >
        <div
          style={{
            padding: "46px 36px",
            display: "grid",
            gap: "18px",
          }}
        >
          <span
            style={{
              justifySelf: "start",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: "12.5px",
              fontWeight: 700,
              background: "rgba(245, 158, 11, 0.16)",
              border: "1px solid var(--border-hover)",
              color: "var(--accent)",
            }}
          >
            {isAr
              ? "🔥 حملة فوياجو ٣دي • رحلات وفنادق مختارة بعناية"
              : "🔥 VOYAGO 3D SPOTLIGHT • CURATED TRIPS & STAYS"}
          </span>

          <h1 style={{ margin: 0, fontSize: "clamp(30px, 4.2vw, 48px)" }}>
            {t?.home?.heroTitle}
          </h1>

          <p
            style={{
              margin: 0,
              color: "var(--text-muted)",
              fontSize: "16px",
              maxWidth: "600px",
            }}
          >
            {t?.home?.heroSubtitle}
          </p>

          {/* شريط بحث باقتراحات فورية حسب أول حرف */}
          <div style={{ position: "relative", maxWidth: "560px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 12px",
                borderRadius: "16px",
                background: "var(--bg-main)",
                border: "1px solid var(--border-hover)",
              }}
            >
              <span>🔎</span>
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 160)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                placeholder={
                  isAr
                    ? "اكتب أول حرف من وجهة أو فندق (مثال: أ، ك، ل، Hotel)..."
                    : "Type first letter of a destination or hotel (e.g. L, K, A)..."
                }
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "var(--text-main)",
                  fontSize: "14.5px",
                  padding: "6px 4px",
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                    fontSize: "14px",
                    padding: "4px 6px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {isSearchFocused && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  insetInlineStart: 0,
                  insetInlineEnd: 0,
                  top: "calc(100% + 8px)",
                  zIndex: 25,
                  borderRadius: "18px",
                  background: "var(--bg-card-hover)",
                  border: "1px solid var(--border-hover)",
                  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.38)",
                  backdropFilter: "blur(18px)",
                  overflow: "hidden",
                  display: "grid",
                }}
              >
                {suggestions.map((item) => (
                  <button
                    key={`${item.type}-${item.id}`}
                    type="button"
                    onMouseDown={() => handleSelectSuggestion(item)}
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "1px solid var(--border-subtle)",
                      background: "transparent",
                      color: "var(--text-main)",
                      padding: "12px 16px",
                      textAlign: "start",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "12px",
                    }}
                  >
                    <div style={{ display: "grid", gap: "2px" }}>
                      <strong style={{ fontSize: "14.5px" }}>
                        {isAr ? item.titleAr : item.titleEn}
                      </strong>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                        {isAr ? item.badgeAr : item.badgeEn}
                        {(isAr ? item.subAr : item.subEn)
                          ? ` • ${isAr ? item.subAr : item.subEn}`
                          : ""}
                      </span>
                    </div>
                    {item.price && (
                      <span className="nav-badge" style={{ flexShrink: 0 }}>
                        {item.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", paddingTop: "4px" }}>
            <button
              type="button"
              className="lang-btn"
              style={{
                padding: "13px 22px",
                fontSize: "14.5px",
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                color: "#fffbeb",
                borderColor: "transparent",
              }}
              onClick={() => navigateTo("explore")}
            >
              🌍 {t?.nav?.explore || (isAr ? "استكشف الوجهات" : "Explore")}
            </button>

            <button
              type="button"
              className="lang-btn"
              style={{ padding: "13px 22px", fontSize: "14.5px" }}
              onClick={() => navigateTo("booking")}
            >
              ✈️ {t?.nav?.booking || (isAr ? "بناء الحجز" : "Booking")}
            </button>
          </div>
        </div>

        <div
          style={{
            minHeight: "360px",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderStartStartRadius: "0px",
            borderEndStartRadius: "0px",
            borderStartEndRadius: "30px",
            borderEndEndRadius: "30px",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
            alt={isAr ? "إطلالة سفر فاخرة" : "Luxury travel horizon"}
            style={{
              width: "100%",
              height: "100%",
              minHeight: "360px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </section>

      {/* ===== 2. شريط إعلاني سريع عن المنصة ===== */}
      <section
        style={{
          padding: "22px 28px",
          borderRadius: "22px",
          background:
            "linear-gradient(125deg, rgba(136, 19, 55, 0.24), rgba(234, 88, 12, 0.18), rgba(245, 158, 11, 0.16))",
          border: "1px solid var(--border-hover)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "grid", gap: "4px" }}>
          <strong style={{ fontSize: "17.5px" }}>
            {isAr
              ? "📣 إعلان المنصة: احجز وجهتك أو فندقك المفضل الآن وجرّب نظام المحاكاة الفوري مع متابعة كاملة لحجوزاتك."
              : "📣 Platform Spotlight: Book your next trip or hotel stay and test instant booking flows with live tracking."}
          </strong>
          <span style={{ fontSize: "13.5px", color: "var(--text-muted)" }}>
            {isAr
              ? `لديك حالياً ${confirmedCount} حجوزات نشطة و ${savedIds.length} وجهات محفوظة.`
              : `You currently have ${confirmedCount} active bookings and ${savedIds.length} saved destinations.`}
          </span>
        </div>

        <button
          type="button"
          className="lang-btn"
          onClick={() => navigateTo("trips")}
        >
          {t?.nav?.trips || (isAr ? "رحلاتي" : "My Trips")} ←
        </button>
      </section>

      {/* ===== 3. معرض صور الوجهات والإعلانات الترويجية ===== */}
      <section style={{ display: "grid", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: "clamp(24px, 3vw, 34px)" }}>
              {isAr ? "وجهات وحملات مختارة بالصور" : "Featured Destinations & Campaigns"}
            </h2>
            <p style={{ margin: 0, color: "var(--text-muted)" }}>
              {isAr
                ? "استعرض أبرز الوجهات المصورة واحفظ ما يعجبك أو انتقل للحجز مباشرة."
                : "Browse visual highlights, save favorites, or jump straight into booking."}
            </p>
          </div>

          <button
            type="button"
            className="lang-btn"
            onClick={() => navigateTo("explore")}
          >
            {isAr ? "عرض الكل" : "View All"}
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          {SHOWCASE_CARDS.map((card) => {
            const isSaved = savedIds.includes(card.id);
            return (
              <article
                key={card.id}
                style={{
                  overflow: "hidden",
                  borderRadius: "24px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  backdropFilter: "blur(14px)",
                  display: "grid",
                  gridTemplateRows: "215px 1fr",
                  boxShadow: "0 14px 34px var(--glow-soft)",
                }}
              >
                <img
                  src={card.image}
                  alt={isAr ? card.titleAr : card.titleEn}
                  style={{
                    width: "100%",
                    height: "215px",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <div
                  style={{
                    padding: "20px",
                    display: "grid",
                    gap: "12px",
                    alignContent: "space-between",
                  }}
                >
                  <div style={{ display: "grid", gap: "8px" }}>
                    <span
                      style={{
                        fontSize: "11.5px",
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {isAr ? card.tagAr : card.tagEn}
                    </span>
                    <h3 style={{ margin: 0, fontSize: "19px" }}>
                      {isAr ? card.titleAr : card.titleEn}
                    </h3>
                    <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                      {isAr ? card.descAr : card.descEn}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "10px",
                      paddingTop: "8px",
                    }}
                  >
                    <strong style={{ fontSize: "18px" }}>{card.price}</strong>

                    <div style={{ display: "flex", gap: "8px" }}>
                      {typeof toggleSaved === "function" && (
                        <button
                          type="button"
                          className="lang-btn"
                          onClick={() => toggleSaved(card.id)}
                        >
                          {isSaved ? "★" : "☆"}
                        </button>
                      )}
                      <button
                        type="button"
                        className="lang-btn"
                        style={{
                          background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                          color: "#fffbeb",
                          borderColor: "transparent",
                        }}
                        onClick={() =>
                          navigateTo("booking", {
                            destinationId: card.id,
                            bookingDraft: { bookingType: "trip", destinationId: card.id },
                          })
                        }
                      >
                        {isAr ? "احجز" : "Book"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===== 4. إعلانات مزدوجة للعروض والحملات ===== */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "22px",
        }}
      >
        {DUAL_ADS.map((ad, idx) => (
          <article
            key={idx}
            style={{
              overflow: "hidden",
              borderRadius: "26px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-hover)",
              boxShadow: "0 18px 40px var(--glow-soft)",
              display: "grid",
              gridTemplateRows: "220px 1fr",
            }}
          >
            <img
              src={ad.image}
              alt={isAr ? ad.titleAr : ad.titleEn}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div style={{ padding: "24px", display: "grid", gap: "12px", alignContent: "space-between" }}>
              <div style={{ display: "grid", gap: "8px" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)" }}>
                  {isAr ? ad.badgeAr : ad.badgeEn}
                </span>
                <h3 style={{ margin: 0, fontSize: "21px" }}>
                  {isAr ? ad.titleAr : ad.titleEn}
                </h3>
                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                  {isAr ? ad.descAr : ad.descEn}
                </p>
              </div>

              <div style={{ paddingTop: "6px" }}>
                <button
                  type="button"
                  className="lang-btn"
                  style={{
                    padding: "11px 18px",
                    background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                    color: "#fffbeb",
                    borderColor: "transparent",
                  }}
                  onClick={() => navigateTo(ad.targetPage)}
                >
                  {isAr ? ad.ctaAr : ad.ctaEn}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ===== 5. معرض حسب المزاج / الأجواء ===== */}
      <section style={{ display: "grid", gap: "18px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "clamp(24px, 3vw, 34px)" }}>
            {isAr ? "اختر رحلتك حسب الأجواء" : "Travel by Mood & Atmosphere"}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {isAr
              ? "صور ملهمة تأخذك مباشرة إلى التجربة المناسبة لمزاجك اليوم."
              : "Inspiring scenes that drop you right into the mood you want today."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {MOOD_GALLERY.map((mood) => (
            <div
              key={mood.id}
              onClick={() =>
                navigateTo("booking", {
                  destinationId: mood.id,
                  bookingDraft: { bookingType: "trip", destinationId: mood.id },
                })
              }
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigateTo("booking", {
                    destinationId: mood.id,
                    bookingDraft: { bookingType: "trip", destinationId: mood.id },
                  });
                }
              }}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "24px",
                minHeight: "260px",
                border: "1px solid var(--border-subtle)",
                cursor: "pointer",
              }}
            >
              <img
                src={mood.image}
                alt={isAr ? mood.labelAr : mood.labelEn}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "260px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(18, 6, 9, 0.88) 12%, rgba(18, 6, 9, 0.25) 65%, transparent)",
                  padding: "22px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "4px",
                  color: "#fff8ed",
                }}
              >
                <strong style={{ fontSize: "19px" }}>
                  {isAr ? mood.labelAr : mood.labelEn}
                </strong>
                <span style={{ fontSize: "13px", color: "#fde68a" }}>
                  {isAr ? mood.subAr : mood.subEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== 6. بانر إعلاني ضخم عن الموقع أثناء السكرول ===== */}
      <section
        style={{
          borderRadius: "28px",
          overflow: "hidden",
          border: "1px solid var(--border-hover)",
          background: "var(--bg-card)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          alignItems: "center",
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1400&q=80"
          alt={isAr ? "إعلان منصة فوياجو ٣دي" : "Voyago 3D Promo Banner"}
          style={{
            width: "100%",
            height: "100%",
            minHeight: "310px",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div style={{ padding: "36px 32px", display: "grid", gap: "14px" }}>
          <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--accent)" }}>
            {isAr ? "✦ لماذا صُممت منصة فوياجو ٣دي؟" : "✦ WHY VOYAGO 3D WAS BUILT"}
          </span>
          <h2 style={{ margin: 0, fontSize: "clamp(24px, 3vw, 34px)" }}>
            {isAr
              ? "واجهة بصرية واسعة تجمع بين الفخامة، السلاسة، وتجربة الحجز التفاعلية"
              : "A spacious visual platform combining warmth, motion, and interactive booking"}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {isAr
              ? "كل قسم مصمم ليمنح الزائر إحساساً بالانطلاق والوضوح، مع عروض واضحة وسهولة كاملة في التصفح والحجز."
              : "Every section is crafted for clarity, visual impact, and effortless trip planning."}
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", paddingTop: "6px" }}>
            <button
              type="button"
              className="lang-btn"
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                color: "#fffbeb",
                borderColor: "transparent",
              }}
              onClick={() => navigateTo("booking")}
            >
              {isAr ? "ابدأ حجزك الآن" : "Start Booking"}
            </button>
            <button
              type="button"
              className="lang-btn"
              onClick={() => navigateTo("explore")}
            >
              {isAr ? "استكشف العروض" : "Explore Offers"}
            </button>
          </div>
        </div>
      </section>

      {/* ===== 7. مميزات المنصة ===== */}
      <section style={{ display: "grid", gap: "18px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "clamp(24px, 3vw, 34px)" }}>
            {isAr ? "أبرز مزايا المنصة" : "Platform Highlights"}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {isAr
              ? "تجربة متكاملة تجمع بين الجاذبية البصرية والخصائص التفاعلية."
              : "A cohesive experience blending visual warmth with interactive tools."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {PLATFORM_FEATURES.map((feat, i) => (
            <article
              key={i}
              style={{
                padding: "24px",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                display: "grid",
                gap: "10px",
                alignContent: "start",
              }}
            >
              <span style={{ fontSize: "26px" }}>{feat.icon}</span>
              <h3 style={{ margin: 0, fontSize: "18px" }}>
                {isAr ? feat.titleAr : feat.titleEn}
              </h3>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14px" }}>
                {isAr ? feat.descAr : feat.descEn}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 8. آراء المسافرين ===== */}
      <section style={{ display: "grid", gap: "18px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "clamp(24px, 3vw, 34px)" }}>
            {isAr ? "انطباعات وتجارب المسافرين" : "Traveler Impressions"}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {isAr
              ? "آراء مختصرة حول سهولة التصفح وتجربة الألوان والحجز."
              : "Quick notes on browsing flow, palette contrast, and booking ease."}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {TRAVELER_STORIES.map((story, idx) => (
            <article
              key={idx}
              style={{
                padding: "22px",
                borderRadius: "22px",
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                display: "grid",
                gap: "12px",
                alignContent: "space-between",
              }}
            >
              <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.7 }}>
                {isAr ? story.quoteAr : story.quoteEn}
              </p>
              <div style={{ display: "grid", gap: "2px" }}>
                <strong style={{ fontSize: "15px" }}>
                  {isAr ? story.nameAr : story.nameEn}
                </strong>
                <span style={{ fontSize: "12.5px", color: "var(--accent)" }}>
                  {isAr ? story.tripAr : story.tripEn}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== 9. الأسئلة الشائعة (FAQ) ===== */}
      <section style={{ display: "grid", gap: "16px" }}>
        <div>
          <h2 style={{ margin: "0 0 4px", fontSize: "clamp(24px, 3vw, 34px)" }}>
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)" }}>
            {isAr
              ? "إجابات سريعة لأكثر الاستفسارات حول الحجز والفنادق والمزايا التفاعلية."
              : "Quick answers to common questions about booking, stays, and interactive tools."}
          </p>
        </div>

        <div style={{ display: "grid", gap: "12px" }}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  borderRadius: "18px",
                  background: "var(--bg-card)",
                  border: `1px solid ${isOpen ? "var(--border-hover)" : "var(--border-subtle)"}`,
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                  style={{
                    width: "100%",
                    padding: "18px 22px",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-main)",
                    textAlign: "start",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    fontSize: "15.5px",
                    fontWeight: 700,
                  }}
                >
                  <span>{isAr ? item.qAr : item.qEn}</span>
                  <span style={{ color: "var(--accent)", fontSize: "18px", flexShrink: 0 }}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 22px 18px",
                      color: "var(--text-muted)",
                      fontSize: "14.5px",
                      lineHeight: 1.75,
                    }}
                  >
                    {isAr ? item.aAr : item.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}