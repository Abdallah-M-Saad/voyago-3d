const STORAGE_SAVED_KEY = "voyago_saved_ids_v1";

const DEFAULT_TRIPS = [
  {
    id: "luxor-aswan-nile",
    title: "أوديسا النيل والأقصر الذهبية",
    name: "Luxor & Aswan Nile Odyssey",
    location: "الأقصر وأسوان، مصر",
    category: "تاريخ وثقافة",
    price: 1250,
    description:
      "إبحار خاص بين المعابد التاريخية وشروق المنطاد وسط أجواء ذهبية لا تُنسى.",
  },
  {
    id: "kyoto-zen-nights",
    title: "كيوتو ووهج الخريف البرتقالي",
    name: "Kyoto Autumn & Zen Nights",
    location: "كيوتو، اليابان",
    category: "استكشاف وهدوء",
    price: 2400,
    description:
      "معابد هادئة، أزقة تقليدية، وإطلالات خريفية دافئة تنسجم مع هوية الموقع.",
  },
  {
    id: "amalfi-golden-coast",
    title: "ساحل أمالفي وغروب المتوسط",
    name: "Amalfi Golden Coast",
    location: "أمالفي، إيطاليا",
    category: "سواحل وفخامة",
    price: 1980,
    description:
      "منحدرات مطلة على البحر، رحلات بحرية خاصة، وغروب يجمع العنابي والذهب.",
  },
  {
    id: "petra-wadi-rum",
    title: "البتراء وصحراء وادي رم",
    name: "Petra & Wadi Rum Desert",
    location: "البتراء ووادي رم، الأردن",
    category: "مغامرة وصحراء",
    price: 1120,
    description:
      "ليالي هادئة تحت النجوم في مخيمات راقية ومغامرات وسط الصخور الوردية.",
  },
];

export const HOTELS_LIST = [
  {
    id: "hotel-nile-palace",
    nameAr: "قصر النيل الذهبي ريزورت",
    nameEn: "Golden Nile Palace Resort",
    cityAr: "الأقصر • إطلالة نيلية مباشرة",
    cityEn: "Luxor • Direct Nile View",
    rating: "4.9 ★",
    badgeAr: "إعلان فندقي • إفطار فاخر مجاني",
    badgeEn: "HOTEL AD • FREE BREAKFAST",
    pricePerNight: 320,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-kyoto-sanctuary",
    nameAr: "فندق كيوتو سانكتشواري بوتيك",
    nameEn: "Kyoto Sanctuary Boutique Hotel",
    cityAr: "كيوتو • حديقة يابانية هادئة",
    cityEn: "Kyoto • Serene Zen Garden",
    rating: "4.8 ★",
    badgeAr: "عرض إقامة مميز • سبا خاص",
    badgeEn: "FEATURED STAY • PRIVATE SPA",
    pricePerNight: 460,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-amalfi-cliff",
    nameAr: "منتجع أمالفي كليف سويتس",
    nameEn: "Amalfi Cliff Suites & Pool",
    cityAr: "أمالفي • مسبح مطل على البحر",
    cityEn: "Amalfi • Sea-View Infinity Pool",
    rating: "5.0 ★",
    badgeAr: "إقامة VIP • غروب المتوسط",
    badgeEn: "VIP STAY • MEDITERRANEAN SUNSET",
    pricePerNight: 540,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-wadi-rum-lodge",
    nameAr: "مخيم وادي رم رويال ستار لودج",
    nameEn: "Wadi Rum Royal Star Lodge",
    cityAr: "وادي رم • أجنحة زجاجية تحت النجوم",
    cityEn: "Wadi Rum • Stargazing Desert Suites",
    rating: "4.9 ★",
    badgeAr: "إعلان صحراوي • رحلة سفاري مجانية",
    badgeEn: "DESERT AD • FREE SUNSET SAFARI",
    pricePerNight: 290,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-santorini-caldera",
    nameAr: "فندق سانتوريني كالديرا فيو",
    nameEn: "Santorini Caldera Horizon Hotel",
    cityAr: "سانتوريني • شرفات مطلة على الغروب",
    cityEn: "Santorini • Sunset Caldera Terraces",
    rating: "4.9 ★",
    badgeAr: "إقامة مميزة • جاكوزي خاص",
    badgeEn: "FEATURED STAY • PRIVATE JACUZZI",
    pricePerNight: 495,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-marrakech-riad",
    nameAr: "رياض مراكش العنابي الفاخر",
    nameEn: "Marrakech Crimson Royal Riad",
    cityAr: "مراكش • فناء أندلسي وواحة نخيل",
    cityEn: "Marrakech • Courtyard & Palm Oasis",
    rating: "4.8 ★",
    badgeAr: "عرض عطلة نهاية الأسبوع • حمام مغربي",
    badgeEn: "WEEKEND DEAL • ROYAL HAMMAM",
    pricePerNight: 275,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-dubai-amber-tower",
    nameAr: "برج العنبر الذهبي داون تاون",
    nameEn: "Amber Sky Downtown Tower",
    cityAr: "دبي • إطلالة أفقية بانورامية",
    cityEn: "Dubai • Panoramic Skyline Views",
    rating: "4.9 ★",
    badgeAr: "إعلان إقامة حضرية • صالة كبار الزوار",
    badgeEn: "CITY AD • EXECUTIVE LOUNGE",
    pricePerNight: 430,
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hotel-maldives-sunset-lagoon",
    nameAr: "منتجع لاجون الغروب المائي",
    nameEn: "Sunset Lagoon Overwater Villas",
    cityAr: "المالديف • فيلات مائية خاصة",
    cityEn: "Maldives • Private Overwater Villas",
    rating: "5.0 ★",
    badgeAr: "عرض شهر العسل • نقل بحري خاص",
    badgeEn: "HONEYMOON OFFER • PRIVATE TRANSFER",
    pricePerNight: 680,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
  },
];

