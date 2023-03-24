import mongoose from 'mongoose';
import log from '../logger.js';

const connectDB = async (urlBD: string) => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.set('debug', true);

    await mongoose.connect(urlBD);
    log.info('Successfully connected to database');
    return true;
  } catch (error) {
    log.error('Error connecting to database');
    throw new Error(`Error: ${error}`);
  }
};

export default connectDB;

// Import mongoose from 'mongoose';

// const connectDB = (urlBD: string) => mongoose.connect(urlBD);

// export default connectDB;
