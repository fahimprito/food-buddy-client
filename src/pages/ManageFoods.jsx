import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ManageFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/myfoods?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setMyFoods(data))
                .catch((error) => console.error("Error fetching foods:", error));
        }
    }, [user?.email]);

    //handle delete
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/foods/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                "Your food has been deleted.",
                                "success"
                            );
                            setMyFoods((prevFoods) =>
                                prevFoods.filter((food) => food._id !== id)
                            );
                        }
                    })
                    .catch((error) => {
                        Swal.fire("Error!", "Failed to delete food.", "error");
                        console.error("Delete error:", error);
                    });
            }
        });
    };

    //handle update
    const handleUpdate = (id) => {
        navigate(`/updatefood/${id}`);
    };

    return (
        <div className="container mx-auto my-20">
            <h2 className="text-3xl font-bold text-center mb-8">Manage Foods</h2>
            {myFoods.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-orange-100 text-left">
                                <th className="px-4 py-2 border border-gray-300">#</th>
                                <th className="px-4 py-2 border border-gray-300">Food Name</th>
                                <th className="px-4 py-2 border border-gray-300">Pickup Location</th>
                                <th className="px-4 py-2 border border-gray-300">Expire Date</th>
                                <th className="px-4 py-2 border border-gray-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFoods.map((food, index) => (
                                <tr key={food._id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300">{food.foodName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{food.pickupLocation}</td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        {new Date(food.expiredDate).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600"
                                            onClick={() => handleUpdate(food._id)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                            onClick={() => handleDelete(food._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No foods added yet.</p>
            )}
        </div>
    );
};

export default ManageFoods;