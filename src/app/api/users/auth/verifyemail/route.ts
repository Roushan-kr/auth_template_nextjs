import { connect } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

interface VerifyRequestBody {
  token: string;
}

export async function POST(req: NextRequest) {
  try {
    // Type the request body
    const reqbody: VerifyRequestBody = await req.json();
    const { token } = reqbody;
    console.log(token);

    // Find user by token and expiration date
    const user = await User.findOne({
      verifyToken: token,
      verifyExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User condition not met" },
        { status: 401 }
      );
    }

    // Update user verification status
    user.isVerified = true;  // Fixed the typo here
    user.verifyToken = undefined;
    user.verifyExpire = undefined;

    // Save the user with updated information
    await user.save();

    // Create a response and clear old token
    const res = NextResponse.json({ success: true, message: "Email verified" });
    res.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return res;
  } catch (error) {
    // Handle errors safely with error type checking
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
