import { useApp } from "../context/AppContext";
import "./LampSwitch.css";

export default function LampSwitch() {
  const { isMorningLampOn, toggleMorningLamp, t } = useApp();

  return (
    <div className={`lamp-wrapper ${isMorningLampOn ? "is-on" : "is-off"}`}>
      <button
        type="button"
        className="lamp-fixture compact"
        onClick={toggleMorningLamp}
        aria-pressed={isMorningLampOn}
        title={t.lamp.toggleTitle}
      >
        <span className="lamp-light-cone" aria-hidden="true" />

        <svg
          className="lamp-svg"
          viewBox="0 0 120 130"
          width="40"
          height="44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 108V76C60 56 46 44 36 36"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="60" cy="76" r="5" className="lamp-joint" />
          <ellipse cx="52" cy="43" rx="11" ry="7" className="lamp-bulb" />
          <path d="M24 20C26 14 74 14 76 20L88 41H14L24 20Z" className="lamp-shade-body" />
          <rect x="12" y="40" width="78" height="4" rx="2" className="lamp-shade-rim" />
          <path d="M36 114C36 109 84 109 84 114L90 121H30L36 114Z" className="lamp-base-body" />
        </svg>

        <span className="lamp-pill">
          <span className="lamp-dot" />
          <span>{isMorningLampOn ? t.lamp.morningOn : t.lamp.nightMode}</span>
        </span>
      </button>
    </div>
  );
}