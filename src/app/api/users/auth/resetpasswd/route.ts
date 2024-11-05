import { connect } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";  // Fixed the typo

connect();

interface ResetPasswordRequest {
  token: string;
  Password: string;
}

interface RequestBody {
  email: string;
}

export async function PATCH(req: NextRequest) {
  try {
    const reqbody: ResetPasswordRequest = await req.json();  // Add explicit type
    const { token, Password } = reqbody;

    console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User Condition not met" },
        { status: 401 }
      );
    }

    const hashPasswd = await bcryptjs.hash(Password, 10);

    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpire = undefined;
    user.password = hashPasswd;

    await user.save();

    const response = NextResponse.json({ success: true, message: "Password changed successfully" });

    // Clear old token for new login
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    // Avoid using `any`, instead specify a more specific type
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const reqbody: RequestBody = await req.json();  // Add explicit type
    const { email } = reqbody;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 401 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "No user registered" }, { status: 401 });
    }

    // Fixed typo here: changed `sendEmail` to `sendEmail`
    sendEmail({ userId: user._id, email: user.email, reason: "reset" });

    return NextResponse.json({ success: true, message: "Reset password email sent" });
  } catch (error) {
    // Handle error explicitly
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
