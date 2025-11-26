import React, { useEffect, useState } from "react";
import Sidebar from "../components/Navbar";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);

  const loadProducts = () => {
    fetchProducts().then((res) => setProducts(res.data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateProduct(editingId, form);
    } else {
      await createProduct(form);
    }

    setForm({ name: "", price: "", quantity: "" });
    setEditingId(null);
    loadProducts();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6 bg-white p-6 rounded shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              className="p-3 border rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              className="p-3 border rounded"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />

            <input
              className="p-3 border rounded"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>

          <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        {/* Product List */}
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-5 rounded shadow flex justify-between">
              <div>
                <h2 className="font-bold text-xl">{p.name}</h2>
                <p>Price: {p.price}</p>
                <p>Qty: {p.quantity}</p>
              </div>

              <div className="space-x-2">
                <button
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                  onClick={() => {
                    setForm({
                      name: p.name,
                      price: p.price,
                      quantity: p.quantity,
                    });
                    setEditingId(p._id);
                  }}
                >
                  Edit
                </button>

                <button
                  className="px-4 py-2 bg-red-600 text-white rounded"
                  onClick={async () => {
                    await deleteProduct(p._id);
                    loadProducts();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
