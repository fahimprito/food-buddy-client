import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import errorAnimation from "../assets/lottie/404.json"

const ErrorPage = () => {

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div>

            <div className="bg-base-200 flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="mx-auto w-2/3">
                        <Lottie animationData={errorAnimation} loop={true} />
                    </div>
                    <p className="text-3xl text-[#403F3F] mt-4">Oops! Page not found.</p>
                    <p className="text-[#403F3F] mt-2 max-sm:p-6">
                        The page you’re looking for doesn’t exist. It might have been moved or deleted.
                    </p>
                    <button
                        onClick={handleBackToHome}
                        className="btn lg:btn-lg bg-orange-400 hover:bg-orange-500 text-white font-semibold lg:text-2xl mt-6 rounded-xl">
                        Back to Home
                    </button>

                </div>
            </div>

        </div>
    );
};

export default ErrorPage;