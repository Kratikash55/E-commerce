import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import Category from "../components/Category";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState("All");

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  async function productsData(selectCategory = "All") {
    try {
      const response = await fetch(
        `http://localhost:5000/api/userproducts?category=${selectCategory}&search=${search}`
      );

      const record = await response.json();

      if (response.ok) {
        setProduct(record.data);
      } else {
        console.log(record);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    productsData(category);
  }, [category, search]);

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <Category onSelectCategory={setCategory} />

      <h2 className="text-2xl font-semibold text-gray-600 mb-6">
        Trending Products 🔥
      </h2>

      {product.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No products found
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-7">
          {product.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
            >
              <img
                src={`http://localhost:5000/uploads/${item.productImage}`}
                alt={item.productName}
                className="w-full h-48 object-cover rounded"
              />

              <h3 className="mt-2 font-medium text-gray-700">
                {item.productName}
              </h3>

              <p className="text-green-600 font-bold">
                Price:- ₹{item.productPrice}
              </p>

              <button
                onClick={() => dispatch(addToCart(item))}
                className="mt-2 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700"
              >
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;