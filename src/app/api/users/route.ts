// import { connectDB } from '@/dbconfig/dbConfig';
// import usermodel from '@/models/usermodel';
// import { NextResponse } from 'next/server';

import { connectDB } from "@/dbconfig/dbConfig";
import usermodel from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users from the database
    const users = await usermodel.find({}).select('-password'); // Exclude the password field for security

    // Return users as a JSON response
    return NextResponse.json({users}, { status: 200 });
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}
// import usermodel from '@/models/usermodel';
// import { NextRequest, NextResponse } from 'next/server';

// // GET /api/users
// const getAllUsers = async (req:NextRequest, ) => {
//   try {
//     // Fetch all users excluding the password field
//     const users = await usermodel.find().select('-password');
//    return NextResponse.json({users});
//   } catch (error) {
//     console.error(error);
//   }
// };

// module.exports = getAllUsers;

// import { NextRequest, NextResponse } from "next/server";
// export function GET(request: NextRequest) {
//   return NextResponse.json({
//     message: "hello",
//   });
// }
