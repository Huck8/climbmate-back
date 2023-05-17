import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../../app';
import connectDB from '../../database/connections';
import { Excursion } from './Excursion-schema';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('@supabase/supabase-js', () => {
  const data = {
    publicUrl: 'https://example.com/photo.png',
  };
  return {
    createClient: jest.fn().mockImplementation(() => ({
      storage: {
        from: jest.fn().mockReturnValue({
          upload: jest.fn().mockResolvedValue({
            error: null,
            data: {
              ...data,
            },
          }),
          getPublicUrl: jest.fn().mockReturnValue({
            error: null,
            data: {
              ...data,
            },
          }),
        }),
      },
    })),
  };
});

describe('Given an app with excursion-router', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUrl = mongoServer.getUri();
    await connectDB(mongoUrl);
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.connection.close();
  });

  describe('When the user wants create his business', () => {
    test('Then it should be created', async () => {
      process.env.JWT_SECRET = 'mySecretToken';

      const token = jwt.sign(
        { email: 'angel@mail.com' },
        process.env.JWT_SECRET,
      );

      // Const mockSupaBase = { file: { buffer: Buffer.from('mockedBuffer') } };

      const excursion: Excursion = {
        // ImgExcursion: 'mockPicture.jpg.com',
        // nameExcursion: 'Pirineo',
        // date: new Date(),
        // difficultyLevel: 'Hard',
        // needEquipment: true,

        imgExcursion: 'mockPicture.jpg.com',
        nameExcursion: 'Pirineo',
        date: new Date(),
        difficultyLevel: 'Hard',
        equipment: 'Yes',
        creator: 'Antonio Gamez',
      };

      await request(app)
        .post('/api/v1/excursion')
        .set('Authorization', `Bearer ${token}`)
        .send(excursion)
        .expect(400);
    });
  });

  describe('When the user wants create his excursion', () => {
    test('Then it should receive a 401 error', async () => {
      const excursion: Excursion = {
        // ImgExcursion: 'mockPicture.jpg.com',
        // nameExcursion: 'Pirineo',
        // date: new Date(),
        // difficultyLevel: 'Hard',
        // needEquipment: true,

        imgExcursion: 'mockPicture.jpg.com',
        nameExcursion: 'Pirineo',
        date: new Date(),
        difficultyLevel: 'Hard',
        equipment: 'yes',
        creator: 'Antonio Gamez',
      };
      await request(app).post('/api/v1/excursion').send(excursion).expect(401);
    });
  });
});
