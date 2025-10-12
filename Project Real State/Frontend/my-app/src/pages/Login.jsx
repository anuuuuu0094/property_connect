import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.ok) nav("/");
    else setErr(res.message || "Login failed");
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

      {/* Login Form */}
      <form
        onSubmit={submit}
        className="relative bg-white/90 backdrop-blur-lg rounded-xl shadow-xl p-10 w-full max-w-md flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Welcome Back
        </h2>

        {err && <p className="text-red-500 text-center">{err}</p>}

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <div className="flex justify-between text-sm text-gray-600">
          <p>
            <span
              className="text-indigo-500 font-semibold cursor-pointer hover:underline"
              onClick={() => nav("/register")}
            >
              Sign Up
            </span>
          </p>
          <p>
            <span
              className="text-indigo-500 font-semibold cursor-pointer hover:underline"
              onClick={() => nav("/forgot-password")}
            >
              Forgot Password?
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
