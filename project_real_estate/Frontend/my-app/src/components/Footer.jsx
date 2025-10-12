import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-600 via-indigo-400 to-slate-600 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Quick Contact Section */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block pb-1 mb-4">
            Quick Contact
          </h3>
          <p className="font-bold">Property Connect</p>
          <p>Anubhav Maurya</p>
          <p>Ayodhya ,Uttar Pradesh,224001 , India</p>
          <p>📞 +91-9235866010</p>
          <p>
            📧 <a href="mailto:mauryaanubhav660@gmail.com" className="text-orange-500 hover:underline">
              mauryaanubhav660@gmail.com
            </a>
          </p>
        </div>

        {/* General Links Section */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block pb-1 mb-4">
            General Links
          </h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-orange-500">Home</a></li>
            <li><a href="/emi" className="hover:text-orange-500">EMI Calculator</a></li>
            <li><a href="/contact" className="hover:text-orange-500">Contact Us</a></li>
            <li><a href="/seller" className="hover:text-orange-500">Sell Property</a></li>
            <li><a href="/profile" className="hover:text-orange-500">Profile</a></li>
          </ul>
        </div>

        {/* Language + Visitor Section */}
        <div>
          <h3 className="text-lg font-semibold border-b-2 border-orange-500 inline-block pb-1 mb-4">
            Select Language
          </h3>
          <div className="flex space-x-3 text-2xl">
            <span role="img" aria-label="UK">🇬🇧</span>
            <span role="img" aria-label="France">🇫🇷</span>
            <span role="img" aria-label="Italy">🇮🇹</span>
            <span role="img" aria-label="Germany">🇩🇪</span>
            <span role="img" aria-label="India">🇮🇳</span>
          </div>
          <select className="mt-3 w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none">
            <option>Select Language</option>
            <option>English</option>
            <option>French</option>
            <option>German</option>
            <option>Hindi</option>
          </select>
          <p className="mt-4 font-semibold">
            Visitor No.: <span className="text-orange-500">485</span>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm inline-flex gap-10 justify-center">
        <p>All Rights Reserved. <span className="font-bold">Property Connect</span></p>
        <p>Developed & Managed By Anu....</p>
        <p>
          Member: <a href="/" className="text-orange-500 hover:underline">Real Estate India</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
