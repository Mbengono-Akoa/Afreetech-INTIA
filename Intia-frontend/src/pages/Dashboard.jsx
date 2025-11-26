import React, { useEffect, useState } from "react";
import Sidebar from "../components/Navbar";
import { fetchProducts } from "../api/api";

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">Total Products</h2>
            <p className="text-4xl mt-4">{products.length}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-4xl mt-4">1 (placeholder)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
