// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../api/client";
// import { useAuth } from "../context/AuthContext";

// export default function PropertyDetail() {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [p, setP] = useState(null);
//   const [reviews, setReviews] = useState([]);
//   const [avg, setAvg] = useState({ avgRating: 0, count: 0 });
//   const [favMsg, setFavMsg] = useState("");
//   const [inqMsg, setInqMsg] = useState("");
//   const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
//   const [inquiry, setInquiry] = useState("");

//   const load = async () => {
//     const { data } = await api.get(`/properties/${id}`);
//     setP(data);
//     const rev = await api.get(`/reviews/property/${id}`);
//     setReviews(rev.data);
//     const avgRes = await api.get(`/reviews/property/${id}/average`);
//     setAvg(avgRes.data);
//   };

//   useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

//   const addFavorite = async () => {
//     try {
//       await api.post("/favorites", { propertyId: id });
//       setFavMsg("Added to favorites");
//     } catch (e) {
//       setFavMsg(e?.response?.data?.message || "Failed to favorite");
//     }
//   };

//   const sendInquiry = async () => {
//     try {
//       await api.post("/inquiries", { propertyId: id, message: inquiry });
//       setInqMsg("Inquiry sent");
//       setInquiry("");
//     } catch (e) {
//       setInqMsg(e?.response?.data?.message || "Failed to send inquiry");
//     }
//   };

//   const submitReview = async () => {
//     try {
//       await api.post("/reviews", { propertyId: id, ...reviewForm });
//       setReviewForm({ rating: 5, comment: "" });
//       load();
//     } catch (e) {
//       alert(e?.response?.data?.message || "Failed to review");
//     }
//   };

//   if (!p) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>{p.title}</h2>
//       <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16 }}>
//         <div>
//           <img src={p.images?.[0]} alt="" style={{ width:"100%", maxHeight:360, objectFit:"cover" }}/>
//           <p>{p.description}</p>
//           <p><b>Price:</b> ${p.price}</p>
//           <p><b>Type:</b> {p.propertyName} • {p.listingType}</p>
//           <p><b>Location:</b> {p?.location?.address}, {p?.location?.city}</p>
//           <p><b>Bedrooms:</b> {p?.details?.bedrooms} • <b>Bathrooms:</b> {p?.details?.bathrooms}</p>
//         </div>

//         <div style={{ border:"1px solid #eee", padding:12 }}>
//           {user?.role === "buyer" && (
//             <>
//               <button onClick={addFavorite}>❤️ Add to favorites</button>
//               {favMsg && <p>{favMsg}</p>}

//               <h4>Send Inquiry</h4>
//               <textarea value={inquiry} onChange={e=>setInquiry(e.target.value)} rows={4} />
//               <button onClick={sendInquiry} disabled={!inquiry.trim()}>Send</button>
//               {inqMsg && <p>{inqMsg}</p>}

//               <h4>Add Review</h4>
//               <div style={{ display:"flex", gap:8 }}>
//                 <select value={reviewForm.rating} onChange={e=>setReviewForm({...reviewForm, rating:Number(e.target.value)})}>
//                   {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
//                 </select>
//                 <input placeholder="Comment" value={reviewForm.comment} onChange={e=>setReviewForm({...reviewForm, comment:e.target.value})}/>
//                 <button onClick={submitReview}>Submit</button>
//               </div>
//             </>
//           )}
//           {!user && <p>Login as buyer to favorite, inquire, or review.</p>}

//           <h4>Rating</h4>
//           <p>{avg.avgRating?.toFixed(1)} / 5 ({avg.count} reviews)</p>
//         </div>
//       </div>

//       <h3>Reviews</h3>
//       {reviews.length === 0 ? <p>No reviews yet.</p> : reviews.map(r => (
//         <div key={r._id} style={{ borderTop:"1px solid #eee", padding:"8px 0" }}>
//           <b>{r.user?.name || r.user?.username || "User"}</b> — {r.rating}★
//           <p>{r.comment}</p>
//         </div>
//       ))}
//     </div>
//   );
// }








































