import { RiArrowRightSLine } from "react-icons/ri";
import { Link, useLoaderData } from "react-router-dom";


const FoodDetails = () => {
    const food = useLoaderData();
    const { _id, foodImage, foodName, foodQuantity, expiredDate, pickupLocation, status, notes, donator } = food;

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

                            className="btn bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold px-6 rounded-lg">
                            Request
                        </button>
                    </div>
                </div>

            </div>



        </div>
    );
};

export default FoodDetails;