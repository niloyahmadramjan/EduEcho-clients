import React from "react";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";

const colors = {
  primary: "#00D3F3",
  background: "#0f172a",
  foreground: "#ffffff",
  muted: "#64748b",
};

const bannerData = [
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    title: "Share Your Knowledge, Shape the Future",
    text: "Turn your ideas into impactful stories. Inspire learners across the globe with your expertise.",
  },
  {
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    title: "Learn from Real People, Real Stories",
    text: "Discover authentic experiences and practical insights from passionate learners and professionals.",
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    title: "Connect, Discuss, and Grow",
    text: "Exchange ideas, ask questions, and build meaningful relationships with curious minds worldwide.",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Your Voice Matters",
    text: "Every article you write has the power to inspire, educate, and change someone’s journey.",
  },
  {
    image: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28",
    title: "Join the EduEcho Movement",
    text: "Be part of a vibrant community dedicated to learning, collaboration, and knowledge sharing.",
  },
];

const HeroSection = () => {
  return (
    <div className="my-2 md:my-5 overflow-hidden rounded-lg shadow-xl">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows
        showStatus={false}
        showThumbs={false}
        useKeyboardArrows
        interval={5000}
        swipeable
        emulateTouch
        transitionTime={800}
      >
        {bannerData.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[50vh] sm:h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden"
          >
            {/* Background Image with Motion Zoom */}
            <motion.img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 5, ease: "easeOut" }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/50 to-transparent"></div>

            {/* Text */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
              <motion.h2
                className="text-2xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-lg leading-tight"
                style={{ color: colors.primary }}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {item.title}
              </motion.h2>

              <motion.p
                className="mt-3 text-sm sm:text-lg md:text-xl drop-shadow-md"
                style={{
                  color: colors.foreground,
                  maxWidth: "750px",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {item.text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link
                  to="/blog"
                  className="inline-block mt-6 px-6 py-2 sm:px-8 sm:py-3 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.background,
                  }}
                >
                  Explore
                </Link>
              </motion.div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
