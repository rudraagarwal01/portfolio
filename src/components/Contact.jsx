import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CheckCircle2 } from "lucide-react";
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
  { label: "GitHub",   href: "https://github.com/rudraagarwal01",               Icon: FaGithub   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rudra-agarwal01/",    Icon: FaLinkedin },
  { label: "Email",    href: "mailto:rudra.agarwal06@gmail.com",                Icon: MdEmail    },
];

// ── Field with ghost-text hint ────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, onAcceptGhost, placeholder, multiline, ghost }) {
  function handleKeyDown(e) {
    if (e.key === "Tab" && ghost) {
      e.preventDefault();
      onAcceptGhost();
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-400 tracking-wide">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={5}
          className="w-full bg-white/5 border border-white/8 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm text-slate-50 placeholder-zinc-600 outline-none resize-none transition-colors duration-200 leading-relaxed"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/8 focus:border-blue-500/50 rounded-xl px-4 py-3 text-sm text-slate-50 placeholder-zinc-600 outline-none transition-colors duration-200"
        />
      )}

      <AnimatePresence>
        {ghost && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 px-1"
          >
            <span className="text-[11px] text-slate-600 truncate">
              {value}<span className="text-slate-500">{ghost}</span>
            </span>
            <span className="text-[9px] font-mono text-zinc-700 bg-white/4 border border-white/6 px-1.5 py-0.5 rounded flex-shrink-0">
              Tab
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
export default function Contact() {
  const [sender,  setSender]  = useState("");
  const [subject, setSubject] = useState("");
  const [body,    setBody]    = useState("");
  const [status,  setStatus]  = useState("idle"); // idle | sending | success | error

  const subjectGhost = getGhost(subject, SUBJECT_SUGGESTIONS);
  const bodyGhost    = getGhost(body,    BODY_SUGGESTIONS);

  const canSubmit = isValidEmail(sender) && subject.trim().length >= 5 && body.trim().length >= 20;

  // Reset form 2.5s after success
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
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-mono font-bold text-3xl md:text-4xl text-zinc-50 tracking-tight uppercase">
            Contact
          </h2>
        </motion.div>

        {/* Glassmorphism card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mx-auto bg-[#141418]/80 backdrop-blur-2xl border border-white/5 rounded-2xl p-8 md:p-12"
        >
          <div className="mb-8">
            <h3 className="font-mono font-bold text-2xl md:text-3xl text-zinc-50 tracking-tight mb-2">
              Let's Connect
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Open to internships, full-time roles, and interesting projects. Drop me a message and I'll get back to you.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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

            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-sm font-semibold"
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
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-sm font-semibold"
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
                  className={`w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    canSubmit
                      ? "bg-blue-600 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 text-white shadow-[0_0_0_0_rgba(59,130,246,0)] hover:shadow-[0_0_24px_rgba(59,130,246,0.45)] cursor-pointer"
                      : "bg-white/5 text-zinc-600 border border-white/8 cursor-not-allowed"
                  }`}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </motion.button>
              )}
            </AnimatePresence>
          </form>

          {/* Social links */}
          <div className="flex items-center justify-center gap-5 mt-8 pt-8 border-t border-white/5">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="text-zinc-500 hover:text-blue-400 transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
