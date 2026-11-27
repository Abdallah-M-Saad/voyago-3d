import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../i18n/translations";
import { travelApi } from "../api/travelApi";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("voyago_lang") || "ar");
  const [isMorningLampOn, setIsMorningLampOn] = useState(
    () => localStorage.getItem("voyago_lamp") === "on"
  );
  const [activePage, setActivePage] = useState("home");
  const [selectedDestinationId, setSelectedDestinationId] = useState("luxor-aswan-nile");
  const [bookingDraft, setBookingDraft] = useState({
    bookingType: "trip",
    destinationId: "luxor-aswan-nile",
    hotelId: "hotel-nile-palace",
    nights: 3,
    date: "2026-12-15",
    guests: 2,
  });

  const [trips] = useState(() => travelApi.getTrips());
  const [hotels] = useState(() => travelApi.getHotels());
  const [savedIds, setSavedIds] = useState(() => travelApi.getSavedIds());
  const [bookings, setBookings] = useState([]);
  const [compareIds, setCompareIds] = useState(["luxor-aswan-nile", "kyoto-zen-nights"]);
  const [apiLogs, setApiLogs] = useState([]);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [searchPreset, setSearchPreset] = useState({
    query: "",
    date: "2026-12-15",
    guests: 2,
  });

  const pushApiLog = (entry) => {
    setApiLogs((prev) => [
      { ...entry, time: new Date().toLocaleTimeString([], { hour12: false }) },
      ...prev.slice(0, 19),
    ]);
  };

  useEffect(() => {
    setIsApiLoading(true);
    travelApi
      .getBookings(pushApiLog)
      .then(setBookings)
      .finally(() => setIsApiLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("voyago_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("voyago_lamp", isMorningLampOn ? "on" : "off");
    document.documentElement.dataset.theme = isMorningLampOn ? "morning" : "night";
  }, [isMorningLampOn]);

  const toggleLanguage = () => setLang((prev) => (prev === "ar" ? "en" : "ar"));
  const toggleMorningLamp = () => setIsMorningLampOn((prev) => !prev);

  const navigateTo = (page, options = {}) => {
    if (options.destinationId) {
      setSelectedDestinationId(options.destinationId);
    }
    if (options.bookingDraft) {
      setBookingDraft((prev) => ({ ...prev, ...options.bookingDraft }));
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSaved = (id) => {
    const updated = travelApi.toggleSavedId(id, pushApiLog);
    setSavedIds(updated);
  };

  const toggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const createBooking = async (payload) => {
    setIsApiLoading(true);
    try {
      const created = await travelApi.createBooking(payload, pushApiLog);
      if (created) {
        setBookings((prev) => [created, ...prev]);
      }
      return created;
    } finally {
      setIsApiLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setIsApiLoading(true);
    try {
      const updated = await travelApi.cancelBooking(bookingId, pushApiLog);
      setBookings((prev) =>
        prev.map((item) =>
          item.id === bookingId ? updated || { ...item, status: "cancelled" } : item
        )
      );
      return updated;
    } finally {
      setIsApiLoading(false);
    }
  };

  const t = useMemo(() => translations[lang] || translations.en, [lang]);

  const value = {
    lang,
    t,
    toggleLanguage,
    isMorningLampOn,
    toggleMorningLamp,
    activePage,
    navigateTo,
    selectedDestinationId,
    setSelectedDestinationId,
    bookingDraft,
    setBookingDraft,
    trips,
    hotels,
    savedIds,
    toggleSaved,
    bookings,
    setBookings,
    createBooking,
    cancelBooking,
    isApiLoading,
    compareIds,
    setCompareIds,
    toggleCompare,
    apiLogs,
    pushApiLog,
    searchPreset,
    setSearchPreset,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}