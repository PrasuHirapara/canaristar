import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-[url(/images/bg.jpg)] min-h-screen pt-10">
      <form
        onSubmit={handleOtpVerification}
        className="w-[40vw] h-[80vh] pt-10 m-auto text-gray-300 rounded-lg p-5 flex justify-between flex-col backdrop-blur-[3px] bg-black/10"
      >
        <div className="flex justify-between">
          <h2 className="text-white font-bold text-2xl">Enter OTP</h2>
          <img
            draggable="false"
            loading="lazy"
            src="images/logo.jpg"
            className="h-6 dark:brightness-125 dark:contrast-125"
          />
        </div>
        <p>check your {email} mailbox</p>
        <p>please enter the OTP to proceed</p>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="enter otp"
          className="w-full px-4 py-2 rounded-md bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-amber-700"
        />
        <button
          type="submit"
          className="w-full py-2 text-white bg-amber-900 rounded-md hover:bg-amber-800"
        >
          VERIFY
        </button>
      </form>
    </div>
  );
};

export default OTP;
