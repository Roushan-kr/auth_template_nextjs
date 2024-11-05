"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function resetPasswd() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const resetPassword = async (Password: string) => {
    try {
      const token = window.location.search.split("=")[1];
      if (!token) {
        toast.error("Propely copy resset URl");
        return;
      }
      setLoading(true);
      const res = await axios.patch("/api/users/auth/resetpasswd", {
        token,
        Password,
      });
      if (res.data.success) {
        toast.success("Password reset success");
        router.push("/login");
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error("Password reset failed");
    }
  };

  const handleSubmit = async () => {
    if (newPassword.length < 8) {
      toast.error("please fill atlest 8 char");
    }
    if (newPassword !== confirmPassword) {
      toast.error("Both passsword not match");
    }
    resetPassword(newPassword);
  };

  return (
    <>
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
                <h3 className="text-3xl font-bold text-yellow-400">
                  reset your account password
                </h3>
              </div>
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">
                  password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="Enter new passwd"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={() => {
                      const input = document.querySelector(
                        "input[name=password]"
                      );
                      if (input) {
                        if (input.getAttribute("type") === "password") {
                          input.setAttribute("type", "text");
                        } else {
                          input.setAttribute("type", "password");
                        }
                      }
                    }}
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="mt-8">
                <label className="text-white text-xs block mb-2">
                  Conform Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 px-2 py-3 outline-none"
                    placeholder="conform password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    viewBox="0 0 128 128"
                    onClick={() => {
                      const input = document.querySelectorAll(
                        "input[name=password]"
                      )[1];
                      if (input) {
                        if (input.getAttribute("type") === "password") {
                          input.setAttribute("type", "text");
                        } else {
                          input.setAttribute("type", "password");
                        }
                      }
                    }}
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
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? "Processing" : "Reset Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
