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
      verifyToken: token,
      verifyExpire: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User Condition not ment" },
        { status: 401 }
      );
    }

    user.isVerfied = true;
    user.verifyToken = undefined;
    user.verifyExpire = undefined;
    await user.save();

    const res = NextResponse.json({ success: true, message: "Email verified" });
    res.cookies.set("token", "");

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
