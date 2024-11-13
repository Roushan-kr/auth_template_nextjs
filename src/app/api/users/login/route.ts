import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "@/helper/mailer";
import axios from "axios";

connect();

interface LoginRequestBody {
  email: string;
  password: string;
  recaptchaToken: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequestBody = await req.json(); // Type annotation for request body
    const { email, password, recaptchaToken } = body;
    const key = process.env.RECAPTCHA_SECRET_KEY;

    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${key}&response=${recaptchaToken}`
    );
    // console.log(res);
    const data = await res.data;

    if (!data.success && data.score < 0.5) {
      return NextResponse.json(
        { error: "reCAPTCHA validation failed" },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email }).select("+password");

    if (!userExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if email is verified
    if (!userExists.isVerified) {
      sendEmail({
        userId: userExists._id,
        email: userExists.email,
        reason: "verify", // Fixed typo here from `reason` to `reason`
      });

      return NextResponse.json(
        { error: "You need to verify your email before login" },
        { status: 400 }
      );
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, userExists.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    // Remove password from user object before returning to client
    delete userExists.password;

    // Creating token
    const tokenData = {
      id: userExists._id,
      email: userExists.email,
    };

    if (!process.env.TOKEN_SECRET) {
      throw new Error(
        "Token secret is not defined in the environment variables."
      );
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Logged in successfully",
      user: userExists,
      success: true,
    });

    // Set the token as a cookie
    response.cookies.set("token", token, {
      expires: new Date(Date.now() + 3600000), // 1 hour expiration
      httpOnly: true,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error); // Log the actual error for debugging
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
