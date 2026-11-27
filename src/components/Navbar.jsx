import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import Logo3D from "./Logo3D";
import LampSwitch from "./LampSwitch";
import AuthModal from "./AuthModal";

const AUTH_STORAGE_KEY = "voyago_user";

export default function Navbar() {
  const { lang, t, activePage, navigateTo, toggleLanguage, bookings, savedIds } = useApp();
  const isAr = lang === "ar";

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [user]);

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

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
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
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span className="nav-badge" title={user.email}>
                  👤 {user.name}
                </span>
                <button
                  type="button"
                  className="lang-btn"
                  onClick={handleLogout}
                  title={isAr ? "تسجيل الخروج" : "Sign Out"}
                >
                  {isAr ? "خروج" : "Logout"}
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="lang-btn"
                onClick={() => setIsAuthOpen(true)}
              >
                👤 {isAr ? "تسجيل الدخول" : "Sign In"}
              </button>
            )}

            <button type="button" className="lang-btn" onClick={toggleLanguage}>
              🌐 {t.lang.switchLabel}
            </button>
            <LampSwitch />
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(userData) => setUser(userData)}
      />
    </>
  );
}