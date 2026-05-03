import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ─── TiltCard ────────────────────────────────────────────────────────────────
function TiltCard({ children, className }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx   = (e.clientX - rect.left)  / rect.width  - 0.5;
    const ny   = (e.clientY - rect.top)   / rect.height - 0.5;
    card.style.transform  = `perspective(1000px) rotateX(${ny * -4}deg) rotateY(${nx * 4}deg) scale(1.01)`;
    card.style.transition = "transform 0.08s ease-out";
    const glow = card.querySelector("[data-tilt-glow]");
    if (glow) {
      glow.style.opacity    = "1";
      glow.style.background = `radial-gradient(240px circle at ${(nx + 0.5) * 100}% ${(ny + 0.5) * 100}%, rgba(59,130,246,0.1), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform  = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
    const glow = card.querySelector("[data-tilt-glow]");
    if (glow) glow.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      <div data-tilt-glow className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }} />
      {children}
    </div>
  );
}

// ─── TechPill ─────────────────────────────────────────────────────────────────
function TechPill({ name }) {
  return (
    <span className="text-[10px] font-mono text-zinc-500 bg-white/4 border border-white/8 px-2 py-1 rounded-md">
      {name}
    </span>
  );
}

// ─── Highlight ────────────────────────────────────────────────────────────────
function Highlight({ value, label }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2 rounded-lg bg-blue-500/8 border border-blue-500/15">
      <span className="text-blue-400 font-bold text-sm leading-none">{value}</span>
      <span className="text-blue-400/50 text-[10px] mt-0.5">{label}</span>
    </div>
  );
}

// ─── Syntax helpers ───────────────────────────────────────────────────────────
const Kw  = ({ c }) => <span className="text-blue-400">{c}</span>;
const Fn  = ({ c }) => <span className="text-emerald-400">{c}</span>;
const Ty  = ({ c }) => <span className="text-amber-300">{c}</span>;
const Tx  = ({ c }) => <span className="text-zinc-300">{c}</span>;
const Cm  = ({ c }) => <span className="text-zinc-600">{c}</span>;
const Met = ({ c }) => <span className="text-emerald-400 font-semibold">{c}</span>;

// ─── Code Snippets ────────────────────────────────────────────────────────────
function EmailAgentCode() {
  return (
    <div className="font-mono text-[12px] leading-[1.8]">
      <div><Kw c="class " /><Fn c="EmailAgent" /><Tx c=":" /></div>
      <div className="ml-4"><Tx c="model = " /><Ty c='"gpt-4-turbo"' /></div>
      <div>&nbsp;</div>
      <div className="ml-4">
        <Kw c="async def " /><Fn c="generate" />
        <Tx c="(self, prompt: " /><Ty c="str" /><Tx c=") -> " /><Ty c="str" /><Tx c=":" />
      </div>
      <div className="ml-8">
        <Cm c="# " /><Met c="60% reduction" /><Cm c=" in drafting time" />
      </div>
      <div className="ml-8">
        <Tx c="draft = " /><Kw c="await " />
        <Tx c="self.llm." /><Fn c="complete" /><Tx c="(prompt)" />
      </div>
      <div className="ml-8">
        <Kw c="return await " /><Tx c="self." /><Fn c="moderate" /><Tx c="(draft)" />
      </div>
      <div>&nbsp;</div>
      <div className="ml-4">
        <Kw c="async def " /><Fn c="moderate" />
        <Tx c="(self, draft: " /><Ty c="str" /><Tx c=") -> " /><Ty c="str" /><Tx c=":" />
      </div>
      <div className="ml-8">
        <Tx c="scores = self.guard." /><Fn c="score" /><Tx c="(draft)" />
      </div>
      <div className="ml-8">
        <Kw c="return " /><Tx c="draft " /><Kw c="if " />
        <Tx c="scores.safe " /><Kw c="else " /><Tx c="self." /><Fn c="retry" /><Tx c="()" />
      </div>
    </div>
  );
}

function MealMatchCode() {
  return (
    <div className="font-mono text-[12px] leading-[1.8]">
      <div><Cm c="# " /><Ty c="matching.py" /><Cm c=" — smart ranking engine" /></div>
      <div><Kw c="def " /><Fn c="calculate_match_score" /><Tx c="(" /></div>
      <div className="ml-4"><Tx c="listing: " /><Ty c="Listing" /><Tx c="," /></div>
      <div className="ml-4"><Tx c="recipient: " /><Ty c="Recipient" /></div>
      <div><Tx c=") -> " /><Ty c="float" /><Tx c=":" /></div>
      <div className="ml-4">
        <Cm c="# " /><Met c="1,000+" /><Cm c=" demo listings ranked" />
      </div>
      <div className="ml-4">
        <Tx c="dist = " /><Fn c="haversine" />
        <Tx c="(listing.lat, listing.lng," />
      </div>
      <div className="ml-4">
        <Tx c="               recipient.lat, recipient.lng)" />
      </div>
      <div className="ml-4">
        <Tx c="prox    = " /><Fn c="max" /><Tx c="(0, 1 - dist / MAX_RADIUS)" />
      </div>
      <div className="ml-4">
        <Tx c="diet    = " /><Fn c="jaccard_sim" />
        <Tx c="(listing.dietary_tags," />
      </div>
      <div className="ml-4">
        <Tx c="                    recipient.preferences)" />
      </div>
      <div className="ml-4">
        <Tx c="hours   = " /><Fn c="time_until" /><Tx c="(listing.expires_at)" />
      </div>
      <div className="ml-4">
        <Tx c="urgency = " /><Fn c="max" /><Tx c="(0, 1 - hours / " /><Ty c="24" /><Tx c=")" />
      </div>
      <div className="ml-4">
        <Kw c="return " />
        <Tx c="prox*" /><Ty c="0.5" /><Tx c=" + diet*" /><Ty c="0.3" />
        <Tx c=" + urgency*" /><Ty c="0.2" />
      </div>
    </div>
  );
}

function AuthGuardCode() {
  return (
    <div className="font-mono text-[12px] leading-[1.8]">
      <div><Cm c="// " /><Met c="95% detection rate" /></div>
      <div>
        <Kw c="function " /><Fn c="detect" /><Tx c="(url) {" />
      </div>
      <div className="ml-4">
        <Kw c="const " /><Tx c="db = " /><Fn c="getThreatDB" /><Tx c="();" />
      </div>
      <div className="ml-4">
        <Kw c="return " /><Tx c="db." /><Fn c="some" /><Tx c="(domain => {" />
      </div>
      <div className="ml-8">
        <Kw c="const " /><Tx c="dist = " />
        <Fn c="levenshtein" /><Tx c="(url, domain);" />
      </div>
      <div className="ml-8">
        <Kw c="return " /><Tx c="dist " />
        <span className="text-zinc-300">{"< "}</span>
        <Ty c="3" /><Tx c=";" />
      </div>
      <div className="ml-4"><Tx c="});" /></div>
      <div><Tx c="}" /></div>
    </div>
  );
}

function FitnessCode() {
  return (
    <div className="font-mono text-[12px] leading-[1.8]">
      <div>
        <Kw c="func " /><Fn c="trackWorkout" />
        <Tx c="(_ data: BiometricData) {" />
      </div>
      <div className="ml-4">
        <Tx c="hapticEngine." /><Fn c="play" /><Tx c="(.impact)" />
      </div>
      <div className="ml-4">
        <Tx c="HealthKit." /><Fn c="save" /><Tx c="(data)" />
      </div>
      <div className="ml-4">
        <Cm c="// " /><Met c="2,000+" /><Cm c=" active users" />
      </div>
      <div className="ml-4">
        <Fn c="updateDashboard" /><Tx c="(data)" />
      </div>
      <div><Tx c="}" /></div>
    </div>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────
const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
};
const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Chrome ──────────────────────────────────────────────────────────────────
function Chrome({ filename, link, isGithub, badge }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 bg-[#161619] border-b border-white/6 flex-shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-[11px] font-mono text-zinc-500">{filename}</span>
        {badge && (
          <span className="text-[9px] font-mono font-bold text-blue-400/70 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider ml-1">
            {badge}
          </span>
        )}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-[10px] font-mono text-zinc-600 hover:text-blue-400 transition-colors duration-200"
      >
        {isGithub ? "GitHub" : "Live"} <ArrowUpRight size={10} />
      </a>
    </div>
  );
}

// ─── Featured card (gradient bar + highlights) ────────────────────────────────
function FeaturedCard({ p }) {
  return (
    <TiltCard className="h-full bg-[#0d0d10] border border-transparent rounded-2xl overflow-hidden flex flex-col group hover:border-white/20 transition-colors duration-300">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500" />

      <Chrome filename={p.filename} link={p.link} isGithub={p.isGithub} badge="Featured" />

      {/* Code area */}
      <div className="flex-1 p-5 overflow-hidden min-h-[200px]">
        {p.codeBlock}
      </div>

      {/* Project info footer */}
      <div className="border-t border-white/6 bg-[#111115] p-5 flex-shrink-0">
        <span className="text-[10px] font-mono text-blue-400/70 tracking-widest uppercase block mb-1.5">
          Featured Project
        </span>
        <h3 className="font-mono font-bold text-zinc-100 text-base leading-snug mb-2 group-hover:text-blue-400 transition-colors duration-200">
          {p.title}
        </h3>
        <p className="text-xs text-zinc-500 leading-relaxed mb-3">{p.desc}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {p.highlights.map((h) => <Highlight key={h.label} {...h} />)}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map((t) => <TechPill key={t} name={t} />)}
        </div>
      </div>
    </TiltCard>
  );
}


// ─── Project data ─────────────────────────────────────────────────────────────
const M = ({ children }) => (
  <span className="font-semibold text-zinc-300">{children}</span>
);

const featured = [
  {
    title: "AI EchoMail",
    desc: <>GPT-4 + FastAPI drafting system with HuggingFace moderation — <M>60% reduction</M> in drafting time with enterprise-grade safety across every generated draft.</>,
    highlights: [
      { value: "60% faster",    label: "Draft time" },
      { value: "FastAPI + RAG", label: "Architecture" },
      { value: "Sub-500ms",     label: "Moderation" },
    ],
    tech: ["React", "Python", "FastAPI", "PostgreSQL", "HuggingFace", "OpenAI"],
    filename: "email_agent.py",
    codeBlock: <EmailAgentCode />,
    link: "https://github.com/rudraagarwal01/AI-Email-Drafting-Tool",
    isGithub: true,
  },
  {
    title: "MealMatch",
    desc: <>Full-stack social impact platform connecting restaurants with surplus food to community — <M>4-role system</M> with smart proximity + dietary scoring and <M>real-time navigation</M>.</>,
    highlights: [
      { value: "1,000+",       label: "Demo listings" },
      { value: "4-role system", label: "Architecture" },
      { value: "Leaflet nav",   label: "Real-time" },
    ],
    tech: ["React 19", "FastAPI", "Python 3.13", "SQLite", "Leaflet", "JWT"],
    filename: "matching.py",
    codeBlock: <MealMatchCode />,
    link: "https://github.com/rudraagarwal01/MealMatch",
    isGithub: true,
  },
];

const secondary = [
  {
    title: "AuthGuard Extension",
    desc: <>Chrome extension using <M>Levenshtein distance</M> to catch typosquatting and phishing URLs in real-time — <M>95% detection rate</M> at under 10ms with zero external dependencies.</>,
    highlights: [
      { value: "95%",         label: "Detection rate" },
      { value: "<10ms",       label: "Response time"  },
      { value: "Levenshtein", label: "Algorithm"      },
    ],
    tech: ["JavaScript", "HTML", "CSS", "Chrome API"],
    filename: "detect.js",
    codeBlock: <AuthGuardCode />,
    link: "https://github.com/rudraagarwal01/authGaurd",
    isGithub: true,
  },
  {
    title: "Fitness Genius",
    desc: <>Native iOS biometric + haptic workout tracker integrated with <M>HealthKit</M> — scaled to <M>2,000+ active users</M> with real-time dashboard and Apple Watch support.</>,
    highlights: [
      { value: "2,000+",     label: "Active users"  },
      { value: "HealthKit",  label: "Integration"   },
      { value: "Native iOS", label: "Platform"      },
    ],
    tech: ["Swift", "Xcode", "JavaScript", "HTML"],
    filename: "WorkoutTracker.swift",
    codeBlock: <FitnessCode />,
    link: "https://fitnessgenius28.wixsite.com/gym-genius",
    isGithub: false,
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-mono text-blue-600 dark:text-blue-400 tracking-[0.2em] uppercase mb-3">
            Selected Work
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight">
            Projects
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {/* ── Featured row ── */}
          {featured.map((p) => (
            <motion.div key={p.title} variants={cardVariants}>
              <FeaturedCard p={p} />
            </motion.div>
          ))}

          {/* ── Secondary row ── */}
          {secondary.map((p) => (
            <motion.div key={p.title} variants={cardVariants}>
              <FeaturedCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
