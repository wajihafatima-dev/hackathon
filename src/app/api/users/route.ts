// import { connectDB } from '@/dbconfig/dbConfig';
// import usermodel from '@/models/usermodel';
// import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from "@/dbconfig/dbConfig";
import usermodel from "@/models/usermodel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const users = await usermodel.find({}).select('-password').limit(100); // Exclude the password field for security
    return NextResponse.json({users}, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
    try {
      // Parse the request body
      const { firstName, lastName, email, password } = await req.json();
  
      // Check if the email already exists
      await connectDB();
      const existingUser = await usermodel.findOne({ email });
  
      if (existingUser) {
        return NextResponse.json(
          { error: "User already exists with this email" },
          { status: 400 }
        );
      }
  
      // Hash the password for security
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = new usermodel({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Return success response
      return NextResponse.json(
        { message: "User created successfully", user: { firstName, lastName, email } },
        { status: 201 }
      );
    } catch (error: any) {
      // Handle any errors
      return NextResponse.json(
        { error: 'Failed to create user', details: error.message },
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
