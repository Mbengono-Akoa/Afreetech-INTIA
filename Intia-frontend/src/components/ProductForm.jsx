import React, { useEffect, useState } from "react";

export default function ProductForm({ onSubmit, editing, cancelEdit }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setPrice(editing.price);
      setStock(editing.stock);
    }
  }, [editing]);

  const submit = (e) => {
    e.preventDefault();

    onSubmit({
      name,
      price: Number(price),
      stock: Number(stock),
      id: editing?.id,
    });

    setName("");
    setPrice("");
    setStock("");
  };

  return (
    <form
      onSubmit={submit}
      className="p-4 bg-white rounded shadow mb-6 flex gap-3 items-end"
    >
      <div className="flex-1">
        <label className="text-sm text-gray-600">Name</label>
        <input
          className="w-full p-2 border rounded mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product name"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Price</label>
        <input
          className="w-28 p-2 border rounded mt-1"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0"
          required
        />
      </div>

      <div>
        <label className="text-sm text-gray-600">Stock</label>
        <input
          className="w-28 p-2 border rounded mt-1"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="0"
          required
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {editing ? "Update" : "Create"}
      </button>

      {editing && (
        <button
          type="button"
          onClick={cancelEdit}
          className="px-4 py-2 rounded border text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      )}
    </form>
  );
}
