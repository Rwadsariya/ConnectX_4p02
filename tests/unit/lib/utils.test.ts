import { cn, getMonth, duplicateValidation } from '@/lib/utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('class1', 'class2', { 'class3': true, 'class4': false });
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn('base-class', isActive && 'active', isDisabled && 'disabled');
      expect(result).toBe('base-class active');
    });
  });

  describe('getMonth function', () => {
    it('should return the correct month name for valid input', () => {
      expect(getMonth(1)).toBe('January');
      expect(getMonth(6)).toBe('June');
      expect(getMonth(12)).toBe('December');
    });

    it('should handle invalid month numbers', () => {
      expect(getMonth(0)).toBe('Invalid month number. Please enter a number between 1 and 12.');
      expect(getMonth(13)).toBe('Invalid month number. Please enter a number between 1 and 12.');
      expect(getMonth(-5)).toBe('Invalid month number. Please enter a number between 1 and 12.');
    });
  });

  describe('duplicateValidation function', () => {
    it('should add element to array if not present', () => {
      const arr = ['a', 'b', 'c'];
      const result = duplicateValidation(arr, 'd');
      expect(result).toEqual(['a', 'b', 'c', 'd']);
    });

    it('should remove element from array if already present', () => {
      const arr = ['a', 'b', 'c'];
      const result = duplicateValidation(arr, 'b');
      expect(result).toEqual(['a', 'c']);
    });

    it('should handle empty array', () => {
      const result = duplicateValidation([], 'a');
      expect(result).toEqual(['a']);
    });
  });
}); 