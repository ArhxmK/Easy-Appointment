import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <img src="/images/logo.png" alt="Logo" className="h-8 mr-2" />
          EasyAppointments
        </Link>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`md:flex space-x-4 ${menuOpen ? "block" : "hidden"} md:block`}>
          <li><Link to="/" className="hover:underline">Home</Link></li>
          {user ? (
            <>
              <li><Link to="/book" className="hover:underline">Book</Link></li>
              <li><Link to="/appointments" className="hover:underline">Appointments</Link></li>
              <li><button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Login</Link></li>
              <li><Link to="/register" className="bg-green-500 px-3 py-1 rounded">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
