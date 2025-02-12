import { Calendar, Bell, Lock } from "lucide-react"; 

function Features(){
    return  (
     <section className="py-20 bg-gray-100 text-center">
     <h2 className="text-3xl font-bold text-blue-600 mb-8">Why Choose Us?</h2>

     {/* Feature Grid */}
     <div className="container mx-auto grid md:grid-cols-3 gap-8 px-6">
       {/* Feature 1 */}
       <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
         <Calendar size={40} className="text-blue-600 mb-4" />
         <h3 className="text-xl font-semibold">Easy Scheduling</h3>
         <p className="text-gray-600 mt-2">
           Book appointments in just a few clicks and manage your calendar easily.
         </p>
       </div>

       {/* Feature 2 */}
       <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
         <Bell size={40} className="text-blue-600 mb-4" />
         <h3 className="text-xl font-semibold">Reminders & Notifications</h3>
         <p className="text-gray-600 mt-2">
           Get automatic reminders so you never miss an appointment.
         </p>
       </div>

       {/* Feature 3 */}
       <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
         <Lock size={40} className="text-blue-600 mb-4" />
         <h3 className="text-xl font-semibold">Secure & Reliable</h3>
         <p className="text-gray-600 mt-2">
           Your data is protected with the highest security standards.
         </p>
       </div>
     </div>
   </section>
    )
}

export default Features;