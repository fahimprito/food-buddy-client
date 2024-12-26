import { Link } from "react-router-dom";
import bannerBg from "../assets/banner.jpg"

const Banner = () => {
    return (
        <div className="relative w-full h-[500px] bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerBg})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Welcome to FoodBuddy
                </h1>
                <p className="text-lg md:text-2xl text-gray-300 mt-4">
                    Share your food, save lives, and reduce waste!
                </p>
                <Link to={'/availablefoods'}>
                    <button
                        className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-md">
                        Explore Now
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Banner;
