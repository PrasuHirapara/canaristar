import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductAnalyticsById } from "../store/slices/adminProductDataSlice";
import { Package, ShoppingBag, Eye, Star, Hash, Sigma } from "lucide-react";

const AdminProductDataDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    loading,
    error,
    single: product,
  } = useSelector((state) => state.adminProductData);

  useEffect(() => {
    dispatch(getProductAnalyticsById(id));
    // console.log(product);
  }, []);

  return (
    <div className="pt-16 p-6 bg-white rounded-xl shadow-md max-w-4xl min-h-screen mx-auto">
      {loading && (
        <p className="text-blue-500 font-bold text-lg">Loading....</p>
      )}
      {error && (
        <p className="text-red-500 font-bold text-lg">Error: {error}</p>
      )}

      <h1 className="text-2xl font-semibold my-2 text-gray-700 text-center">
        Product Data
      </h1>

      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-xl transition-all duration-300">
        {/* Product ID */}
        <p className="text-gray-700 mb-3 flex items-center gap-2">
          <Package size={18} className="text-amber-600" />
          <span className="font-semibold">Product ID:</span>{" "}
          {product?.productId}
        </p>

        {/* Orders */}
        {product?.orderId?.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-2">
              <ShoppingBag size={18} className="text-green-600" />
              Orders:
            </p>
            <div className="flex flex-wrap gap-2">
              {product.orderId.map((order, i) => (
                <span
                  key={i}
                  className="text-xs bg-amber-100 text-amber-700 px-2 py-[2px] rounded shadow-sm"
                >
                  {order}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Views */}
        <p className="text-gray-700 mb-2 flex items-center gap-2">
          <Eye size={18} className="text-blue-600" />
          <span className="font-semibold">Views:</span> {product?.productViews}
        </p>

        {/* Rating */}
        <p className="text-gray-700 mb-2 flex items-center gap-2">
          <Star size={18} className="text-yellow-500" />
          <span className="font-semibold">Rating:</span> {product?.rating}
        </p>

        {/* Total Rating Count */}
        <p className="text-gray-700 mb-2 flex items-center gap-2">
          <Hash size={18} className="text-purple-600" />
          <span className="font-semibold">Rating Count:</span>{" "}
          {product?.totalRatingCount}
        </p>

        {/* Total Rating Sum */}
        <p className="text-gray-700 flex items-center gap-2">
          <Sigma size={18} className="text-red-600" />
          <span className="font-semibold">Rating Sum:</span>{" "}
          {product?.totalRatingSum}
        </p>
      </div>
    </div>
  );
};

export default AdminProductDataDetails;
