import React from 'react';

const Inquiry = () => {
  return (
    <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden m-8 w-full">
      {/* Left Side - Contact Info */}
      <div className="bg-indigo-300 text-white w-full lg:w-1/3 p-8">
        <h2 className="text-3xl font-bold mb-2">CONTACT</h2>
        <p className="text-xl mb-6">INFORMATION</p>

        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-800 p-3 rounded-full">
              <i className="fas fa-user text-white"></i>
            </div>
            <span className="text-lg font-semibold">Anubhav Maurya</span>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-indigo-800 p-3 rounded-full">
              <i className="fas fa-map-marker-alt text-white"></i>
            </div>
            <span className="text-lg font-semibold">
              Ayodhya , Uttar Pradesh, India , 224001
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-indigo-800 p-3 rounded-full">
              <i className="fas fa-phone-alt text-white"></i>
            </div>
            <span className="text-lg font-semibold">+91-9235866010</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-indigo-800 p-3 rounded-full">
              <i className="fas fa-envelope text-white"></i>
            </div>
            <span className="text-lg font-semibold">mauryaanubhav660@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/3 bg-white p-8">
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-red-600">Quick</span>{' '}
          <span className="text-blue-900 underline decoration-red-500">Enquiry</span>
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border-b-2 p-2 focus:outline-none focus:border-red-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="border-b-2 p-2 focus:outline-none focus:border-red-500"
          />
          <div className="flex space-x-2">
            <select className="border-b-2 p-2 w-1/3 focus:outline-none focus:border-red-500">
              <option>+91</option>
              <option>+1</option>
              <option>+44</option>
            </select>
            <input
              type="text"
              placeholder="Phone / Mobile"
              className="border-b-2 p-2 w-2/3 focus:outline-none focus:border-red-500"
            />
          </div>
          <select className="border-b-2 p-2 focus:outline-none focus:border-red-500">
            <option>Buy a Property</option>
            <option>Sell a Property</option>
            <option>Other</option>
          </select>
          <textarea
            placeholder="Leave a Message for us"
            className="border-b-2 p-2 col-span-1 md:col-span-2 focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="bg-blue-900 text-white py-3 px-6 rounded hover:bg-blue-700 transition w-40"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Inquiry;
