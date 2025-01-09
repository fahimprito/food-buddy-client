import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FoodCard from "./FoodCard";

const FeaturedFoods = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://food-sharing-server-lemon.vercel.app/featuredfoods")
            .then((res) => res.json())
            .then((data) => setFeaturedFoods(data))
            .catch((error) => console.error("Error fetching featured foods:", error));
    }, []);

    const handleSeeAllFoods = () => {
        navigate("/availablefoods");
    };

    return (
        <div>
            <div className="container mx-auto px-4 py-10">
                <h2 className="text-4xl font-bold text-center mb-10">Featured Foods</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-10">
                    {featuredFoods.map((food) => (
                        <FoodCard key={food._id} food={food}></FoodCard>
                    ))}
                </div>
                <div className="text-center mt-10">
                    <button
                        onClick={handleSeeAllFoods}
                        className="btn text-lg font-semibold text-white bg-orange-400 hover:bg-orange-500 rounded-md"
                    >
                        See All Foods
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedFoods;