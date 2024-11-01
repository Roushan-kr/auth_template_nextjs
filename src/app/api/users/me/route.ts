import { connect } from "@/db/dbCongig";
import { getDataFromToken } from "@/helper/getdatafromToken";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    const userID = await getDataFromToken(req);

    const user = await User.findById(userID);

    return NextResponse.json(
      { message: "Got user details", user, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
