import React from "react";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-4xl mt-4">1 (placeholder)</p>
        </div>
      </div>
    </div>
  );
}
