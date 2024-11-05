"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export async function resetPasswd({ params }: any) {
  const [reset, setReset] = useState(false);

    const resetPassword = async () => {
        try {
        const { token } = await params;
        const res = await axios.post("/api/users/auth/resetpasswd", { token });
        if (res.data.success) {
            setReset(true);
        }
    
        } catch (error:any) {
        console.log(error.response.data.error);
        toast.error("Password reset failed");
        setReset(false);
        }
    };

}