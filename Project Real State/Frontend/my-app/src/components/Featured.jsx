import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

function Featured({ filters = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/properties", { params: filters });
      setItems(data);
    } catch (e) {
      console.error(
        "❌ Failed to fetch featured properties:",
        e.response?.data || e.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(filters)]);

  if (loading)
    return (
      <p className="text-center text-gray-200 mt-10 animate-pulse text-xl">
        Loading Featured Properties...
      </p>
    );

  return (
    <div className="mx-auto mt-12 w-full">
      <h2 className="text-3xl font-bold text-center text-white bg-gradient-to-r from-slate-200 via-indigo-400 to-slate-600 p-4 rounded-md shadow-lg">
        Featured Properties
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 }, // mobile
          768: { slidesPerView: 2 }, // tablet
          1024: { slidesPerView: 3 }, // small desktop
          1280: { slidesPerView: 4 }, // large desktop
        }}
        className="mt-8"
      >
        {items.map((property) => (
          <SwiperSlide key={property._id} className="h-full flex">
            {/* Outer container to keep scaling inside */}
            <div className="w-full h-full overflow-hidden">
              <Link
                to={`/properties/${property._id}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden
                           hover:scale-105 transform transition duration-300
                           flex flex-col h-full min-h-[400px] max-h-[420px]"
              >
                {/* Image Section */}
                <div className="relative">
                  <img
                    src={property.images?.[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                    {property.listingType?.toUpperCase() || "SALE"}
                  </span>
                </div>

                {/* Content Section */}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition line-clamp-2">
                      {property.title}
                    </h3>
                    {property.location && (
                      <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                        {property.location.address}, {property.location.city}
                      </p>
                    )}
                  </div>
                  <p className="text-indigo-600 font-bold mt-2">
                    Price: ${property.price?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Featured;
