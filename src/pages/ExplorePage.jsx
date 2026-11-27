import { useEffect, useMemo, useState } from "react";
import { useApp } from "../context/AppContext";

const TRIP_IMAGES = {
  "luxor-aswan-nile":
    "https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1200&q=80",
  "kyoto-zen-nights":
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
  "amalfi-golden-coast":
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
  "petra-wadi-rum":
    "https://images.unsplash.com/photo-1548786811-dd6e45371a8e?auto=format&fit=crop&w=1200&q=80",
};

export default function ExplorePage() {
  const {
    lang,
    t,
    trips = [],
    hotels = [],
    savedIds = [],
    toggleSaved,
    compareIds = [],
    toggleCompare,
    navigateTo,
    searchPreset,
    setSearchPreset,
  } = useApp();

  const isAr = lang === "ar";
  const [tab, setTab] = useState("all"); // "all" | "trips" | "hotels"
  const [query, setQuery] = useState(searchPreset?.query || "");

  useEffect(() => {
    if (searchPreset?.query) {
      setQuery(searchPreset.query);
    }
  }, [searchPreset]);

  const catalog = useMemo(() => {
    const tripCards = trips.map((tr) => ({
      id: tr.id,
      kind: "trip",
      badgeAr: "رحلة متكاملة",
      badgeEn: "Trip Package",
      title: isAr ? tr.title || tr.name : tr.name || tr.title,
      subtitle: tr.location || "",
      meta: tr.category || (isAr ? "رحلة" : "Trip"),
      description: tr.description || "",
      priceLabel: tr.price ? `$${Number(tr.price).toLocaleString()}` : "$1,200",
      numericPrice: Number(tr.price) || 1200,
      image:
        tr.image ||
        TRIP_IMAGES[tr.id] ||
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    }));

    const hotelCards = hotels.map((ht) => ({
      id: ht.id,
      kind: "hotel",
      badgeAr: "إقامة فندقية",
      badgeEn: "Hotel Stay",
      title: isAr ? ht.nameAr : ht.nameEn,
      subtitle: isAr ? ht.cityAr : ht.cityEn,
      meta: ht.rating || "4.9 ★",
      description: isAr ? ht.badgeAr : ht.badgeEn,
      priceLabel: `$${ht.pricePerNight}/${isAr ? "ليلة" : "night"}`,
      numericPrice: Number(ht.pricePerNight) || 300,
      image: ht.image,
    }));

    return [...tripCards, ...hotelCards];
  }, [trips, hotels, isAr]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalog.filter((item) => {
      const matchesTab =
        tab === "all" || (tab === "trips" && item.kind === "trip") || (tab === "hotels" && item.kind === "hotel");
      if (!matchesTab) return false;
      if (!q) return true;
      return [item.title, item.subtitle, item.meta, item.description]
        .filter(Boolean)
        .some((txt) => txt.toLowerCase().includes(q));
    });
  }, [catalog, tab, query]);

  const comparedItems = useMemo(
    () => catalog.filter((item) => compareIds.includes(item.id)),
    [catalog, compareIds]
  );

  const handleBookItem = (item) => {
    if (item.kind === "hotel") {
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
    <section style={{ display: "grid", gap: "28px", paddingBottom: "24px" }}>
      {/* ===== رأس الصفحة + التبويبات + البحث ===== */}
      <div
        style={{
          padding: "28px 26px",
          borderRadius: "28px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          display: "grid",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "14px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ margin: "0 0 6px", fontSize: "clamp(24px, 3vw, 34px)" }}>
              {t?.nav?.explore || (isAr ? "استكشف الوجهات والفنادق" : "Explore Trips & Hotels")}
            </h2>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14.5px" }}>
              {isAr
                ? `تصفح ${trips.length} رحلات و ${hotels.length} فنادق، احفظ المفضلة، وقارن بين الخيارات.`
                : `Browse ${trips.length} trips and ${hotels.length} hotels, save favorites, and compare side by side.`}
            </p>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              className={`nav-link-btn ${tab === "all" ? "active" : ""}`}
              onClick={() => setTab("all")}
            >
              {isAr ? "الكل" : "All"} <span className="nav-badge">{catalog.length}</span>
            </button>
            <button
              type="button"
              className={`nav-link-btn ${tab === "trips" ? "active" : ""}`}
              onClick={() => setTab("trips")}
            >
              ✈️ {isAr ? "الرحلات" : "Trips"} <span className="nav-badge">{trips.length}</span>
            </button>
            <button
              type="button"
              className={`nav-link-btn ${tab === "hotels" ? "active" : ""}`}
              onClick={() => setTab("hotels")}
            >
              🏨 {isAr ? "الفنادق" : "Hotels"} <span className="nav-badge">{hotels.length}</span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 14px",
            borderRadius: "16px",
            background: "var(--bg-main)",
            border: "1px solid var(--border-hover)",
          }}
        >
          <span>🔎</span>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (typeof setSearchPreset === "function") {
                setSearchPreset((prev) => ({ ...prev, query: e.target.value }));
              }
            }}
            placeholder={
              isAr
                ? "ابحث باسم الرحلة أو الفندق أو المدينة..."
                : "Search by trip title, hotel name, or city..."
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
          {query && (
            <button
              type="button"
              className="lang-btn"
              onClick={() => {
                setQuery("");
                if (typeof setSearchPreset === "function") {
                  setSearchPreset((prev) => ({ ...prev, query: "" }));
                }
              }}
            >
              {isAr ? "مسح" : "Clear"}
            </button>
          )}
        </div>
      </div>

      {/* ===== شبكة الرحلات والفنادق ===== */}
      {filteredItems.length === 0 ? (
        <div
          style={{
            padding: "32px",
            borderRadius: "24px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-subtle)",
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          {isAr
            ? "لا توجد نتائج مطابقة لبحثك — جرّب كلمة أخرى أو بدّل التبويب."
            : "No matching items found — try another keyword or switch tabs."}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "22px",
          }}
        >
          {filteredItems.map((item) => {
            const isSaved = savedIds.includes(item.id);
            const isCompared = compareIds.includes(item.id);

            return (
              <article
                key={`${item.kind}-${item.id}`}
                style={{
                  overflow: "hidden",
                  borderRadius: "24px",
                  background: "var(--bg-card)",
                  border: `1px solid ${
                    isCompared ? "var(--border-hover)" : "var(--border-subtle)"
                  }`,
                  backdropFilter: "blur(14px)",
                  display: "grid",
                  gridTemplateRows: "210px 1fr",
                  boxShadow: "0 14px 34px var(--glow-soft)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "210px",
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
                  <div style={{ display: "grid", gap: "6px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11.5px",
                          fontWeight: 700,
                          color: "var(--accent)",
                        }}
                      >
                        {isAr ? item.badgeAr : item.badgeEn}
                      </span>
                      <span className="nav-badge">{item.meta}</span>
                    </div>

                    <h3 style={{ margin: 0, fontSize: "19px" }}>{item.title}</h3>
                    {item.subtitle && (
                      <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                        {item.subtitle}
                      </div>
                    )}
                    {item.description && (
                      <p style={{ margin: 0, fontSize: "13.5px", color: "var(--text-muted)" }}>
                        {item.description}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px",
                      paddingTop: "8px",
                      flexWrap: "wrap",
                    }}
                  >
                    <strong style={{ fontSize: "17px" }}>{item.priceLabel}</strong>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {typeof toggleSaved === "function" && (
                        <button
                          type="button"
                          className="lang-btn"
                          title={isAr ? "حفظ" : "Save"}
                          onClick={() => toggleSaved(item.id)}
                        >
                          {isSaved ? "★" : "☆"}
                        </button>
                      )}

                      {typeof toggleCompare === "function" && (
                        <button
                          type="button"
                          className="lang-btn"
                          onClick={() => toggleCompare(item.id)}
                        >
                          {isCompared
                            ? isAr
                              ? "✓ مقارن"
                              : "✓ Compared"
                            : isAr
                            ? "قارن"
                            : "Compare"}
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
                        onClick={() => handleBookItem(item)}
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
      )}

      {/* ===== جدول المقارنة السريعة للعناصر المحددة ===== */}
      {comparedItems.length > 0 && (
        <div
          style={{
            padding: "24px",
            borderRadius: "26px",
            background: "var(--bg-card)",
            border: "1px solid var(--border-hover)",
            backdropFilter: "blur(16px)",
            display: "grid",
            gap: "16px",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: "20px" }}>
              {isAr
                ? `مقارنة سريعة (${comparedItems.length})`
                : `Quick Comparison (${comparedItems.length})`}
            </h3>
            <p style={{ margin: 0, fontSize: "13.5px", color: "var(--text-muted)" }}>
              {isAr
                ? "قارن الأسعار والتفاصيل بين العناصر المحددة واختر الأنسب لحجزه."
                : "Compare rates and highlights across selected options and book directly."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "16px",
            }}
          >
            {comparedItems.map((cItem) => (
              <div
                key={`cmp-${cItem.id}`}
                style={{
                  padding: "18px",
                  borderRadius: "20px",
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-subtle)",
                  display: "grid",
                  gap: "10px",
                  alignContent: "space-between",
                }}
              >
                <div style={{ display: "grid", gap: "6px" }}>
                  <span style={{ fontSize: "11.5px", fontWeight: 700, color: "var(--accent)" }}>
                    {isAr ? cItem.badgeAr : cItem.badgeEn} • {cItem.meta}
                  </span>
                  <strong style={{ fontSize: "16px" }}>{cItem.title}</strong>
                  <span style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                    {cItem.subtitle}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "8px",
                    paddingTop: "6px",
                  }}
                >
                  <strong style={{ fontSize: "16px" }}>{cItem.priceLabel}</strong>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button
                      type="button"
                      className="lang-btn"
                      onClick={() => toggleCompare(cItem.id)}
                    >
                      ✕
                    </button>
                    <button
                      type="button"
                      className="lang-btn"
                      style={{
                        background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                        color: "#fffbeb",
                        borderColor: "transparent",
                      }}
                      onClick={() => handleBookItem(cItem)}
                    >
                      {isAr ? "احجز" : "Book"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}