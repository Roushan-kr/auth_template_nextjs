"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const onLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data.success) {
        toast.success(res.data.messgae);
        router.push("/login");
      }
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-2">
        <h1>Profile</h1>
        <h2>Profile page</h2>
        <button
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </>
  );
}

export default Profile;
