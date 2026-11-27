import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Logo3D() {
  const { t, navigateTo } = useApp();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 26;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 26;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <button
      type="button"
      className="logo3d-trigger"
      onClick={() => navigateTo("home")}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div
        className="logo3d-cube"
        style={{
          transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        }}
      >
        <span className="logo3d-ring ring-1" />
        <span className="logo3d-ring ring-2" />
        <span className="logo3d-core">✦</span>
      </div>
      <div className="logo3d-text">
        <strong>{t.brand}</strong>
        <span>{t.tagline}</span>
      </div>
    </button>
  );
}