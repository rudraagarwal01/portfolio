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
      ease: "linear",
      repeat: Infinity,
      repeatDelay: Math.random() * 5 + 2,
    }}
    className="absolute h-[2px] z-0 pointer-events-none"
    style={{
      top: top,
      left: "-10%",
      width: "150px",
      background: `linear-gradient(to right, transparent, ${color}, white)`,
      transform: "rotate(20deg)",
    }}
  />
);

const generateStars = (count = 450) => {
  return Array.from({ length: count }, (_, i) => {
    const size = Math.random() * 2.5 + 0.8;
    return {
      id: i,
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: size,
      duration: size > 1.8 ? Math.random() * 12 + 8 : Math.random() * 25 + 20,
      delay: Math.random() * -40,
      opacity: Math.random() * 0.5 + 0.4,
    };
  });
};

export default function StarBackground() {
  const stars = useMemo(() => generateStars(450), []);
  const shootingStars = useMemo(
    () =>
      Array.from({ length: 15 }, () => ({
        top: `${Math.random() * 80}%`,
        delay: Math.random() * 15,
        duration: Math.random() * 1.5 + 1,
        // Changed #00ffff (cyan) to #3b82f6 (vibrant blue)
        color: Math.random() > 0.5 ? "#3b82f6" : "#a855f7",
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
            delay: star.delay,
          }}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
      {shootingStars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}
    </div>
  );
}