import { NextResponse } from 'next/server';
import usermodel from '@/models/usermodel';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    const reqBody = await request.json();
    const { firstName, lastName, email, password } = reqBody;

    console.log('Checking for existing user...');
    const existingUser = await usermodel.findOne({ email }).exec(); // Ensure the query is efficient
    if (existingUser) {
      return NextResponse.json(
        { error: 'This email already exists' },
        { status: 400 }
      );
    }

    console.log('Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new usermodel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log('Saving new user...');
    await newUser.save();

    console.log(`Request processed in ${Date.now() - startTime}ms`);

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
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
