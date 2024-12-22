import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import signupAnimation from "../assets/lottie/loginLotti.json"
import Lottie from "lottie-react";


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = e => {
        e.preventDefault();
    }

    return (
        <div className="max-w-7xl mx-auto my-10 grid md:grid-cols-2">

            <div className="max-md:px-4">
                <div className="md:w-5/6 md:mx-auto px-6 border rounded-xl py-8">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Sign up</h2>
                    <div className="divider"></div>

                    <form onSubmit={handleSignup}>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Your Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter your name" className="input rounded-md bg-base-200" required />

                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Photo URL" className="input rounded-md bg-base-200" required />
                        </div>
                        <div className="form-control mt-4">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Email address</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email address" className="input rounded-md bg-base-200" required />
                        </div>
                        <div className="form-control mt-4 relative">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="input rounded-md bg-base-200"
                                required />
                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                type="button"
                                className="btn btn-xs bg-transparent border-none hover:bg-transparent text-base absolute right-2 top-14 ">
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                        {/* {error && (
                        <label className="label text-sm text-red-600">
                            {error}
                        </label>
                    )} */}

                        <div className="form-control mt-8">
                            <button className="btn bg-orange-400 hover:bg-orange-500 text-white text-lg rounded-md">
                                Register
                            </button>
                        </div>

                    </form>

                    <p className="text-center mt-4">Already have an account? <Link
                        className="text-orange-500 font-semibold link-hover" to="/login">
                        Login
                    </Link></p>
                    <div className="divider">OR</div>
                    <button
                        // onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full text-blue-500 hover:bg-sky-900 font-semibold text-lg rounded-full">
                        <span className="text-2xl">
                            <FcGoogle></FcGoogle>
                        </span>
                        Continue with Google
                    </button>

                </div>
            </div>
            <div className="max-md:hidden">
                <div className="">
                    <Lottie animationData={signupAnimation} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Signup;