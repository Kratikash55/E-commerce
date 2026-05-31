import React, { useState } from "react";
import Slidebar from "./Slidebar";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddProducts = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    Pname: "",
    price: "",
    cat: "",
  });

  const [pimage, setPimage] = useState("");

  // Handle Input Change
  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  // Handle Form Submit
  async function handleForm(e) {
    e.preventDefault();

    const formdata = new FormData();

    // SAME names as backend req.body
    formdata.append("Pname", product.Pname);
    formdata.append("price", product.price);
    formdata.append("cat", product.cat);

    // SAME name as multer upload.single("image")
    formdata.append("image", pimage);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/addadminproduct`, {
        method: "POST",
        body: formdata,
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        toast.success(result.message);

        // Reset Form
        setProduct({
          Pname: "",
          price: "",
          cat: "",
        });

        setPimage("");

        navigate("/admin/products");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="flex mt-16">
      <Slidebar />

      <div className="flex-1 p-10 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Add Products 💹
        </h1>

        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 flex items-center gap-1"
          onClick={() => {
            navigate("/admin/products");
          }}
        >
          <IoArrowBackCircleOutline />
          Back
        </button>

        <form
          encType="multipart/form-data"
          onSubmit={handleForm}
          className="bg-white shadow-md rounded-xl p-6 max-w-2xl mx-auto space-y-6 mt-6"
        >
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Product Name
            </label>

            <input
              type="text"
              required
              name="Pname"
              value={product.Pname}
              onChange={handleChange}
              placeholder="Eg. Fresh Fruits"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Price ₹
            </label>

            <input
              type="number"
              required
              value={product.price}
              onChange={handleChange}
              name="price"
              placeholder="Eg. ₹99"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Categories
            </label>

            <select
              name="cat"
              onChange={handleChange}
              value={product.cat}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">--Select--</option>
              <option value="cafe">Cafe</option>
              <option value="home">Home</option>
              <option value="fresh">Fresh</option>
              <option value="toys">Toys</option>
              <option value="electronic">Electronics</option>
              <option value="mobile">Mobile</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-gray-700 object-contain font-medium mb-1">
              Product Image
            </label>

            <input
              type="file"
              required
              onChange={(e) => {
                setPimage(e.target.files[0]);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;