// // app/api/users/me/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { connectDB } from '@/dbconfig/dbConfig';
// import usermodel from '@/lib/models/usermodel';
// import { getDataFromToken } from '../../../../../helper/getDataFromToken';

// connectDB();
// export async function POST(request: NextRequest) {
//   try {
//     const userId = getDataFromToken(request); 
//     const user = await usermodel.findOne({ id:userId }).select("-password");

//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: "User Found",
//       data: user,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }
