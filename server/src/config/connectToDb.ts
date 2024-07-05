import mongoose from 'mongoose';

export default async function connectToDb(): Promise<void> {
  try {
    const URI: string | undefined = process.env.MONGO_URI;

    if (!URI) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }

    await mongoose.connect(URI);
  } catch (error) {
    throw error;
  }
}
