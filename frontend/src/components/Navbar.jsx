import React, { useEffect, useState } from "react";
import logo from "../assets/Quickzy.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaUserCircle,
  FaShoppingCart,
  FaTimes,
  FaHome,
  FaBars,
  FaSearch,
} from "react-icons/fa";

import { MdContactSupport } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  const TotalQuantity = useSelector(
    (state) => state.Cart?.TotalQuantity || 0
  );

  async function getSuggestions(value) {
    try {
      if (!value.trim()) {
        setSuggestions([]);
        return;
      }

     const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/userproducts?category=All&search=${value}`
);

      const result = await response.json();

      if (response.ok) {
        setSuggestions(result.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getSuggestions(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  function handleSearch(e) {
    e.preventDefault();

    if (!search.trim()) return;

    setIsSearchOpen(false);
    navigate(`/?search=${search}`);
  }

  function handleSuggestionClick(productName) {
    setSearch(productName);
    setIsSearchOpen(false);
    navigate(`/?search=${productName}`);
  }

  return (
    <>
      {isSearchOpen && (
        <div
          onClick={() => setIsSearchOpen(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        ></div>
      )}

      <nav className="bg-gradient-to-r from-green-100 to-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <img src={logo} alt="logo" className="h-16 w-auto" />

            <form
              onSubmit={handleSearch}
              className="flex-1 mx-6 relative z-50"
            >
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onFocus={() => setIsSearchOpen(true)}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  className="w-full bg-gray-50 border border-gray-400 rounded-full ps-5 pe-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button type="submit">
                  <FaSearch className="absolute right-4 top-4 text-gray-600 text-lg hover:text-green-600" />
                </button>
              </div>

              {isSearchOpen && search && (
                <div className="absolute top-14 left-0 right-0 bg-white rounded-xl shadow-xl border max-h-80 overflow-y-auto">
                  {suggestions.length === 0 ? (
                    <p className="p-4 text-gray-500 text-sm">
                      No products found
                    </p>
                  ) : (
                    suggestions.map((item) => (
                      <div
                        key={item._id}
                        onClick={() =>
                          handleSuggestionClick(item.productName)
                        }
                        className="flex items-center gap-3 p-3 hover:bg-green-50 cursor-pointer"
                      >
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${item.productImage}`}
                          alt={item.productName}
                          className="w-12 h-12 object-cover rounded"
                        />

                        <div>
                          <h4 className="font-semibold text-gray-700">
                            {item.productName}
                          </h4>
                          <p className="text-green-600 text-sm">
                            ₹{item.productPrice}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </form>

            <div className="hidden md:flex items-center gap-7 mr-4">
              <Link to="/">
                <FaHome className="text-[30px] hover:text-green-600" />
              </Link>

              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-[30px] hover:text-green-600" />

                {TotalQuantity > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {TotalQuantity}
                  </span>
                )}
              </Link>

              <Link to="/login">
                <FaUserCircle className="text-[32px] hover:text-green-600" />
              </Link>

              <Link to="/contact">
                <MdContactSupport className="text-[32px] hover:text-green-600" />
              </Link>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-3xl text-green-600"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;