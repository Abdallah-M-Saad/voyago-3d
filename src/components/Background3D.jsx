import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

export default function Background3D() {
  const { isMorningLampOn } = useApp();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 28;
      const y = (e.clientY / window.innerHeight - 0.5) * 28;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={`bg3d-canvas ${isMorningLampOn ? "morning" : "night"}`} aria-hidden="true">
      <div
        className="bg3d-grid"
        style={{
          transform: `perspective(900px) rotateX(68deg) translate3d(${offset.x * -0.5}px, ${offset.y * -0.5}px, 0)`,
        }}
      />
      <div
        className="bg3d-orb orb-primary"
        style={{
          transform: `translate3d(${offset.x * 1.1}px, ${offset.y * 1.1}px, 0)`,
        }}
      />
      <div
        className="bg3d-orb orb-secondary"
        style={{
          transform: `translate3d(${offset.x * -0.8}px, ${offset.y * -0.8}px, 0)`,
        }}
      />
      <div
        className="bg3d-orbit-ring"
        style={{
          transform: `perspective(1000px) rotateX(${62 + offset.y * 0.25}deg) rotateY(${-18 + offset.x * 0.25}deg)`,
        }}
      />
    </div>
  );
}