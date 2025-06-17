import { motion } from "framer-motion";
import { Link } from "react-router";
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

// Category Data Array
const categories = [
  {
    name: "Technology",
    description: "AI, Web Dev, Mobile Apps",
    count: 2340,
    icon: <FaLaptopCode className="text-white text-2xl" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Science",
    description: "Research, Physics, Biology",
    count: 1890,
    icon: <FaAtom className="text-white text-2xl" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Arts",
    description: "Design, Music, Literature",
    count: 1456,
    icon: <FaPaintBrush className="text-white text-2xl" />,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Health",
    description: "Wellness, Medicine, Fitness",
    count: 987,
    icon: <FaHeart className="text-white text-2xl" />,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Culture",
    description: "Society, History, Travel",
    count: 1234,
    icon: <FaGlobe className="text-white text-2xl" />,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Business",
    description: "Entrepreneurship, Finance",
    count: 1567,
    icon: <FaBriefcase className="text-white text-2xl" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    name: "Education",
    description: "Learning, Teaching, Skills",
    count: 2100,
    icon: <FaGraduationCap className="text-white text-2xl" />,
    color: "from-teal-500 to-blue-500",
  },
  {
    name: "Photography",
    description: "Visual Arts, Techniques",
    count: 789,
    icon: <FaCamera className="text-white text-2xl" />,
    color: "from-gray-500 to-slate-500",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/categoryArticle/${category.name}`}
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="cursor-pointer transition-all duration-300"
              >
                <div className="bg-transparent rounded-xl shadow-md hover:shadow-xl transition p-6 text-center h-full border border-transparent">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 text-primary">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {category.description}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    <CountUp
                      end={category.count}
                      enableScrollSpy
                      duration={5}
                    />
                  </p>
                  <p className="text-xs text-gray-400">articles</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
