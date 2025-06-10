import { motion } from "framer-motion";
import CountUp from "react-countup";

const StatsSection = () => {

  return (
    <section>
      <div className="max-w-6xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We’re growing fast thanks to our amazing community.
          </p>
        </motion.div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
  <div className="bg-transparent border-transparent rounded-xl shadow-md p-6 text-center w-full">
    <h3 className="text-3xl font-bold text-primary mb-2">
      <CountUp end={10000} enableScrollSpy duration={5} />+
    </h3>
    <p className="text-muted-foreground text-lg">Articles</p>
  </div>

  <div className="bg-transparent border-transparent rounded-xl shadow-md p-6 text-center w-full">
    <h3 className="text-3xl font-bold text-primary mb-2">
      <CountUp end={5000} enableScrollSpy duration={5} />+
    </h3>
    <p className="text-muted-foreground text-lg">Contributors</p>
  </div>

  <div className="bg-transparent border-transparent rounded-xl shadow-md p-6 text-center w-full">
    <h3 className="text-3xl font-bold text-primary mb-2">
      <CountUp end={1} enableScrollSpy duration={5} />M+
    </h3>
    <p className="text-muted-foreground text-lg">Monthly Readers</p>
  </div>
</div>

      </div>
    </section>
  );
};

export default StatsSection;
