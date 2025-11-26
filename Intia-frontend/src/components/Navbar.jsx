import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/api";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen fixed top-0 left-0 flex flex-col shadow-lg">
      {/* Logo / App Name */}
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-extrabold tracking-wide">Intia</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-6 space-y-3">
        <Link
          to="/"
          className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition flex items-center font-medium"
        >
          Dashboard
        </Link>

        <Link
          to="/clients"
          className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition flex items-center font-medium"
        >
          Clients
        </Link>

        <Link
          to="/insurances"
          className="block py-3 px-4 rounded-lg hover:bg-gray-700 transition flex items-center font-medium"
        >
          Insurances
        </Link>
      </nav>

      {/* Logout button at bottom */}
      <div className="p-6 border-t border-gray-700 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
