"use client"; // this decorator is used to tell the compiler that this file is a client file and it should be compiled to a client file

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle

  const router = useRouter();

  const validateForm = () => {
    return user.email && user.password; // Add basic validation here if needed
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.data.success) {
        toast.success(response.data.message);
        router.push("/profile");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "An error occurred";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onReset = async () => {
    try {
      setLoading(true);
      if (!user.email) {
        toast.error("Please enter your email to reset the password.");
        return;
      }
      const response = await axios.post("/api/users/auth/resetpasswd", {
        email: user.email,
      });
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || "Unable to reset password";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDisabled(!validateForm()); // Disable login if fields are not valid
  }, [user]);

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">Login to account</h3>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="mt-12">
              <button
                type="button"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-transparent bg-yellow-400 
                hover:bg-yellow-500 focus:outline-none disabled:bg-yellow-100"
                onClick={onLogin}
                disabled={disabled || loading}
              >
                {loading ? "Processing" : "Login Now"}
              </button>
              <p className="text-sm text-white mt-8">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="text-yellow-400 font-semibold hover:underline ml-1"
                >
                  Signup here
                </Link>
              </p>
              <p className="text-sm text-white mt-8">
                Want to reset your account password?
                <button
                  type="button"
                  onClick={onReset}
                  className="text-yellow-400 font-semibold hover:underline ml-1"
                >
                  Reset here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
