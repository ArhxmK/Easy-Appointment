import { Star } from "lucide-react"; // Import star icon for ratings

function Testimonials() {
  const reviews = [         // create an object array
    {
      name: "John Doe",
      text: "This booking system is amazing! Super easy to use.",
      image: "/images/testimonials_1.jpeg",
    },
    {
      name: "Jane Smith",
      text: "I love how simple and fast it is to book an appointment.",
      image: "/images/testimonials_2.jpeg",
    },
    {
      name: "David Wilson",
      text: "A game-changer for scheduling! Highly recommended.",
      image: "/images/testimonials_3.jpeg",
    },
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-8">What Our Users Say</h2>

      {/* Testimonials Grid */}
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{review.name}</h3>
            <p className="text-gray-600 mt-2">"{review.text}"</p>
            
            {/* Star Ratings */}
            <div className="flex justify-center mt-4 text-yellow-500">
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
              <Star size={20} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
