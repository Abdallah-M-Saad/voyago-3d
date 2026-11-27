const INITIAL_TRIPS = [
  {
    id: "vy-cairo-luxor",
    title: "أوديسا النيل والأقصر الذهبية",
    subtitle: "رحلة فاخرة بين المعابد الفرعونية والغروب على النيل",
    description: "إقامة مختارة، جولات خاصة مع مرشد أثري، وتجربة منطاد عند الشروق.",
    location: "الأقصر وأسوان، مصر",
    category: "تاريخ وثقافة",
    durationDays: 5,
    price: 1250,
  },
  {
    id: "vy-kyoto-autumn",
    title: "كيوتو ووهج الخريف البرتقالي",
    subtitle: "معابد هادئة، أزقة تقليدية، وطقوس الشاي الياباني",
    description: "استكشاف أراشياما والحدائق الكلاسيكية مع إقامة بوتيك قريبة من المركز.",
    location: "كيوتو، اليابان",
    category: "استكشاف وهدوء",
    durationDays: 6,
    price: 2400,
  },
  {
    id: "vy-amalfi-coast",
    title: "ساحل أمالفي وغروب المتوسط",
    subtitle: "إطلالات جبلية مطلة على البحر وجولات بالقارب الخاص",
    description: "مزارع ليمون، قرى ساحلية ملونة، وعشاء بحري بإطلالة بانورامية.",
    location: "أمالفي، إيطاليا",
    category: "سواحل وفخامة",
    durationDays: 4,
    price: 1980,
  },
  {
    id: "vy-petra-wadi",
    title: "البتراء وصحراء وادي رم",
    subtitle: "مغامرة بين الصخور الوردية وليلة تحت النجوم",
    description: "عبور السيق صباحاً وتخييم فاخر وسط الكثبان الرملية في وادي رم.",
    location: "البتراء ووادي رم، الأردن",
    category: "مغامرة وصحراء",
    durationDays: 4,
    price: 1120,
  },
];

const INITIAL_BOOKINGS = [
  {
    id: "BK-9041",
    tripId: "vy-cairo-luxor",
    tripTitle: "أوديسا النيل والأقصر الذهبية",
    travelerName: "عبد الله سعد",
    guests: 2,
    checkIn: "2026-12-15",
    totalPrice: 2500,
    status: "confirmed",
    createdAt: "2026-11-20",
  },
];

const wait = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

let mockTripsStore = [...INITIAL_TRIPS];
let mockBookingsStore = [...INITIAL_BOOKINGS];

export async function fetchTripsApi({ query = "", category = "all" } = {}) {
  const start = performance.now();
  await wait(420);

  const q = query.trim().toLowerCase();
  const data = mockTripsStore.filter((trip) => {
    const matchCat = category === "all" || trip.category === category;
    if (!matchCat) return false;
    if (!q) return true;
    return [trip.title, trip.subtitle, trip.location, trip.category]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return {
    ok: true,
    status: 200,
    method: "GET",
    endpoint: "/mock-api/v1/trips",
    latencyMs: Math.round(performance.now() - start),
    data,
  };
}

export async function fetchBookingsApi() {
  const start = performance.now();
  await wait(350);

  return {
    ok: true,
    status: 200,
    method: "GET",
    endpoint: "/mock-api/v1/bookings",
    latencyMs: Math.round(performance.now() - start),
    data: [...mockBookingsStore],
  };
}

export async function createBookingApi(payload) {
  const start = performance.now();
  await wait(550);

  const trip =
    mockTripsStore.find((item) => item.id === payload.tripId) || mockTripsStore[0];
  const guests = Math.max(1, Number(payload.guests) || 1);

  const newBooking = {
    id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
    tripId: trip.id,
    tripTitle: trip.title,
    travelerName: (payload.travelerName || "مسافر فوياجو").trim(),
    guests,
    checkIn: payload.checkIn || "2026-12-20",
    totalPrice: trip.price * guests,
    status: "confirmed",
    createdAt: new Date().toISOString().slice(0, 10),
  };

  mockBookingsStore = [newBooking, ...mockBookingsStore];

  return {
    ok: true,
    status: 201,
    method: "POST",
    endpoint: "/mock-api/v1/bookings",
    latencyMs: Math.round(performance.now() - start),
    data: newBooking,
  };
}

export async function cancelBookingApi(bookingId) {
  const start = performance.now();
  await wait(380);

  mockBookingsStore = mockBookingsStore.map((b) =>
    b.id === bookingId ? { ...b, status: "cancelled" } : b
  );

  const updated = mockBookingsStore.find((b) => b.id === bookingId) || null;

  return {
    ok: true,
    status: 200,
    method: "PATCH",
    endpoint: `/mock-api/v1/bookings/${bookingId}/cancel`,
    latencyMs: Math.round(performance.now() - start),
    data: updated,
  };
}

export async function resetDemoApi() {
  const start = performance.now();
  await wait(300);

  mockTripsStore = [...INITIAL_TRIPS];
  mockBookingsStore = [...INITIAL_BOOKINGS];

  return {
    ok: true,
    status: 200,
    method: "POST",
    endpoint: "/mock-api/v1/reset",
    latencyMs: Math.round(performance.now() - start),
    data: {
      tripsCount: mockTripsStore.length,
      bookingsCount: mockBookingsStore.length,
    },
  };
}