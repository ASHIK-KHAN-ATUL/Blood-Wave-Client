import React, { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return setMessage("Please enter a valid email.");

    const res = await axiosPublic.post("/newsletter", { email });
    setMessage(res.data.message);
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-red-500 to-rose-600 py-16 px-6 rounded-xl text-white relative overflow-hidden my-10">
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Get Updates on Urgent Blood Requests
        </h2>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center gap-3"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-72 focus:outline-none bg-red-400"
            required
          />
          <button
            type="submit"
            className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Subscribe
          </button>
        </form>
        {message && <p className="mt-4 text-sm text-white/80">{message}</p>}
      </div>
    </section>
  );
};

export default Newsletter;
