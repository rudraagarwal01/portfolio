import { motion } from 'framer-motion'

export default function FloatingContact() {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-4 shadow-lg z-40"
      onClick={() => window.open('mailto:rudra.agarwal06@gmail.com')}
      aria-label="Contact Me"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </motion.button>
  )
}