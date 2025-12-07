import { Calendar, DollarSign, Eye, Hash, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRevenueBetween,
  getTotalRevenue,
} from "../store/slices/adminAnalyticsSlice";
import {
  getTopOrderedProducts,
  getTopRatedProducts,
  getTopViewedProducts,
} from "../store/slices/analyticsSlice";
import { getUserById } from "../store/slices/userSlice";
import { formatDateTime } from "../utils/formatDateTime";

const Analytics = () => {
  const dispatch = useDispatch();

  const { loading, error, topViewed, topOrdered, topRated } = useSelector(
    (state) => state.analytics
  );
  const { userId, isAuthenticated } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user);
  const {
    loading: loading1,
    totalRevenue,
    revenueBetween,
  } = useSelector((state) => state.adminAnalytics);

  const currentDateTime = new Date().toISOString().slice(0, 16);

  const [startDate, setStartDate] = useState("2025-11-11T00:00");
  const [endDate, setEndDate] = useState(currentDateTime);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTopViewedProducts());
    dispatch(getTopOrderedProducts());
    dispatch(getTopRatedProducts());
    dispatch(getTotalRevenue());
    // console.log(topViewed);
    // console.log(topOrdered);
    // console.log(topRated);
  }, []);

  useEffect(() => {
    dispatch(getRevenueBetween(startDate, endDate));
  }, [dispatch, startDate, endDate]);

  return (
    <div className="pt-16 px-4">
      <h2 className="text-2xl font-bold text-black"> Analytics</h2>

      <hr className="my-3" />

      <div>
        <h2 className="text-xl font-bold mb-6 text-black">User Analytics</h2>

        {loading && (
          <p className="bg-red-500/10 text-red-500 px-4 py-2 rounded mb-4">
            Loading...
          </p>
        )}

        {/* --- Top Viewed Products --- */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            <Eye size={20} /> Top Viewed Products
          </h3>
          {topViewed?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topViewed.map((product, ind) => (
                <Link
                  key={ind}
                  to={`/product-details/${product.productId}`}
                  className="p-4 bg-black/5 rounded-lg border border-black/10 
                       hover:bg-black/10 hover:border-black/20 transition"
                >
                  <p>{product.productId}</p>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Eye size={16} /> <span>{product.productViews}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} /> <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm flex justify-between">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {product.totalRatingCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash size={14} /> {product.totalRatingSum}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Top Viewed Product Not Found</p>
          )}
        </div>

        {/* --- Top Ordered Products --- */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            Top Ordered Products
          </h3>
          {topOrdered?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topOrdered.map((product, ind) => (
                <Link
                  key={ind}
                  to={`/product-details/${product.productId}`}
                  className="p-4 bg-black/5 rounded-lg border border-black/10 
                       hover:bg-black/10 hover:border-black/20 transition"
                >
                  <p>{product.productId}</p>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Eye size={16} /> <span>{product.productViews}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} /> <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm flex justify-between">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {product.totalRatingCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash size={14} /> {product.totalRatingSum}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Top Ordered Product Not Found</p>
          )}
        </div>

        {/* --- Top Rated Products --- */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
            Top Rated Products
          </h3>
          {topRated?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRated.map((product, ind) => (
                <Link
                  key={ind}
                  to={`/product-details/${product.productId}`}
                  className="p-4 bg-black/5 rounded-lg border border-black/10 
                       hover:bg-black/10 hover:border-black/20 transition"
                >
                  <p>{product.productId}</p>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-1 text-blue-400">
                      <Eye size={16} /> <span>{product.productViews}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={16} /> <span>{product.rating}</span>
                    </div>
                  </div>
                  <div className="text-gray-700 text-sm flex justify-between">
                    <span className="flex items-center gap-1">
                      <Users size={14} /> {product.totalRatingCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Hash size={14} /> {product.totalRatingSum}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Top Rated Product Not Found</p>
          )}
        </div>
      </div>

      {user?.role === "ADMIN" && (
        <>
          <hr className="my-3" />
          <div className="mb-5">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Admin Analytics
            </h2>

            {loading1 && (
              <p className="bg-red-500/10 text-red-500 px-4 py-2 rounded mb-4">
                Loading...
              </p>
            )}

            {/* Date Range Picker */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center">
              <label className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} />
                Start Date:
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="ml-2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>

              <label className="flex items-center gap-2 text-gray-700">
                <Calendar size={18} />
                End Date:
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="ml-2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </label>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-blue-500">
                  <DollarSign size={20} />
                  <h3 className="text-lg font-semibold">Total Revenue</h3>
                </div>
                <p className="text-2xl font-bold text-gray-800">
                  {totalRevenue}
                </p>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-green-500">
                  <Calendar size={20} />
                  <h3 className="text-lg font-semibold">
                    Revenue Between Dates
                  </h3>
                </div>
                <p className="text-gray-700">
                  {revenueBetween} (
                  <span className="text-amber-500 font-semibold"> from </span>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(startDate)}
                  </span>
                  <span className="text-amber-500 font-semibold"> to </span>
                  <span className="text-sm text-gray-500">
                    {formatDateTime(endDate)}{" "}
                  </span>
                  )
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
