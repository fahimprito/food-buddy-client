import { FaHandsHelping, FaRecycle, FaHeartbeat, FaUsers } from "react-icons/fa";

const WhyChooseUs = () => {
    const features = [
        {
            icon: <FaHandsHelping size={40} className="text-orange-400" />,
            title: "Empowering Communities",
            description: "We bridge the gap between donors and those in need, ensuring no food goes to waste."
        },
        {
            icon: <FaRecycle size={40} className="text-orange-400" />,
            title: "Sustainability First",
            description: "Our mission is to reduce food waste and promote a sustainable future for all."
        },
        {
            icon: <FaHeartbeat size={40} className="text-orange-400" />,
            title: "Impactful Donations",
            description: "Every donation contributes to improving lives and fighting hunger effectively."
        },
        {
            icon: <FaUsers size={40} className="text-orange-400" />,
            title: "A Trusted Network",
            description: "Join a growing community of donors, volunteers, and recipients working together."
        }
    ];

    return (
        <section className="bg-gradient-to-t from-gray-100 ...  py-16">
            <div className="container mx-auto text-center px-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
                <p className="text-gray-600 mb-12">
                    Together, we can fight hunger, reduce waste, and make a meaningful impact in our communities.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center text-center"
                        >
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
