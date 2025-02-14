import { useState, useEffect } from "react";
import axios from "axios";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", email: "", phone: "", date: "", time: "", reason: "" });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios.get("http://localhost:5001/api/appointments")
      .then((response) => {
        if (response.data.success) {
          setAppointments(response.data.appointments);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      });
  };

  const deleteAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      axios.delete(`http://localhost:5001/api/appointments/${id}`)
        .then((response) => {
          alert(response.data.message);
          fetchAppointments();
        })
        .catch((error) => {
          console.error("Error deleting appointment:", error);
        });
    }
  };

  const startEditing = (appointment) => {
    setEditingAppointment(appointment.id);
    setEditFormData(appointment);
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5001/api/appointments/${editingAppointment}`, editFormData)
      .then((response) => {
        alert(response.data.message);
        setEditingAppointment(null);
        fetchAppointments();
      })
      .catch((error) => {
        console.error("Error updating appointment:", error);
      });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Booked Appointments</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Reason</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id} className="text-center">
                  <td className="border p-2">{appt.name}</td>
                  <td className="border p-2">{appt.email}</td>
                  <td className="border p-2">{appt.phone}</td>
                  <td className="border p-2">{appt.date}</td>
                  <td className="border p-2">{appt.time}</td>
                  <td className="border p-2">{appt.reason}</td>
                  <td className="border p-2">
                    <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      onClick={() => startEditing(appt)}>Edit</button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition ml-2"
                      onClick={() => deleteAppointment(appt.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No appointments found.</p>
      )}

      {/* Edit Form Modal */}
      {editingAppointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Appointment</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} className="w-full p-2 border rounded" required />
              <input type="email" name="email" value={editFormData.email} onChange={handleEditChange} className="w-full p-2 border rounded" required />
              <input type="text" name="phone" value={editFormData.phone} onChange={handleEditChange} className="w-full p-2 border rounded" required />
              <input type="date" name="date" value={editFormData.date} onChange={handleEditChange} className="w-full p-2 border rounded" required />
              <input type="time" name="time" value={editFormData.time} onChange={handleEditChange} className="w-full p-2 border rounded" required />
              <textarea name="reason" value={editFormData.reason} onChange={handleEditChange} className="w-full p-2 border rounded" required></textarea>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Save Changes</button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition" onClick={() => setEditingAppointment(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Appointments;
