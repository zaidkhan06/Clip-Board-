import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-white shadow-[0_4px_25px_rgba(102,116,204,0.6)] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex items-center space-x-1 font-bold text-lg">
            <span className="text-[#6674CC]">Clip</span>
            <span className="text-white">Board+</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `hover:text-[#6674CC] transition ${
                  isActive ? "text-[#6674CC] font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `hover:text-[#6674CC] transition ${
                  isActive ? "text-[#6674CC] font-semibold" : ""
                }`
              }
            >
              Pastes
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden  overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-2">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 hover:text-[#6674CC] transition ${
                    isActive ? "text-[#6674CC] font-semibold" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/pastes"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-2 hover:text-[#6674CC] transition ${
                    isActive ? "text-[#6674CC] font-semibold" : ""
                  }`
                }
              >
                Pastes
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
