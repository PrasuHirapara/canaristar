import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllProductAnalytics,
  getProductAnalyticsById,
} from "../store/slices/adminProductDataSlice";

const AdminProductData = () => {
  const dispatch = useDispatch();

  const { loading, error, all } = useSelector(
    (state) => state.adminProductData
  );

  useEffect(() => {
    dispatch(getAllProductAnalytics());
    // console.log("All: ", all);
  }, []);

  return (
    <div className="border rounded p-2 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        AdminProductData
      </h2>
      {loading && (
        <p className="text-blue-500 font-bold text-lg">Loading....</p>
      )}
      {error && (
        <p className="text-red-500 font-bold text-lg">Error: {error}</p>
      )}
      {all?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            All Product Analytics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {all?.map((product, ind) => (
              <Link
                to={`/admin-product-data-details/${product?.productId}`}
                key={ind}
                className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
              >
                {/* Orders */}
                {product?.orderId?.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Orders:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.orderId.map((order, i) => (
                        <span
                          key={i}
                          className="text-xs bg-amber-100 text-amber-700 px-2 py-[2px] rounded"
                        >
                          {order}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Product ID */}
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Product ID:</span>{" "}
                  {product?.productId}
                </p>

                {/* Product Views */}
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Views:</span>{" "}
                  {product?.productViews}
                </p>

                {/* Rating */}
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Rating:</span>{" "}
                  {product?.rating}
                </p>

                {/* Total Rating Count */}
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">Rating Count:</span>{" "}
                  {product?.totalRatingCount}
                </p>

                {/* Total Rating Sum */}
                <p className="text-gray-700">
                  <span className="font-semibold">Rating Sum:</span>{" "}
                  {product?.totalRatingSum}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductData;
