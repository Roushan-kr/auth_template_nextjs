import { connect } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    
    const reqbody = await req.json();
    const { token } = reqbody;
    console.log(token);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User Condition not ment" },
        { status: 401 }
      );
    }

    user.forgotPasswordToken= undefined;
    user.forgotPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({ success: true, message: "Password changed successfuly" });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
