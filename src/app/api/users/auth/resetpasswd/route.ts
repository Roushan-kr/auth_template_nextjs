import { connect } from "@/db/dbConfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

connect();

export async function POST(req: NextRequest) {
  try {
    
    const reqbody = await req.json();
    const { token , Password} = reqbody;
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
    const hashPasswd = await bcryptjs.hash(Password, 10)
    
    user.forgotPasswordToken= undefined;
    user.forgotPasswordExpire = undefined;
    user.password = hashPasswd;

    await user.save();

    const response=  NextResponse.json({ success: true, message: "Password changed successfuly" });

    // clear old token for new login
    response.cookies.set("token", "",{
      httpOnly: true,
      expires: new Date(0),
    });

    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
