import Lottie from "lottie-react";
import faqLottie from "../assets/lottie/faq.json"

const AccordionSection = () => {
    const faqs = [
        {
            question: "What is FoodBuddy?",
            answer: "FoodBuddy is a platform where individuals and organizations can donate excess food to help reduce waste and combat hunger in local communities.",
        },
        {
            question: "How can I donate food?",
            answer: "Simply register on our platform, list the food items you wish to donate, and select a nearby pickup or drop-off location. Our team will handle the rest.",
        },
        {
            question: "Who benefits from the donated food?",
            answer: "The donated food is distributed to shelters, food banks, and individuals in need to ensure it reaches the people who require it most.",
        },
        {
            question: "Can I volunteer with FoodBuddy?",
            answer: "Yes! You can join our team of volunteers to assist with food collection, sorting, and distribution. Visit the Volunteer section for more details.",
        },
        {
            question: "Is FoodBuddy available in my city?",
            answer: "We are expanding rapidly. Check our Locations page to see if we are active in your area or contact us to partner with us in new locations.",
        },
    ];

    return (
        <section className="bg-gray-100 py-16">
            <div className="container lg:max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                <div className="grid grid-cols-2 items-center">
                    <div className="space-y-4 max-md:col-span-2">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="collapse collapse-plus bg-base-200"
                            >
                                <input
                                    type="radio"
                                    name="faq-accordion"
                                    defaultChecked={index === 0}
                                    className="peer"
                                />
                                <div className="collapse-title text-xl font-medium peer-checked:bg-orange-100">
                                    {faq.question}
                                </div>
                                <div className="collapse-content peer-checked:bg-orange-100">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-md:hidden">
                        <div className="mx-auto w-2/3 mt-10">
                            <Lottie animationData={faqLottie} loop={true} />
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default AccordionSection;
