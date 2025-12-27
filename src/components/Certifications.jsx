import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    date: "Completed August 2025",
    issuer: "Amazon Web Services",
    credentialUrl:
      "https://www.credly.com/badges/1239a737-51c7-46bf-aa56-eed2c2a0ebb2/public_url",
  },
  {
    name: "Electronic Arts – Software Engineering Job Simulation",
    date: "Completed January 2025",
    issuer: "Forage",
    credentialUrl:
      "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/j43dGscQHtJJ57N54/a77WE3de8qrxWferQ_j43dGscQHtJJ57N54_MkGzM7E3fgrPsBR7b_1737178148243_completion_certificate.pdf",
  },
];

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative py-24 px-6 md:px-16 max-w-5xl mx-auto z-10"
    >
      {/* Section Title - Updated to Blue */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-16 text-center tracking-tight"
        style={{ textShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Certifications
      </motion.h2>

      {/* Certification Cards */}
      <div className="space-y-8">
        {certifications.map(({ name, date, issuer, credentialUrl }, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            onClick={() => window.open(credentialUrl, "_blank")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") window.open(credentialUrl, "_blank");
            }}
            className="
                group relative cursor-pointer rounded-2xl
                glass-card p-6 md:p-8
                border border-blue-900/40
                hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]
                transition-all duration-300
              "
          >
            {/* Left blue accent */}
            <span
              className="
                  absolute left-0 top-6 bottom-6 w-[2px]
                  bg-blue-500/70
                  rounded-full
                  opacity-60
                  group-hover:opacity-100
                  transition-opacity
                "
            />

            <div className="flex items-start gap-5">
              {/* Icon - Updated to Blue */}
              <BadgeCheck
                className="
                    text-blue-400 w-9 h-9 flex-shrink-0
                    group-hover:scale-110
                    group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.7)]
                    transition-transform duration-300
                  "
              />

              {/* Content */}
              <div className="space-y-1">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {name}
                </h3>
                <p className="text-gray-400">{issuer}</p>
                <p className="text-sm text-gray-300 italic">{date}</p>

                {/* blue CTA */}
                <p className="mt-2 text-sm text-blue-400/90 font-medium transition-colors group-hover:text-blue-300">
                  View Credential →
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}