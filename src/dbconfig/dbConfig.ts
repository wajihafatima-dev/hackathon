import mongoose from 'mongoose';

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log('MongoDB is already connected.');
      return;
    }
    await mongoose.connect(process.env.MONGO_URI!,);

    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully.');
    });

    mongoose.connection.on('error', (err) => {
      console.log('MongoDB connection error:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
