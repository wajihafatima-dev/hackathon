import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/dbconfig/dbConfig';
import usermodel from '@/models/usermodel';
import bcrypt from 'bcryptjs';


connectDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'This email already exists' },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new usermodel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const user={
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    }
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
// export async function GET() {
//   try {
//     await connectDB();
//     const users = await usermodel.find({}).limit(10).select('-password'); // Exclude the password field for security
//     return NextResponse.json({ users }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: 'Failed to fetch users', details: error.message },
//       { status: 500 }
//     );
//   }
// }