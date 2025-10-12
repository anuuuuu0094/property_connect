import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Favorites() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const load = async () => {
    try {
      const { data } = await api.get("/favorites");
      setItems(data);
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (propertyId) => {
    try {
      await api.delete(`/favorites/${propertyId}`);
      load();
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-slate-300 via-indigo-300 to-slate-300 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">My Favorites</h2>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((f) => {
            // Use the first image from the array
            const imageUrl =
              f.property?.images && f.property.images.length > 0
                ? f.property.images[0]
                : "/placeholder.jpg";

            return (
              <div
                key={f._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition cursor-pointer transform hover:scale-105"
                onClick={() => navigate(`/properties/${f.property?._id}`)}
              >
                <img
                  src={imageUrl}
                  alt={f.property?.title || "Property Image"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-purple-800">
                    {f.property?.title || "Untitled Property"}
                  </h3>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    ${f.property?.price?.toLocaleString() || "N/A"}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // prevent card click
                      remove(f.property?._id);
                    }}
                    className="mt-3 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
