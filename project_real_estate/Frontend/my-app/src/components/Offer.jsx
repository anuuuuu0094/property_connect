import React from "react";
import agentImg from "../assets/agent.jpeg"; 
import consultantImg from "../assets/consultant.jpeg"; 

const services = [
  {
    title: "Real Estate Agent",
    description:
      "Property Connect is a well-known Real Estate Agent in Tamil Nadu. Our one of a kind Real Estate Services are highly sought after for their in depth expertise and customer focus.",
    image: agentImg,
  },
  {
    title: "Real Estate Consultant",
    description:
      "Property Connect is a reputed real estate consultant based in Tamil Nadu. We assist the valued clients in their endeavor to buying property, selling, and investing.",
    image: consultantImg,
  },
];

export default function Offer() {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">
          <span className="text-red-500">Services</span> We Offer
        </h2>
        <div className="w-20 h-1 mx-auto mt-2 bg-red-500 rounded"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 justify-items-center">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 w-full max-w-sm"
          >
            <div className="flex justify-center mb-4">
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 object-cover rounded-full border-4 border-red-500"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 text-center mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm text-center">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
