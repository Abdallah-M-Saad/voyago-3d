import { useApp } from "../context/AppContext";

const FOOTER_COLUMNS = [
  {
    titleAr: "الدعم",
    titleEn: "Support",
    links: [
      { labelAr: "إدارة رحلاتك وحجوزاتك", labelEn: "Manage your trips", page: "trips" },
      { labelAr: "تواصل مع خدمة العملاء", labelEn: "Contact customer service", page: "home" },
      { labelAr: "بناء حجز جديد", labelEn: "Start a new booking", page: "booking" },
      { labelAr: "مركز معلومات السلامة", labelEn: "Safety resource center", page: "home" },
    ],
  },
  {
    titleAr: "استكشف",
    titleEn: "Discover",
    links: [
      { labelAr: "استكشف الوجهات والرحلات", labelEn: "Explore destinations", page: "explore" },
      { labelAr: "عروض العطلات والمواسم", labelEn: "Seasonal & holiday deals", page: "home" },
      { labelAr: "فنادق ومنتجعات مختارة", labelEn: "Featured hotels & stays", page: "booking" },
      { labelAr: "مقالات وأدلة السفر", labelEn: "Travel stories & guides", page: "explore" },
    ],
  },
  {
    titleAr: "الشروط والإعدادات",
    titleEn: "Terms & Settings",
    links: [
      { labelAr: "بيان الخصوصية", labelEn: "Privacy notice", page: "home" },
      { labelAr: "شروط الخدمة", labelEn: "Terms of service", page: "home" },
      { labelAr: "إعدادات اللغة والوضع", labelEn: "Language & theme settings", page: "home" },
      { labelAr: "سياسة إلغاء الحجوزات", labelEn: "Booking cancellation policy", page: "trips" },
    ],
  },
  {
    titleAr: "الشركاء",
    titleEn: "Partners",
    links: [
      { labelAr: "فنادق ومنتجعات شريكة", labelEn: "Partner hotels & resorts", page: "booking" },
      { labelAr: "اعرض وجهتك على المنصة", labelEn: "List your destination", page: "explore" },
      { labelAr: "شركاء الرحلات والمغامرات", labelEn: "Tour & adventure partners", page: "explore" },
    ],
  },
  {
    titleAr: "معلومات",
    titleEn: "About",
    links: [
      { labelAr: "نبذة عن Voyago 3D", labelEn: "About Voyago 3D", page: "home" },
      { labelAr: "طريقة عمل المنصة والـ API", labelEn: "How the platform & API work", page: "booking" },
      { labelAr: "الاستدامة والسياحة المسؤولة", labelEn: "Sustainability & slow travel", page: "explore" },
      { labelAr: "المركز الإعلامي", labelEn: "Press & media hub", page: "home" },
    ],
  },
];

const ECOSYSTEM_MARKS = [
  { glyph: "◈", label: "Voyago Stays", color: "#f59e0b" },
  { glyph: "✦", label: "Golden Flights", color: "#ea580c" },
  { glyph: "❖", label: "Amber Resorts", color: "#d97706" },
  { glyph: "☾", label: "Desert & Nile", color: "#fbbf24" },
  { glyph: "⬡", label: "3D Escapes", color: "#f97316" },
];

export default function Footer() {
  const { lang, toggleLanguage, navigateTo, isMorningLampOn } = useApp();
  const isAr = lang === "ar";

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        marginTop: "28px",
        borderTop: "1px solid var(--border-subtle)",
        background: isMorningLampOn
          ? "linear-gradient(180deg, rgba(255, 249, 240, 0.9) 0%, rgba(250, 235, 215, 0.96) 100%)"
          : "linear-gradient(180deg, rgba(36, 10, 17, 0.86) 0%, rgba(18, 6, 9, 0.96) 100%)",
        backdropFilter: "blur(18px)",
      }}
    >
      <div
        style={{
          maxWidth: "1380px",
          margin: "0 auto",
          padding: "46px 28px 32px",
          display: "grid",
          gap: "32px",
        }}
      >
        {/* أعمدة الروابط الخمسة */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "24px",
          }}
        >
          {FOOTER_COLUMNS.map((col, idx) => (
            <div key={idx} style={{ display: "grid", gap: "10px", alignContent: "start" }}>
              <h4
                style={{
                  margin: "0 0 4px",
                  fontSize: "15.5px",
                  fontWeight: 800,
                  color: "var(--accent)",
                }}
              >
                {isAr ? col.titleAr : col.titleEn}
              </h4>

              {col.links.map((item, lIdx) => (
                <button
                  key={lIdx}
                  type="button"
                  onClick={() => navigateTo(item.page)}
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "var(--text-muted)",
                    padding: "2px 0",
                    textAlign: "start",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                    lineHeight: 1.55,
                  }}
                >
                  {isAr ? item.labelAr : item.labelEn}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* شريط العملة واللغة */}
        <div
          style={{
            paddingTop: "18px",
            borderTop: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="nav-badge">USD / EGP</span>
            <span style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--text-muted)" }}>
              {isAr
                ? "منصة سفر وحجز تفاعلية ثلاثية الأبعاد"
                : "Interactive 3D Travel & Booking Platform"}
            </span>
          </div>

          <button type="button" className="lang-btn" onClick={toggleLanguage}>
            {isAr ? "🌐 Switch to English" : "🌐 التبديل إلى العربية"}
          </button>
        </div>

        {/* حقوق الملكية وعلامات المنصة بأسلوب أنيق */}
        <div
          style={{
            display: "grid",
            gap: "18px",
            textAlign: "center",
            fontSize: "12.5px",
            color: "var(--text-muted)",
          }}
        >
          <div>
            <div>
              {isAr
                ? "Voyago 3D — منصة استكشاف وحجز الرحلات والفنادق بتجربة بصرية تفاعلية."
                : "Voyago 3D — Interactive trip & hotel discovery and booking showcase."}
            </div>
            <div>
              {isAr
                ? "حقوق النشر © 2026 Voyago 3D. جميع الحقوق محفوظة."
                : "Copyright © 2026 Voyago 3D. All rights reserved."}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "26px",
              flexWrap: "wrap",
              paddingTop: "4px",
            }}
          >
            {ECOSYSTEM_MARKS.map((mark) => (
              <div
                key={mark.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "13.5px",
                  fontWeight: 800,
                  letterSpacing: "0.3px",
                  color: "var(--text-main)",
                  opacity: 0.9,
                }}
              >
                <span style={{ color: mark.color, fontSize: "16px" }}>{mark.glyph}</span>
                <span>{mark.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}