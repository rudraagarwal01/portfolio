import { motion } from "framer-motion";
import { ExternalLink, HeartHandshake, Trophy } from "lucide-react";
import { SiAdobe } from "react-icons/si";

const items = [
  {
    org: "Adobe",
    Icon: SiAdobe,
    tag: "Adobe Student Ambassador",
    points: [
      "Lead interactive workshops and training sessions focused on Adobe Firefly generative AI.",
      "Host campus-wide events and tutorials to demonstrate the capabilities of Adobe Creative Cloud applications.",
      "Collaborate with student organizations to integrate Adobe tools into their creative projects and campaigns.",
    ],
  },
  {
    org: "A.C.E Cricket",
    Icon: Trophy,
    tag: "Founder & Head Training Coach",
    link: "https://acecricket01.wixsite.com/ace-cricket",
    points: [
      <>Initiated a cricket program engaging <b>50+</b> enthusiasts online and in-person.</>,
      "Offered comprehensive training and mentorship to foster skill development and teamwork.",
      "Built a community that raised awareness of cricket and promoted the sport at school.",
    ],
  },
  {
    org: "Merch of Hope",
    Icon: HeartHandshake,
    tag: "Founder, Non-profit E-commerce",
    link: "https://merchofhope01.wixsite.com/merchofhope",
    points: [
      <>Launched a non-profit e-commerce platform, raising <b>$2,500</b> for the Make-A-Wish Foundation.</>,
      <>Sold <b>75+</b> custom merchandise items at school, boosting engagement and fundraising awareness.</>,
      "Led weekly meetings and created presentations to drive cross-functional impact initiatives.",
    ],
  },
];

// ─── Satellite card ───────────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function LeadershipCard({ item }) {
  return (
    <motion.div
      variants={cardVariants}
      className="flex-1 bg-transparent backdrop-blur-md border border-white/8 rounded-2xl p-7 flex flex-col gap-5 hover:border-white/16 transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex-shrink-0 text-blue-400"
            style={{ filter: "drop-shadow(0 0 8px rgba(59,130,246,0.55))" }}
          >
            <item.Icon size={24} />
          </div>
          <div>
            <h3 className="font-mono font-bold text-lg text-zinc-50 tracking-tight mb-1">
              {item.org}
            </h3>
            <p className="text-[11px] font-mono text-blue-400 tracking-wide whitespace-nowrap">
              {item.tag}
            </p>
          </div>
        </div>

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-blue-400 hover:text-blue-300 transition-colors duration-200 flex-shrink-0"
          >
            <ExternalLink size={11} />
            Visit Website
          </a>
        )}
      </div>

      <div className="h-px bg-white/5" />

      <ul className="flex flex-col gap-2.5">
        {item.points.map((pt, i) => (
          <li key={i} className="flex items-baseline gap-2.5 text-sm text-zinc-300 leading-relaxed">
            <span className="text-slate-400 flex-shrink-0 text-xs">→</span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Leadership() {
  return (
    <section id="leadership" className="relative py-24 px-6 overflow-hidden">

      {/* Faint dot-grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="ldr-dots" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
              <circle cx="18" cy="18" r="0.7" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ldr-dots)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Community
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Leadership & Impact
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

        {/* Equal-width leadership cards (Adobe first) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          <LeadershipCard item={items[0]} />
          <LeadershipCard item={items[1]} />
          <LeadershipCard item={items[2]} />
        </motion.div>

      </div>
    </section>
  );
}
