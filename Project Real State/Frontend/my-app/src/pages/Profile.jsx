// import { useEffect, useState } from "react";
// import api from "../api/client";

// export default function Profile() {
//   const [user, setUser] = useState(null);
//   const [msg, setMsg] = useState("");

//   const load = async () => {
//     const { data } = await api.get("/users/profile");
//     setUser(data);
//   };
//   useEffect(()=>{ load(); }, []);

//   const save = async () => {
//     const { data } = await api.put("/users/profile", user);
//     setUser(data);
//     setMsg("Saved");
//     setTimeout(()=>setMsg(""), 1500);
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>My Profile</h2>
//       {msg && <p style={{ color:"green" }}>{msg}</p>}
//       <input placeholder="First Name" value={user?.profile?.firstName || ""} onChange={e=>setUser({...user, profile:{...user.profile, firstName:e.target.value}})}/>
//       <input placeholder="Last Name" value={user?.profile?.lastName || ""} onChange={e=>setUser({...user, profile:{...user.profile, lastName:e.target.value}})}/>
//       <input placeholder="Phone" value={user?.profile?.phone || ""} onChange={e=>setUser({...user, profile:{...user.profile, phone:e.target.value}})}/>
//       <textarea placeholder="Bio" value={user?.profile?.bio || ""} onChange={e=>setUser({...user, profile:{...user.profile, bio:e.target.value}})} />
//       <div><button onClick={save}>Save</button></div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import api from "../api/client";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", bio: "" });
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(false); // Track if we are in edit mode

  const load = async () => {
    const { data } = await api.get("/users/profile");
    setUser(data);
    if (data?.profile?.firstName) {
      // Initialize form only if profile does not exist
      setForm({
        firstName: data.profile.firstName || "",
        lastName: data.profile.lastName || "",
        phone: data.profile.phone || "",
        bio: data.profile.bio || "",
      });
    } else {
      setEditing(true); // No profile exists, show input
    }
  };

  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    const updatedUser = { ...user, profile: form };
    const { data } = await api.put("/users/profile", updatedUser);
    setUser(data);
    setMsg("✅ Profile Saved Successfully!");
    setEditing(false);
    setTimeout(() => setMsg(""), 2000);
  };

  if (!user) return <p className="text-center text-gray-200 mt-10">Loading...</p>;

  const profileExists = user?.profile?.firstName && user?.profile?.lastName;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Profile</h2>

        {msg && (
          <div className="mb-4 text-center text-green-600 font-semibold animate-pulse">
            {msg}
          </div>
        )}

        {profileExists && !editing ? (
          // Display profile
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                {user.profile.firstName[0]}{user.profile.lastName[0]}
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {user.profile.firstName} {user.profile.lastName}
            </h3>
            <p className="text-gray-600">{user.profile.bio || "No bio available"}</p>
            <p className="text-gray-600 font-medium">Phone: {user.profile.phone || "Not provided"}</p>
            <button
              onClick={() => {
                setForm({ ...user.profile });
                setEditing(true);
              }}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          // Input form if profile not created or editing
          <div className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1">First Name</label>
              <input
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Last Name</label>
              <input
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Bio</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                rows={4}
              />
            </div>

            <button
              onClick={save}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            >
              Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
