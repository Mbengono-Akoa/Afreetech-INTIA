import React, { useState } from "react";
import { login } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/api";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await login({ email, password });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setAuthToken(res.data.token);
        onLogin(res.data.token);
        navigate("/");
      } else {
        setErr("Login failed");
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-tr from-purple-500 to-blue-500">
      <form 
        onSubmit={submit} 
        className="bg-white/90 backdrop-blur-md p-10 w-full max-w-md rounded-2xl shadow-xl border border-white/20"
      >
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Welcome Back</h1>

        {err && <p className="text-red-600 mb-4 font-medium text-center">{err}</p>}

        <div className="mb-4 relative">
          <input
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6 relative">
          <input
            type="password"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-700">
          Don't have an account?{" "}
          <Link className="text-purple-600 font-medium hover:underline" to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
