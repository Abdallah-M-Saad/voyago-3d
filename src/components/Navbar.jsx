import { useApp } from "../context/AppContext";
import Logo3D from "./Logo3D";
import LampSwitch from "./LampSwitch";

export default function Navbar() {
  const { t, activePage, navigateTo, toggleLanguage, bookings, savedIds } = useApp();

  const activeBookingsCount = bookings.filter((b) => b.status === "confirmed").length;

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "explore", label: t.nav.explore },
    { id: "booking", label: t.nav.booking },
    {
      id: "trips",
      label: t.nav.trips,
      badge: activeBookingsCount + savedIds.length,
    },
  ];

  return (
    <header className="navbar-shell">
      <div className="navbar-inner">
        <Logo3D />

        <nav className="navbar-links" aria-label="Main Navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`nav-link-btn ${activePage === item.id ? "active" : ""}`}
              onClick={() => navigateTo(item.id)}
            >
              <span>{item.label}</span>
              {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className="navbar-actions">
          <button type="button" className="lang-btn" onClick={toggleLanguage}>
            🌐 {t.lang.switchLabel}
          </button>
          <LampSwitch />
        </div>
      </div>
    </header>
  );
}