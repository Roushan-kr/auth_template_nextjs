"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyUser({ params }: any) {

  const [verify, setVerify] = useState(false);

  const verifyEmail = async (token:String) => {
    try {
  
      // console.log(token);
      
      const res = await axios.post("/api/users/auth/verifyemail", { token });
      if (res.data.success) {
        setVerify(true);
      }
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error("Email verification failed");
      setVerify(false);
    }
  };
  useEffect(() => {
    if (verify) {
      toast.success("Email verified successfully");
    }
  }, [verify]);

  useEffect(() => {
    const token = window.location.search.split("=")[1]
    verifyEmail(token);
  }, []);

  

}
