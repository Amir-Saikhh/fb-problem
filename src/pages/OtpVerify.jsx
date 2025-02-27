import React, { useEffect, useRef, useState } from "react";
import { IoFingerPrintSharp } from "react-icons/io5";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Timer from "../components/Timer";
import axios from "axios";
import { API_END_POINT } from "../constant/constantApi";
import toast from "react-hot-toast";
const OtpVerify = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const OnsubmitHandler = async (data) => {
      try {
        const res = await axios.post(`${API_END_POINT}/verify-otp`, data);
        if(res.data.success){
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/update-password")
          }, 1000);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
  };
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // Auto-focus first input
    }
  }, []);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const optArry = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/, ""); // Allow only numbers
    const newOtp = [...otp];
    optArry[index](e.target.value);
    if (value) {
      newOtp[index] = value.slice(-1); // Keep only last digit
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus(); // Move to next input
      }
    } else {
      newOtp[index] = ""; // Clear input on empty value
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move back on backspace
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(OnsubmitHandler)}
        className="bg-white shadow-lg rounded-lg px-6 py-4 mt-[-3rem] h-full pb-10 w-fit max-w-md"
      >
        <div className="flex justify-center text-3xl  text-blue-500 mb-4">
          <IoFingerPrintSharp />
        </div>
        <h1 className="text-xl font-semibold text-center">Verify Your OTP</h1>
        <p className="text-sm text-gray-600 text-center mt-2 mb-6">
          Enter the 6-digit OTP we just sent to your email
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              // {...register("otpp", { required: "OTP is required" })}
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
             
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none  appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button:hidden [-moz-appearance:textfield] hover:border-blue-500"
            />
          ))}
        </div>
       {/* {errors?.otpp && <p className="text-red-500 text-xs lg:text-lg">{errors?.otpp?.message}</p>} */}
        <div className="mt-6">
          <button
          disabled={isSubmitting}
            type="submit"
            className="w-full bg-green-500 cursor-pointer text-white font-bold py-2 rounded-lg hover:bg-green-600 transition"
          >
           {isSubmitting ? "Please wait..." : " Verify"}
          </button>
        </div>

        <div className="flex justify-center items-center gap-2">
          {/* Resend OTP */}
          <div className="text-center mt-4">
            <span className="text-[#888] pr-2 text-sm">
              {" "}
              Didn't receive the OTP?
            </span>
            <button className="text-blue-500 cursor-pointer hover:underline">
              Resend
            </button>
          </div>
          <center className="text-[14px] text-blue-500 mt-4 select-none">
            <Timer />
          </center>
        </div>
        {/* Back to Login */}
        <div className="flex justify-center select-none items-center mt-6 bg-blue-500 text-white py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition">
          <MdKeyboardBackspace className="text-2xl" />
          <Link to="/" className="ml-2 font-bold">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default OtpVerify;
