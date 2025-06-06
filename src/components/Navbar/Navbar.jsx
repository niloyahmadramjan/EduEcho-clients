import { Link, NavLink } from "react-router";
import {  useState } from "react";
import { FaHome, FaBookOpen, FaPlus, FaBars } from "react-icons/fa";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  // Toggle DaisyUI theme
  const handleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
          <FaHome className="inline mr-1" />Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/articles" className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
          <FaBookOpen className="inline mr-1" />Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/post" className={({ isActive }) => isActive ? "text-red-500 font-bold" : ""}>
          <FaPlus className="inline mr-1" />Post
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar fixed z-50 bg-black bg-opacity-30 backdrop-blur-md text-white w-full px-4">
      {/* Left - Logo */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-red-500">KnowNest</Link>
      </div>

      {/* Mobile Menu */}
      <div className="lg:hidden dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <FaBars />
        </label>
        <ul tabIndex={0} className="menu dropdown-content mt-3 p-2 shadow bg-base-100 text-black rounded-box w-52">
          {navItems}
          <li>
            <button onClick={handleTheme}>
              {theme === "light" ? <><MdDarkMode /> Dark</> : <><MdLightMode /> Light</>}
            </button>
          </li>
        </ul>
      </div>

      {/* Middle - Nav Items */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          {navItems}
        </ul>
      </div>

      {/* Right - Theme Toggle & Avatar */}
      <div className="flex-none gap-2 items-center">
        {/* Theme toggle */}
        <button onClick={handleTheme} className="btn btn-ghost btn-circle text-xl">
          {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
        </button>

        {/* User dropdown
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} alt="user" />
              </div>
            </div>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 text-black rounded-box w-52">
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-sm btn-primary">Login</Link>
        )} */}
      </div>
    </div>
  );
};

export default Navbar;
