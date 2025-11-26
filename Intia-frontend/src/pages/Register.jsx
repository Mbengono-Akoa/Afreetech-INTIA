import React, { useState } from "react";
import { register, setAuthToken } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const res = await register(form);

      if (res.data.status === "success") {
        const token = res.data.token;

        // Store & activate token
        localStorage.setItem("token", token);
        setAuthToken(token);

        navigate("/dashboard");
      } else {
        setErr(res.data.message || "Registration failed");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-green-400 to-blue-500">
      <form
        onSubmit={submit}
        className="bg-white/90 backdrop-blur-md p-10 w-full max-w-md rounded-2xl shadow-xl border border-white/20"
      >
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">
          Create Account
        </h2>

        {err && <div className="mb-4 text-red-600 font-medium text-center">{err}</div>}

        <div className="mb-4">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="mb-4">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-blue-600 transition-all"
        >
          {loading ? "Creating..." : "Register"}
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link className="text-green-600 font-medium hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
