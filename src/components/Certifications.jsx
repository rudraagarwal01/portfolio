import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    date: "Completed August 2025",
    issuer: "Amazon Web Services",
    credentialUrl: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url",
  },
  {
    name: "Electronic Arts – Software Engineering Job Simulation",
    date: "Completed January 2025",
    issuer: "Forage",
    credentialUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_MkGzM7E3fgrPsBR7b_1737178148243_completion_certificate.pdf",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 px-6 md:px-16 max-w-5xl mx-auto z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-16 text-center tracking-tight uppercase"
        style={{ textShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Certifications
      </motion.h2>

      <div className="space-y-8">
        {certifications.map(({ name, date, issuer, credentialUrl }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ x: 12 }}
            onClick={() => window.open(credentialUrl, "_blank")}
            role="button"
            className="group relative cursor-pointer rounded-2xl p-6 md:p-8 bg-black/40 border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
          >
            {/* 1. Full Gradient Border - Fades in with 150ms delay */}
            <div 
              className="absolute inset-0 rounded-2xl border-[2px] border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-0 group-hover:delay-150 pointer-events-none"
              style={{
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                backgroundImage: "linear-gradient(#000, #000), linear-gradient(to bottom right, #3b82f6, #a855f7)",
              }}
            />

            {/* 2. Top Drawing Line - Starts immediately on hover */}
            <span 
              className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-blue-400 to-purple-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 ease-out z-20" 
            />

            <div className="relative z-10 flex items-start gap-6">
              <div className="relative">
                <BadgeCheck className="text-blue-400 w-10 h-10 flex-shrink-0 transition-all duration-300 group-hover:text-blue-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex-1 space-y-1">
                {/* Heading remains white on hover */}
                <h3 className="text-xl font-bold text-white transition-colors duration-200">
                  {name}
                </h3>
                <p className="text-gray-400 font-medium">{issuer}</p>
                <p className="text-sm text-gray-500 italic">{date}</p>

                <div className="flex items-center gap-1 mt-3 text-sm text-blue-400 font-bold tracking-wide uppercase">
                  Verify Credential <span className="text-lg">→</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}