import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer",
  });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.ok) nav("/login");
    else setErr(res.message || "Registration failed");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-md"
        style={{
          backgroundImage:
            "url('https://s7d9.scene7.com/is/image/ledcor/Belmont%20Reunion%2003?qlt=85&wid=480&ts=1742942286073&dpr=on,2.625')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Registration Form */}
      <form
        onSubmit={submit}
        className="relative bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-600">
          Create Account
        </h2>

        {err && <p className="text-red-500 text-center">{err}</p>}

        <input
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="agent">Agent</option>
        </select>

        <button
          disabled={loading}
          type="submit"
          className="bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          {loading ? "Loading..." : "Create Account"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-green-500 font-semibold cursor-pointer hover:underline"
            onClick={() => nav("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
