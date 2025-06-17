import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="px-4 py-12 max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-primary"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About EduEcho
      </motion.h1>

      {/* Intro Card */}
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row mb-12"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80"
            alt="Knowledge Sharing"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">What is EduEcho?</h2>
          <p className="mb-3">
            <strong>EduEcho</strong> is a knowledge-sharing platform where learners, students, and professionals can explore ideas, write articles, and engage with a vibrant community.
          </p>
          <p>
            This platform was built as part of the Programming Hero Web Development Course (Assignment 11), using full MERN stack technologies — React, Node.js, Express, MongoDB — along with Firebase Authentication and JWT for secure access.
          </p>
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-secondary"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Technologies Used
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {[
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Firebase Auth",
          "TailwindCSS",
          "DaisyUI",
          "JWT",
        ].map((tech, idx) => (
          <motion.div
            key={idx}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 text-white p-4 shadow-lg rounded-lg text-center hover:scale-105 transition"
            whileHover={{ scale: 1.05 }}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <h3 className="text-xl font-semibold">{tech}</h3>
          </motion.div>
        ))}
      </motion.div>

      {/* Developer */}
      <motion.h2
        className="text-3xl font-bold mb-6 text-center text-primary"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Meet the Developer
      </motion.h2>

      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-tr from-emerald-500 to-teal-500 p-6 shadow-xl rounded-xl text-center text-white">
          <img
            src="https://api.dicebear.com/6.x/avataaars/svg?seed=ramjan"
            alt="Md Ramjan Ali"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow"
          />
          <h3 className="text-xl font-bold mb-2">Md Ramjan Ali</h3>
          <p className="mb-2">Web Developer | MERN Stack Learner</p>
          <p className="text-sm mb-4 italic">
            "EduEcho is a key milestone in my full-stack journey. It demonstrates both my frontend and backend development skills — proudly built with React, Express, MongoDB, and more."
          </p>
          <a
            href="https://github.com/niloyahmadramjan"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent btn-sm"
          >
            Visit GitHub
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
