import { useState } from "react";
import axios from "axios";

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    reason: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Retrieve token
      if (!token) {
        setError("Unauthorized: Please login first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5001/api/book-appointment",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token
          },
        }
      );

      setSuccess("Appointment booked successfully!");
      setFormData({ name: "", email: "", phone: "", date: "", time: "", reason: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Book an Appointment</h2>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" required />
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="time" name="time" value={formData.time} onChange={handleChange} className="w-full p-2 border rounded" required />
          <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason for Appointment" className="w-full p-2 border rounded" required />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default Booking;
