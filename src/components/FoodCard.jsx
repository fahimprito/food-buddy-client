import PropTypes from "prop-types";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";


const FoodCard = ({ food }) => {
    const { _id, foodImage, foodName, foodQuantity, expiredDate, pickupLocation } = food;

    return (
        <div key={_id} className="rounded-t-xl bg-white border border-b-white p-1 pb-3">
            <img
                src={foodImage}
                alt={foodName}
                className="mx-auto w-full rounded-t-xl h-52 object-cover"
            />
            <div className="p-2">
                <h3 className="font-bold text-2xl items-center mb-1">{foodName}</h3>
                <p className="text-gray-700 mb-1">Quantity: {foodQuantity}</p>
                <p className="text-gray-700 mb-1">
                    Expiry Date: {new Date(expiredDate).toLocaleDateString('en-GB')}
                </p>
                <p className="text-gray-700 mb-2">Location: {pickupLocation}</p>
                <Link
                    to={`/food/${_id}`}
                    className="btn btn-sm px-2 bg-[#403F3F] hover:bg-orange-400 text-white hover:text-black font-semibold text-base hover:underline underline-offset-2 decoration-1 decoration-black"
                >
                    View Details <MdKeyboardDoubleArrowRight />
                </Link>
            </div>
        </div>
    );
};

FoodCard.propTypes = {
    food: PropTypes.object,
};

export default FoodCard;