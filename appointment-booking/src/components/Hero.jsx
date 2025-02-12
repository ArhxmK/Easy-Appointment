import { Link } from "react-router-dom";

function Hero(){
    return (
    <div className="relative h-screen w-full">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
  >
    {/* Dark Overlay for Better Readability */}
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  </div>

  {/* Hero Content */}
  <div className="relative flex flex-col items-center justify-center h-full text-center text-white z-10">
    <h1 className="text-5xl md:text-6xl font-bold mb-4">
      Welcome to Easy Appointment Booking
    </h1>
    <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl">
      Book appointments effortlessly and manage your schedule with ease.
    </p>
    <Link to="/pages/Booking">
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition">
        Book an Appointment
      </button>
    </Link>
  </div>
  </div>
  )
}

export default Hero;