// // api/tasks/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/dbconfig/dbConfig";
// import taskmodel from "@/lib/models/taskmodel";

// // Connect to the database
// const connectDatabase = async () => {
//   try {
//     await connectDB();
//   } catch (error) {
//     throw new Error("Database connection failed");
//   }
// };

// // GET: Fetch all tasks
// export async function GET(request:NextRequest) {
//   try {
//     await connectDatabase();
//     const tasks = await taskmodel.find(); 
//     return NextResponse.json({tasks}, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Failed to fetch tasks", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // POST: Create a new task
// export async function POST(request: Request) {
//   try {
//     await connectDatabase();
//     const { title, content } = await request.json(); 
//     const newTask = new taskmodel({ title, content });
//    const createdTask=  await newTask.save();
//     return NextResponse.json(createdTask,{ status: 201 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Failed to create task", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // PUT: Update an existing task
// export async function PUT(request: Request) {
//   try {
//     await connectDatabase();
//     const { id, title, content } = await request.json();
//     const updatedTask = await taskmodel.findByIdAndUpdate(
//       id,
//       { title, content },
//       { new: true } 
//     );
//     if (!updatedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }
//     return NextResponse.json(updatedTask, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Failed to update task", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // // DELETE: Delete a task
// export async function DELETE(request: Request) {
//   try {
//     await connectDatabase();
//     const { id } = await request.json(); 
//     const deletedTask = await taskmodel.findByIdAndDelete(id);
//     if (!deletedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }
//     return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Failed to delete task", details: error.message },
//       { status: 500 }
//     );
//   }
// }