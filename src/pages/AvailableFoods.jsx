import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/foods?sortOrder=${sortOrder}`)
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
            });
    }, [sortOrder]);

    //sorting handler
    const handleSort = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="container mx-auto mt-10 mb-20 px-4">
            {/* sorting Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Available Foods</h2>
                <select
                    value={sortOrder}
                    onChange={handleSort}
                    className="select select-bordered max-w-xs"
                >
                    <option value="" disabled>Sort by Expiry Date</option>
                    <option value="expireDateAsc">Soonest to Latest</option>
                    <option value="expireDateDesc">Latest to Soonest</option>
                </select>
            </div>

            {/* foods cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {
                    foods.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
                }
            </div>
        </div>
    );
};

export default AvailableFoods;