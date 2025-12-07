import {
  Calendar,
  IndianRupee,
  ShoppingBag,
  Users,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDayData,
  getDayDataByDate,
  getRangeData,
  getTodayData,
  resetTodayDayData,
} from "../store/slices/adminDayDataSlice";

const AdminDayData = () => {
  const dispatch = useDispatch();

  const { loading, message, today, all, byDate, range, resetMessage } =
    useSelector((state) => state.adminDayData);

  const currentDateTime = new Date().toISOString().slice(0, 16);

  const [date, setDate] = useState("2025-11-30T00:00");
  const [startDate, setStartDate] = useState("2025-11-11T00:00");
  const [endDate, setEndDate] = useState(currentDateTime);

  useEffect(() => {
    dispatch(getAllDayData());
    dispatch(getTodayData());
    dispatch(resetTodayDayData());
  }, []);

  useEffect(() => {
    dispatch(getRangeData(startDate, endDate));
  }, [dispatch, startDate, endDate]);

  useEffect(() => {
    dispatch(getDayDataByDate(date));
    // console.log("by date:", byDate);
  }, [dispatch, date]);

  return (
    <div className="border rounded p-2 w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Admin Day Data</h2>

      {/* Today */}
      <div className="mt-6 bg-amber-600/5 p-3 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Today Data</h2>

        <div className="bg-white border-l-4 border-amber-600 shadow-md rounded-lg p-5 space-y-3">
          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-gray-800">Date:</span>
            <span>{today?.date}</span>
          </div>

          {/* <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold text-gray-800">ID:</span> {today?.id}
          </p> */}

          {/* New Users */}
          <div className="flex items-center gap-2 text-gray-600">
            <Users className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-gray-800">New Users:</span>
            <span>{today?.newUsers}</span>
          </div>

          {/* Order IDs */}
          {today?.orderIds?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-gray-600 mb-1">
                <ShoppingBag className="w-5 h-5 text-amber-700" />
                <span className="font-semibold text-gray-800">Orders:</span>
              </div>
              <div className="ml-7 flex flex-wrap gap-2">
                {today.orderIds.map((order, i) => (
                  <p
                    key={i}
                    className="text-xs bg-amber-100 text-amber-700 px-2 py-[2px] rounded shadow-sm"
                  >
                    {order}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* <p>productViews: {today.productViews}</p> */}

          {/* Revenue */}
          <div className="flex items-center gap-2 text-gray-600">
            <IndianRupee className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-gray-800">Revenue:</span>
            <span>₹{today?.revenue}</span>
          </div>

          {/* Visitors */}
          <div className="flex items-center gap-2 text-gray-600">
            <UsersRound className="w-5 h-5 text-amber-700" />
            <span className="font-semibold text-gray-800">Visitors:</span>
            <span>{today?.visitors}</span>
          </div>
        </div>
      </div>

      {/* all */}
      <div className="mt-6 bg-amber-800/5 p-2 rounded">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Data</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {all?.map((product, ind) => (
            <div
              key={ind}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Date:</span>{" "}
                {product.date}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">ID:</span>{" "}
                {product.id}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">New Users:</span>{" "}
                {product.newUsers}
              </p>

              {/* Order IDs */}
              {product?.orderIds?.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Orders:</span>
                  <div className="ml-2 mt-1">
                    {product.orderIds.map((order, i) => (
                      <p
                        key={i}
                        className="text-xs bg-blue-100 text-blue-700 w-fit px-2 py-[2px] rounded mb-1"
                      >
                        {order}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Revenue:</span> ₹
                {product.revenue}
              </p>

              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Visitors:</span>{" "}
                {product.visitors}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* byDate */}
      <div className="mt-6 bg-amber-800/5 p-2 rounded">
        <h2 className="text-xl font-bold mb-4 text-gray-800">By Date</h2>
        {/* Date Range Picker */}
        <label className="flex items-center gap-2 text-gray-700">
          <Calendar size={18} />
          Date:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="ml-2 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
      </div>

      {/* range */}
      <div className="mt-6 bg-amber-800/5 p-2 rounded">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Range</h2>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {range?.map((product, ind) => (
            <div
              key={ind}
              className="bg-white shadow-md rounded-lg p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Date:</span>{" "}
                {product.date}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">ID:</span>{" "}
                {product.id}
              </p>

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">New Users:</span>{" "}
                {product.newUsers}
              </p>

              {/* Order IDs */}
              {product?.orderIds?.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-700">Orders:</span>
                  <div className="ml-2 mt-1">
                    {product.orderIds.map((order, i) => (
                      <p
                        key={i}
                        className="text-xs bg-blue-100 text-blue-700 w-fit px-2 py-[2px] rounded mb-1"
                      >
                        {order}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500 mb-1">
                <span className="font-semibold text-gray-700">Revenue:</span> ₹
                {product.revenue}
              </p>

              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-700">Visitors:</span>{" "}
                {product.visitors}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* resetMessage */}
      <div className="mt-6 bg-amber-800/5 p-2 rounded">
        Reset Message: {resetMessage}
      </div>
    </div>
  );
};

export default AdminDayData;
