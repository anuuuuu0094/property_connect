import { useEffect, useState } from "react";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function SavedSearches() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    criteria: { city: "", listingType: "", propertyName: "" },
  });

  const load = async () => {
    const { data } = await api.get("/saved-searches");
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await api.post("/saved-searches", form);
    setForm({ name: "", criteria: { city: "", listingType: "", propertyName: "" } });
    load();
  };

  const del = async (id) => {
    await api.delete(`/saved-searches/${id}`);
    load();
  };

  const runSearch = (criteria) => {
    const p = new URLSearchParams(criteria).toString();
    nav(`/properties?${p}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      <h2 className="text-3xl font-bold text-purple-800 mb-6 text-center">Saved Searches</h2>

      {/* New Saved Search Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 border-t-4 border-purple-500">
        <h4 className="text-xl font-semibold text-purple-700 mb-4">Create New Saved Search</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            className="p-2 border rounded focus:ring-2 focus:ring-purple-400"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="p-2 border rounded focus:ring-2 focus:ring-purple-400"
            placeholder="City"
            value={form.criteria.city}
            onChange={(e) =>
              setForm({ ...form, criteria: { ...form.criteria, city: e.target.value } })
            }
          />
          <select
            className="p-2 border rounded focus:ring-2 focus:ring-purple-400"
            value={form.criteria.listingType}
            onChange={(e) =>
              setForm({ ...form, criteria: { ...form.criteria, listingType: e.target.value } })
            }
          >
            <option value="">Listing</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>
          <select
            className="p-2 border rounded focus:ring-2 focus:ring-purple-400"
            value={form.criteria.propertyName}
            onChange={(e) =>
              setForm({ ...form, criteria: { ...form.criteria, propertyName: e.target.value } })
            }
          >
            <option value="">Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Land</option>
          </select>
        </div>
        <button
          onClick={create}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
        >
          Save
        </button>
      </div>

      {/* Saved Searches List */}
      <div className="space-y-4">
        {items.map((s) => (
          <div
            key={s._id}
            className="bg-white shadow-md rounded-lg p-4 border-l-4 border-pink-500"
          >
            <div className="flex justify-between items-center mb-2">
              <b className="text-lg text-purple-800">{s.name}</b>
              <div className="space-x-2">
                <button
                  onClick={() => runSearch(s.criteria)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Run
                </button>
                <button
                  onClick={() => del(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {JSON.stringify(s.criteria, null, 2)}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
