// app/api/users/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/dbconfig/dbConfig';
import usermodel from '@/models/usermodel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const existingUser = await usermodel.findOne({email});
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET!, 
      { expiresIn: '1d' } // Token will expire in 1 day
    );

   const response= NextResponse.json({
      message: 'Login successful',
      user: {
        id: existingUser._id,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
      },
      token, 
    });
    response.cookies.set("token",token,{
      httpOnly:true
    })
    return response;
    
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
