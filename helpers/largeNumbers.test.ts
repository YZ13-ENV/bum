import { largeNumber } from './largeNumbers';

describe('largeNumber', () => {
  it('should return the same number if it is less than 999', () => {
    expect(largeNumber(500)).toBe(500);
  });

  it('should return the number divided by 1000 with "k" suffix if it is between 1000 and 999999', () => {
    expect(largeNumber(1500)).toBe('1.5k');
    expect(largeNumber(500000)).toBe('500k');
  });

  it('should return the number divided by 1000000 with " млн." suffix if it is greater than or equal to 1000000', () => {
    expect(largeNumber(1500000)).toBe('1.5 млн.');
    expect(largeNumber(500000000)).toBe('500 млн.');
  });
});