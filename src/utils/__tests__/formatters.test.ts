import {
  formatPrice,
  formatDate,
  formatDateTime,
  capitalizeFirstLetter,
  truncateText,
} from '../formatters';

describe('Formatters', () => {
  describe('formatPrice', () => {
    it('should format price in USD currency', () => {
      expect(formatPrice(99.99)).toBe('$99.99');
      expect(formatPrice(1299.99)).toBe('$1,299.99');
      expect(formatPrice(0)).toBe('$0.00');
    });

    it('should handle decimal prices', () => {
      expect(formatPrice(99.95)).toBe('$99.95');
      expect(formatPrice(99.9)).toBe('$99.90');
    });

    it('should handle large numbers', () => {
      expect(formatPrice(1000000)).toBe('$1,000,000.00');
    });

    it('should handle negative prices', () => {
      expect(formatPrice(-99.99)).toBe('-$99.99');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string to US format', () => {
      expect(formatDate('2024-01-15T10:00:00Z')).toBe('Jan 15, 2024');
      expect(formatDate('2024-12-25T00:00:00Z')).toBe('Dec 25, 2024');
    });

    it('should handle different date formats', () => {
      expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
    });

    it('should handle edge cases', () => {
      expect(formatDate('2024-02-29T00:00:00Z')).toBe('Feb 29, 2024'); // Leap year
    });
  });

  describe('formatDateTime', () => {
    it('should format ISO date string with time', () => {
      const result = formatDateTime('2024-01-15T10:30:00Z');
      expect(result).toMatch(/January 15, 2024/);
      expect(result).toMatch(/\d{1,2}:\d{2} (AM|PM)/);
    });

    it('should handle midnight time', () => {
      const result = formatDateTime('2024-01-15T00:00:00Z');
      expect(result).toMatch(/January 15, 2024/);
    });

    it('should handle noon time', () => {
      const result = formatDateTime('2024-01-15T12:00:00Z');
      expect(result).toMatch(/January 15, 2024/);
    });
  });

  describe('capitalizeFirstLetter', () => {
    it('should capitalize first letter of lowercase string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('world')).toBe('World');
    });

    it('should handle already capitalized strings', () => {
      expect(capitalizeFirstLetter('Hello')).toBe('Hello');
    });

    it('should handle single character strings', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
      expect(capitalizeFirstLetter('A')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle strings with numbers and symbols', () => {
      expect(capitalizeFirstLetter('123abc')).toBe('123abc');
      expect(capitalizeFirstLetter('!hello')).toBe('!hello');
    });

    it('should only capitalize first letter', () => {
      expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
    });
  });

  describe('truncateText', () => {
    it('should truncate text longer than maxLength', () => {
      expect(truncateText('Hello world', 5)).toBe('Hello...');
      expect(truncateText('This is a very long text', 10)).toBe('This is a ...');
    });

    it('should not truncate text shorter than or equal to maxLength', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
      expect(truncateText('Hello', 5)).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(truncateText('', 5)).toBe('');
    });

    it('should handle zero maxLength', () => {
      expect(truncateText('Hello', 0)).toBe('...');
    });

    it('should handle negative maxLength', () => {
      expect(truncateText('Hello', -1)).toBe('Hell...');
    });

    it('should handle exact length match', () => {
      expect(truncateText('Hello', 5)).toBe('Hello');
    });
  });
});