import { Link, NavLink } from "react-router";
import { useState } from "react";
import { FaHome, FaBookOpen, FaPlus, FaBars } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { FcAbout } from "react-icons/fc";
import AuthUser from "../../services/Hook/AuthUser";
import avator from "../../assets/icons/profile.png";
import Swal from "sweetalert2";

const navLinks = [
  { to: "/", label: "Home", icon: <FaHome />, delay: 0.2 },
  {
    to: "/allArticles",
    label: "All Articles",
    icon: <FaBookOpen />,
    delay: 0.3,
  },
  { to: "/myArticles", label: "My Articles", icon: <FaBookOpen />, delay: 0.4 },
  { to: "/postArticle", label: "Post Article", icon: <FaPlus />, delay: 0.5 },
  { to: "/aboutUs", label: "About Us", icon: <FcAbout />, delay: 0.6 },
];

const Navbar = () => {
  const { user, handleUserSignOut } = AuthUser();
  const [imgSrc, setImgSrc] = useState(user?.photoURL || avator);
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleSignOut = () => {
    handleUserSignOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "LogOut successfull !",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full dark:bg-[#0D1B2A] bg-opacity-90 backdrop-blur-md text-white shadow transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 70 }}
          className="navbar py-3"
        >
          {/* Logo */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              to="/"
              className="md:text-2xl text-xl uppercase font-bold text-cyan-400"
            >
              EduEcho
            </Link>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-3">
              {navLinks.map(({ to, label, icon, delay }) => (
                <motion.li
                  key={to}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay }}
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      isActive
                        ? "text-cyan-400 font-bold"
                        : "hover:text-cyan-300"
                    }
                  >
                    {icon} <span className="ml-1">{label}</span>
                  </NavLink>
                </motion.li>
              ))}

              {user?.email ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Profile"
                        src={user?.photoURL || imgSrc}
                        onError={() => setImgSrc(avator)}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-accent-content rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between text-black dark:text-white">
                        My Articles
                      </a>
                    </li>
                    <li>
                      <a className="text-black dark:text-white transition-colors duration-300">
                        Post Article
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-black dark:text-white transition-colors duration-300"
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <a className="text-black dark:text-white transition-colors duration-300">
                        {user.email}
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary ">
                  Login
                </Link>
              )}
            </ul>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTheme}
              className="btn btn-ghost btn-circle text-xl"
            >
              {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
            </button>

            <div className="lg:hidden dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                <FaBars />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-2 shadow bg-base-100 dark:bg-[#112240] text-white rounded-box w-52 z-50 transition-colors duration-300"
              >
                {navLinks.map(({ to, label, icon }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive
                          ? "text-cyan-400 font-bold"
                          : "hover:text-cyan-300"
                      }
                    >
                      {icon} <span className="ml-1">{label}</span>
                    </NavLink>
                  </li>
                ))}
                <li>
                  <button onClick={handleTheme}>
                    {theme === "light" ? (
                      <>
                        <MdDarkMode /> Dark
                      </>
                    ) : (
                      <>
                        <MdLightMode /> Light
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;
