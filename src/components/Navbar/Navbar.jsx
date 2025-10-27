import { Link, NavLink } from "react-router";
import { useState,  } from "react";
import { FaHome, FaBookOpen, FaPlus, FaBars, FaTachometerAlt } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import { FcAbout } from "react-icons/fc";
import AuthUser from "../../services/Hook/AuthUser";
import avator from "../../assets/icons/profile.png";
import Swal from "sweetalert2";
import useAdmin from "../../hook/useAdmin";

const Navbar = () => {
  const { user, handleUserSignOut, loading } = AuthUser();
  const [imgSrc, setImgSrc] = useState(user?.photoURL || avator);
  const [theme, setTheme] = useState("light");
  const [isAdmin, adminLoading] = useAdmin(); 

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome />, delay: 0.2 },
    {
      to: "/featuredArticles",
      label: "All Articles",
      icon: <FaBookOpen />,
      delay: 0.3,
    },
    ...(user
      ? [
          {
            to: "/myArticles",
            label: "My Articles",
            icon: <FaBookOpen />,
            delay: 0.4,
          },
          {
            to: "/postArticle",
            label: "Post Article",
            icon: <FaPlus />,
            delay: 0.5,
          },
          // Add Admin Dashboard link if user is admin
          ...(isAdmin ? [{
            to: "/admin",
            label: "Admin Dashboard",
            icon: <FaTachometerAlt />,
            delay: 0.55,
          }] : [])
        ]
      : []),
    { to: "/aboutUs", label: "About Us", icon: <FcAbout />, delay: 0.6 },
  ];

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
          title: "LogOut successful!",
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
    <div className="fixed top-0 left-0 z-50 w-full bg-opacity-90 backdrop-blur-md text-base-content shadow transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
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
            <div className="lg:hidden dropdown dropdown-bottom">
              <label tabIndex={0} className="btn btn-ghost">
                <FaBars />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content dropdown-start mt-3 p-2 shadow bg-base-100 dark:bg-[#112240] text-white rounded-box w-52 z-50 transition-colors duration-300"
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
            <Link
              to="/"
              className="md:text-2xl text-xl uppercase font-bold text-cyan-400"
            >
              EduEcho
            </Link>
          </motion.div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex">
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
                        ? "text-cyan-400 font-bold bg-base-300 bg-opacity-20 rounded-lg"
                        : "hover:text-cyan-300 hover:bg-base-300 hover:bg-opacity-10 rounded-lg transition-colors duration-200"
                    }
                  >
                    {icon} <span className="ml-1">{label}</span>
                  </NavLink>
                </motion.li>
              ))}

              {loading || adminLoading ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : user?.email ? (
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
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow border border-base-300"
                  >
                    <li>
                      <Link to="/myArticles" className="justify-between">
                        My Articles
                      </Link>
                    </li>
                    <li>
                      <Link to="/postArticle">
                        Post Article
                      </Link>
                    </li>
                    {/* Add Admin Dashboard to dropdown if user is admin */}
                    {isAdmin && (
                      <li>
                        <Link to="/admin">
                          {/* <FaTachometerAlt className="inline mr-2" /> */}
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-error hover:bg-error hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                    <li className="border-t border-base-300 mt-2 pt-2">
                      <a className="text-sm text-base-content/70 cursor-default">
                        {user.email}
                      </a>
                      {isAdmin && (
                        <span className="badge badge-primary badge-sm ml-2">Admin</span>
                      )}
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary">
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
            <div className="md:hidden">
              {loading || adminLoading ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : user?.email ? (
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
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow border border-base-300"
                  >
                    <li>
                      <Link to="/myArticles" className="justify-between">
                        My Articles
                      </Link>
                    </li>
                    <li>
                      <Link to="/postArticle">
                        Post Article
                      </Link>
                    </li>
                    {/* Add Admin Dashboard to mobile dropdown if user is admin */}
                    {isAdmin && (
                      <li>
                        <Link to="/admin" >
                          {/* <FaTachometerAlt className="inline mr-2" /> */}
                          Admin Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="text-error hover:bg-error hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                    <li className="border-t border-base-300 mt-2 pt-2">
                      <a className="text-sm text-base-content/70 cursor-default">
                        {user.email}
                      </a>
                      {isAdmin && (
                        <span className="badge badge-primary badge-sm ml-2">Admin</span>
                      )}
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Navbar;