const INITIAL_BOOKINGS = [
  {
    id: "BK-9041",
    bookingType: "trip",
    destinationId: "luxor-aswan-nile",
    destinationTitle: "أوديسا النيل والأقصر الذهبية",
    travelerName: "عبد الله سعد",
    guests: 2,
    date: "2026-12-15",
    totalPrice: 2500,
    status: "confirmed",
  },
];

const wait = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

let bookingsStore = [...INITIAL_BOOKINGS];

function readSavedFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_SAVED_KEY);
    if (!raw) return ["luxor-aswan-nile"];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : ["luxor-aswan-nile"];
  } catch {
    return ["luxor-aswan-nile"];
  }
}

function writeSavedToStorage(ids) {
  try {
    localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(ids));
  } catch {
    // تجاهل أخطاء التخزين في بعض المتصفحات
  }
}

export const travelApi = {
  getTrips() {
    return [...DEFAULT_TRIPS];
  },

  getHotels() {
    return [...HOTELS_LIST];
  },

  getSavedIds() {
    return readSavedFromStorage();
  },

  toggleSavedId(id, pushLog) {
    const current = readSavedFromStorage();
    const exists = current.includes(id);
    const updated = exists ? current.filter((item) => item !== id) : [...current, id];
    writeSavedToStorage(updated);
    if (typeof pushLog === "function") {
      pushLog({
        method: "POST",
        endpoint: "/api/saved/toggle",
        status: 200,
        note: exists ? `Removed ${id} from saved` : `Saved ${id} to favorites`,
      });
    }
    return updated;
  },

  async getBookings(pushLog) {
    await wait(320);
    if (typeof pushLog === "function") {
      pushLog({
        method: "GET",
        endpoint: "/api/bookings",
        status: 200,
        note: `Loaded ${bookingsStore.length} bookings`,
      });
    }
    return [...bookingsStore];
  },

  async createBooking(payload, pushLog) {
    await wait(450);
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "confirmed",
      ...payload,
    };
    bookingsStore = [newBooking, ...bookingsStore];
    if (typeof pushLog === "function") {
      pushLog({
        method: "POST",
        endpoint: "/api/bookings",
        status: 201,
        note: `Created ${newBooking.id} (${newBooking.destinationTitle})`,
      });
    }
    return newBooking;
  },

  async cancelBooking(bookingId, pushLog) {
    await wait(320);
    bookingsStore = bookingsStore.map((item) =>
      item.id === bookingId ? { ...item, status: "cancelled" } : item
    );
    const updated = bookingsStore.find((item) => item.id === bookingId) || null;
    if (typeof pushLog === "function") {
      pushLog({
        method: "PATCH",
        endpoint: `/api/bookings/${bookingId}/cancel`,
        status: 200,
        note: `Cancelled booking ${bookingId}`,
      });
    }
    return updated;
  },
};