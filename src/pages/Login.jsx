import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginAnimation from "../assets/lottie/loginLottie.json"
import AuthContext from "../contexts/AuthContext";


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser, loginWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const location = useLocation();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });

        loginUser(email, password)
            .then(() => {
                e.target.reset();
                navigate(location.state ? location.state : '/');
            })
            .catch(err => {
                setError({ ...error, login: err.message });
            })
    }

    const handleGoogleSignIn = () => {
        loginWithGoogle()
            .then(() => {
                navigate(location.state ? location.state : '/');
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div className="max-w-7xl mx-auto my-10 grid md:grid-cols-2">

            <div className="max-md:hidden">
                <div className="mx-auto w-2/3 mt-10">
                    <Lottie animationData={loginAnimation} loop={true} />
                </div>
            </div>

            <div className="max-md:px-4">
                <div className="md:w-2/3 md:mx-auto px-6 border rounded-xl py-8">
                    <h2 className="text-3xl font-semibold mb-4 text-center">Login</h2>
                    <div className="divider"></div>

                    <form onSubmit={handleLogin}>
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

                        <label
                            className="label mt-1">
                            <Link
                                // to={"/resetpassword"}
                                className="text-gray-600 text-sm font-medium link-hover">
                                Forgot password?</Link>
                        </label>

                        {error && (
                            <label className="label text-sm text-red-600">
                                {error.login}
                            </label>
                        )}

                        <div className="form-control mt-8">
                            <button className="btn bg-orange-400 hover:bg-orange-500 text-white text-lg rounded-md">
                                Login
                            </button>
                        </div>

                    </form>

                    <p className="text-center mt-4">Do not have an account? <Link
                        className="text-orange-500 font-semibold link-hover" to="/signup">
                        Create an account
                    </Link></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={handleGoogleSignIn}
                        className="btn btn-outline w-full text-blue-500 hover:bg-sky-900 font-semibold text-lg rounded-full">
                        <span className="text-2xl">
                            <FcGoogle></FcGoogle>
                        </span>
                        Continue with Google
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Login;