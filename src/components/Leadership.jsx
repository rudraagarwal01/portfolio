import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const leadershipData = [
  {
    title: "Merch of Hope",
    date: "August 2021 – August 2024",
    role: "Founder of Non-profit E-commerce",
    location: "Remote",
    link: "https://merchofhope01.wixsite.com/merchofhope",
    points: [
      "Launched a non-profit e-commerce platform, raising $2,500 to support the Make-A-Wish Foundation",
      "Raised awareness at school by selling 75+ custom merchandise, boosting engagement and fundraising",
      "Created presentations to lead weekly meetings at school and drive successful fundraising initiatives",
    ],
  },
  {
    title: "A.C.E. Cricket",
    date: "April 2020 – December 2023",
    role: "Founder & Head Training Coach",
    location: "Wilmington, DE",
    link: "https://acecricket01.wixsite.com/ace-cricket",
    points: [
      "Initiated a cricket program with a user-friendly website, engaging 50+ enthusiasts online and in-person",
      "Offered comprehensive training and mentorship to foster skill development and teamwork amongst players",
      "Built a community that nurtures a passion for cricket and raised awareness of a new sport at school",
    ],
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 px-6 md:px-16 relative z-10">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-blue-500 mb-16 text-center tracking-tight"
        style={{ textShadow: "0 0 15px rgba(59, 130, 246, 0.4)" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Leadership & Community
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {leadershipData.map((item, index) => (
          <motion.a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card border-blue-500/20 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59, 130, 246, 0.2)] block transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-2xl font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>
              
              {/* Icon lights up only when specifically hovered, matches Projects logic */}
              <div className="p-2 rounded-lg bg-white/5 text-blue-400 hover:text-white hover:bg-blue-600 transition-all duration-300 border border-white/10 hover:border-blue-500">
                <ExternalLink size={18} />
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-1 italic">{item.date}</p>

            <p className="text-sm text-gray-400 mb-4 italic">
              {item.role} — {item.location}
            </p>

            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {item.points.map((point, i) => (
                <li key={i} className="text-sm md:text-base leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>

            {/* Subtle "Visit" prompt at the bottom */}
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-blue-500/80 group-hover:text-blue-400 transition-colors">
              View Website →
            </p>
          </motion.a>
        ))}
      </div>
    </section>
  );
}