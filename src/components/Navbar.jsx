import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react"
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOutUser } = useContext(AuthContext);
    const [navbarBackground, setNavbarBackground] = useState(false);
    const location = useLocation();

    const homeLocation = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setNavbarBackground(true);
            } else {
                setNavbarBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Navbar links
    const navLinks = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? "font-bold text-orange-400" : `${homeLocation ? `${navbarBackground ? "text-black" : "lg:text-white"}` : ""}`)}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/availablefoods"
                    className={({ isActive }) => (isActive ? "font-bold text-orange-400" : `${homeLocation ? `${navbarBackground ? "text-black" : "lg:text-white"}` : ""}`)}
                >
                    Available Foods
                </NavLink>
            </li>
            {
                user && (
                    <>
                        <li>
                            <NavLink
                                to="/addfood"
                                className={({ isActive }) => (isActive ? "font-bold text-orange-400" : `${homeLocation ? `${navbarBackground ? "text-black" : "lg:text-white"}` : ""}`)}
                            >
                                Add Food
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/managefood"
                                className={({ isActive }) => (isActive ? "font-bold text-orange-400" : `${homeLocation ? `${navbarBackground ? "text-black" : "lg:text-white"}` : ""}`)}
                            >
                                Manage My Foods
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/myfoodrequest"
                                className={({ isActive }) => (isActive ? "font-bold text-orange-400" : `${homeLocation ? `${navbarBackground ? "text-black" : "lg:text-white"}` : ""}`)}
                            >
                                My Food Request
                            </NavLink>
                        </li>
                    </>
                )
            }
            {
                user ? (
                    <>
                        <li className="hidden lg:flex">
                            {
                                user && <div className="relative group">
                                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar border mt-1">
                                        <img src={user.photoURL} alt="User Icon" className="rounded-full" />
                                    </label>
                                    <span
                                        className="absolute top-14 right-0 bg-white text-black px-3 py-1 rounded shadow-md text-sm hidden group-hover:block whitespace-nowrap z-10">
                                        {user.displayName}
                                    </span>
                                </div>
                            }

                        </li>
                        <li>
                            <button
                                onClick={logOutUser}
                                className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-lg px-5 border-none">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-lg px-5 border-none">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/signup"
                                className="btn max-sm:btn-sm bg-orange-400 text-white hover:bg-orange-500 font-semibold text-lg px-5 border-none">
                                Signup
                            </Link>
                        </li>
                    </>
                )
            }
        </>
    );

    return (
        // <nav className=" px-4 py-3 shadow-md">
        <nav className={`sticky top-0 w-full z-10 px-4 py-3 transition-colors duration-300 ${navbarBackground ? "bg-white shadow-lg" : "bg-white lg:bg-transparent"
            }`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Logo */}
                <Link className="flex items-center gap-2">
                    <img className="w-10 sm:w-16" src={logo} alt="FoodBuddy Logo" />
                    <p className="text-5xl sm:text-6xl font-bold text-orange-400 font-birthstone">
                        Food<span className="font-medium ">Buddy</span>
                    </p>
                </Link>

                <div className="lg:hidden flex items-center gap-4">
                    {/* user icon  */}
                    {
                        user && <div className="relative group">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar border mt-1">
                                <img src={user.photoURL} alt="User Icon" className="rounded-full" />
                            </label>
                            <span
                                className="absolute top-14 right-0 bg-white text-black px-3 py-1 rounded shadow-md text-sm hidden group-hover:block whitespace-nowrap z-10">
                                {user.displayName}
                            </span>
                        </div>
                    }

                    {/* Menubar */}
                    <button
                        // className=" md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>


                {/* Desktop Links */}
                <ul className="hidden lg:flex space-x-6 text-lg items-center font-medium">
                    {navLinks}
                </ul>
            </div>

            {/* Mobile Menu */}
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={isOpen ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={`mobile-menu lg:hidden overflow-hidden px-4 pb-1`}
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
