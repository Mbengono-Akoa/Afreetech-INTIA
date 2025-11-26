import React from "react";
import Sidebar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-64 p-6 w-full bg-gray-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}