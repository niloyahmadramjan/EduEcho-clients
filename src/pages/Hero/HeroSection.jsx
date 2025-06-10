import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/10 py-20 px-4 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-40 right-20 w-32 h-32 bg-accent rounded-full blur-xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-20 left-1/3 w-24 h-24 bg-secondary rounded-full blur-xl"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Share Your Knowledge
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Discover insights, share expertise, and connect with a community of knowledge seekers.
          Your ideas can inspire and educate millions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-3 text-lg rounded-md bg-primary cursor-pointer text-white hover:bg-primary/90 transition">
            Explore Articles
          </button>
          <button className="px-8 py-3 text-lg rounded-md border border-border cursor-pointer text-foreground hover:bg-accent/10 transition">
            Start Writing
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
