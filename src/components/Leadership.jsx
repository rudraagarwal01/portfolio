import { motion } from "framer-motion";

const leadershipData = [
  {
    title: "Merch of Hope",
    date: "August 2021 – August 2024",
    role: "Founder of Non-profit E-commerce",
    location: "Remote",
    points: [
      "Launched a non-profit e-commerce platform, raising $2,500 to support the Make-A-Wish Foundation",
      "Raised awareness at school by selling 75+ custom merchandise, boosting engagement and fundraising",
      "Created presentations to lead weekly meetings at school and drive successful fundraising initiatives"
    ],
  },
  {
    title: "A.C.E. Cricket",
    date: "April 2020 – December 2023",
    role: "Founder & Head Training Coach",
    location: "Wilmington, DE",
    points: [
      "Initiated a cricket program with a user-friendly website, engaging 50+ enthusiasts online and in-person",
      "Offered comprehensive training and mentorship to foster skill development and teamwork amongst players",
      "Built a community that nurtures a passion for cricket and raised awareness of a new sport at school"
    ],
  },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-20 bg-zinc-900 px-6 md:px-16">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-cyan-400 mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Leadership & Community
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {leadershipData.map((item, index) => (
          <motion.div
            key={index}
            className="bg-zinc-800 rounded-2xl p-6 shadow-xl border border-cyan-700 hover:shadow-cyan-500/40 transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
            <p className="text-sm text-gray-400 mb-1 italic">{item.date}</p>
            <p className="text-sm text-gray-400 mb-4 italic">
              {item.role} — {item.location}
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              {item.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
