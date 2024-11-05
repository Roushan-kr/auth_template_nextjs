import { connect } from "@/db/dbConfig";
import { getDataFromToken } from "@/helper/getdatafromToken";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
  try {
    // Extract user ID from token
    const userID = await getDataFromToken(req);

    if (!userID) {
      return NextResponse.json(
        { error: "Invalid or missing token" },
        { status: 401 }
      );
    }

    // Fetch user details from the database
    const user = await User.findById(userID);

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user details
    return NextResponse.json(
      { message: "Got user details", user, success: true },
      { status: 200 }
    );
  } catch (error) {
    // Improved error handling with proper error type
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
