import { motion } from "framer-motion";
import ProjectsSection from "../components/Projects";

export default function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative z-10"
    >
      <ProjectsSection />
    </motion.div>
  );
}
