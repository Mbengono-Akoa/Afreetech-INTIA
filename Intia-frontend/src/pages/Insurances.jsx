import React, { useEffect, useState } from "react";
import Sidebar from "../components/Navbar";
import { fetchInsurances, createInsurance, updateInsurance, deleteInsurance } from "../api/api";

export default function Insurances() {
  const [insurances, setInsurances] = useState([]);
  const [form, setForm] = useState({ name: "", type: "" });
  const [editingId, setEditingId] = useState(null);

  const loadInsurances = async () => {
    const res = await fetchInsurances();
    setInsurances(res.data);
  };

  useEffect(() => {
    loadInsurances();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateInsurance(editingId, form);
      setEditingId(null);
    } else {
      await createInsurance(form);
    }
    setForm({ name: "", type: "" });
    loadInsurances();
  };

  const handleEdit = (insurance) => {
    setForm({ name: insurance.name, type: insurance.type });
    setEditingId(insurance._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this insurance?")) {
      await deleteInsurance(id);
      loadInsurances();
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Insurances</h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <button className="bg-blue-600 text-white px-4 rounded">
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {insurances.map((insurance) => (
              <tr key={insurance._id}>
                <td className="border px-4 py-2">{insurance.name}</td>
                <td className="border px-4 py-2">{insurance.type}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(insurance)}
                    className="bg-yellow-500 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(insurance._id)}
                    className="bg-red-600 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
