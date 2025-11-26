import React, { useEffect, useState } from "react";
import Sidebar from "../components/Navbar";
import { fetchClients, createClient, updateClient, deleteClient } from "../api/api";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ 
    fullname: "", 
    email: "", 
    phone: "", 
    address: "", 
    branch: "" 
  });
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
    setForm({ fullname: "", email: "", phone: "", address: "", branch: "" });
    loadClients();
  };

  const handleEdit = (client) => {
    setForm({ 
      fullname: client.fullname, 
      email: client.email, 
      phone: client.phone, 
      address: client.address, 
      branch: client.branch._id 
    });
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
      <div className="">
        <h1 className="text-3xl font-bold mb-6">Clients</h1>

        <form onSubmit={handleSubmit} className="mb-6 grid grid-cols-2 gap-3 bg-white p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Branch ID"
            value={form.branch}
            onChange={(e) => setForm({ ...form, branch: e.target.value })}
            className="border p-2 rounded col-span-2"
            required
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-700 transition">
            {editingId ? "Update Client" : "Add Client"}
          </button>
        </form>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-3 text-left">Full Name</th>
                <th className="border px-4 py-3 text-left">Email</th>
                <th className="border px-4 py-3 text-left">Phone</th>
                <th className="border px-4 py-3 text-left">Address</th>
                <th className="border px-4 py-3 text-left">Branch</th>
                <th className="border px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{client.fullname}</td>
                  <td className="border px-4 py-2">{client.email}</td>
                  <td className="border px-4 py-2">{client.phone}</td>
                  <td className="border px-4 py-2">{client.address}</td>
                  <td className="border px-4 py-2">{client.branch?.name || "N/A"}</td>
                  <td className="border px-4 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(client)}
                        className="bg-yellow-500 px-3 py-1 rounded text-white hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(client._id)}
                        className="bg-red-600 px-3 py-1 rounded text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}