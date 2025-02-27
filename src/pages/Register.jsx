import axios from "axios";
import React,{ useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { API_END_POINT } from "../constant/constantApi.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader.jsx";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState:{errors,isSubmitting}
  } = useForm()
  const submitHandler = async (data) => {
    try {
      const res = await axios.post(`${API_END_POINT}/register`, data);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message); 
    }
  };
  return (
    <>
      <div className="flex justify-center ">
        <img
          className="lg:w-[320px] h-fit w-[150px] mt-5 lg:mt-0 "
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt=""
        />
      </div>
      <div className="w-full h-fit lg:h-fit flex justify-center items-center mt-10 lg:mt-2 bg-[#F2F4F7] p-2 pb-32">
        <div className="lg:w-[30%] w-full    bg-white opacity-90  rounded-md  shadow-2xl">
          <div className="text-center">
            <h1 className=" mt-2 text-black text-2xl font-bold">Create a new account</h1>
            <p>It's quick and easy.</p>
          </div>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex flex-col justify-center items-center lg:p-3 p-3 mb-[-1rem] ">
              <div className="flex opacity-80 justify-start items-center w-full font-semibold">
              <p>Name</p>
              </div>
              <label className="flex justify-start items-center w-full  hover:cursor-pointer">
                <input  {...register("username",{
                  required:"username is required",
                  minLength:{value:3,message:"Min lenth atleast 3"}
                } )}
                  className="w-full lg:text-lg font-light border hover:border-blue-500 outline-none  border-[#d4d6da] shadow-md focus:ring focus:ring-blue-500  pl-2 h-12 rounded-md"
                  type="text"
                  name="username"
                  id=""
                  placeholder="Enter username"
                />
                <CiUser className="ml-[-2rem]  opacity-70 lg:flex hover:cursor-pointer" />
              </label>
              {errors?.username && <p className="text-red-500 text-xs lg:text-lg">{errors?.username?.message}</p>}
            </div>
            <div className="flex flex-col justify-center items-center lg:p-3 p-3 ">
            <div className="flex opacity-80 justify-start items-center w-full font-semibold">
              <p>Email</p>
              </div>
              <label className="flex justify-start items-center w-full  hover:cursor-pointer">
                <input {...register('email',{
                  required:"email is required",
                  pattern:{
                    value:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message:"Please add speacial character"
                  }
                })}
                  className="w-full lg:text-lg font-light border hover:border-blue-500 outline-none  border-[#d4d6da] shadow-md focus:ring focus:ring-blue-500  pl-2 h-12 rounded-md "
                  type="email"
                  name="email"
                  id=""
                  placeholder="Email address "
                />
                <CiUser className="ml-[-2rem]  opacity-70 lg:flex hover:cursor-pointer" />
              </label>
              {errors?.email && <p className="text-red-500 text-xs lg:text-lg">{errors?.email?.message}</p>}
            </div>
            <div className="flex flex-col justify-start items-center lg:p-3 p-3 mt-[-1rem] ">
            <div className="flex justify-start items-center opacity-80 w-full font-semibold">
              <p>Password</p>
              </div>
              <label className="flex justify-start items-center w-full  hover:cursor-pointer">
                <input {...register("password",{
                  required:"password is required",
                  minLength:{value:8,message:"Min lenth atleast 8"},
                  maxLength:{value:500,message:"Max lenth atmost 500"}
                })}
                  className="w-full lg:text-lg font-light border hover:border-blue-500 outline-none  border-[#d4d6da] shadow-md focus:ring focus:ring-blue-500  pl-2 h-12 rounded-md "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id=""
                  placeholder="create password"
                />
                <div
                  className="ml-[-2rem]"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevents text selection
                    setShowPassword((prev) => !prev);
                  }}
                >
                  {showPassword ? (
                    <IoEyeOutline className=" hover:cursor-pointer opacity-50" />
                  ) : (
                    <IoEyeOffOutline className=" hover:cursor-pointer opacity-50" />
                  )}
                </div>
              </label>
              {errors?.password && <p className="text-red-500 text-xs lg:text-lg">{errors?.password?.message}</p>}
              <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 cursor-pointer mt-3  hover:bg-blue-700 text-white font-bold py-3 rounded-md transition disabled:bg-blue-400"
            >
              {isSubmitting ? (
                <span className="flex justify-center items-center gap-3 ">
                  Please wait...  <Loader/>
                </span>
              ) : (
                "Register"
              )}
            </button>
            </div>
            <div className="flex  flex-col justify-center font-semibold items-center p-5 mb-1 h-4 ">
              <Link
                to="/"
                className="text-blue-500 font-medium text-xs lg:text-lg hover:text-blue-700 hover:underline"
              >
                Already have an Account?
              </Link>
            </div>
            {/* <center className="flex text-center cursor-pointer justify-center  items-center bg-[#78a1f1] m-3 rounded">
            <MdKeyboardBackspace className="text-center items-center pt-2 text-3xl text-white" />   
            <Link to='/' className=" items-center  text-center cursor-pointer text-white font-bold px-4 py-1  mt-2">Back to login</Link>
            </center> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
