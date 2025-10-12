
import { useEffect, useState } from "react";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function SellerDashboard() {
  const { user } = useAuth();
  const [mine, setMine] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    propertyName: "house",
    listingType: "sale",
    location: { address: "", city: "", state: "", country: "" },
    details: { bedrooms: 1, bathrooms: 1, area: 500, yearBuilt: "", amenities: [] },
    images: [""],
  });
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const { data } = await api.get("/properties");
      const onlyMine = data.filter((p) => p?.owner?._id === user?._id);
      setMine(onlyMine);
    } catch (err) {
      console.error("Failed to load properties:", err.response?.data || err.message);
      setError("Failed to load properties.");
    }
  };

  useEffect(() => {
    if (user?._id) load();
  }, [user?._id]);

  const create = async () => {
    try {
      const payload = { ...form, price: Number(form.price) };
      await api.post("/properties", payload);
      setForm({
        ...form,
        title: "",
        description: "",
        price: "",
        images: [""],
      });
      load();
    } catch (err) {
      console.error("Create property failed:", err.response?.data || err.message);
      setError("Failed to create property. Please check your inputs.");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/properties/${id}`);
      load();
    } catch (err) {
      console.error("Delete property failed:", err.response?.data || err.message);
      setError("Failed to delete property.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-500 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-slate-500 via-indigo-400 to-slate-600 bg-clip-text text-transparent mb-8">
          Seller / Agent Dashboard
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-800 border border-red-300 shadow">
            {error}
          </div>
        )}

        {/* Create Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-purple-200">
          <h4 className="text-xl font-bold mb-4 text-purple-700">
            ✨ Create New Property
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="w-full border border-pink-300 rounded-md p-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="w-full border border-indigo-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <textarea
              className="w-full border border-purple-300 rounded-md p-2 col-span-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <select
              className="w-full border border-pink-300 rounded-md p-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              value={form.propertyName}
              onChange={(e) => setForm({ ...form, propertyName: e.target.value })}
            >
              <option value="house">🏡 House</option>
              <option value="apartment">🏢 Apartment</option>
              <option value="townhouse">🏘️ Townhouse</option>
              <option value="land">🌱 Land</option>
            </select>

            <select
              className="w-full border border-indigo-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              value={form.listingType}
              onChange={(e) => setForm({ ...form, listingType: e.target.value })}
            >
              <option value="sale">💰 Sale</option>
              <option value="rent">📅 Rent</option>
            </select>
          </div>

          {/* Location */}
          <h5 className="mt-6 mb-2 font-semibold text-indigo-700">📍 Location</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["address", "city", "state", "country"].map((field) => (
              <input
                key={field}
                className="border border-purple-200 rounded-md p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={form.location[field]}
                onChange={(e) =>
                  setForm({ ...form, location: { ...form.location, [field]: e.target.value } })
                }
              />
            ))}
          </div>

          {/* Details */}
          <h5 className="mt-6 mb-2 font-semibold text-indigo-700">📋 Details</h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="border border-pink-200 rounded-md p-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
              placeholder="Bedrooms"
              type="number"
              value={form.details.bedrooms}
              onChange={(e) =>
                setForm({
                  ...form,
                  details: { ...form.details, bedrooms: Number(e.target.value) },
                })
              }
            />
            <input
              className="border border-indigo-200 rounded-md p-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Bathrooms"
              type="number"
              value={form.details.bathrooms}
              onChange={(e) =>
                setForm({
                  ...form,
                  details: { ...form.details, bathrooms: Number(e.target.value) },
                })
              }
            />
            <input
              className="border border-purple-200 rounded-md p-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              placeholder="Area (sqft)"
              type="number"
              value={form.details.area}
              onChange={(e) =>
                setForm({
                  ...form,
                  details: { ...form.details, area: Number(e.target.value) },
                })
              }
            />
          </div>

          {/* Images */}
          <h5 className="mt-6 mb-2 font-semibold text-indigo-700">🖼️ Images</h5>
          <input
            className="w-full border border-pink-300 rounded-md p-2 focus:ring-2 focus:ring-pink-400 focus:outline-none"
            placeholder="Image URL"
            value={form.images[0]}
            onChange={(e) => setForm({ ...form, images: [e.target.value] })}
          />

          <div className="mt-6">
            <button
              onClick={create}
              className="px-6 py-2 bg-gradient-to-r from-slate-400 via-indigo-400 to-slate-500 hover:opacity-90 text-white font-bold rounded-lg shadow-lg transition"
            >
              🚀 Create Listing
            </button>
          </div>
        </div>

        {/* Listings */}
        <h3 className="text-3xl font-extrabold mb-6 text-purple-800">🎉 My Listings</h3>
        {mine.length === 0 ? (
          <p className="text-gray-700 italic">No listings yet. Time to create your first! 🎨</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mine.map((p) => (
              <div
                key={p._id}
                className="bg-white shadow-lg rounded-xl p-5 border border-pink-200 hover:shadow-2xl hover:scale-[1.02] transition transform"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-xl text-indigo-700">{p.title}</h4>
                    <p className="text-pink-600 font-semibold text-lg">${p.price}</p>
                  </div>
                  <button
                    onClick={() => remove(p._id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
