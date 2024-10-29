import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from '@/lib/mongoose';
import { usermodel } from '@/app/models/usermodel';

// Helper to enforce duration limit
function timeout(promise: Promise<any>, ms: number) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms)),
  ]);
}

const maxDuration = 5000; 
export async function GET() {
  try {
    await connectMongo();
    const data = await timeout(usermodel.find().lean(), maxDuration); // With timeout
    return NextResponse.json({ result: data });
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: 'Failed to fetch data', details: error.message }, { status: 500 });
  }
}

// POST: Create a new user
export async function POST(request: NextRequest) {
  try {
    await connectMongo();
    const payload = await request.json();

    // Validate payload
    if (!payload.firstName || !payload.email || !payload.password) {
      return NextResponse.json({ error: 'First Name, Email, and Password are required' }, { status: 400 });
    }

    // Check for existing email
    const existingUser = await timeout(usermodel.findOne({ email: payload.email }), maxDuration);
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }

    const user = new usermodel(payload);
    const result = await timeout(user.save(), maxDuration); // With timeout
    return NextResponse.json({ result }, { status: 201 });

  } catch (error: any) {
    console.error("Error saving data:", error);
    if (error.code === 11000) {  // Duplicate email error code
      return NextResponse.json({ error: 'Email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to save data', details: error.message }, { status: 500 });
  }
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
