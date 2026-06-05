import { useMemo } from "react";
import { motion } from "framer-motion";

const ShootingStar = ({ delay, top, duration, color }) => (
  <motion.div
    initial={{ x: "-10vw", opacity: 0 }}
    animate={{ x: ["0vw", "110vw"], y: ["0vh", "25vh"], opacity: [0, 1, 1, 0] }}
    transition={{ duration, delay, ease: "easeOut", repeat: Infinity, repeatDelay: Math.random() * 3 + 2 }}
    className="absolute h-[1px] pointer-events-none"
    style={{
      top,
      left: "-5%",
      width: "150px",
      background: `linear-gradient(to right, transparent, ${color}, white)`,
      transform: "rotate(15deg)",
    }}
  />
);

export default function StarBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 400 }, (_, i) => ({
        id: i,
        top: Math.random() * 200 - 50 + "%",
        left: Math.random() * 100 + "%",
        size: Math.random() * 1.5 + 0.4,
        duration: Math.random() * 6 + 8 + "s",
        delay: Math.random() * -20 + "s",
        opacity: Math.random() * 0.5 + 0.15,
        twinkleSpeed: Math.random() * 3 + 2 + "s",
      })),
    []
  );

  const shootingStars = useMemo(
    () =>
      Array.from({ length: 5 }, () => ({
        top: `${Math.random() * 60}%`,
        delay: Math.random() * 12,
        duration: Math.random() * 0.6 + 0.5,
        color: Math.random() > 0.5 ? "#3b82f6" : "#818cf8",
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#06060e] overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute bg-white rounded-full animate-drift"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${s.duration}, ${s.twinkleSpeed}`,
            animationDelay: `${s.delay}, ${Math.random() * -5}s`,
          }}
        />
      ))}
      {shootingStars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}
    </div>
  );
}
