import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const certs = [
  {
    issuer: "Amazon Web Services",
    name: "AWS Certified Cloud Practitioner",
    date: "February 2026",
    status: "verified",
    credentialId: "7d7602ea91744d4d9fe8fed4b6935d1d",
    url: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url",
    logo: "aws.svg",
    statusBar: "ISSUER: AWS | LEVEL: FOUNDATIONAL | VALID: 2026–2029",
  },
  {
    issuer: "Google",
    name: "Google AI Essentials",
    date: "June 2026",
    status: "verified",
    credentialId: "3e2fc95cd63a412fb23e345e0d120d59",
    url: "https://www.credly.com/badges/3e2fc95c-d63a-412f-b23e-345e0d120d59/public_url",
    logo: "google.svg",
    statusBar: "ISSUER: GOOGLE | TRACK: AI ESSENTIALS | VERIFIED: CREDLY",
  },
  {
    issuer: "EA | via Forage",
    name: "EA Software Engineering Job Simulation",
    date: "January 2025",
    status: "verified",
    credentialId: "MkGzM7E3fgrPsBR7b",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_MkGzM7E3fgrPsBR7b_1737178148243_completion_certificate.pdf",
    logo: "ea.svg",
    statusBar: "ISSUER: FORAGE × EA | TRACK: SOFTWARE ENGINEERING | SIMULATION",
  },
  {
    issuer: "Amazon Web Services",
    name: "AWS Certified AI Practitioner",
    date: "Expected 2026",
    status: "in-progress",
    focusAreas: ["Generative AI", "Foundational Models", "AWS Bedrock"],
    logo: "aws.svg",
    statusBar: "ISSUER: AWS | LEVEL: FOUNDATIONAL | STATUS: IN PROGRESS",
  },
];

function CertCard({ cert, i }) {
  const cardRef  = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 400, damping: 30 });

  const shimmerPos = useTransform(mouseX, [-0.5, 0.5], ["-60%", "160%"]);
  const shimmerGradient = useTransform(
    shimmerPos,
    (x) =>
      `linear-gradient(105deg, transparent calc(${x} - 20%), rgba(59,130,246,0.10) ${x}, rgba(139,92,246,0.07) calc(${x} + 12%), rgba(6,182,212,0.08) calc(${x} + 24%), transparent calc(${x} + 44%))`
  );

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width  - 0.5);
    mouseY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const isVerified   = cert.status === "verified";
  const isInProgress = cert.status === "in-progress";

  const cardBody = (
    <div style={{ perspective: "1200px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="relative group rounded-2xl overflow-hidden backdrop-blur-md border border-white/5 hover:border-white/20 bg-[#141418]/60 transition-colors duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
      >
        {/* Holographic shimmer overlay */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl z-10"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ background: shimmerGradient }}
        />

        <div className="p-6 md:p-7">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3.5 min-w-0">

              {/* Logo with glow ring */}
              <motion.div
                className="flex-shrink-0"
                whileHover={{
                  boxShadow: "0 0 0 2px rgba(59,130,246,0.45), 0 0 22px rgba(59,130,246,0.18)",
                }}
                transition={{ duration: 0.2 }}
                style={{ borderRadius: "0.75rem" }}
              >
                <img
                  src={`/logos/${cert.logo}`}
                  alt={`${cert.issuer} logo`}
                  className="w-14 h-14 rounded-xl border border-white/8 object-contain p-2 bg-[#1e1e24]"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  style={{ display: "none" }}
                  className="w-14 h-14 rounded-xl border border-white/8 bg-[#1e1e24] items-center justify-center text-blue-400 font-bold text-sm"
                >
                  {cert.issuer.charAt(0)}
                </div>
              </motion.div>

              <div className="min-w-0">
                <p className="text-[10px] font-mono text-zinc-500 tracking-[0.2em] uppercase mb-0.5">
                  {cert.issuer}
                </p>
                <h3 className="text-sm font-bold text-zinc-100 font-mono leading-snug">
                  {cert.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 font-mono">
                  {isVerified ? "Issued" : "Target:"} {cert.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {isVerified && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Verified
                </span>
              )}
              {isInProgress && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  In Progress
                </span>
              )}
            </div>
          </div>

          {isInProgress && cert.focusAreas && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cert.focusAreas.map((area) => (
                <span
                  key={area}
                  className="text-[9px] font-mono text-zinc-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded uppercase"
                >
                  {area}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="px-5 py-2.5 bg-black/40 border-t border-white/5 flex items-center gap-2.5 transition-all duration-300 group-hover:bg-blue-500/8 group-hover:shadow-[inset_0_1px_0_rgba(59,130,246,0.25)]">
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isVerified ? "bg-emerald-500 animate-pulse" : "bg-amber-500 animate-pulse"}`} />
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest truncate group-hover:text-zinc-400 transition-colors duration-300">
            {cert.statusBar}
          </span>
          {isVerified && (
            <ArrowUpRight size={12} className="ml-auto text-zinc-700 group-hover:text-blue-400 transition-colors flex-shrink-0" />
          )}
        </div>
      </motion.div>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] },
  };

  if (isVerified) {
    return (
      <motion.a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {cardBody}
      </motion.a>
    );
  }

  return <motion.div {...motionProps}>{cardBody}</motion.div>;
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Credentials
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Certifications
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent"
          />
        </motion.div>

        <div className="flex flex-col gap-4">
          {certs.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
