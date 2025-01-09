import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../contexts/AuthContext";

const ManageFoods = () => {
    const { user } = useContext(AuthContext);
    const [myFoods, setMyFoods] = useState([]);
    const [foodToUpdate, setFoodToUpdate] = useState(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://food-sharing-server-lemon.vercel.app/myfoods?email=${user.email}`)
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
                fetch(`https://food-sharing-server-lemon.vercel.app/foods/${id}`, {
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

    const handleOpenModal = (food) => {
        setFoodToUpdate(food);
        document.getElementById("update_modal").showModal();
    };

    const handleCloseModal = () => {
        document.getElementById("update_modal").close();
        setFoodToUpdate(null);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedFood = {
            foodName: e.target.foodName.value,
            foodImage: e.target.foodImage.value,
            foodQuantity: e.target.foodQuantity.value,
            expiredDate: e.target.expiredDate.value,
            pickupLocation: e.target.pickupLocation.value,
            status: e.target.status.value,
            notes: e.target.notes.value,
        };

        fetch(`https://food-sharing-server-lemon.vercel.app/foods/${foodToUpdate._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFood),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Food Updated!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // Close the modal and update the food list
                    handleCloseModal();
                    setMyFoods((prevFoods) =>
                        prevFoods.map((food) =>
                            food._id === foodToUpdate._id ? { ...food, ...updatedFood } : food
                        )
                    );
                }
            })
            .catch((error) => {
                Swal.fire("Error!", "Failed to update food.", "error");
                console.error("Update error:", error);
            });
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
                                            onClick={() => handleOpenModal(food)}
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
                <p className="min-h-screen text-center text-gray-500">No foods added yet.</p>
            )}


            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                {foodToUpdate && (
                    <form onSubmit={handleUpdate} className="modal-box">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
                            onClick={handleCloseModal}
                        >
                            ✕
                        </button>
                        <h3 className="text-lg font-bold mb-4">Update Food</h3>
                        <div className="mb-4">
                            <label className="label">Food Name</label>
                            <input
                                type="text"
                                name="foodName"
                                defaultValue={foodToUpdate.foodName}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">Food Image</label>
                            <input
                                type="url"
                                name="foodImage"
                                defaultValue={foodToUpdate.foodImage}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">Food Quantity</label>
                            <input
                                type="number"
                                name="foodQuantity"
                                defaultValue={foodToUpdate.foodQuantity}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">Expired Date</label>
                            <input
                                type="date"
                                name="expiredDate"
                                defaultValue={foodToUpdate.expiredDate.split("T")[0]}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">Pickup Location</label>
                            <input
                                type="text"
                                name="pickupLocation"
                                defaultValue={foodToUpdate.pickupLocation}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="label">Status</label>
                            <select
                                name="status"
                                defaultValue={foodToUpdate.status}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                                <option value="requested">Requested</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="label">Additional Notes</label>
                            <textarea
                                name="notes"
                                defaultValue={foodToUpdate.notes || ""}
                                className="textarea textarea-bordered w-full"
                                rows="3"
                                placeholder="Add any notes about the food"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn bg-orange-400 text-white text-lg hover:bg-orange-500 w-full">
                            Update Food
                        </button>
                    </form>
                )}
            </dialog>
        </div>
    );
};

export default ManageFoods;