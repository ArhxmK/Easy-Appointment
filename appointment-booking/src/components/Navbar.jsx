import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex lg:space-x-6">
          <li><Link to="/" className="px-4 py-2 hover:text-gray-300">Home</Link></li>
          <li><Link to="/book" className="px-4 py-2 hover:text-gray-300">Book Appointment</Link></li>
          <li><Link to="/appointments" className="px-4 py-2 hover:text-gray-300">Appointments</Link></li>
        </ul>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white z-50" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-600 text-white transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } z-50`}
      >
        {/* Close Button */}
        <button className="absolute top-4 right-6 text-white text-3xl" onClick={() => setIsOpen(false)}>
          <X />
        </button>

        {/* Navigation Links */}
        <ul className="flex flex-col space-y-6 mt-16 ml-6 text-xl">
          <li><Link to="/" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link></li>
          <li><Link to="/book" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Book Appointment</Link></li>
          <li><Link to="/appointments" className="hover:text-gray-300" onClick={() => setIsOpen(false)}>Appointments</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

