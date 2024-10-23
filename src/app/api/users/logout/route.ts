import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbConfig";

connectDB();

export async function GET(request: NextRequest) {
  try {
  const response=NextResponse.json(
        { message: 'Logout Successfully' },
      );
      response.cookies.set("token","",{
        httpOnly:true,
        expires:new Date(0)
      })
      return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}