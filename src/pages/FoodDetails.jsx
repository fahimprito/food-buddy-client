import { useContext } from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useLoaderData } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Swal from "sweetalert2";


const FoodDetails = () => {
    const food = useLoaderData();
    const { user } = useContext(AuthContext);

    const { _id, foodImage, foodName, foodQuantity, expiredDate, pickupLocation, status, notes, donator } = food;

    const handleOpenModal = () => {
        document.getElementById('purchase_modal').showModal();
    }

    const handleRequest = (e) => {
        e.preventDefault();

        const requestData = {
            foodId: _id,
            foodName: foodName,
            foodImage: foodImage,
            donatorEmail: donator.email,
            donatorName: donator.name,
            userEmail: user.email,
            requestDate: new Date().toISOString(),
            pickupLocation: pickupLocation,
            expiredDate: expiredDate,
            notes: e.target.notes.value,
        };

        // console.log(requestData);

        fetch("http://localhost:5000/requests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Food Request Submitted!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    document.getElementById("purchase_modal").close()
                    
                }
            });

        
    }

    return (
        <div className="container mx-auto space-y-4 m-10 mb-20 px-4">
            <p className="font-semibold text-gray-500 flex items-center md:text-lg mb-4"><Link to={`/`} className="hover:underline">Home</Link> <RiArrowRightSLine /> <Link to={`/availablefoods`} className="hover:underline">Available Foods</Link><RiArrowRightSLine /> <Link className="hover:underline">Foods details</Link></p>
            <h5 className="text-3xl md:text-5xl font-bold title-font md:w-2/3">{foodName}</h5>
            <p className="text-xl font-medium text-gray-500 pb-10">{notes}</p>

            <div className=" bg-white grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-2">
                    <img className="w-full mb-2" src={foodImage} alt="" />
                </div>


                <div className="flex flex-col gap-2">
                    <div className="mb-2">
                        <p
                            className="badge text-gray-600 text-base bg-gray-100 p-4 px-3">
                            {_id}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                        <h3 className="text-lg font-semibold">Availability Status:</h3>
                        {
                            status ?
                                <p className="badge text-[#23BE0A] text-base bg-[#22be0a11] p-3 col-span-2">
                                    Available
                                </p> : <p className="badge text-red-500 text-base bg-[#be160a11] p-3 col-span-2">
                                    unavailable
                                </p>
                        }
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                        <h3 className="text-lg font-semibold">Food Quantity:</h3>
                        <p className="text-lg font-medium text-gray-500 col-span-2">
                            {foodQuantity}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                        <h3 className="text-lg font-semibold">Expired Date:</h3>
                        <p className="text-lg font-medium text-gray-500 col-span-2">
                            {new Date(expiredDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                        <h3 className="text-lg font-semibold">Pickup Location:</h3>
                        <p className="text-lg font-medium text-gray-500 col-span-2">
                            {pickupLocation}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 items-center">
                        <h3 className="text-lg font-semibold">Donator Name:</h3>
                        <p className="text-lg font-medium text-gray-500 col-span-2">
                            {donator.name}
                        </p>
                    </div>

                    <div className="flex mt-2">
                        <button
                            onClick={handleOpenModal}
                            className="btn bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold px-6 rounded-lg">
                            Request
                        </button>
                    </div>
                </div>

            </div>


            {/* modal */}
            <div>
                <dialog id="purchase_modal" className="modal sm:modal-middle">
                    <div className="modal-box flex flex-col items-center">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-xl text-red-900"
                            onClick={() => document.getElementById("purchase_modal").close()}
                        >
                            ✕
                        </button>
                        <h3 className="text-2xl text-center font-bold mb-4">Request Food</h3>
                        <form onSubmit={handleRequest} className="w-full max-w-md">
                            {/* Food ID */}
                            <div className="mb-4">
                                <label className="label font-medium">Food ID</label>
                                <input
                                    type="text"
                                    value={_id || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Food Name */}
                            <div className="mb-4">
                                <label className="label font-medium">Food Name</label>
                                <input
                                    type="text"
                                    value={foodName || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Food Image */}
                            <div className="mb-4">
                                <label className="label font-medium">Food Image</label>
                                <input
                                    type="text"
                                    value={foodImage || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Expire Date */}
                            <div className="mb-4">
                                <label className="label font-medium">Expire Date</label>
                                <input
                                    type="text"
                                    value={new Date(expiredDate).toLocaleDateString("en-GB") || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Pickup Location */}
                            <div className="mb-4">
                                <label className="label font-medium">Pickup Location</label>
                                <input
                                    type="text"
                                    value={pickupLocation || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Donator Email */}
                            <div className="mb-4">
                                <label className="label font-medium">Donator Email</label>
                                <input
                                    type="text"
                                    value={donator?.email || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Donator Name */}
                            <div className="mb-4">
                                <label className="label font-medium">Donator Name</label>
                                <input
                                    type="text"
                                    value={donator?.name || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* User Email */}
                            <div className="mb-4">
                                <label className="label font-medium">User Email</label>
                                <input
                                    type="text"
                                    value={user?.email || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Request Date */}
                            <div className="mb-4">
                                <label className="label font-medium">Request Date</label>
                                <input
                                    type="text"
                                    value={new Date().toLocaleString() || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Additional Notes */}
                            <div className="mb-4">
                                <label className="label font-medium">Additional Notes</label>
                                <textarea
                                    name="notes"
                                    rows="3"
                                    className="textarea textarea-bordered w-full text-lg"
                                    placeholder="Enter any additional notes..."
                                ></textarea>
                            </div>
                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="btn bg-orange-400 text-white text-lg hover:bg-orange-500 w-full"
                            >
                                Request Food
                            </button>
                        </form>
                    </div>
                </dialog>
            </div>


        </div>
    );
};

export default FoodDetails;