import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
  const { lang } = useApp();
  const isAr = lang === "ar";

  const [mode, setMode] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim() || (mode === "register" && !name.trim())) {
      setError(
        isAr
          ? "من فضلك املأ جميع الحقول المطلوبة."
          : "Please fill in all required fields."
      );
      return;
    }

    if (password.length < 4) {
      setError(
        isAr
          ? "كلمة المرور يجب أن تكون 4 أحرف على الأقل."
          : "Password must be at least 4 characters."
      );
      return;
    }

    const userData = {
      name: mode === "register" ? name.trim() : email.split("@")[0],
      email: email.trim(),
      loggedInAt: new Date().toISOString(),
    };

    localStorage.setItem("voyago_user", JSON.stringify(userData));
    onSuccess(userData);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(12, 5, 8, 0.72)",
        backdropFilter: "blur(10px)",
        display: "grid",
        placeItems: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "430px",
          borderRadius: "26px",
          background: "var(--bg-card)",
          border: "1px solid var(--border-hover)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
          padding: "28px 24px",
          display: "grid",
          gap: "18px",
          color: "var(--text-main)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "22px" }}>
              {mode === "login"
                ? isAr
                  ? "تسجيل الدخول"
                  : "Welcome Back"
                : isAr
                ? "إنشاء حساب جديد"
                : "Create Account"}
            </h2>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "var(--text-muted)" }}>
              {isAr
                ? "ادخل لحفظ رحلاتك ومتابعة حجوزاتك بسهولة"
                : "Sign in to manage your trips and saved destinations"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-main)",
              color: "var(--text-main)",
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6px",
            padding: "5px",
            borderRadius: "14px",
            background: "var(--bg-main)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setMode("login");
              setError("");
            }}
            style={{
              padding: "9px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13.5px",
              background:
                mode === "login"
                  ? "linear-gradient(135deg, #f59e0b, #ea580c)"
                  : "transparent",
              color: mode === "login" ? "#fffbeb" : "var(--text-muted)",
            }}
          >
            {isAr ? "تسجيل الدخول" : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("register");
              setError("");
            }}
            style={{
              padding: "9px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "13.5px",
              background:
                mode === "register"
                  ? "linear-gradient(135deg, #f59e0b, #ea580c)"
                  : "transparent",
              color: mode === "register" ? "#fffbeb" : "var(--text-muted)",
            }}
          >
            {isAr ? "حساب جديد" : "Register"}
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
          {mode === "register" && (
            <label style={{ display: "grid", gap: "6px", fontSize: "13px" }}>
              <span>{isAr ? "الاسم الكامل" : "Full Name"}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isAr ? "مثال: عبد الله سعد" : "e.g. Abdallah Saad"}
                style={{
                  padding: "11px 14px",
                  borderRadius: "12px",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-main)",
                  color: "var(--text-main)",
                  outline: "none",
                }}
              />
            </label>
          )}

          <label style={{ display: "grid", gap: "6px", fontSize: "13px" }}>
            <span>{isAr ? "البريد الإلكتروني" : "Email Address"}</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              style={{
                padding: "11px 14px",
                borderRadius: "12px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-main)",
                color: "var(--text-main)",
                outline: "none",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "6px", fontSize: "13px" }}>
            <span>{isAr ? "كلمة المرور" : "Password"}</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                padding: "11px 14px",
                borderRadius: "12px",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-main)",
                color: "var(--text-main)",
                outline: "none",
              }}
            />
          </label>

          {error && (
            <p style={{ margin: 0, fontSize: "12.5px", color: "#f87171" }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              marginTop: "4px",
              padding: "12px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "15px",
              background: "linear-gradient(135deg, #f59e0b, #ea580c)",
              color: "#fffbeb",
            }}
          >
            {mode === "login"
              ? isAr
                ? "دخول الآن"
                : "Sign In Now"
              : isAr
              ? "إنشاء الحساب"
              : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}