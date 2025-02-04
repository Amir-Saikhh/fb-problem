import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link,NavLink, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { API_END_POINT } from "../constant/constantApi";
import toast from "react-hot-toast";
const LoginPage = () => {
   const [IsLoggedIn,setIsLoggedIn] = useState(false)
   const [showPassword, setShowPassword] = useState(false);
//    const [data,setData] = useState({
//     email: "",
//     password: "",
//  });
const navigate = useNavigate()
 const {register,handleSubmit,formState: { errors },} = useForm();

 const onSubmit = async(data) => {
  console.log(data);
  // if(IsLoggedIn){
  //   const user = {data.email, data.password}
  //   try {
  //      const res = await  axios.post(`${API_END_POINT}/login`,user)
  //      if(res.data.success){
  //       toast.success(res.data.message)
  //      }
  //      navigate('/browse  ')
  //   } catch (error) {
  //     toast.error(error.response.data.message)
  //   }
  //  }
 }
 


//  const handleOnChange = (e) => {
//       const {name , value} = e.target;
//       setData((pre)=>{
//         return {
//             ...pre,
//             [name]:value
//         }
//       })
//  }

  // const submitHandler = (e) => {
  //     e.preventDefault();
      
  // }
  return (
    <div className="w-full lg:h-full flex justify-start items-center  bg-[#F2F4F7]  pb-20">
      <div className="flex flex-col leading-tight   lg:mt-[-2rem] lg:ml-[-30px] lg:p-36 lg:text-[24px] justify-start lg:w-[50%] w-[38%] ">
        <img
          className="lg:w-[320px] h-fit w-[100px] mb-[-1rem]"
          src="https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"
          alt=""
        />
        <h1 className="lg:text-wrap text-wrap  lg:pl-8 lg:text-lg text-xs pl-2 mt-2 ">
          Facebook helps you connect and share with the people in your life.
        </h1>
      </div>
      <div className="lg:w-[30%] w-[50%] lg:h-[70%]  lg:pb-20 mt-16 bg-white opacity-90 lg:ml-[-5rem] ml-[2rem]  rounded-md  shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center items-center lg:p-5 p-3 ">
            <label className="flex justify-start items-center w-full  hover:cursor-pointer">
              <input {...register('emails',
              {required: true,
               minlenth:{value:3, message: 'minimum length atleast 3'},
              })}
                className="w-full lg:text-lg text-[9px] border-2 outline-none focus:border-blue-500 border-[#d4d6da] shadow-xl focus:outline-blue-500 focus:outline-offset-1  pl-2 h-12 rounded-md font-medium opacity-70"
                type="text"
                name="email"
                id=""
                placeholder="Email address or phone number"
              />
              <CiUser className="ml-[-2rem]  opacity-70 lg:flex hover:cursor-pointer" />
            </label>

            {errors.emails && <p>{errors.message}</p>  }
          </div>
          <div className="flex flex-col justify-start items-center lg:p-5 p-3 mt-[-1rem] ">
            <label className="flex justify-start items-center w-full  hover:cursor-pointer">
              <input
                className="w-full lg:text-lg text-xs border-2 outline-none focus:border-blue-500 border-[#d4d6da]  shadow-xl focus:outline-blue-500 focus:outline-offset-1  pl-2 h-12 rounded-md font-medium opacity-70"
                type={showPassword ? "text" : "password"}
                name="password"
                id=""
                placeholder="Password"
              />
              <div
                className="ml-[-2rem]"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <IoEyeOutline className=" hover:cursor-pointer opacity-50" />
                ) : (
                  <IoEyeOffOutline className=" hover:cursor-pointer opacity-50" />
                )}
              </div>
            </label>
            <button type="submit"  className="w-full pl-2 cursor-pointer bg-blue-600 py-1 lg:mt-5 mt-2 lg:py-[7px] text-center font-semibold leading-tight rounded-md text-white lg:text-[24px]">
              Log in
            </button>
          </div>
          <div className="flex flex-col justify-center font-semibold items-center p-5 mt-[-1rem] h-4 ">
            <a 
              href={"/forgot-password"}
              className="text-blue-500 text-xs lg:text-lg hover:text-blue-700 hover:underline"
            >
              Forgotten password?
            </a>
          </div>
          <hr className="w-[90%] lg:ml-5 ml-3 lg:mt-3 mt-2 text-[#d4d6da]" />
          <div className="flex justify-center items-center  lg:mt-4 mb-2 mt-2">
            <button className="bg-green-600 rounded-md  font-bold text-xs lg:text-lg cursor-pointer text-white px-2 py-1 lg:px-4 lg:py-2 ">
              Create new account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
