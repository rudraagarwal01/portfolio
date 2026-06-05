import { motion } from "framer-motion";

const stats = [
  { label: "UNIVERSITY",  value: "Maryland" },
  { label: "MAJOR",       value: "Computer Science" },
  { label: "FOCUS",       value: "Machine Learning" },
  { label: "MINOR 1",     value: "Business" },
  { label: "MINOR 2",     value: "Information Risk Management, Ethics, and Privacy" },
  { label: "GRADUATION",  value: "December 2027" },
];

// Highlighted text helpers
const Bold  = ({ children }) => <span className="text-slate-900 dark:text-zinc-100 font-semibold">{children}</span>;
const Blue  = ({ children }) => <span className="text-blue-600 dark:text-blue-400 font-semibold">{children}</span>;

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
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
            Background
          </p>
          {/* Added uppercase utility class to maintain consistent visual system */}
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-slate-900 dark:text-zinc-50 tracking-tight uppercase">
            About Me
          </h2>
          {/* Animated gradient accent line exactly matching the Experience section */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ originX: 0 }}
            className="mt-3 h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent"
          />
        </motion.div>

        {/* Two-column layout: bio + academic grid */}
        <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="bg-white dark:bg-[#141418] border border-slate-200 dark:border-white/6 rounded-2xl p-8 md:p-10 shadow-sm dark:shadow-none"
          >
            <div className="space-y-5 text-slate-700 dark:text-zinc-300 text-base leading-relaxed">
              <p>
                Hello! I'm <Bold>Rudra Agarwal</Bold>, a{" "}
                <Bold>Computer Science student at the University of Maryland</Bold>{" "}
                studying <Blue>Machine Learning</Blue> with a{" "}
                <Bold>Business minor</Bold>. I'm drawn to the tech industry for a
                simple reason: building things has always felt like the most direct
                way to turn curiosity into impact. My goal is to{" "}
                <Blue>use technological advancements to solve real world problems</Blue>
                , especially in areas where innovation can meaningfully improve
                people's daily lives. I like problems where the "right" answer isn't
                obvious, where you have to test, learn, and iterate until something
                actually works for real people.
              </p>

              <p>
                A big part of my identity is being someone who{" "}
                <Bold>shows up consistently</Bold>. Working in technical roles taught
                me that progress is usually made in the unglamorous moments, debugging
                a driver issue, tracing a network configuration, or cleaning up an
                integration that nobody will notice unless it breaks. That mindset
                carries into how I learn: I'm not chasing perfect code on the first
                try; I'm chasing{" "}
                <Bold>clarity, reliability, and a system I can explain and maintain</Bold>.
              </p>

              <p>
                My experiences also shaped the values behind the work I choose.
                Through tutoring and leading peers, I learned how much{" "}
                <Blue>access and confidence affect outcomes</Blue>, some people just
                need the space to ask questions without feeling judged. Through
                projects like building community tools and student initiatives, I saw
                that technology is only "smart" if it's{" "}
                <Blue>usable, inclusive, and built with empathy</Blue>.
              </p>
            </div>
          </motion.div>

          {/* Academic stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="flex flex-col gap-2.5"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white dark:bg-[#141418] border border-slate-200 dark:border-white/6 rounded-xl px-5 py-3.5 shadow-sm dark:shadow-none"
              >
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-600 uppercase tracking-widest block mb-1">
                  {s.label}
                </span>
                <span className="text-xs font-semibold text-slate-900 dark:text-zinc-100 leading-snug">
                  {s.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}