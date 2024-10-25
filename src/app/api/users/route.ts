// import { connectDB } from "@/dbconfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import mongoose from 'mongoose';
import { usermodel } from '@/app/models/usermodel';

// export async function GET() {
//   try {
//     await connectDB();
//     const users = await usermodel.find({}).select('-password'); 
//     return NextResponse.json({users}, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: 'Failed to fetch users', details: error.message },
//       { status: 500 }
//     );
//   }
// }
export async function GET() {
  let data=[]
  try {
    await mongoose.connect(process.env.MONGO_URL!)
    data=await usermodel.find()
  } catch (error) {
    console.log(error)
  }
  return NextResponse.json({result:data})
}
// export async function POST(request: NextRequest) {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGO_URL!);
//     }
//     const { firstName, lastName, email, password } = await request.json();
//     const existingUser = await usermodel.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: 'This email already exists' },
//         { status: 400 }
//       );
//     }
    
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const newUser = new usermodel({
//       firstName,
//       lastName,
//       email,
//       password: hashedPassword,
//     });
//     await newUser.save();
//     const user = {
//       id: newUser._id,
//       firstName: newUser.firstName,
//       lastName: newUser.lastName,
//       email: newUser.email,
//     };
//     return NextResponse.json(user, { status: 201 });
//   } catch (error: any) {
//     console.error("Error creating user:", error.message);
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }
// export async function POST(req: Request) {
//     try {
//       const { firstName, lastName, email, password } = await req.json();
//       // await connectDB();
//       const existingUser = await usermodel.findOne({ email });
  
//       if (existingUser) {
//         return NextResponse.json(
//           { error: "User already exists with this email" },
//           { status: 400 }
//         );
//       }
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new usermodel({
//         firstName,
//         lastName,
//         email,
//         password: hashedPassword,
//       });
  
//       await newUser.save();
  
//       return NextResponse.json(
//         { message: "User created successfully", user: { firstName, lastName, email } },
//         { status: 201 }
//       );
//     } catch (error: any) {
//       return NextResponse.json(
//         { error: 'Failed to create user', details: error.message },
//         { status: 500 }
//       );
//     }
//   }
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
