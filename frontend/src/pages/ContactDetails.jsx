import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  resetAdminContactUsSlice,
  sendAdminReply,
} from "../store/slices/adminContactUsSlice";
import {
  getContactUsById,
  resetContactUsSlice,
} from "../store/slices/contactUsSlice";
import { getUserById } from "../store/slices/userSlice";
import { formatDateTime } from "../utils/formatDateTime";

const ContactDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    contact,
    error: err,
    message: msg,
  } = useSelector((state) => state.contactUs);
  const { message: adminMsg, error: adminErr } = useSelector(
    (state) => state.adminContactUs
  );

  const { user } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.auth);

  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("PENDING");

  useEffect(() => {
    if (userId) dispatch(getUserById(userId));
    if (id) dispatch(getContactUsById(id));
    // console.log(contact);
  }, [dispatch, userId, id]);

  useEffect(() => {
    if (msg) {
      toast.success(msg);
      dispatch(resetContactUsSlice());
    }
    if (err) {
      toast.error(err);
      dispatch(resetContactUsSlice());
    }
    if (adminMsg) {
      toast.success(adminMsg);
      dispatch(resetAdminContactUsSlice());
    }
    if (adminErr) {
      toast.error(adminErr);
      dispatch(resetAdminContactUsSlice());
    }
  }, [msg, err, adminMsg, adminErr, dispatch]);

  const handleSendReply = () => {
    if (!reply.trim()) return toast.error("Please enter a reply");

    const data = {
      id: contact?.id,
      title: contact?.title,
      name: contact?.name,
      email: contact?.email,
      mobile: contact?.mobile,
      description: contact?.description,
      reply: { message: reply.trim() },
      status: status,
    };

    dispatch(sendAdminReply(id, data));

    setReply("");
    setStatus("PENDING");
  };

  return (
    <div className="pt-16">
      <h2 className="text-xl font-semibold m-3">Contact Details</h2>

      <div className="m-5 rounded-xl border bg-amber-900 backdrop-blur p-5 shadow-lg space-y-4">
        {/* Date */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Date:</p>
          <p className="text-gray-100">
            {contact?.createdDate && formatDateTime(contact.createdDate)}
          </p>
        </div>

        {/* Title */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Title:</p>
          <p className="text-gray-100">{contact?.title}</p>
        </div>

        {/* Name */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Name:</p>
          <p className="text-gray-100">{contact?.name}</p>
        </div>

        {/* Email */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Email:</p>
          <p className="text-gray-100">{contact?.email}</p>
        </div>

        {/* Mobile */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Mobile:</p>
          <p className="text-gray-100">{contact?.mobile}</p>
        </div>

        {/* Description */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Description:</p>
          <p className="text-gray-100 leading-relaxed">
            {contact?.description}
          </p>
        </div>

        {/* Reply */}
        {contact?.reply?.message && (
          <div className="flex gap-5 border-b border-white/10 pb-3">
            <p className="font-medium text-gray-300">Reply:</p>
            <p className="text-gray-100">{contact.reply.message}</p>
          </div>
        )}

        {/* Status */}
        <div className="flex gap-5 border-b border-white/10 pb-3">
          <p className="font-medium text-gray-300">Status:</p>
          <span
            className={`px-3 py-1 rounded-md text-sm font-semibold tracking-wide
        ${
          contact?.status === "PENDING"
            ? "bg-yellow-500/20 text-yellow-300"
            : contact?.status === "RESOLVED"
            ? "bg-green-500/20 text-green-300"
            : contact?.status === "REJECTED"
            ? "bg-red-500/20 text-red-300"
            : "bg-gray-500/20 text-gray-300"
        }
      `}
          >
            {contact?.status}
          </span>
        </div>

        {/* Images */}
        {contact?.imageUrls?.length > 0 && (
          <div className="space-y-2">
            <p className="font-medium text-gray-300">Attached Images</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {contact.imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  className="rounded-lg shadow-md border border-white/10 hover:scale-105 transition-transform"
                  alt={`Attachment ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ADMIN SECTION */}
      {user?.role === "ADMIN" && (
        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <h3 className="font-semibold mb-2">Send Admin Reply</h3>

          {/* Reply Input */}
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Enter reply..."
            className="border rounded-lg px-3 py-2 w-full mb-3"
          />

          {/* Status Select */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg px-3 py-2 mb-3 w-full"
          >
            <option value="PENDING">PENDING</option>
            <option value="RESOLVED">RESOLVED</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="HOLD">HOLD</option>
            <option value="DECLINED">DECLINED</option>
            <option value="REOPENED">REOPENED</option>
            <option value="CLOSED">CLOSED</option>
          </select>

          <button
            onClick={handleSendReply}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Send Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactDetails;
