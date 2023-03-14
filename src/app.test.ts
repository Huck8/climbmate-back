import request from 'supertest';
import app from './app';

describe('Given an app', () => {
  test('When the server starts, then the app should respond with a message', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual('Server is working!!');
  });
});
