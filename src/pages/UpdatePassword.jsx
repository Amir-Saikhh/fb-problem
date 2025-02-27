import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GrUpdate } from "react-icons/gr";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { data, Link, useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import { API_END_POINT } from "../constant/constantApi";
const UpdatePassword = () => {
  
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
   const SubmitHandler = async(data) => {
    try {
      const res = await axios.post(`${API_END_POINT}/verify-otp`, data);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
     toast.error(error?.response?.data?.message) 
    }
   }
  return (
    <>
      <div className="py-4 pl-4">
        <div className=" cursor-pointer hover:scale-105 flex justify-start items-center rounded px-4 leading-tight  w-fit bg-green-500 ">
          <IoReturnUpBack className="text-white ml-2" />
          <span
            className=" p-5 text-white   px-4 py-3 w-fit justify-end  flex "
            onClick={() => navigate(-1)}
          >
            Back
          </span>
        </div>
      </div>
      <center className="w-full h-screen  bg-[#F2F4F7]">
        <form onSubmit={handleSubmit(SubmitHandler)}>
        <div className="bg-white lg:w-96 h-fit shadow-lg rounded-lg px-6 py-5 m-3 lg:m-0">
          <div className="py-2 mb-2 text-2xl">
            <GrUpdate />
          </div>
          <h1 className="text-2xl font-bold  mb-3 ">Update your Password</h1>
          <p className="text-sm mb-5">Enter atleast 8-digit long Password</p>
          {/* <div> */}
          <div className="flex justify-start">
            <label className="text-start font-semibold " htmlFor="newpassword">
              New Password
            </label>
          </div>
          <div className="inline-flex justify-end items-center  w-full  ">
            <input
              {...register("newpassword", {
                required: true,
                minLength: { value: 8, message: "Min length is 8" },
                maxLength: { value: 30, message: "Max length is 30" },
              })}
              className={`w-full outline-none  font-extralight border-gray-200 border shadow-sm rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-600 ${
                errors.newpassword ? "border-red-500" : "border-gray-100"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              name=""
              id="newpassword"
            />
            <span
              className="absolute pr-5"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEyeOutline className="hover:cursor-pointer opacity-50" />
              ) : (
                <IoEyeOffOutline className="hover:cursor-pointer opacity-50" />
              )}
            </span>
          </div>
          {/* </div> */}
          <div className="flex mt-4">
            <label
              className="text-start font-semibold"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
          </div>
          <div className="inline-flex justify-end items-center  w-full  ">
            <input
              {...register("ConformPassword", {
                required: true,
                minLength: { value: 8, message: "Min length is 8" },
                maxLength: { value: 30, message: "Max length is 30" },
              })}
              className={`w-full outline-none  shadow-sm font-extralight border-gray-200 border rounded-md px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-600 ${
                errors.ConformPassword ? "border-red-500" : "border-gray-200"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm password"
              name=""
              id="confirmpassword"
            />
            <span
              className="absolute pr-5"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <IoEyeOutline className="hover:cursor-pointer opacity-50" />
              ) : (
                <IoEyeOffOutline className="hover:cursor-pointer opacity-50" />
              )}
            </span>
          </div>
          {errors.ConformPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ConformPassword.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mb-5 cursor-pointer bg-blue-600 mt-8 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition disabled:bg-blue-400"
            onClick={handleSubmit((data) => console.log(data))}
          >
            {isSubmitting ? (
              <span>
                please wait... <Loader color="green" />
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </div>
        </form>
      </center>
    </>
  );
};

export default UpdatePassword;
