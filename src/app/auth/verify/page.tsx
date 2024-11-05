"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyUser({ params }: any) {
  const [verify, setVerify] = useState<boolean | null>(null); // null for the initial loading state

  const verifyEmail = async (token: string) => {
    try {
      const res = await axios.post("/api/users/auth/verifyemail", { token });
      if (res.data.success) {
        setVerify(true);
      } else {
        setVerify(false);
      }
    } catch (error: any) {
      console.error(error.response?.data?.error || "Verification error");
      toast.error("Email verification failed");
      setVerify(false);
    }
  };

  useEffect(() => {
    const token = window.location.search.split("=")[1];
    if (token) {
      verifyEmail(token);
    } else {
      toast.error("Verification token is missing");
      setVerify(false);
    }
  }, []);

  useEffect(() => {
    if (verify === true) {
      toast.success("Email verified successfully");
    } else if (verify === false) {
      toast.error("Email verification failed");
    }
  }, [verify]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        {verify === null ? (
          <h1 className="text-2xl font-semibold text-blue-600">
            Verifying email...
          </h1>
        ) : verify ? (
          <h1 className="text-2xl font-semibold text-green-600">
            Email verified successfully!
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold text-red-600">
            Email verification failed.
          </h1>
        )}
      </div>
    </div>
  );
}
