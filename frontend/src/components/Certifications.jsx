import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    date: "Projected July 2025",
    issuer: "Amazon Web Services",
    credentialUrl: "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url"
  }
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="my-24 px-12 py-16 md:px-24 md:py-20 bg-zinc-900 rounded-lg max-w-4xl mx-auto"
    >
      <motion.h2
        className="text-4xl font-extrabold text-cyan-400 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Certifications
      </motion.h2>

      <div className="space-y-6">
        {certifications.map(({ name, date, issuer, credentialUrl }, idx) => (
          <motion.div
            key={idx}
            className="flex items-center space-x-4 bg-zinc-800 rounded-xl p-6 shadow-lg border border-cyan-700 hover:shadow-cyan-500/50 transition-shadow cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.2, duration: 0.5 }}
            onClick={() => window.open(credentialUrl, "_blank")}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === "Enter") window.open(credentialUrl, "_blank");
            }}
          >
            <BadgeCheck className="text-cyan-400 w-8 h-8 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-white">{name}</h3>
              <p className="text-gray-400">{issuer}</p>
              <p className="text-gray-300 text-sm italic">{date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
