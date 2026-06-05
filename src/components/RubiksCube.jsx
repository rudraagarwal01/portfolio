// Six faces of a 3×3 Rubik's cube using pure CSS 3D transforms.
// Colors stay within the portfolio's blue / violet / cyan palette.
const FACES = [
  { id: "front",  tf: (h) => `translateZ(${h}px)`,                 color: "#1d4ed8" }, // blue-700
  { id: "back",   tf: (h) => `rotateY(180deg) translateZ(${h}px)`, color: "#3730a3" }, // indigo-800
  { id: "right",  tf: (h) => `rotateY(90deg) translateZ(${h}px)`,  color: "#5b21b6" }, // violet-800
  { id: "left",   tf: (h) => `rotateY(-90deg) translateZ(${h}px)`, color: "#0e7490" }, // cyan-700
  { id: "top",    tf: (h) => `rotateX(90deg) translateZ(${h}px)`,  color: "#1e3a5f" }, // dark blue
  { id: "bottom", tf: (h) => `rotateX(-90deg) translateZ(${h}px)`, color: "#0d1526" }, // navy
];

export default function RubiksCube({ size = 148 }) {
  const half = size / 2;
  const pad  = 4;   // frame thickness (dark gap around tile grid)
  const gap  = 3;   // gap between individual tiles

  return (
    <div style={{ width: size, height: size, perspective: `${size * 4.5}px` }}>
      {/* Spinning cube */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          animation: "rubikSpin 26s linear infinite",
          filter: "drop-shadow(0 0 28px rgba(59,130,246,0.28))",
        }}
        className="rubik-spin"
      >
        {FACES.map((face) => (
          <div
            key={face.id}
            style={{
              position: "absolute",
              inset: 0,
              transform: face.tf(half),
              backfaceVisibility: "hidden",
              // 3×3 tile grid
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 1fr)",
              gap: `${gap}px`,
              padding: `${pad}px`,
              // Dark frame matching page background
              background: "#04040c",
              boxSizing: "border-box",
            }}
          >
            {Array.from({ length: 9 }, (_, i) => (
              <div
                key={i}
                style={{
                  background: face.color,
                  borderRadius: "2px",
                  // Subtle bevel: top highlight + bottom shadow
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.18)," +
                    "inset 0 -1px 0 rgba(0,0,0,0.40)," +
                    "inset 0 0 0 1px rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
