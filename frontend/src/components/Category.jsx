import React, { useState } from "react";
import { AiFillProduct } from "react-icons/ai";
import {
  FaCoffee,
  FaCouch,
  FaPuzzlePiece,
  FaHeadphones,
  FaMobile,
  FaAppleAlt,
} from "react-icons/fa";
import { GiFingernail } from "react-icons/gi";

const Category = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const Categories = [
    { name: "All", icon: <AiFillProduct /> },
    { name: "Cafe", icon: <FaCoffee /> },
    { name: "Home", icon: <FaCouch /> },
    { name: "Fresh", icon: <FaAppleAlt /> },
    { name: "Toys", icon: <FaPuzzlePiece /> },
    { name: "Electronics", icon: <FaHeadphones /> },
    { name: "Mobile", icon: <FaMobile /> },
    { name: "Beauty", icon: <GiFingernail /> },
  ];

  function handleCategory(catName) {
    setActiveCategory(catName);
    onSelectCategory(catName);
  }

  return (
    <div className="bg-white m-2 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex sm:justify-center overflow-x-auto gap-4">
          {Categories.map((cat, index) => (
            <div
              key={index}
              onClick={() => handleCategory(cat.name)}
              className={`flex flex-col items-center min-w-[80px] text-sm hover:cursor-pointer transition duration-200
              
              ${
                activeCategory === cat.name
                  ? "text-green-600"
                  : "text-gray-800 hover:text-green-600"
              }`}
            >
              <div className="text-2xl mb-1">{cat.icon}</div>

              <div className="text-center">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;