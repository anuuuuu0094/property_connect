// import { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import api from "../api/client";

// export default function Properties() {
//   const [params, setParams] = useSearchParams();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [filters, setFilters] = useState({
//     city: params.get("city") || "",
//     listingType: params.get("listingType") || "",
//     propertyName: params.get("propertyName") || "",
//     minPrice: params.get("minPrice") || "",
//     maxPrice: params.get("maxPrice") || "",
//   });

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get("/properties", { params: filters });
//       setItems(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchData(); /* eslint-disable-next-line */ }, []);

//   const apply = () => {
//     const next = new URLSearchParams();
//     Object.entries(filters).forEach(([k,v]) => v && next.set(k,v));
//     setParams(next);
//     fetchData();
//   };

//   return (
//     <>
//       <h2>Properties</h2>
//       <div style={{ display:"grid", gap:8, gridTemplateColumns:"repeat(6, minmax(0,1fr))", marginBottom:12 }}>
//         <input placeholder="City" value={filters.city} onChange={e=>setFilters({...filters, city:e.target.value})}/>
//         <select value={filters.listingType} onChange={e=>setFilters({...filters, listingType:e.target.value})}>
//           <option value="">Listing Type</option>
//           <option value="rent">Rent</option>
//           <option value="sale">Sale</option>
//         </select>
//         <select value={filters.propertyName} onChange={e=>setFilters({...filters, propertyName:e.target.value})}>
//           <option value="">Type</option>
//           <option value="house">House</option>
//           <option value="apartment">Apartment</option>
//           <option value="townhouse">Townhouse</option>
//           <option value="land">Land</option>
//         </select>
//         <input placeholder="Min Price" value={filters.minPrice} onChange={e=>setFilters({...filters, minPrice:e.target.value})}/>
//         <input placeholder="Max Price" value={filters.maxPrice} onChange={e=>setFilters({...filters, maxPrice:e.target.value})}/>
//         <button onClick={apply}>Apply</button>
//       </div>

//       {loading ? <p>Loading...</p> : (
//         <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))" }}>
//           {items.map(p => (
//             <div key={p._id} style={{ border:"1px solid #eee", padding:12 }}>
//               <img src={p.images?.[0]} alt="" style={{ width:"100%", height:160, objectFit:"cover" }}/>
//               <h3>{p.title}</h3>
//               <p>{p.location?.city}, {p.location?.country}</p>
//               <p>${p.price}</p>
//               <Link to={`/properties/${p._id}`}>View</Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// }


















import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../api/client";

export default function Properties() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    city: params.get("city") || "",
    listingType: params.get("listingType") || "",
    propertyName: params.get("propertyName") || "",
    minPrice: params.get("minPrice") || "",
    maxPrice: params.get("maxPrice") || "",
  });

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await api.get("/properties", { params: filters });
  //     setItems(data);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const fetchData = async () => {
  setLoading(true);
  try {
    const cleanFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) cleanFilters[key] = value;
    });

    const { data } = await api.get("/properties", { params: cleanFilters });
    setItems(data);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const apply = () => {
    const next = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && next.set(k, v));
    setParams(next);
    fetchData();
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto bg-gradient-to-r from-slate-200 via-indigo-200 to-slate-200 min-h-screen">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-indigo-400 to-slate-600 mb-10 text-center">
        🔥 Hot Properties Explorer
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <input
          type="text"
          placeholder="🏙️ City"
          value={filters.city}
          onChange={e => setFilters({ ...filters, city: e.target.value })}
          className="px-4 py-2 border-2 border-pink-400 bg-white rounded-lg shadow-lg placeholder-pink-400 text-pink-700 font-semibold focus:outline-none focus:ring-4 focus:ring-pink-300 transition"
        />

        <select
          value={filters.listingType}
          onChange={e => setFilters({ ...filters, listingType: e.target.value })}
          className="px-4 py-2 border-2 border-purple-400 bg-white rounded-lg shadow-lg text-purple-700 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-300"
        >
          <option value="">📝 Listing Type</option>
          <option value="rent">🏠 Rent</option>
          <option value="sale">💰 Sale</option>
        </select>

        <select
          value={filters.propertyName}
          onChange={e => setFilters({ ...filters, propertyName: e.target.value })}
          className="px-4 py-2 border-2 border-blue-400 bg-white rounded-lg shadow-lg text-blue-700 font-semibold focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <option value="">🏡 Property Type</option>
          <option value="house">House 🏠</option>
          <option value="apartment">Apartment 🏢</option>
          <option value="townhouse">Townhouse 🏘️</option>
          <option value="land">Land 🌱</option>
        </select>

        <input
          type="number"
          placeholder="💲 Min Price"
          value={filters.minPrice}
          onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
          className="px-4 py-2 border-2 border-yellow-400 bg-white rounded-lg shadow-lg placeholder-yellow-500 text-yellow-700 font-semibold focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
        />

        <input
          type="number"
          placeholder="💰 Max Price"
          value={filters.maxPrice}
          onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
          className="px-4 py-2 border-2 border-green-400 bg-white rounded-lg shadow-lg placeholder-green-500 text-green-700 font-semibold focus:outline-none focus:ring-4 focus:ring-green-300 transition"
        />

        <button
          onClick={apply}
          className="bg-gradient-to-r from-slate-400 via-indigo-400 to-slate-600 text-white font-bold px-4 py-2 rounded-lg shadow-xl hover:scale-105 transition duration-300"
        >
          🎯 Apply
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg text-indigo-600 font-bold animate-pulse">
          Loading properties...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((p) => (
            <div
              key={p._id}
              className="bg-white border-4 border-indigo-200 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <img
                src={p.images?.[0]}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-indigo-400">{p.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  📍 {p.location?.city}, {p.location?.country}
                </p>
                <p className="text-2xl font-extrabold text-gray-500 mt-2">
                  ${p.price.toLocaleString()}
                </p>
                <Link
                  to={`/properties/${p._id}`}
                  className="inline-block mt-4 bg-gradient-to-r from-slate-400 via-indigo-400 to-slate-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                >
                  🔍 View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
