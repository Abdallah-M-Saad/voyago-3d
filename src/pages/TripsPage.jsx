import { useApp } from "../context/AppContext";

export default function TripsPage() {
  const {
    lang,
    t,
    bookings = [],
    cancelBooking,
    savedIds = [],
    toggleSaved,
    navigateTo,
    trips = [],
    hotels = [],
    isApiLoading,
  } = useApp();

  const isAr = lang === "ar";

  const findSavedLabel = (id) => {
    const tripMatch = trips.find((item) => item.id === id);
    if (tripMatch) {
      return {
        title: isAr ? tripMatch.title || tripMatch.name : tripMatch.name || tripMatch.title,
        sub: tripMatch.location || "",
      };
    }
    const hotelMatch = hotels.find((item) => item.id === id);
    if (hotelMatch) {
      return {
        title: isAr ? hotelMatch.nameAr : hotelMatch.nameEn,
        sub: isAr ? hotelMatch.cityAr : hotelMatch.cityEn,
      };
    }
    return { title: id, sub: "" };
  };

  return (
    <section className="trips-page-shell" style={{ display: "grid", gap: "28px" }}>
      <div
        style={{
          padding: "28px 26px",
          borderRadius: "26px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 6px", fontSize: "clamp(24px, 3vw, 34px)" }}>
            {t?.nav?.trips || (isAr ? "رحلاتي" : "My Trips")}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14.5px" }}>
            {isAr
              ? "إدارة حجوزاتك للرحلات والفنادق والوجهات المحفوظة."
              : "Manage your trip and hotel bookings alongside saved destinations."}
          </p>
        </div>

        <button
          type="button"
          className="lang-btn"
          style={{
            padding: "11px 18px",
            background: "linear-gradient(135deg, #f59e0b, #ea580c)",
            color: "#fffbeb",
            borderColor: "transparent",
          }}
          onClick={() => navigateTo("booking")}
        >
          + {t?.nav?.booking || (isAr ? "حجز جديد" : "New Booking")}
        </button>
      </div>

      {/* ===== الحجوزات المسجلة ===== */}
      <div style={{ display: "grid", gap: "14px" }}>
        <h3 style={{ margin: 0, fontSize: "19px" }}>
          {isAr ? `الحجوزات (${bookings.length})` : `Bookings (${bookings.length})`}
        </h3>

        {bookings.length === 0 ? (
          <div
            style={{
              padding: "24px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            {isAr
              ? "لا توجد حجوزات مسجلة حالياً — ابدأ بحجز رحلتك أو فندقك الأول."
              : "No bookings yet — create your first trip or hotel booking."}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "18px",
            }}
          >
            {bookings.map((b) => {
              const isCancelled = b.status === "cancelled";
              const matchedHotel =
                b.bookingType === "hotel"
                  ? hotels.find((h) => h.id === b.destinationId)
                  : null;
              const imgSrc = b.hotelImage || matchedHotel?.image;

              return (
                <article
                  key={b.id}
                  style={{
                    overflow: "hidden",
                    borderRadius: "22px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    backdropFilter: "blur(14px)",
                    display: "grid",
                    opacity: isCancelled ? 0.72 : 1,
                  }}
                >
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={b.destinationTitle || b.id}
                      style={{
                        width: "100%",
                        height: "170px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  )}

                  <div style={{ padding: "22px", display: "grid", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                      <strong style={{ color: "var(--accent)" }}>
                        {b.id} •{" "}
                        {b.bookingType === "hotel"
                          ? isAr
                            ? "فندق"
                            : "Hotel"
                          : isAr
                          ? "رحلة"
                          : "Trip"}
                      </strong>
                      <span className="nav-badge">
                        {isCancelled
                          ? isAr
                            ? "ملغي"
                            : "Cancelled"
                          : isAr
                          ? "مؤكد"
                          : "Confirmed"}
                      </span>
                    </div>

                    <h4 style={{ margin: 0, fontSize: "18px" }}>
                      {b.destinationTitle || b.tripTitle || b.destinationId}
                    </h4>

                    <div
                      style={{
                        fontSize: "13.5px",
                        color: "var(--text-muted)",
                        display: "grid",
                        gap: "4px",
                      }}
                    >
                      {b.travelerName && (
                        <span>
                          {isAr ? "المسافر: " : "Traveler: "}
                          {b.travelerName}
                        </span>
                      )}
                      {b.date && (
                        <span>
                          {isAr ? "التاريخ: " : "Date: "}
                          {b.date}
                        </span>
                      )}
                      {b.guests && (
                        <span>
                          {isAr ? "الأفراد: " : "Guests: "}
                          {b.guests}
                        </span>
                      )}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "8px",
                      }}
                    >
                      {b.totalPrice ? (
                        <strong style={{ fontSize: "17px" }}>
                          ${Number(b.totalPrice).toLocaleString()}
                        </strong>
                      ) : (
                        <span />
                      )}

                      {!isCancelled && typeof cancelBooking === "function" && (
                        <button
                          type="button"
                          disabled={isApiLoading}
                          className="lang-btn"
                          onClick={() => cancelBooking(b.id)}
                        >
                          {isAr ? "إلغاء الحجز" : "Cancel"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== الوجهات المحفوظة ===== */}
      <div style={{ display: "grid", gap: "14px" }}>
        <h3 style={{ margin: 0, fontSize: "19px" }}>
          {isAr
            ? `الوجهات المحفوظة (${savedIds.length})`
            : `Saved Destinations (${savedIds.length})`}
        </h3>

        {savedIds.length === 0 ? (
          <div
            style={{
              padding: "22px",
              borderRadius: "20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            {isAr
              ? "لم تحفظ أي وجهة بعد من الصفحة الرئيسية أو الاستكشاف."
              : "No saved destinations yet from Home or Explore."}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "14px",
            }}
          >
            {savedIds.map((id) => {
              const info = findSavedLabel(id);
              return (
                <div
                  key={id}
                  style={{
                    padding: "18px 20px",
                    borderRadius: "20px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                  }}
                >
                  <div>
                    <strong>{info.title}</strong>
                    {info.sub && (
                      <div style={{ fontSize: "12.5px", color: "var(--text-muted)" }}>
                        {info.sub}
                      </div>
                    )}
                  </div>

                  {typeof toggleSaved === "function" && (
                    <button
                      type="button"
                      className="lang-btn"
                      onClick={() => toggleSaved(id)}
                    >
                      {isAr ? "إزالة" : "Remove"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}