import React from "react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="relative bg-gradient-to-r from-red-500 to-rose-600 text-white py-16 px-6 rounded-xl overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 opacity-20 rounded-full translate-x-1/4 translate-y-1/4"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join the Life-Saving Movement
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Donate blood or request blood easily and help save lives today!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/dashboard/becomeDonor"
            className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Register as Donor
          </Link>
          <Link
            to="/dashboard/my-blood-request"
            className="bg-transparent border-2 border-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition"
          >
            Request Blood
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
