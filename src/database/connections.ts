import mongoose from 'mongoose';
import log from '../logger.js';

const connectDB = (MONGO_URL: string) => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.set('debug', true);
    mongoose.set('toJSON', {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.__v;
        delete ret.id;
      },
    });

    log.info('Successfully connected to database');
    return mongoose.connect(MONGO_URL);
  } catch (error) {
    log.error('Error connecting to database');
    throw new Error(`Error: ${error}`);
  }
};

export default connectDB;
