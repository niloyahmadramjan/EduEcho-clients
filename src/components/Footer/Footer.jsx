import { FaHome, FaBookOpen, FaPlus, FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { FcAbout } from "react-icons/fc";
import { NavLink } from "react-router";

const Footer = () => {
  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome />, delay: 0.2 },
    { to: "/allArticles", label: "All Articles", icon: <FaBookOpen />, delay: 0.3 },
    { to: "/myArticles", label: "My Articles", icon: <FaBookOpen />, delay: 0.4 },
    { to: "/postArticle", label: "Post Article", icon: <FaPlus />, delay: 0.5 },
    { to: "/aboutUs", label: "About Us", icon: <FcAbout />, delay: 0.6 }
  ];

  return (
    <footer className="bg-[#0D1B2A] text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

        <div>
          <h1 className="text-2xl font-bold text-cyan-400 mb-2">EDU-ECHO</h1>
          <p className="text-sm text-gray-400">A platform to share and explore knowledge.</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            {navLinks.map(({ to, label, icon, delay }) => (
              <motion.li
                key={to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay }}
              >
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    isActive ? "text-cyan-400 font-bold" : "hover:text-cyan-300"
                  }
                >
                  <span className="inline-flex items-center gap-1">
                    {icon} {label}
                  </span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-cyan-300 transition" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" className="hover:text-cyan-300 transition" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" className="hover:text-cyan-300 transition" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" className="hover:text-cyan-300 transition" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" className="hover:text-cyan-300 transition" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-gray-700 pt-5 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} EDU-ECHO. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
