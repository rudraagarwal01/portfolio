import { motion } from "framer-motion";
import { useMemo } from "react";

const ShootingStar = ({ delay, top, duration, color }) => (
  <motion.div
    initial={{ x: "-20vw", opacity: 0 }}
    animate={{
      x: ["0vw", "110vw"],
      y: ["0vh", "30vh"],
      opacity: [0, 1, 1, 0], 
    }}
    transition={{
      duration: duration,
      delay: delay,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: Math.random() * 2 + 1,
    }}
    className="absolute h-[2px] pointer-events-none"
    style={{
      top: top,
      left: "-10%",
      width: "200px",
      background: `linear-gradient(to right, transparent, ${color}, white)`,
      transform: "rotate(20deg)",
      zIndex: 1, 
    }}
  />
);

export default function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 600 }, (_, i) => ({
      id: i,
      top: Math.random() * 200 - 100 + "%", // Spread stars from -100% to 100%
      left: Math.random() * 100 + "%",
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 5 + 7 + "s", // Fast: 7-12 seconds
      delay: Math.random() * -20 + "s",
      opacity: Math.random() * 0.7 + 0.3,
      twinkleSpeed: Math.random() * 3 + 2 + "s",
    }));
  }, []);

  const shootingStars = useMemo(() => 
    Array.from({ length: 8 }, () => ({
      top: `${Math.random() * 70}%`,
      delay: Math.random() * 10,
      duration: Math.random() * 0.8 + 0.6,
      color: Math.random() > 0.5 ? "#3b82f6" : "#a855f7",
    })), []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-drift"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            // Applies both drift (down) and twinkle (shimmer)
            animationDuration: `${star.duration}, ${star.twinkleSpeed}`,
            animationDelay: `${star.delay}, ${Math.random() * -5}s`,
            willChange: "transform",
          }}
        />
      ))}

      {shootingStars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}
    </div>
  );
}