import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function PropertyDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [p, setP] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avg, setAvg] = useState({ avgRating: 0, count: 0 });
  const [favMsg, setFavMsg] = useState("");
  const [inqMsg, setInqMsg] = useState("");
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [inquiry, setInquiry] = useState("");

  const load = async () => {
    const { data } = await api.get(`/properties/${id}`);
    setP(data);
    const rev = await api.get(`/reviews/property/${id}`);
    setReviews(rev.data);
    const avgRes = await api.get(`/reviews/property/${id}/average`);
    setAvg(avgRes.data);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [id]);

  const addFavorite = async () => {
    try {
      await api.post("/favorites", { propertyId: id });
      setFavMsg("✅ Added to favorites");
    } catch (e) {
      setFavMsg(e?.response?.data?.message || "❌ Failed to favorite");
    }
  };

  const sendInquiry = async () => {
    try {
      await api.post("/inquiries", { propertyId: id, message: inquiry });
      setInqMsg("✅ Inquiry sent");
      setInquiry("");
    } catch (e) {
      setInqMsg(e?.response?.data?.message || "❌ Failed to send inquiry");
    }
  };

  const submitReview = async () => {
    try {
      await api.post("/reviews", { propertyId: id, ...reviewForm });
      setReviewForm({ rating: 5, comment: "" });
      load();
    } catch (e) {
      alert(e?.response?.data?.message || "Failed to review");
    }
  };

  if (!p)
    return (
      <p className="text-center text-lg text-indigo-600 animate-pulse">
        🌫️ Loading...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400 rounded-xl shadow-xl">
      <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-b from-indigo-500 via-indigo-600 to-slate-500 text-transparent bg-clip-text">
        {p.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="md:col-span-2 space-y-6">
          <img
            src={p.images?.[0]}
            alt={p.title}
            className="w-full max-h-[420px] object-cover rounded-xl shadow-2xl border-4 border-indigo-400"
          />
          <p className="text-lg text-slate-800 bg-white/80 p-4 rounded-lg shadow">
            {p.description}
          </p>
          <p className="text-2xl font-bold text-indigo-800">💰 ${p.price}</p>
          <div className="grid grid-cols-2 gap-4 text-lg">
            <p className="bg-gradient-to-b from-slate-300 via-indigo-200 to-slate-200 p-3 rounded-lg shadow text-slate-900">
              <b>Type:</b> {p.propertyName} • {p.listingType}
            </p>
            <p className="bg-gradient-to-b from-slate-300 via-indigo-200 to-slate-200 p-3 rounded-lg shadow text-slate-900">
              <b>Location:</b> {p?.location?.address}, {p?.location?.city},{" "}
              {p?.location?.country}
            </p>
            <p className="bg-gradient-to-b from-slate-300 via-indigo-200 to-slate-200 p-3 rounded-lg shadow text-slate-900">
              <b>Bedrooms:</b> {p?.details?.bedrooms}
            </p>
            <p className="bg-gradient-to-b from-slate-300 via-indigo-200 to-slate-200 p-3 rounded-lg shadow text-slate-900">
              <b>Bathrooms:</b> {p?.details?.bathrooms}
            </p>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="bg-gradient-to-b from-slate-300 via-indigo-300 to-slate-400 rounded-xl shadow-lg p-6 space-y-6 border border-slate-600">
          {user?.role === "buyer" ? (
            <>
              <button
                onClick={addFavorite}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-b from-indigo-700 to-slate-500 hover:from-slate-700 hover:to-indigo-500 transition"
              >
                ❤️ Add to Favorites
              </button>
              {favMsg && (
                <p className="text-sm text-white bg-indigo-600 p-2 rounded-lg">
                  {favMsg}
                </p>
              )}

              <h4 className="text-xl font-bold text-white">📩 Send Inquiry</h4>
              <textarea
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                rows={4}
                className="w-full border border-slate-400 rounded-lg p-3 focus:ring-2 focus:ring-indigo-300 bg-white"
                placeholder="Write your inquiry..."
              />
              <button
                onClick={sendInquiry}
                disabled={!inquiry.trim()}
                className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-b from-indigo-700 to-slate-500 hover:from-slate-700 hover:to-indigo-500 transition disabled:opacity-50"
              >
                🚀 Send Inquiry
              </button>
              {inqMsg && (
                <p className="text-sm text-white bg-indigo-600 p-2 rounded-lg">
                  {inqMsg}
                </p>
              )}

              <h4 className="text-xl font-bold text-white">⭐ Add Review</h4>
              <div className="flex gap-2">
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                  }
                  className="border border-slate-400 rounded-lg p-2 bg-white font-bold"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} ★
                    </option>
                  ))}
                </select>
                <input
                  placeholder="Comment"
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                  className="flex-1 border border-slate-400 rounded-lg p-2 bg-white"
                />
                <button
                  onClick={submitReview}
                  className="px-4 py-2 rounded-xl font-bold text-white bg-gradient-to-b from-indigo-700 to-slate-500 hover:from-slate-700 hover:to-indigo-500 transition"
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <p className="text-white font-bold bg-slate-700 p-3 rounded-lg">
              🔒 Login as a buyer to favorite, inquire, or review.
            </p>
          )}

          <h4 className="text-xl font-bold text-white">🌟 Rating</h4>
          <p className="text-lg text-indigo-200 font-bold">
            {avg.avgRating?.toFixed(1)} / 5 ({avg.count} reviews)
          </p>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 p-6 rounded-xl shadow-xl">
        <h3 className="text-3xl font-extrabold text-center text-slate-800 mb-6">
          ✨ Reviews
        </h3>
        {reviews.length === 0 ? (
          <p className="text-center text-slate-700 font-medium">No reviews yet.</p>
        ) : (
          reviews.map((r) => {
            let displayName = "User";
            if (r.user?.name) {
              displayName = r.user.name;
            } else if (r.user?.username && !r.user.username.includes("@")) {
              displayName = r.user.username;
            }

            return (
              <div key={r._id} className="border-t border-slate-300 py-4">
                <p className="font-bold text-indigo-700">
                  {displayName} —{" "}
                  <span className="text-yellow-500">{r.rating}★</span>
                </p>
                <p className="text-slate-800">{r.comment}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
