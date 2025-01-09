import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";

const MyFoodRequests = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://food-sharing-server-lemon.vercel.app/myrequests?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => setRequests(data))
                .catch((error) => console.error("Error fetching requests:", error));
        }
    }, [user?.email]);

    return (
        <div className="container mx-auto my-20">
            <h2 className="text-3xl font-bold text-center mb-8">My Food Requests</h2>
            {
                requests.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-orange-100 text-left">
                                    <th className="px-4 py-2 border border-gray-300">#</th>
                                    <th className="px-4 py-2 border border-gray-300">Food Name</th>
                                    <th className="px-4 py-2 border border-gray-300">Donor Name</th>
                                    <th className="px-4 py-2 border border-gray-300">Pickup Location</th>
                                    <th className="px-4 py-2 border border-gray-300">Expire Date</th>
                                    <th className="px-4 py-2 border border-gray-300">Request Date</th>
                                    <th className="px-4 py-2 border border-gray-300">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests.map((request, index) => (
                                    <tr key={request._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                                        <td className="px-4 py-2 border border-gray-300">{request.foodName || "N/A"}</td>
                                        <td className="px-4 py-2 border border-gray-300">{request.donatorName || "N/A"}</td>
                                        <td className="px-4 py-2 border border-gray-300">{request.pickupLocation || "N/A"}</td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {new Date(request.expiredDate).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">
                                            {new Date(request.requestDate).toLocaleDateString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300">{request.notes || "No notes"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No food requests found.</p>
                )
            }

        </div>
    );
};

export default MyFoodRequests;
