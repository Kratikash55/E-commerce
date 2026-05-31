import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa6";
import {
  carttotalPrice,
  DecrementQuantity,
  deleteCartItems,
  IncrementQuantity,
  saveCart,
} from "../features/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.Cart.CartItems);
  const cartAllValue = useSelector((state) => state.Cart);

  useEffect(() => {
    dispatch(carttotalPrice());
  }, [cartData, dispatch]);

  useEffect(() => {
    if (cartData.length > 0) {
      dispatch(
        saveCart({
          userId: "6872099025ed9ff252db2ab5",
          cartItems: cartData,
          TotalPrice: cartAllValue.TotalPrice,
          TotalQuantity: cartAllValue.TotalQuantity,
        })
      );
    }
  }, [cartData, cartAllValue.TotalPrice, cartAllValue.TotalQuantity, dispatch]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={() => navigate("/")}
          className="absolute top-3 right-3 text-gray-500 hover:text-green-500 text-xl"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-green-500 text-center mb-4">
          Your Cart 🛒
        </h2>

        {cartData.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          cartData.map((value) => (
            <div key={value._id} className="flex items-center gap-5 py-4 border-b">
              <img
                src={`http://localhost:5000/uploads/${value.productImage}`}
                alt="Product"
                className="w-16 h-16 object-cover rounded border"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-700">{value.productName}</h3>
                <p className="text-sm text-gray-500">Price:- ₹{value.productPrice}</p>

                <div className="flex items-center mt-2 gap-2">
                  <button
                    className="text-green-500 text-2xl"
                    onClick={() => dispatch(DecrementQuantity(value))}
                  >
                    <CiSquareMinus />
                  </button>

                  <span>{value.quantity}</span>

                  <button
                    className="text-green-500 text-2xl"
                    onClick={() => dispatch(IncrementQuantity(value))}
                  >
                    <CiSquarePlus />
                  </button>
                </div>
              </div>

              <p className="font-bold text-green-500">
                ₹{value.quantity * value.productPrice}
              </p>

              <FaTrash
                className="text-gray-500 hover:text-red-500 cursor-pointer"
                onClick={() => dispatch(deleteCartItems(value))}
              />
            </div>
          ))
        )}

        <div className="mt-6 text-right">
          <p className="text-lg font-semibold">
            Total Price:-{" "}
            <span className="text-green-500">₹ {cartAllValue.TotalPrice}</span>
          </p>

          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded">
            CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;