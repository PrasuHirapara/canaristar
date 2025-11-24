import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-200">
      {/* Product Image */}
      <div className="w-full mb-4 overflow-hidden rounded-lg bg-gray-100">
        <img src={product?.imageUrls?.[0] || ""} alt={product?.productName} />
      </div>

      {/* Name */}
      <h3 className="text-xl font-semibold mb-2">{product?.productName}</h3>

      {/* Status Badges */}
      <div className="flex gap-3 mb-3">
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
      <div className="mb-3">
        <p className="text-gray-600 text-sm line-through">
          MRP: ₹{product?.mrpPrice}
        </p>
        <p className="text-lg font-bold text-green-600">
          Selling: ₹{product?.sellingPrice}
        </p>
      </div>

      {/* Category Info */}
      <div className="text-sm text-gray-700 mb-3">
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
      <p className="text-gray-600 text-sm leading-relaxed">
        {product?.productDescription}
      </p>
    </div>
  );
};

export default ProductCard;
