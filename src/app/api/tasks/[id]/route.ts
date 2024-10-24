import { NextResponse } from "next/server";
import { connectDB } from "@/dbconfig/dbConfig";
import taskmodel from "@/models/taskmodel";

connectDB();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const taskId = params.id; 
    if (taskId) {
      const task = await taskmodel.findById(taskId);
      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
      return NextResponse.json({ task }, { status: 200 });
    }
    return NextResponse.json({ message: "No task ID provided" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch task", details: error.message },
      { status: 500 }
    );
  }
}
