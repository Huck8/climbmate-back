import request from 'supertest';
import app from './app.js';

describe('Given an app', () => {
  test('When the server is deployed, the app should respond with a message', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual('Server ON');
  });
});
