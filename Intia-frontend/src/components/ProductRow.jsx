import React from "react";

export default function ProductRow({ product, onEdit, onDelete }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3">{product.name}</td>
      <td className="p-3">{product.price}</td>
      <td className="p-3">{product.stock}</td>
      <td className="p-3 flex items-center gap-4">
        <button
          onClick={() => onEdit(product)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
