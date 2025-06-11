import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const NewsletterSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-background to-accent/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center"
            >
              <Mail className="w-8 h-8 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Stay Updated
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Get the latest articles, insights, and knowledge delivered
              straight to your inbox. Join our community of lifelong learners.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 h-12 px-4 rounded-md border border-input bg-background text-lg text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="h-12 px-6 flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-primary/90 transition">
              <Send className="w-4 h-4" />
              Subscribe
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-sm text-muted-foreground mt-4"
          >
            No spam, unsubscribe at any time. We respect your privacy.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
