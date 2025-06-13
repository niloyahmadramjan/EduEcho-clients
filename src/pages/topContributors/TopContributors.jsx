import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";

const TopContributors = () => {
  const contributors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      expertise: "AI & Healthcare",
      articles: 127,
      followers: "12.4K",
      rating: 4.9,
      badge: "Expert",
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Michael Chen",
      expertise: "Renewable Energy",
      articles: 89,
      followers: "8.7K",
      rating: 4.8,
      badge: "Pioneer",
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      expertise: "Digital Arts",
      articles: 156,
      followers: "15.2K",
      rating: 4.9,
      badge: "Artist",
      avatar: "ER",
    },
    {
      id: 4,
      name: "Prof. David Kim",
      expertise: "Quantum Computing",
      articles: 73,
      followers: "9.1K",
      rating: 4.7,
      badge: "Researcher",
      avatar: "DK",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Top Contributors
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the experts who are shaping our knowledge community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {contributors.map((contributor) => (
            <motion.div
              key={contributor.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="h-full  border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {contributor.avatar}
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {contributor.name}
                </h3>

                <p className="text-sm text-muted-foreground mb-3">
                  {contributor.expertise}
                </p>

                <div className="inline-block px-3 py-1 border border-gray-300 text-sm rounded-full mb-4">
                  {contributor.badge}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Articles</span>
                    <span className="font-semibold">{contributor.articles}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Followers</span>
                    <span className="font-semibold">{contributor.followers}</span>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{contributor.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TopContributors;
