import mongoose from 'mongoose';

const connectDB = async () => {
  const dbURL = process.env.DATABASE_URL as string;
  return mongoose.connect(dbURL).then(() => {
    console.info('Database connected successfully');
  }).catch((error: any) => {
    console.error(error.message);
    process.exit(1);
  })
}

export default connectDB;
