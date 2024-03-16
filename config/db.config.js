import * as mongoose from 'mongoose';

let isConnected = false;

const connectDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Mongo is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI_CONNECTION);
    isConnected = true;

    console.log('Mongo connected successfully');
  } catch (err) {
    console.error(err);
  }
};

export default connectDb;
