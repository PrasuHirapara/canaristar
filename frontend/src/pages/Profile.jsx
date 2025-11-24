import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import {
  getAllUsers,
  makeAdmin,
  resetAdminSlice,
} from "../store/slices/adminSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { users, loading, error, message } = useSelector(
    (state) => state.admin
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [email, setEmail] = useState("");

  const handleMakeAdmin = (e) => {
    e.preventDefault();
    if (email === "") {
      alert("please enter valid email! ⚠");
      return;
    }
    const data = {
      email: email,
      password: "randomvalue(not true)",
    };
    dispatch(makeAdmin(data));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAdminSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAdminSlice());
    }
  }, [dispatch, message, error]);

  return (
    <div className="min-h-[88vh] flex flex-col items-center gap-5 p-5">
      <h2>Profile</h2>

      {isAuthenticated ? (
        <>
          <button
            onClick={handleLogout}
            className="bg-red-500 rounded-lg text-white py-1 px-3"
          >
            Logout
          </button>
          <div className="bg-amber-950/5 p-10 flex gap-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="enter email for make admin..."
              className="border border-black/20 rounded-lg px-3 py-1"
            />
            <button
              onClick={handleMakeAdmin}
              className="bg-amber-900 px-4 py-2 rounded text-white"
            >
              Make Admin
            </button>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">All Users</h2>

            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="px-4 py-3 text-left">Sr. No.</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Mobile</th>
                    <th className="px-4 py-3 text-left">Role</th>
                    <th className="px-4 py-3 text-left">Address</th>
                  </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                  {users?.map((user, ind) => (
                    <tr
                      key={ind}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{ind + 1}</td>
                      <td className="px-4 py-3 font-medium">{user?.name}</td>
                      <td className="px-4 py-3">{user?.email}</td>
                      <td className="px-4 py-3">{user?.mobile}</td>
                      <td className="px-4 py-3 capitalize">{user?.role}</td>
                      <td className="px-4 py-3">
                        {user?.address?.street}, {user?.address?.city},
                        {user?.address?.country}, {user?.address?.state} -
                        {user?.address?.postalCode}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <p>
          Not signed in yet?{" "}
          <Link to="/login" className="underline text-blue-500">
            Login
          </Link>{" "}
          here
        </p>
      )}
    </div>
  );
};

export default Profile;
