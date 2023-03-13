import { hello } from './index';

describe('Config example verification', () => {
  test('Hello must have content', () => {
    expect(hello.hello).toBe('Hello world');
  });
});
