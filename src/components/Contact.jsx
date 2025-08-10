import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-black text-white py-16 px-6 md:px-0 border-t border-gray-700"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Me
        </motion.h2>

        <motion.p
          className="text-gray-300 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          I'm open to new opportunities, collaborations, or even just a chat.
          Feel free to reach out and I'll get back to you as soon as I can.
        </motion.p>

        <motion.form
          action="https://formspree.io/f/mwpqnoal" // Replace with your Formspree ID or backend API
          method="POST"
          className="flex flex-col space-y-6 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-md font-semibold transition duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
