import React, { useEffect, useState } from "react";
import Sidebar from "../components/Navbar";
import { fetchClients, createClient, updateClient, deleteClient } from "../api/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  const loadClients = async () => {
    const res = await fetchClients();
    setClients(res.data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateClient(editingId, form);
      setEditingId(null);
    } else {
      await createClient(form);
    }
    setForm({ name: "", email: "" });
    loadClients();
  };

  const handleEdit = (client) => {
    setForm({ name: client.name, email: client.email });
    setEditingId(client._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
      loadClients();
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Clients</h1>

        <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded flex-1"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td className="border px-4 py-2">{client.name}</td>
                <td className="border px-4 py-2">{client.email}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(client)}
                    className="bg-yellow-500 px-2 py-1 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
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
