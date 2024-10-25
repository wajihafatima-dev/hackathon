// // app/api/verify-token/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// export async function GET(request: NextRequest) {
//   try {
//     const token = request.cookies.get("token")?.value || "";
//     if (!token) {
//       return NextResponse.json({ error: 'Token not provided' }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    
//     return NextResponse.json({
//       message: 'Token is valid',
//       user:decoded,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
//   }
// }
