"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {}, [user]);

  const onLogout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        router.push("/login");
      }
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("user fetched");

      if (res.data.success) {
        toast.success(res.data.message);
        setUser(res.data.user._id);
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
        <h3>
          {user ? (
            <Link
              href={`/profile/${user}`}
              className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              GET details
            </Link>
          ) : (
            "Nothing to Show"
          )}
        </h3>
        <button
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={onLogout}
        >
          Logout
        </button>
        <button
          className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={getUserDetails}
        >
          Get user Details
        </button>
      </div>
    </>
  );
}

export default Profile;
