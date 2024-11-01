import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function getDataFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) {
      throw new Error("Auth Token not found");
    }
    const data: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return data.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
