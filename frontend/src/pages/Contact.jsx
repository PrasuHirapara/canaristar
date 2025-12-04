import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createContactUs,
  getContactUsByEmail,
  getContactUsById,
  resetContactUsSlice,
} from "../store/slices/contactUsSlice";
import {
  getAllContactUs,
  getContactUsBetween,
  getContactUsByStatus,
  resetAdminContactUsSlice,
  sendAdminReply,
} from "../store/slices/adminContactUsSlice";
import { toast } from "react-toastify";
import { getUserById } from "../store/slices/userSlice";
import ContactForm from "../components/ContactForm";
import { Link } from "react-router-dom";
import { formatDateTime } from "../utils/formatDateTime";

const Contact = () => {
  const dispatch = useDispatch();

  const {
    list,
    contact,
    error: err,
    message: msg,
    loading,
  } = useSelector((state) => state.contactUs);
  const {
    list: adminList,
    updated,
    error,
    message,
    loading: loading1,
  } = useSelector((state) => state.adminContactUs);
  const { user } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
      dispatch(resetContactUsSlice());
    }
    if (err) {
      toast.error(err);
      dispatch(resetContactUsSlice());
    }
    if (message) {
      toast.success(message);
      dispatch(resetAdminContactUsSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminContactUsSlice());
    }
  }, [dispatch, message, error, err, msg]);

  const handleCreateContactUs = (formData) => {
    dispatch(createContactUs(formData));
    // console.log([...formData.entries()]);
  };

  useEffect(() => {
    if (user) {
      dispatch(getContactUsByEmail(user?.email));
      dispatch(getAllContactUs());
      // console.log(list);
      // console.log(adminList);
    }
  }, [dispatch, user]);

  const handleUpdateContactUs = () => {
    const data = {
      name: "John Updated",
      mobile: "9999999999",
      description: "Updated description",
    };
    dispatch(updateContactUs(id, data));
  };

  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    if (user) {
      if (status === "ALL") {
        dispatch(getAllContactUs());
      } else {
        dispatch(getContactUsByStatus(status));
      }
    }
  }, [status, dispatch]);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  };

  const [start, setStart] = useState("2025-11-11T00:00:01");
  const [end, setEnd] = useState(getCurrentDateTime());

  const handleGetContactUsBetween = () => {
    dispatch(getContactUsBetween(start, end));
  };

  return (
    <div className="min-h-screen pt-16">
      <h2 className="text-center font-semibold my-2 text-2xl">
        Contact Us Page
      </h2>
      <hr />
      {/* for user */}
      <div>
        <h3 className="text-center font-semibold text-2xl my-2">for User</h3>
        <ContactForm onSubmit={handleCreateContactUs} user={user} />
        {loading && <p className="text-red-500 font-semibold">Loading...</p>}

        {user && (
          <>
            {list?.length > 0 && (
              <table className="border m-5 text-left text-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-amber-900/70 text-white">
                  <tr>
                    <th className="p-3 border">Sr. No.</th>
                    <th className="p-3 border">Date</th>
                    <th className="p-3 border">Title</th>
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Mobile</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">View</th>
                  </tr>
                </thead>

                <tbody className="border-2">
                  {list.map((item, ind) => (
                    <tr
                      key={ind}
                      className="border hover:bg-white/5 transition"
                    >
                      <td className="p-3 border">{ind + 1}</td>
                      <td className="p-3 border">
                        {formatDateTime(item?.createdDate)}
                      </td>
                      <td className="p-3 border">{item?.title}</td>
                      <td className="p-3 border">{item?.name}</td>
                      <td className="p-3 border">{item?.email}</td>
                      <td className="p-3 border">{item?.mobile}</td>

                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-md text-sm font-semibold tracking-wide
              ${
                item?.status === "PENDING"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : item?.status === "RESOLVED"
                  ? "bg-green-500/20 text-green-400"
                  : item?.status === "REJECTED"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-gray-500/20 text-gray-300"
              }
            `}
                        >
                          {item?.status}
                        </span>
                      </td>
                      <td className="p-3 border ">
                        <Link
                          to={`/contact-details/${item?.id}`}
                          className="bg-blue-500/15 text-blue-500 font-semibold py-0.5 px-2 rounded hover:bg-blue-500/20"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>

      {/* for admin */}
      {user?.role === "ADMIN" && (
        <div className="mt-10">
          <hr />
          <h3 className="my-5 text-center font-semibold text-2xl">For Admin</h3>

          {/* FILTER SECTION */}
          <div className="flex flex-col gap-5 border rounded-lg px-3 py-4 m-5">
            {/* Status Select */}
            <div className="flex gap-3">
              <p>Select Category</p>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="outline-none border border-black/30 rounded px-6 bg-amber-700 text-white"
              >
                <option value="ALL">ALL</option>
                <option value="PENDING">PENDING</option>
                <option value="PROGRESS">PROGRESS</option>
                <option value="HOLD">HOLD</option>
                <option value="DECLINED">DECLINED</option>
                <option value="REOPENED">REOPENED</option>
                <option value="CLOSED">CLOSED</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>

            {/* DATE INPUTS */}
            <div className="flex flex-col md:flex-row gap-5 justify-between">
              <label className="font-medium">
                Start:
                <input
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="ml-2 border px-2 py-1 rounded bg-transparent"
                />
              </label>

              <label className="font-medium">
                End:
                <input
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="ml-2 border px-2 py-1 rounded bg-transparent"
                />
              </label>

              <button
                onClick={handleGetContactUsBetween}
                className="bg-amber-700 text-white py-1 px-5 rounded"
              >
                Filter by Date
              </button>
            </div>
          </div>

          {/* TABLE SECTION */}
          {adminList?.length > 0 ? (
            <table className="border text-left text-gray-800 rounded-lg overflow-hidden m-5">
              <thead className="bg-amber-900/70 text-white">
                <tr>
                  <th className="p-3 border">Sr. No.</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Mobile</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">View</th>
                </tr>
              </thead>

              <tbody>
                {adminList.map((item, i) => (
                  <tr key={i} className="border hover:bg-white/5 transition">
                    <td className="p-3 border">{i + 1}</td>
                    <td className="p-3 border">
                      {formatDateTime(item?.createdDate)}
                    </td>
                    <td className="p-3 border">{item?.title}</td>
                    <td className="p-3 border">{item?.name}</td>
                    <td className="p-3 border">{item?.email}</td>
                    <td className="p-3 border">{item?.mobile}</td>

                    <td className="p-3 border">
                      <span
                        className={`px-3 py-1 rounded-md text-sm font-semibold tracking-wide
                    ${
                      item?.status === "PENDING"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : item?.status === "RESOLVED"
                        ? "bg-green-500/20 text-green-400"
                        : item?.status === "REJECTED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gray-500/20 text-gray-400"
                    }
                  `}
                      >
                        {item?.status}
                      </span>
                    </td>
                    <td className="p-3 border">
                      <Link
                        to={`/contact-details/${item?.id}`}
                        className="bg-blue-500/15 text-blue-500 font-semibold py-0.5 px-2 rounded hover:bg-blue-500/20"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-500 font-semibold text-center">
              No contacts found for: <strong>{status}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Contact;
