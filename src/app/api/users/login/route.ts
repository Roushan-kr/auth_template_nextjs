import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { sandEmail } from "@/helper/mailer";
import { verify } from "crypto";


connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email }).select(
      "+password"
    );

    if (!userExists) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // check if mail is verify or not
    if(!userExists.isVerfied){
      sandEmail({userId: userExists._id, email: userExists.email, reson: "verify"});
      
      return NextResponse.json(
        { error: "Your need to verify your mail befor login"},
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

    // Remove password from user object
    delete userExists.password;

    // creating token
    const tokenData = {
      id: userExists._id,
      email: userExists.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Logged in successfully",
      user: userExists,
      success: true,
    });

    response.cookies.set("token", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
