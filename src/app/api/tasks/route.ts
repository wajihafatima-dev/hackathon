import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { taskModel } from "@/app/models/taskmodel";

// Helper to enforce a duration limit
function timeout(promise: Promise<any>, ms: number) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
}

const maxDuration = 5000; // 5 seconds in milliseconds

// GET: Fetch all tasks
export async function GET() {
  let tasks = [];
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    tasks = await timeout(taskModel.find(), maxDuration);
  } catch (error:any) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch tasks", details: error.message },
      { status: 500 }
    );
  }
  return NextResponse.json({ result: tasks });
}

// POST: Create a new task
export async function POST(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const { title, content } = await request.json();
    const newTask = new taskModel({ title, content });
    const savedTask = await timeout(newTask.save(), maxDuration);
    return NextResponse.json({ result: savedTask });
  } catch (error: any) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error.message },
      { status: 500 }
    );
  }
}

// // PUT: Update an existing task
// export async function PUT(request: NextRequest) {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     const { id, title, content } = await request.json();
//     const updatedTask = await timeout(
//       taskModel.findByIdAndUpdate(id, { title, content }, { new: true }),
//       maxDuration
//     );
//     if (!updatedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }
//     return NextResponse.json(updatedTask, { status: 200 });
//   } catch (error: any) {
//     console.error("Error updating task:", error);
//     return NextResponse.json(
//       { error: "Failed to update task", details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // DELETE: Delete a task
// export async function DELETE(request: NextRequest) {
//   try {
//     await mongoose.connect(process.env.MONGO_URI!);
//     const { id } = await request.json();
//     const deletedTask = await timeout(
//       taskModel.findByIdAndDelete(id),
//       maxDuration
//     );
//     if (!deletedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }
//     return NextResponse.json(
//       { message: "Task deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("Error deleting task:", error);
//     return NextResponse.json(
//       { error: "Failed to delete task", details: error.message },
//       { status: 500 }
//     );
//   }
// }
