import Background3D from "./components/Background3D";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import BookingPage from "./pages/BookingPage";
import TripsPage from "./pages/TripsPage";
import { useApp } from "./context/AppContext";

export default function App() {
  const { activePage } = useApp();

  return (
    <>
      <Background3D />
      <Navbar />
      <main className="app-container">
        {activePage === "home" && <HomePage />}
        {activePage === "explore" && <ExplorePage />}
        {activePage === "booking" && <BookingPage />}
        {activePage === "trips" && <TripsPage />}
      </main>
      <Footer />
    </>
  );
}