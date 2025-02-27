import React from "react";
import { data, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_END_POINT } from "../constant/constantApi.js";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
const ForgetPassword = () => {
  const navigate = useNavigate()
   const {
       register,
       handleSubmit,
       formState:{errors,isSubmitting}
     } = useForm()
     const submitHandler = async (data) =>{
      try {
        const response = await axios.post(`${API_END_POINT}/send-otp`,data)
        if(response.data.success){
          toast.success(res.data.message)
           navigate("/verify-otp", { state: { email: data.email } });
        }
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong!");
      }
     }
  return (
    <>
      <div className="w-full h-14 bg-white flex justify-between items-center shadow-xl p-5">
        <img onClick={()=>navigate('/')}
          className="lg:w-[150px] h-fit w-[150px] cursor-pointer "
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt=""
        />
        <Link
          to="/"
          className="px-3 py-2 select-none bg-blue-500 text-white rounded-md font-semibold"
        >
          Log in
        </Link>
      </div>
      <br />
      <center className="mt-20 h-full">
        <div className="bg-white w-fit p-2 shadow-2xl rounded-md h-60 m-2">
          <h1 className="font-bold">Find Your Account</h1>
          <hr className="opacity-10 mt-2 mb-2" />
          <p className="leading-tight font-light mb-3">
            Please enter your email address or mobile number to search for your
            account.
          </p>
          <form onSubmit={handleSubmit(submitHandler)}>
          <input 
          {...register("email",{
            required:"Email is required",
         })}
            className={`${errors.email ? "border-red-500" : "border-gray-300"}  outline-none border border-[#d4d6da] w-full px-4 py-3 font-semibold rounded focus:border-blue-500 focus:ring focus:ring-blue-500 hover:border-blue-500`}
            type="email"
            placeholder="Enter your email"
            
          />
          {errors.email && <p className="text-red-500 text-xs lg:text-lg">{errors.email.message}</p>}
          {/* <hr className="opacity-10 mt-5 mb-2" /> */}
          <div className=" flex gap-4 justify-end mt-5 items-center w-full">
            <Link
              to="/"
              className="bg-[#E4E6EB] select-none text-black px-4 py-[8px] rounded-md font-semibold opacity-75 "
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-2 bg-green-500 cursor-pointer  hover:bg-green-600 text-white font-bold py-[8px] rounded-md transition disabled:bg-green-400"
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-3 ">
                  Wait...<Loader/>
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>
          </form>
        </div>
      </center>
    </>
  );
};

export default ForgetPassword;
