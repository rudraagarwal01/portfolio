import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiAdobe } from "react-icons/si";

// Pointy-top hexagon — proportions tuned for a regular hex (112 × 130)
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const certs = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "February 2026",
    status: "verified",
    credentialId: "7d7602ea91744d4d9fe8fed4b6935d1d",
    imageSrc: "/logos/aws.png",
    credentialLink: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url",
    gradient: "from-amber-500/70 via-orange-400/40 to-yellow-400/70",
  },
  {
    title: "Google AI Professional Certificate",
    issuer: "Google",
    date: "June 2026",
    status: "verified",
    credentialId: "46ca3b6736b34e7c8f7a68d268926ea2",
    imageSrc: "/logos/google.png",
    credentialLink: "https://www.credly.com/badges/46ca3b67-36b3-4e7c-8f7a-68d268926ea2/public_url",
    gradient: "from-red-500/70 via-yellow-400/40 to-green-400/70",
  },
  {
    title: "Adobe Student Brand Ambassador",
    issuer: "ADOBE",
    date: "July 2026",
    status: "verified",
    credentialId: "adobe-student-ambassador-2026",
    credentialLink: "https://www.linkedin.com/posts/rudra-agarwal01_adobe-adobeambassador-computerscience-share-7484367819413909504-apk5/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADYwmDgBfIjYa07WFQC5A-Hv78xlU2dyPQY",
    Icon: SiAdobe,
    iconClassName: "text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.55)]",
    gradient: "from-red-500/80 via-rose-400/45 to-red-600/80",
    transparentCard: true,
  },
  {
    title: "Google AI Essentials Certificate",
    issuer: "Google",
    date: "June 2026",
    status: "verified",
    credentialId: "3e2fc95cd63a412fb23e345e0d120d59",
    imageSrc: "/logos/google.png",
    credentialLink: "https://www.credly.com/badges/3e2fc95c-d63a-412f-b23e-345e0d120d59/public_url",
    gradient: "from-blue-500/70 via-cyan-400/40 to-teal-400/70",
  },
  {
    title: "EA Software Engineering Simulation",
    issuer: "EA | via Forage",
    date: "January 2025",
    status: "verified",
    credentialId: "MkGzM7E3fgrPsBR7b",
    imageSrc: "/logos/ea.png",
    credentialLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_MkGzM7E3fgrPsBR7b_1737178148243_completion_certificate.pdf",
    gradient: "from-violet-500/70 via-indigo-400/40 to-blue-500/70",
  },
  {
    title: "AWS Certified AI Practitioner",
    issuer: "Amazon Web Services",
    date: "Expected 2026",
    status: "in-progress",
    imageSrc: "/logos/aws.png",
    credentialLink: null,
    focusAreas: ["Generative AI", "Foundational Models", "AWS Bedrock"],
    gradient: "from-amber-500/70 via-orange-400/40 to-yellow-400/70",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// ─── Hexagonal badge ──────────────────────────────────────────────────────────
function HexBadge({ imageSrc, gradient, Icon, iconClassName }) {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: 112, height: 130 }}
    >
      {/* Gradient shell */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
        style={{ clipPath: HEX }}
      />
      {/* Dark inner hexagon — creates the "border" */}
      <div
        className="absolute bg-[#0d0d10]"
        style={{ clipPath: HEX, top: 3, right: 3, bottom: 3, left: 3 }}
      />
      {/* Logo */}
      {Icon ? (
        <Icon className={`relative z-10 w-12 h-12 ${iconClassName || "text-zinc-100"}`} />
      ) : (
        <img
          src={imageSrc}
          alt=""
          className="relative z-10 w-12 h-12 object-contain"
        />
      )}
    </div>
  );
}

// ─── Badge card ───────────────────────────────────────────────────────────────
function CertBadge({ cert }) {
  const isVerified   = cert.status === "verified";
  const isInProgress = cert.status === "in-progress";
  const cardBgClass = cert.transparentCard ? "bg-transparent" : "bg-[#141418]/70";

  const card = (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`group flex flex-col items-center text-center gap-5 p-6 rounded-2xl border border-white/6 ${cardBgClass} transition-colors duration-300`}
    >
      <HexBadge
        imageSrc={cert.imageSrc}
        gradient={cert.gradient}
        Icon={cert.Icon}
        iconClassName={cert.iconClassName}
      />

      {/* Text */}
      <div className="space-y-1.5 w-full">
        <h3 className="font-mono font-bold text-sm text-zinc-100 leading-snug">
          {cert.title}
        </h3>
        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em]">
          {cert.issuer}
        </p>
        <p className="text-[10px] font-mono text-zinc-600">
          {isVerified ? "Issued" : "Target:"} {cert.date}
        </p>
      </div>

      {/* Status + meta */}
      <div className="flex flex-col items-center gap-2 w-full">
        {isVerified && (
          <>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              • VERIFIED
            </span>
            {cert.credentialLink && (
              <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-700 group-hover:text-blue-400 transition-colors duration-200">
                View Credential <ArrowUpRight size={10} />
              </span>
            )}
          </>
        )}

        {isInProgress && (
          <>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[9px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              In Progress
            </span>
            <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-widest">
              Generative AI
            </span>
          </>
        )}
      </div>
    </motion.div>
  );

  if (isVerified && cert.credentialLink) {
    return (
      <motion.a
        href={cert.credentialLink}
        target="_blank"
        rel="noopener noreferrer"
        variants={itemVariants}
      >
        {/* Re-wrap so whileHover/whileTap stay on the inner div */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={`group flex flex-col items-center text-center gap-5 p-6 rounded-2xl border border-white/6 hover:border-white/18 ${cardBgClass} transition-colors duration-300 cursor-pointer h-full`}
        >
          <HexBadge
            imageSrc={cert.imageSrc}
            gradient={cert.gradient}
            Icon={cert.Icon}
            iconClassName={cert.iconClassName}
          />

          <div className="space-y-1.5 w-full">
            <h3 className="font-mono font-bold text-sm text-zinc-100 leading-snug">{cert.title}</h3>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.18em]">{cert.issuer}</p>
            <p className="text-[10px] font-mono text-zinc-600">Issued {cert.date}</p>
          </div>

          <div className="flex flex-col items-center gap-2 w-full">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              • VERIFIED
            </span>
            <span className="flex items-center gap-1 text-[9px] font-mono text-zinc-700 group-hover:text-blue-400 transition-colors duration-200">
              View Credential <ArrowUpRight size={10} />
            </span>
          </div>
        </motion.div>
      </motion.a>
    );
  }

  return card;
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Certifications() {
  return (
    <section id="certifications" className="px-6 pb-24">
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certs.map((cert) => (
            <CertBadge key={cert.title} cert={cert} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
