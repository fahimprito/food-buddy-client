import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

const AvailableFoods = () => {
    const [foods, setFoods] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [filteredFoods, setFilteredFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/foods?sortOrder=${sortOrder}`)
            .then((res) => res.json())
            .then((data) => {
                setFoods(data);
                setFilteredFoods(data);
            });
    }, [sortOrder]);

    //sorting handler
    const handleSort = (e) => {
        setSortOrder(e.target.value);
    };

    // Search handler
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = foods.filter((food) =>
            food.foodName.toLowerCase().includes(query)
        );
        setFilteredFoods(filtered);
    };

    return (
        <div className="container mx-auto mt-10 mb-20 px-4">
            {/* controls section */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-3xl font-bold">Available Foods</h2>
                <div className="flex gap-4">
                    {/* search */}
                    <input
                        type="text"
                        placeholder="Search foods by name"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="input input-bordered w-full max-w-xs"
                    />
                    {/* sort */}
                    <select
                        value={sortOrder}
                        onChange={handleSort}
                        className="select select-bordered max-w-xs"
                    >
                        <option value="" disabled>
                            Sort by Expiry Date
                        </option>
                        <option value="expireDateAsc">Soonest to Latest</option>
                        <option value="expireDateDesc">Latest to Soonest</option>
                    </select>
                </div>
            </div>

            {/* foods cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => (
                        <FoodCard key={food._id} food={food}></FoodCard>
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">
                        No foods match your search.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AvailableFoods;