import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin } from "lucide-react"; // Social Media Icons

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        
        {/* Left Side - Brand & Copyright */}
        <p className="text-sm">&copy; 2025 Easy Appointment. All rights reserved.</p>

        {/* Center - Quick Links */}
        <ul className="flex space-x-6 mt-4 md:mt-0">
          <li>
            <Link to="/" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/book" className="hover:text-gray-300">Book Appointment</Link>
          </li>
          <li>
            <Link to="/appointments" className="hover:text-gray-300">Appointments</Link>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook size={20} className="hover:text-gray-300" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter size={20} className="hover:text-gray-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} className="hover:text-gray-300" />
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
