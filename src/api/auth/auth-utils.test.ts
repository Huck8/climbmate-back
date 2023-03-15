import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { encryptPassword, generateJWTToken } from './auth-utils.js';

describe('Given auth utils', () => {
  beforeAll(() => {
    dotenv.config();
  });

  test('When encrypting the same value twice, then it should return the same encryption value', () => {
    const firstEncryptedValue = encryptPassword('hEllo123*');
    const secondEncryptedValue = encryptPassword('hEllo123*');
    expect(firstEncryptedValue).toBe(secondEncryptedValue);
  });

  describe('When calls the encryptPassword function', () => {
    beforeEach(() => {
      process.env.PASSWORD_ENCRYPTION_ALGORITHM = 'aes-256-ecb';
      process.env.PASSWORD_ENCRYPTION_KEY = 'my-secret-key';
    });

    afterEach(() => {
      delete process.env.PASSWORD_ENCRYPTION_ALGORITHM;
      delete process.env.PASSWORD_ENCRYPTION_KEY;
    });

    test('Then encrypts a password correctly', () => {
      const password = 'myPassword';

      const encryptedPassword = encryptPassword(password);

      expect(encryptedPassword).not.toEqual(password);

      expect(encryptedPassword).toMatch(/^[0-9a-f]+$/i);
    });

    test('Throws an error if the encryption algorithm is undefined', () => {
      delete process.env.PASSWORD_ENCRYPTION_ALGORITHM;

      expect(() => {
        encryptPassword('my-password');
      }).toThrow('Encryption algorithm must be defined on env');
    });

    test('Throws an error if the encryption key is undefined', () => {
      delete process.env.PASSWORD_ENCRYPTION_KEY;

      expect(() => {
        encryptPassword('my-password');
      }).toThrow('Encryption key must be defined on env');
    });
  });
});

describe('When a generateJWTToken', () => {
  test('Should generate a JWT token with the provided email and secret', () => {
    const email = 'test@example.com';
    process.env.JWT_SECRET = 'holo';

    const token = generateJWTToken(email);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    expect(decoded.email).toBe(email);
  });

  test('should throw an error if JWT_SECRET environment variable is not defined', () => {
    delete process.env.JWT_SECRET;

    expect(() => generateJWTToken('test@example.com')).toThrowError(
      new Error('JWT_SECRET environment should be defined'),
    );
  });
});
