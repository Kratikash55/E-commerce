import React from "react";
import image from "../assets/Quickzy.png";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-green-100 to-green-50 min-h-[75vh] flex items-center justify-between px-6 md:px-12 py-12 max-w-7xl mx-auto mt-24 rounded-2xl">
      
      {/* Left */}
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          Fast Delivery 🚀
        </h1>

        <p className="text-gray-700 text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Tenetur, fuga.
        </p>

        <button className="bg-green-500 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition">
          Shop Now
        </button>
      </div>

      {/* Right */}
      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src={image}
          alt="Quickzy"
          className="w-full max-w-lg object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;