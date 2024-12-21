import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react"
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Navbar links
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "font-semibold text-orange-300" : "text-white")}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/available-foods"
                    className={({ isActive }) => (isActive ? "font-semibold text-orange-300" : "text-white")}
                >
                    Available Foods
                </NavLink>
            </li>
            <li>
                <Link
                    to="/login"
                    className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-base px-5">
                    Login
                </Link>
            </li>
            <li>
                <Link
                    to="/signup"
                    className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-base px-5">
                    Signup
                </Link>
            </li>
        </>
    );

    return (
        <nav className=" px-4 py-3 shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link className="flex items-center gap-2">
                    <img className="w-10 sm:w-16" src={logo} alt="" />
                    <p className="text-2xl sm:text-4xl font-bold text-orange-300">
                        Food<span className="font-medium text-white">Buddy</span>
                    </p>
                </Link>

                {/* Menubar */}
                <button
                    className="text-white md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6 text-lg items-center">
                    {navLinks}
                </ul>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mobile-menu md:hidden overflow-hidden`}
            >
                <ul className="space-y-2 mt-3">{navLinks}</ul>
            </motion.div>
        </nav>
    );
};

export default Navbar;
