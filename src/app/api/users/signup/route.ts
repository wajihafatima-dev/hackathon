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
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
