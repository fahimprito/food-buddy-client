import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram, FaFacebookF, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"

const Footer = () => {
    return (
        <div>
            <footer className="py-12 px-10">
                <div className="container mx-auto footer lg:grid-cols-3 text-lg">
                    <nav className="w-full">
                        <Link className="flex gap-2">
                            <img className="w-10 sm:w-16" src={logo} alt="FoodBuddy Logo" />
                            <p className="text-5xl sm:text-6xl font-bold text-orange-400 font-birthstone">
                                Food<span className="font-medium ">Buddy</span>
                            </p>
                        </Link>
                        <div>
                            <p className="mb-3">FoodBuddy is your go-to platform for sharing and managing food within the community. Join us to reduce food waste, connect with others, and make a difference. Let`s build a sustainable future, one meal at a time.</p>
                        </div>
                        <div className="flex justify-center space-x-4 mb-3">
                            <a
                                href="https://www.instagram.com/fahimprito/"
                                className="flex items-center justify-center w-10 h-10 rounded bg-gray-800 text-white hover:bg-pink-500 transition-colors text-xl"
                                aria-label="Instagram"
                                target="_blank"
                            >
                                <FaInstagram />
                            </a>
                            <a
                                href="https://www.facebook.com/fahimprito"
                                className="flex items-center justify-center w-10 h-10 rounded bg-gray-800 text-white hover:bg-blue-600 transition-colors text-xl"
                                aria-label="Facebook"
                                target="_blank"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="https://x.com/fahimprito?lang=en"
                                className="flex items-center justify-center w-10 h-10 rounded bg-gray-800 text-white hover:bg-gray-700 transition-colors text-xl"
                                aria-label="Twitter"
                                target="_blank"
                            >
                                <FaSquareXTwitter />
                            </a>
                            <a
                                href="https://www.pinterest.com/fahimprito/"
                                className="flex items-center justify-center w-10 h-10 rounded bg-gray-800 text-white hover:bg-red-600 transition-colors text-xl"
                                aria-label="Pinterest"
                                target="_blank"
                            >
                                <FaPinterest />
                            </a>
                        </div>
                    </nav>
                    <nav className="md:mx-auto mt-5">
                        <h6 className="footer-title text-lg text-black font-bold mb-3">Support</h6>
                        <a className="link link-hover hover:text-orange-500">Blog</a>
                        <a className="link link-hover hover:text-orange-500">About us</a>
                        <a className="link link-hover hover:text-orange-500">Terms & Condition</a>
                        <a className="link link-hover hover:text-orange-500">Privacy Policy</a>
                    </nav>
                    <nav className="w-full mt-5">
                        <h6 className="footer-title text-lg">Subscribe</h6>
                        <div className="form-control ">
                            <label className="label">
                                <span className="label-text">Subscribe for the latest updates.</span>
                            </label>
                            <div className="join">
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    className="input input-bordered join-item text-black w-full" />
                                <button
                                    className="btn bg-orange-400 hover:bg-orange-500 text-white border-none join-item">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </nav>

                </div>
                <div className="divider"></div>
                <p className="text-center">© 2024 FoodBuddy by Fahim · All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Footer;