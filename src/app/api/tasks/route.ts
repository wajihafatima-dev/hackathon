// api/tasks/route.ts
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { taskModel } from "@/app/models/taskmodel";

// GET: Fetch all tasks
export async function GET() {
    let task=[]
    try {
      await mongoose.connect(process.env.MONGO_URL!)
      task=await taskModel.find()
    } catch (error) {
      console.log(error)
    }
    return NextResponse.json({result:task})
  }
// POST: Create a new task
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
export async function POST(request: NextRequest) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL!);
    }
    const { title, content } = await request.json();
    const newTask = new taskModel({ title, content });
    const savedTask = await newTask.save();
    return NextResponse.json({ result: savedTask });
  } catch (error: any) {
    console.log("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error.message },
      { status: 500 }
    );
  }
}

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
