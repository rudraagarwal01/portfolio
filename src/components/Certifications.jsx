import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaAws } from "react-icons/fa";
import { SiEa } from "react-icons/si";

// ─── Data ─────────────────────────────────────────────────────────────────────
const certs = [
  {
    issuerLabel: "Amazon Web Services",
    name: "AWS Certified Cloud Practitioner",
    date: "February 2026",
    status: "verified",
    credentialId: "7d7602ea91744d4d9fe8fed4b6935d1d",
    url: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url",
    icon: <FaAws size={36} className="text-amber-400" />,
    accentBar: "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500",
    border:    "border-amber-500/20 dark:border-amber-500/15",
    iconBg:    "bg-amber-500/10 dark:bg-amber-500/8 border border-amber-500/20 dark:border-amber-500/15",
    labelColor: "text-amber-500 dark:text-amber-400",
    viewColor:  "text-amber-500 dark:text-amber-400",
    hoverExternal: "group-hover:text-amber-400",
  },
  {
    issuerLabel: "Forage",
    name: "EA Software Engineering Job Simulation",
    date: "January 2025",
    status: "verified",
    credentialId: "MkGzM7E3fgrPsBR7b",
    url: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_MkGzM7E3fgrPsBR7b_1737178148243_completion_certificate.pdf",
    icon: <SiEa size={26} className="text-blue-400" />,
    accentBar: "bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500",
    border:    "border-blue-500/20 dark:border-blue-500/15",
    iconBg:    "bg-blue-500/10 dark:bg-blue-500/8 border border-blue-500/20 dark:border-blue-500/15",
    labelColor: "text-blue-500 dark:text-blue-400",
    viewColor:  "text-blue-500 dark:text-blue-400",
    hoverExternal: "group-hover:text-blue-400",
  },
  {
    issuerLabel: "Amazon Web Services",
    name: "AWS Certified AI Practitioner",
    date: "Expected 2026",
    status: "in-progress",
    focusAreas: ["Generative AI", "Foundational Models", "AWS Bedrock"],
    icon: <FaAws size={36} className="text-amber-400/80" />,
    accentBar: "bg-gradient-to-r from-amber-400/50 via-amber-500/50 to-orange-500/50",
    border:    "border-amber-500/30 dark:border-amber-500/20",
    iconBg:    "bg-amber-500/8 dark:bg-amber-500/6 border border-amber-500/15 dark:border-amber-500/12",
    labelColor: "text-amber-500 dark:text-amber-400",
    viewColor:  "text-amber-500/70 dark:text-amber-400/70",
    hoverExternal: "group-hover:text-amber-400",
  },
];

// ─── Card ─────────────────────────────────────────────────────────────────────
function CertCard({ cert, i }) {
  const isVerified    = cert.status === "verified";
  const isInProgress  = cert.status === "in-progress";

  const cardBody = (
    <div className={`relative rounded-2xl overflow-hidden border ${cert.border} bg-white dark:bg-[#0d0d10] shadow-sm hover:shadow-lg transition-all duration-300 h-full`}>
      {/* Accent bar */}
      <div className={`h-1 w-full ${cert.accentBar}`} />

      <div className="p-6 md:p-7 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 flex-1">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`w-14 h-14 rounded-xl ${cert.iconBg} flex items-center justify-center flex-shrink-0`}>
              {cert.icon}
            </div>
            <div className="min-w-0">
              <p className={`text-[10px] font-mono ${cert.labelColor} tracking-[0.2em] uppercase mb-1`}>
                {cert.issuerLabel}
              </p>
              <h3 className="font-mono font-bold text-base text-slate-900 dark:text-zinc-50 leading-snug">
                {cert.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-500 mt-1 font-mono">
                {isVerified ? "Issued" : "Target:"} {cert.date}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            {isVerified && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Verified
              </span>
            )}
            {isInProgress && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-[9px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                In Progress
              </span>
            )}
            {isVerified && (
              <ExternalLink
                size={13}
                className={`text-slate-300 dark:text-zinc-700 ${cert.hoverExternal} transition-colors duration-200`}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
          {isVerified && (
            <>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-600 uppercase tracking-widest truncate">
                ID · {cert.credentialId}
              </span>
              <span className={`text-[10px] font-mono font-bold ${cert.viewColor} uppercase tracking-widest flex-shrink-0`}>
                View Credential →
              </span>
            </>
          )}
          {isInProgress && (
            <>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-600 uppercase tracking-widest flex-shrink-0">
                Focus Areas
              </span>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {cert.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="text-[9px] font-mono text-amber-500/80 dark:text-amber-400/70 bg-amber-500/8 border border-amber-500/15 px-1.5 py-0.5 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const motionProps = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay: i * 0.1 },
    className: "block group h-full",
  };

  if (isVerified) {
    return (
      <motion.a href={cert.url} target="_blank" rel="noopener noreferrer" {...motionProps}>
        {cardBody}
      </motion.a>
    );
  }

  return (
    <motion.div {...motionProps}>
      {cardBody}
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase mb-3">
            Credentials
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight">
            CERTIFICATIONS
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

        {/* Stacked full-width cards */}
        <div className="flex flex-col gap-4">
          {certs.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
