import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaLaptopCode,
  FaAtom,
  FaPaintBrush,
  FaHeart,
  FaGlobe,
  FaBriefcase,
  FaGraduationCap,
  FaCamera,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
};

const CategoriesSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Explore Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse articles by topic and discover knowledge across diverse
            fields
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Technology */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <FaLaptopCode className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Technology
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                AI, Web Dev, Mobile Apps
              </p>
              <p className="text-2xl font-bold text-primary"> <CountUp end={2340} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Science */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <FaAtom className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Science
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Research, Physics, Biology
              </p>
              <p className="text-2xl font-bold text-primary"> <CountUp end={1890} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Arts */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <FaPaintBrush className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Arts
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Design, Music, Literature
              </p>
              <p className="text-2xl font-bold text-primary"> <CountUp end={1456} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Health */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                <FaHeart className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Health
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Wellness, Medicine, Fitness
              </p>
              <p className="text-2xl font-bold text-primary"><CountUp end={987} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Culture */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <FaGlobe className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Culture
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Society, History, Travel
              </p>
              <p className="text-2xl font-bold text-primary"><CountUp end={1234} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Business */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Business
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Entrepreneurship, Finance
              </p>
              <p className="text-2xl font-bold text-primary"><CountUp end={1567} enableScrollSpy duration={5} /> </p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
                <FaGraduationCap className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Education
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Learning, Teaching, Skills
              </p>
              <p className="text-2xl font-bold text-primary"><CountUp end={2100} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>

          {/* Photography */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer transition-all duration-300"
          >
            <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-500 to-slate-500 flex items-center justify-center">
                <FaCamera className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                Photography
              </h3>
              <p className="text-sm text-gray-500 mb-3">
                Visual Arts, Techniques
              </p>
              <p className="text-2xl font-bold text-primary"><CountUp end={789} enableScrollSpy duration={5} /></p>
              <p className="text-xs text-gray-400">articles</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
