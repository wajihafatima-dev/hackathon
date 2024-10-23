import { connectDB } from '@/dbconfig/dbConfig';
import usermodel from '@/models/usermodel';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Fetch all users from the database
    const users = await usermodel.find({}).select('-password'); // Exclude the password field for security

    // Return users as a JSON response
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    // Handle any errors
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error.message },
      { status: 500 }
    );
  }
}
