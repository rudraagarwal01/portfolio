import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaAws } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CheckCircle2, MapPin, Briefcase } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID  = "service_mn0b30s";
const EMAILJS_TEMPLATE_ID = "template_23f2t7l";
const EMAILJS_PUBLIC_KEY  = "0lhwivWFL_p3E1LCN";

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

const SUBJECT_SUGGESTIONS = [
  "Inquiry regarding Software Engineering roles",
  "Discussing Machine Learning opportunities",
  "Collaboration on AI/ML projects",
  "Reaching out about an internship opportunity",
  "Following up on a potential full-time role",
];

const BODY_SUGGESTIONS = [
  "Hi Rudra, I came across your portfolio and would love to connect.",
  "I'm reaching out regarding an exciting opportunity at my company.",
  "I'd love to discuss a potential collaboration on an AI/ML project.",
  "Hi Rudra, I think your background would be a great fit for our team.",
];

function getGhost(value, suggestions) {
  if (!value || value.trim().length < 3) return "";
  return suggestions.find(
    (s) => s.toLowerCase().startsWith(value.toLowerCase()) && s.length > value.length
  )?.slice(value.length) ?? "";
}

const SOCIAL_LINKS = [
  { label: "GitHub",        href: "https://github.com/rudraagarwal01",                                              Icon: FaGithub   },
  { label: "LinkedIn",      href: "https://www.linkedin.com/in/rudra-agarwal01/",                                   Icon: FaLinkedin },
  { label: "Email",         href: "mailto:rudra.agarwal06@gmail.com",                                               Icon: MdEmail    },
  { label: "AWS Certified", href: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url",  Icon: FaAws      },
];

// ── Field with ghost-text hint ────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, onAcceptGhost, placeholder, multiline, ghost }) {
  function handleKeyDown(e) {
    if (e.key === "Tab" || e.key === "ArrowRight") {
      if (ghost) {
        e.preventDefault();
        onAcceptGhost();
      }
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</label>
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={4}
            className="w-full bg-black/20 border border-white/10 hover:border-white/20 focus:border-blue-500/50 focus:bg-blue-500/5 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none resize-none transition-all duration-300 leading-relaxed"
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full bg-black/20 border border-white/10 hover:border-white/20 focus:border-blue-500/50 focus:bg-blue-500/5 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-300"
          />
        )}

        <AnimatePresence>
          {ghost && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute left-4 -bottom-5 flex items-center gap-2 pointer-events-none"
            >
              <span className="text-[10px] font-mono text-zinc-600 truncate max-w-[200px]">
                {value}<span className="text-zinc-500">{ghost}</span>
              </span>
              <span className="text-[9px] font-mono text-blue-400/70 bg-blue-500/10 border border-blue-500/20 px-1.5 py-[1px] rounded flex-shrink-0">
                Tab
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
export default function Contact() {
  const [sender,  setSender]  = useState("");
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [status,  setStatus]  = useState("idle"); 

  const subjectGhost = getGhost(subject, SUBJECT_SUGGESTIONS);
  const bodyGhost    = getGhost(body,    BODY_SUGGESTIONS);
  const canSubmit = isValidEmail(sender) && subject.trim().length >= 5 && body.trim().length >= 20;

  useEffect(() => {
    if (status !== "success") return;
    const t = setTimeout(() => {
      setSender("");
      setSubject("");
      setBody("");
      setStatus("idle");
    }, 2500);
    return () => clearTimeout(t);
  }, [status]);

  function resetStatus() {
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { from_email: sender, subject, message: body },
        EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-10"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Contact
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

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.25fr] gap-6 items-stretch">

          {/* ── Profile/Status Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="bg-[#141418]/60 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full"
          >
            {/* Slightly taller top image box (h-56) */}
            <div className="w-full h-56 overflow-hidden border-b border-white/5 bg-[#0e0e11]">
              <img 
                src="/headshot3.png" 
                alt="Rudra Agarwal" 
                className="w-full h-full object-cover object-center" 
              />
            </div>

            <div className="w-full p-6 md:p-8 flex-1 flex flex-col justify-between">
              
              <div className="flex flex-col items-center text-center">
                <h3 className="font-mono font-black text-2xl text-zinc-50 tracking-tight mb-1">
                  Rudra Agarwal
                </h3>
                <p className="text-[10px] font-mono text-blue-400 tracking-widest uppercase mb-6">
                  CS @ UMD · ML · SWE
                </p>

                {/* Status Readouts */}
                <div className="w-full flex flex-col gap-2">
                  
                  {/* Fannie Mae Row with larger logo */}
                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/20 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <Briefcase size={14} />
                      <span className="text-[11px] font-mono uppercase tracking-wider">Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img 
                        src="/fannie.png" 
                        alt="Fannie Mae" 
                        className="w-6 h-6 object-contain drop-shadow-md" 
                      />
                      <span className="text-xs font-mono font-medium text-zinc-200">Fannie Mae</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2.5 bg-black/20 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-2 text-zinc-500">
                      <MapPin size={14} />
                      <span className="text-[11px] font-mono uppercase tracking-wider">Location</span>
                    </div>
                    <span className="text-xs font-mono font-medium text-zinc-200">College Park, MD</span>
                  </div>
                </div>
              </div>

              {/* Connected Social Action Bar */}
              <div className="flex items-center justify-center gap-5 pt-6 w-full mt-6">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-zinc-500 hover:text-blue-400 hover:-translate-y-1 transition-all duration-200"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-[#141418]/60 backdrop-blur-2xl border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col h-full"
          >
            <div className="mb-6">
              <h3 className="font-mono font-bold text-2xl text-zinc-50 tracking-tight mb-2">
                Let's Connect
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
                Whether it's a question, a project proposal, or just saying hello, my inbox is always open.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 flex-1 justify-end">
              <Field
                label="Your Email"
                type="email"
                value={sender}
                onChange={(e) => { setSender(e.target.value); resetStatus(); }}
                onAcceptGhost={() => {}}
                placeholder="you@example.com"
              />
              <Field
                label="Subject"
                value={subject}
                onChange={(e) => { setSubject(e.target.value); resetStatus(); }}
                onAcceptGhost={() => setSubject(subject + subjectGhost)}
                placeholder="Inquiry regarding SWE roles"
                ghost={subjectGhost}
              />
              <Field
                label="Message"
                value={body}
                onChange={(e) => { setBody(e.target.value); resetStatus(); }}
                onAcceptGhost={() => setBody(body + bodyGhost)}
                placeholder="Hey Rudra, I'd love to connect about..."
                multiline
                ghost={bodyGhost}
              />

              <div className="pt-2 mt-auto">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold"
                    >
                      <CheckCircle2 size={16} />
                      Message sent successfully!
                    </motion.div>
                  ) : status === "error" ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold"
                    >
                      Something went wrong. Please try again.
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      disabled={!canSubmit || status === "sending"}
                      whileHover={canSubmit ? { scale: 1.01 } : {}}
                      whileTap={canSubmit ? { scale: 0.99 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        canSubmit
                          ? "bg-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 text-white shadow-[0_0_0_0_rgba(59,130,246,0)] hover:shadow-[0_0_24px_rgba(59,130,246,0.45)] cursor-pointer"
                          : "bg-white/5 text-zinc-600 border border-white/8 cursor-not-allowed"
                    }`}
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}