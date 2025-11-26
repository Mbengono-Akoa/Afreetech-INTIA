import React, { useEffect, useState } from "react";
import Sidebar from "../components/Navbar";
import {
  fetchInsurances,
  createInsurance,
  updateInsurance,
  deleteInsurance,
  fetchClients,
} from "../api/api";

export default function Insurances() {
  const [insurances, setInsurances] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    type: "",
    cost: "",
    startDate: "",
    endDate: "",
    client: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load insurances from backend
  const loadInsurances = async () => {
    try {
      const res = await fetchInsurances();
      setInsurances(res.data);
    } catch (err) {
      console.error("Failed to fetch insurances:", err);
    }
  };

  // Load clients for dropdown
  const loadClients = async () => {
    try {
      const res = await fetchClients();
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    }
  };

  useEffect(() => {
    loadInsurances();
    loadClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.client) return alert("Please select a client");
    setLoading(true);

    try {
      const payload = {
        type: form.type,
        cost: Number(form.cost),
        startDate: form.startDate,
        endDate: form.endDate,
        client: form.client,
      };

      if (editingId) {
        await updateInsurance(editingId, payload);
        setEditingId(null);
      } else {
        await createInsurance(payload);
      }

      setForm({ type: "", cost: "", startDate: "", endDate: "", client: "" });
      loadInsurances();
    } catch (err) {
      console.error("Error saving insurance:", err);
      alert("Error saving insurance");
    }

    setLoading(false);
  };

  const handleEdit = (ins) => {
    setForm({
      type: ins.type,
      cost: ins.cost,
      startDate: ins.startDate.slice(0, 10),
      endDate: ins.endDate.slice(0, 10),
      client: ins.client._id,
    });
    setEditingId(ins._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this insurance?")) return;
    try {
      await deleteInsurance(id);
      loadInsurances();
    } catch (err) {
      console.error("Error deleting insurance:", err);
      alert("Error deleting insurance");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Insurances</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
        >
          <input
            type="text"
            placeholder="Type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Cost"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            placeholder="Start Date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            placeholder="End Date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <select
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Client</option>
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.fullname || c.name} - {c.email}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-1"
            disabled={loading}
          >
            {editingId ? "Update" : loading ? "Saving..." : "Add"}
          </button>
        </form>

        {/* Insurances Table */}
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Cost</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Client</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {insurances.map((ins) => (
              <tr key={ins._id}>
                <td className="border px-4 py-2">{ins.type}</td>
                <td className="border px-4 py-2">{ins.cost}</td>
                <td className="border px-4 py-2">{ins.startDate.slice(0, 10)}</td>
                <td className="border px-4 py-2">{ins.endDate.slice(0, 10)}</td>
                <td className="border px-4 py-2">
                  {ins.client?.fullname || "N/A"} ({ins.client?.email})
                </td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(ins)}
                    className="bg-yellow-500 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ins._id)}
                    className="bg-red-600 px-2 py-1 rounded text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {insurances.length === 0 && (
              <tr>
                <td colSpan={6} className="border px-4 py-2 text-center text-gray-500">
                  No insurances found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
