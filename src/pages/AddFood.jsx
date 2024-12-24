import { useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import addfoodbg from "../assets/addfoodbg.jpg"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        foodName: "",
        foodImage: "",
        foodQuantity: 1,
        pickupLocation: "",
        expiredDate: "",
        notes: "",
        status: "available",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //add logged in user data
        const donator = {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
        }
        const newFood = { ...formData, donator };
        // console.log(newFood);

        fetch('http://localhost:5000/foods', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newFood)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Food Has been added.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/availablefoods')
                }

            })


    };

    return (
        <div
            className=" flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url(${addfoodbg})`,
            }}
        >
            <div className="bg-white bg-opacity-90 p-6 my-20 mx-4 rounded-lg shadow-lg max-w-xl w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Add Food</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 form-control">
                        <label className="label">
                            <span className="label-text font-medium text-base">Food Name</span>
                        </label>
                        <input
                            type="text"
                            name="foodName"
                            id="foodName"
                            value={formData.foodName}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium text-base">Food Image URL</span>
                        </label>
                        <input
                            type="url"
                            name="foodImage"
                            id="foodImage"
                            value={formData.foodImage}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium text-base">Food Quantity</span>
                        </label>
                        <input
                            type="number"
                            name="foodQuantity"
                            id="foodQuantity"
                            value={formData.foodQuantity}
                            onChange={handleChange}
                            required
                            min="1"
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium text-base">Pickup Location</span>
                        </label>
                        <input
                            type="text"
                            name="pickupLocation"
                            id="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium text-base">Expired Date</span>
                        </label>
                        <input
                            type="date"
                            name="expiredDate"
                            id="expiredDate"
                            value={formData.expiredDate}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="label">
                            <span className="label-text font-medium text-base">Additional Notes</span>
                        </label>
                        <textarea
                            name="notes"
                            id="notes"
                            value={formData.notes}
                            onChange={handleChange}
                            rows="3"
                            className="textarea textarea-bordered text-base w-full"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn bg-orange-400 text-white text-lg hover:bg-orange-500 w-full"
                    >
                        Add Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFood;
