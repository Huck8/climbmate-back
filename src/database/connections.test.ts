import log from '../logger';
import mongoose from 'mongoose';
import connectDB from './connections';

describe('Given a Database Connection Test', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should throw an error when failing to connect to the database', async () => {
    const error = new Error('Failed to connect to the database');
    jest.spyOn(mongoose, 'connect').mockRejectedValue(error);
    jest.spyOn(log, 'error');

    jest.spyOn(mongoose, 'connect').mockRejectedValue(error);

    await expect(connectDB('mongodb:urlDB')).rejects.toThrow(
      'Error: Failed to connect to the database',
    );

    expect(mongoose.connect).toHaveBeenCalledTimes(1);
    expect(log.error).toHaveBeenCalledWith('Error connecting to database');
  });
});
