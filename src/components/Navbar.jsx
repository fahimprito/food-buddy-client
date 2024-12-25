import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "motion/react"
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png"
import AuthContext from "../contexts/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOutUser } = useContext(AuthContext);

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
                    to="/myfoodrequest"
                    className={({ isActive }) => (isActive ? " text-orange-400" : "")}
                >
                    My Food Request
                </NavLink>
            </li>
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
