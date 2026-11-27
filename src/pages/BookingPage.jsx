import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const FALLBACK_DESTINATIONS = [
  { id: "luxor-aswan-nile", name: "Luxor & Aswan Nile Odyssey", price: 1250 },
  { id: "kyoto-zen-nights", name: "Kyoto Autumn & Zen Nights", price: 2400 },
  { id: "amalfi-golden-coast", name: "Amalfi Golden Coast", price: 1980 },
  { id: "petra-wadi-rum", name: "Petra & Wadi Rum Desert", price: 1120 },
];

export default function BookingPage() {
  const {
    lang,
    t,
    bookingDraft,
    setBookingDraft,
    createBooking,
    isApiLoading,
    apiLogs = [],
    pushApiLog,
    navigateTo,
    trips = [],
    hotels = [],
  } = useApp();

  const isAr = lang === "ar";
  const destinations = trips.length > 0 ? trips : FALLBACK_DESTINATIONS;
  const hotelList = hotels;

  const [bookingType, setBookingType] = useState(
    bookingDraft?.bookingType === "hotel" ? "hotel" : "trip"
  );
  const [selectedHotelId, setSelectedHotelId] = useState(
    bookingDraft?.hotelId || hotelList[0]?.id || "hotel-nile-palace"
  );
  const [nights, setNights] = useState(Number(bookingDraft?.nights) || 3);
  const [travelerName, setTravelerName] = useState("عبد الله سعد");
  const [lastCreated, setLastCreated] = useState(null);

  useEffect(() => {
    if (bookingDraft?.bookingType === "hotel") {
      setBookingType("hotel");
    } else if (bookingDraft?.bookingType === "trip") {
      setBookingType("trip");
    }
    if (bookingDraft?.hotelId) {
      setSelectedHotelId(bookingDraft.hotelId);
    }
    if (bookingDraft?.nights) {
      setNights(Math.max(1, Number(bookingDraft.nights) || 1));
    }
  }, [bookingDraft]);

  const selectedDestinationId =
    bookingDraft?.destinationId || destinations[0]?.id || "luxor-aswan-nile";
  const currentDest =
    destinations.find((d) => d.id === selectedDestinationId) || destinations[0];

  const currentHotel =
    hotelList.find((h) => h.id === selectedHotelId) || hotelList[0];

  const guests = Math.max(1, Number(bookingDraft?.guests) || 1);
  const checkInDate = bookingDraft?.date || "2026-12-15";
  const safeNights = Math.max(1, Number(nights) || 1);

  const totalPrice =
    bookingType === "hotel" && currentHotel
      ? Number(currentHotel.pricePerNight) *
        safeNights *
        Math.max(1, Math.ceil(guests / 2))
      : (Number(currentDest?.price) || 1200) * guests;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isHotel = bookingType === "hotel" && currentHotel;
    const created = await createBooking({
      bookingType: isHotel ? "hotel" : "trip",
      destinationId: isHotel ? currentHotel.id : currentDest?.id,
      destinationTitle: isHotel
        ? `${isAr ? currentHotel.nameAr : currentHotel.nameEn} (${safeNights} ${
            isAr ? "ليالي" : "nights"
          })`
        : currentDest?.title || currentDest?.name || currentDest?.id,
      hotelImage: isHotel ? currentHotel.image : undefined,
      nights: isHotel ? safeNights : undefined,
      travelerName: travelerName.trim() || (isAr ? "مسافر فوياجو" : "Voyago Guest"),
      guests,
      date: checkInDate,
      totalPrice,
    });
    setLastCreated(created);
  };

  const handleQuickPingApi = () => {
    if (typeof pushApiLog === "function") {
      pushApiLog({
        method: "GET",
        endpoint:
          bookingType === "hotel" ? "/api/hotels/availability" : "/api/bookings/health",
        status: 200,
        note:
          bookingType === "hotel" && currentHotel
            ? `Hotel rooms available at ${currentHotel.nameEn}`
            : "Fake API mock ping OK",
      });
    }
  };

  return (
    <section
      className="booking-page-shell"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "24px",
        alignItems: "start",
      }}
    >
      {/* ===== نموذج بناء الحجز (رحلة أو فندق) ===== */}
      <form
        onSubmit={handleSubmit}
        style={{
          padding: "28px 26px",
          borderRadius: "26px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          display: "grid",
          gap: "16px",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 6px" }}>
            {t?.nav?.booking || (isAr ? "بناء الحجز" : "Booking")}
          </h2>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "14px" }}>
            {isAr
              ? "اختر بين حجز رحلة متكاملة أو حجز فندق فاخر بصوره وتفاصيل الإقامة."
              : "Switch between booking a full trip or a featured hotel stay with live preview."}
          </p>
        </div>

        {/* تبديل بين رحلة وفندق */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            className={`nav-link-btn ${bookingType === "trip" ? "active" : ""}`}
            onClick={() => {
              setBookingType("trip");
              setBookingDraft((prev) => ({ ...prev, bookingType: "trip" }));
            }}
          >
            ✈️ {isAr ? "حجز رحلة" : "Trip Package"}
          </button>

          <button
            type="button"
            className={`nav-link-btn ${bookingType === "hotel" ? "active" : ""}`}
            onClick={() => {
              setBookingType("hotel");
              setBookingDraft((prev) => ({ ...prev, bookingType: "hotel" }));
            }}
          >
            🏨 {isAr ? "حجز فندق" : "Hotel Stay"}
          </button>
        </div>

        {bookingType === "hotel" && currentHotel ? (
          <>
            <label style={{ display: "grid", gap: "6px", fontSize: "13.5px", fontWeight: 700 }}>
              <span>{isAr ? "اختر الفندق" : "Select Hotel"}</span>
              <select
                value={selectedHotelId}
                onChange={(e) => {
                  setSelectedHotelId(e.target.value);
                  setBookingDraft((prev) => ({
                    ...prev,
                    bookingType: "hotel",
                    hotelId: e.target.value,
                  }));
                }}
                style={{
                  padding: "11px 14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                }}
              >
                {hotelList.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {isAr ? hotel.nameAr : hotel.nameEn} (${hotel.pricePerNight}/
                    {isAr ? "ليلة" : "night"})
                  </option>
                ))}
              </select>
            </label>

            <div
              style={{
                overflow: "hidden",
                borderRadius: "18px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-main)",
              }}
            >
              <img
                src={currentHotel.image}
                alt={isAr ? currentHotel.nameAr : currentHotel.nameEn}
                style={{
                  width: "100%",
                  height: "195px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "13px",
                }}
              >
                <div>
                  <strong>{isAr ? currentHotel.nameAr : currentHotel.nameEn}</strong>
                  <div style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                    {isAr ? currentHotel.cityAr : currentHotel.cityEn}
                  </div>
                </div>
                <span className="nav-badge">{currentHotel.rating}</span>
              </div>
            </div>
          </>
        ) : (
          <label style={{ display: "grid", gap: "6px", fontSize: "13.5px", fontWeight: 700 }}>
            <span>{isAr ? "الوجهة" : "Destination"}</span>
            <select
              value={selectedDestinationId}
              onChange={(e) =>
                setBookingDraft((prev) => ({
                  ...prev,
                  bookingType: "trip",
                  destinationId: e.target.value,
                }))
              }
              style={{
                padding: "11px 14px",
                borderRadius: "12px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-main)",
                color: "var(--text-main)",
              }}
            >
              {destinations.map((dest) => (
                <option key={dest.id} value={dest.id}>
                  {dest.title || dest.name || dest.id}
                </option>
              ))}
            </select>
          </label>
        )}

        <label style={{ display: "grid", gap: "6px", fontSize: "13.5px", fontWeight: 700 }}>
          <span>{isAr ? "اسم المسافر" : "Traveler Name"}</span>
          <input
            type="text"
            value={travelerName}
            onChange={(e) => setTravelerName(e.target.value)}
            required
            style={{
              padding: "11px 14px",
              borderRadius: "12px",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-main)",
              color: "var(--text-main)",
            }}
          />
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              bookingType === "hotel" ? "repeat(3, 1fr)" : "1fr 1fr",
            gap: "12px",
          }}
        >
          <label style={{ display: "grid", gap: "6px", fontSize: "13.5px", fontWeight: 700 }}>
            <span>{isAr ? "تاريخ الوصول" : "Check-in"}</span>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) =>
                setBookingDraft((prev) => ({ ...prev, date: e.target.value }))
              }
              style={{
                padding: "11px 10px",
                borderRadius: "12px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-main)",
                color: "var(--text-main)",
              }}
            />
          </label>

          {bookingType === "hotel" && (
            <label style={{ display: "grid", gap: "6px", fontSize: "13.5px", fontWeight: 700 }}>
              <span>{isAr ? "عدد الليالي" : "Nights"}</span>
              <input
                type="number"
                min={1}
                max={30}
                value={safeNights}
                onChange={(e) => {
                  const val = Math.max(1, Number(e.target.value) || 1);
                  setNights(val);
                  setBookingDraft((prev) => ({ ...prev, nights: val }));
                }}
                style={{
                  padding: "11px 10px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                }}
              />
            </label>
          )}

          <label style={{ display: "grid", gap: "6px", fontSize: "13.5px", fontWeight: 700 }}>
            <span>{isAr ? "الأفراد" : "Guests"}</span>
            <input
              type="number"
              min={1}
              max={12}
              value={guests}
              onChange={(e) =>
                setBookingDraft((prev) => ({
                  ...prev,
                  guests: Math.max(1, Number(e.target.value) || 1),
                }))
              }
              style={{
                padding: "11px 10px",
                borderRadius: "12px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-main)",
                color: "var(--text-main)",
              }}
            />
          </label>
        </div>

        <div
          style={{
            padding: "14px 16px",
            borderRadius: "16px",
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ color: "var(--text-muted)", fontSize: "13.5px" }}>
            {isAr ? "الإجمالي التقديري" : "Estimated Total"}
          </span>
          <strong style={{ fontSize: "20px" }}>${totalPrice.toLocaleString()}</strong>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={isApiLoading}
            className="lang-btn"
            style={{
              flex: 1,
              padding: "12px 18px",
              background: "linear-gradient(135deg, #f59e0b, #ea580c)",
              color: "#fffbeb",
              borderColor: "transparent",
              opacity: isApiLoading ? 0.7 : 1,
            }}
          >
            {isApiLoading
              ? isAr
                ? "جاري الإرسال..."
                : "Sending..."
              : bookingType === "hotel"
              ? isAr
                ? "تأكيد حجز الفندق (POST)"
                : "Confirm Hotel Stay (POST)"
              : isAr
              ? "تأكيد الحجز (POST)"
              : "Confirm Booking (POST)"}
          </button>

          <button
            type="button"
            className="lang-btn"
            onClick={() => navigateTo("trips")}
          >
            {t?.nav?.trips || (isAr ? "رحلاتي" : "My Trips")}
          </button>
        </div>

        {lastCreated && (
          <div
            style={{
              padding: "12px 14px",
              borderRadius: "14px",
              border: "1px solid var(--border-hover)",
              background: "var(--bg-card-hover)",
              fontSize: "13.5px",
            }}
          >
            ✅{" "}
            {isAr
              ? `تم تسجيل الحجز برقم ${lastCreated.id} بنجاح!`
              : `Booking ${lastCreated.id} created successfully!`}
          </div>
        )}
      </form>

      {/* ===== Fake API Inspector ===== */}
      <aside
        style={{
          padding: "24px 22px",
          borderRadius: "24px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          display: "grid",
          gap: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: "17px" }}>Fake API Inspector</h3>
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {isAr
                ? "مراقبة طلبات المحاكاة اللحظية للرحلات والفنادق"
                : "Live mock network request stream for trips & hotels"}
            </span>
          </div>

          <button type="button" className="lang-btn" onClick={handleQuickPingApi}>
            ⚡ Ping GET
          </button>
        </div>

        <div style={{ display: "grid", gap: "10px", maxHeight: "360px", overflowY: "auto" }}>
          {apiLogs.length === 0 ? (
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "13px" }}>
              {isAr
                ? "لا توجد طلبات مسجلة بعد — جرّب حجز فندق أو رحلة أو اضغط Ping."
                : "No API requests logged yet — book a hotel/trip or click Ping."}
            </p>
          ) : (
            apiLogs.map((log, idx) => (
              <div
                key={`${log.time}-${idx}`}
                style={{
                  padding: "12px 14px",
                  borderRadius: "14px",
                  background: "var(--bg-main)",
                  border: "1px solid var(--border-subtle)",
                  display: "grid",
                  gap: "4px",
                  fontSize: "12.5px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
                  <strong style={{ color: "var(--accent)" }}>
                    {log.method} {log.endpoint}
                  </strong>
                  <span className="nav-badge">{log.status}</span>
                </div>
                {log.note && (
                  <span style={{ color: "var(--text-main)" }}>{log.note}</span>
                )}
                {log.time && (
                  <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>
                    {log.time}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </aside>
    </section>
  );
}