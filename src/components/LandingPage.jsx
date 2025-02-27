import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_END_POINT } from "../constant/constantApi";
import toast from "react-hot-toast";
import  Loader  from "./Loader";



const LandingPage = () => {
  document.title = "Facebook - log in or sign up";
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post(`${API_END_POINT}/login`, data);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/home");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full h-full  flex justify-center items-center  bg-[#F2F4F7] py-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-6xl">
        {/* Left Section */}
        <div className="text-center lg:text-left lg:w-1/2 px-5">
          <img
            className="lg:w-[320px] w-[150px] mx-auto  lg:mx-0"
            src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
            alt="Facebook Logo"
          />
          <h1 className="text-gray-700 text-sm lg:pl-6 lg:text-lg text-wrap lg:w-md mt-2 mb-6 text-start">
            Facebook helps you connect and share with the people in your life.
          </h1>
        </div>

        {/* Right Section (Login Form) */}
        <div className="lg:w-1/3 w-[90%] bg-white p-6 rounded-md shadow-lg">
          <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block relative">
                <input
                  {...register("email", { required: "Email is required" })}
                  className={`w-full border  rounded-md p-3 shadow-sm ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-500 hover:border-blue-500 outline-none`}
                  type="email"
                  placeholder="Email address"
                />
                <CiUser className="absolute right-3 top-4 text-gray-500" />
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                    maxLength: { value: 10, message: "Max length is 10" },
                  })}
                  className={`w-full border rounded-md  p-3 shadow-sm ${
                    errors?.password ? "border-red-500" : "border-gray-300"
                  } focus:border-blue-500 focus:ring focus:ring-blue-500 hover:border-blue-500 outline-none`}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                />
                <span
                  className="absolute right-3 z-10 top-4 text-gray-500 cursor-pointer"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevents text selection
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors?.password?.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 cursor-pointer  hover:bg-blue-700 text-white font-bold py-3 rounded-md transition disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-3 ">
                  Please wait...  <Loader/>
                </span>
              ) : (
                "Log in"
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center mt-3">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline hover:text-blue-700 text-sm"
              >
                Forgotten password?
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-2 my-3">
              <hr className="flex-1 border-gray-300" />
              <span className="text-gray-500">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Register Button */}
            <div className="text-center  w-full">
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-md transition"
              >
                Create new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
