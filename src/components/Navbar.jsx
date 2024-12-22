import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react"
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(AuthContext);

    // Navbar links
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? " text-orange-400" : "")}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/availablefoods"
                    className={({ isActive }) => (isActive ? " text-orange-400" : "")}
                >
                    Available Foods
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/addfood"
                    className={({ isActive }) => (isActive ? " text-orange-400" : "")}
                >
                    Add Food
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/managefood"
                    className={({ isActive }) => (isActive ? " text-orange-400" : "")}
                >
                    Manage My Foods
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/foodrequest"
                    className={({ isActive }) => (isActive ? " text-orange-400" : "")}
                >
                    My Food Request
                </NavLink>
            </li>
            {
                user ? (
                    <>
                        <li className="hidden md:flex">
                            {user?.displayName}

                        </li>
                        <li>
                            <button
                                // to="/login"
                                className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-lg px-5">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-lg px-5">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-lg px-5">
                                Signup
                            </Link>
                        </li>
                    </>
                )
            }
        </>
    );

    return (
        <nav className=" px-4 py-3 shadow-md">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link className="flex items-center gap-2">
                    <img className="w-10 sm:w-16" src={logo} alt="FoodBuddy Logo" />
                    <p className="text-5xl sm:text-6xl font-bold text-orange-400 font-birthstone">
                        Food<span className="font-medium ">Buddy</span>
                    </p>
                </Link>

                <div className="md:hidden flex items-center gap-4">
                    {user?.displayName}
                    {/* Menubar */}
                    <button
                        // className=" md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>


                {/* Desktop Links */}
                <ul className="hidden md:flex space-x-6 text-lg items-center font-medium">
                    {navLinks}
                </ul>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mobile-menu md:hidden overflow-hidden px-2`}
            >
                <ul
                    className="space-y-2 mt-3"
                    onClick={() => setIsOpen(false)}
                >
                    {navLinks}
                </ul>
            </motion.div>
        </nav>
    );
};

export default Navbar;
