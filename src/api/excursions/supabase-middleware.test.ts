import { Request, Response } from 'express';
import { supabaseMiddleware } from './supabase-middleware';

jest.mock('@supabase/supabase-js', () => {
  const data = {
    publicUrl: 'https://example.com/photo.jpg',
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

describe('Given a supabaseMiddleware', () => {
  describe('When the middleware upload the profile', () => {
    test('Then it should be returned publicUrl', async () => {
      const mockRequest = {
        file: { buffer: Buffer.from('mockedBuffer') },
      } as Partial<
        Request<
          unknown,
          unknown,
          unknown,
          unknown,
          { email: string; picture: string }
        >
      >;

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        locals: { email: 'mocktest@email', picture: 'image.jpg' },
      } as Partial<Response>;
      const mockNext = jest.fn();

      await supabaseMiddleware(
        mockRequest as Request<
          unknown,
          unknown,
          unknown,
          unknown,
          { email: string; picture: string }
        >,
        mockResponse as Response<unknown, { email: string; picture: string }>,
        mockNext,
      );

      expect(mockResponse.locals?.picture).toBe(
        'https://example.com/photo.jpg',
      );
    });
  });
});
