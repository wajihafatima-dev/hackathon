import { taskModel } from '@/app/models/taskmodel';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URL!);
    }
    const taskId = params.id;
    if (taskId) {
      const task = await taskModel.findById(taskId);
      if (!task) {
        return NextResponse.json({ message: "Task not found" }, { status: 404 });
      }
      return NextResponse.json({ task }, { status: 200 });
    }

    return NextResponse.json({ message: "No task ID provided" }, { status: 400 });
  } catch (error: any) {
    console.error("Error fetching task:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch task", details: error.message },
      { status: 500 }
    );
  }
}
