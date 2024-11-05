import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Create the response with success message
    const response = NextResponse.json({
      message: "Logout Success",
      success: true,
    });

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Setting the cookie expiration to a past date to clear it
    });

    return response;
  } catch (error) {
    // Improved error handling
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
