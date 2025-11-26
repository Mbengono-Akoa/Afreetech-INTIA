import React, { useEffect, useState } from "react";
import { fetchClients, fetchInsurances } from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    clients: 0,
    insurances: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [clientsRes, insurancesRes] = await Promise.all([
        fetchClients(),
        fetchInsurances()
      ]);

      setStats({
        clients: clientsRes.data.length,
        insurances: insurancesRes.data.length,
        users: 1
      });
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-6 rounded shadow animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-700">Total Clients</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.clients}</p>
          <p className="text-sm text-gray-500">Active clients in system</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h2 className="text-xl font-bold text-gray-700">Total Insurances</h2>
          <p className="text-4xl font-bold text-green-600">{stats.insurances}</p>
          <p className="text-sm text-gray-500">Active insurance policies</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h2 className="text-xl font-bold text-gray-700">Total Users</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.users}</p>
          <p className="text-sm text-gray-500">System administrators</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.href = '/clients'}
              className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
            >
              Add New Client
            </button>
            <button 
              onClick={() => window.location.href = '/insurances'}
              className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition"
            >
              Create Insurance Policy
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
          <p className="text-gray-500">Recent system activities will appear here</p>
        </div>
      </div>
    </div>
  );
}