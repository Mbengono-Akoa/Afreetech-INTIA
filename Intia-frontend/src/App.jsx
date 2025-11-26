import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Insurances from "./pages/Insurances";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../src/components/Layout";
import { setAuthToken } from "./api/api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setAuthToken(savedToken);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setToken} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute token={token}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute token={token}>
            <Layout>
              <Clients />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/insurances"
        element={
          <ProtectedRoute token={token}>
            <Layout>
              <Insurances />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
