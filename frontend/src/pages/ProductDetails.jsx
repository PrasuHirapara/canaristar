import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductById,
  resetProductsSlice,
} from "../store/slices/productsSlice";
import { toast } from "react-toastify";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProductById(id));
    console.log(product);
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetProductsSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetProductsSlice());
    }
  }, [dispatch, message, error]);

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl min-h-screen mx-auto">
      {/* Product Title */}
      <h3 className="text-2xl font-bold mb-4 text-gray-800">
        {product?.productName}
      </h3>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Images Section */}
        <div>
          {/* Main Image */}
          <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100 shadow">
            <img
              src={product?.imageUrls?.[0] || "/images/logo.jpg"}
              alt={product?.productName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* All Images Gallery */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {product?.imageUrls?.map((url, ind) => (
              <img
                src={url}
                key={ind}
                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div>
          {/* Status Badges */}
          <div className="flex gap-3 mb-4">
            {product?.active && (
              <span className="px-3 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                Active
              </span>
            )}
            {product?.featured && (
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Price Section */}
          <div className="mb-4">
            <p className="text-gray-500 text-sm line-through">
              MRP: ₹{product?.mrpPrice}
            </p>
            <p className="text-2xl font-bold text-green-600">
              ₹{product?.sellingPrice}
            </p>
          </div>

          {/* Category Info */}
          <div className="text-sm text-gray-700 space-y-1 mb-4">
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product?.productCategory}
            </p>
            <p>
              <span className="font-semibold">Sub-Category:</span>{" "}
              {product?.productSubCategory}
            </p>
            <p>
              <span className="font-semibold">Weight:</span> {product?.weight}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed text-sm">
            {product?.productDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
