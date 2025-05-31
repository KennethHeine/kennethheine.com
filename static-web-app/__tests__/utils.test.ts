import { formatDate, slugify, truncate, cn } from '../lib/utils'

describe('Utility functions', () => {
  describe('formatDate', () => {
    it('formats date string correctly', () => {
      const result = formatDate('2024-01-15')
      expect(result).toBe('January 15, 2024')
    })

    it('formats Date object correctly', () => {
      const date = new Date('2024-12-25')
      const result = formatDate(date)
      expect(result).toBe('December 25, 2024')
    })

    it('handles invalid date gracefully', () => {
      const result = formatDate('invalid-date')
      expect(result).toBe('Invalid Date')
    })
  })

  describe('slugify', () => {
    it('converts text to URL-friendly slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('My Awesome Blog Post!')).toBe('my-awesome-blog-post')
      expect(slugify('Test@#$%^&*()123')).toBe('test123')
    })

    it('handles empty string', () => {
      expect(slugify('')).toBe('')
    })

    it('handles strings with multiple spaces', () => {
      expect(slugify('Hello    World   Test')).toBe('hello-world-test')
    })

    it('removes leading and trailing hyphens', () => {
      expect(slugify('  -Hello World-  ')).toBe('hello-world')
    })
  })
  describe('truncate', () => {    it('truncates text to specified length', () => {
      const text = 'This is a very long piece of text that needs to be truncated'
      const result = truncate(text, 20)
      expect(result).toBe('This is a very lo...')
    })

    it('returns original text if shorter than max length', () => {
      const text = 'Short text'
      const result = truncate(text, 20)
      expect(result).toBe('Short text')
    })

    it('handles empty string', () => {
      expect(truncate('', 10)).toBe('')
    })

    it('uses custom suffix', () => {
      const text = 'This is a long text'
      const result = truncate(text, 10, ' [more]')
      expect(result).toBe('Thi [more]')
    })
  })

  describe('cn (className utility)', () => {
    it('merges class names correctly', () => {
      const result = cn('px-4 py-2', 'bg-blue-500 text-white')
      expect(result).toBe('px-4 py-2 bg-blue-500 text-white')
    })

    it('handles conditional classes', () => {
      const isActive = true
      const result = cn('base-class', isActive && 'active-class')
      expect(result).toBe('base-class active-class')
    })

    it('filters out falsy values', () => {
      const result = cn('base-class', false && 'hidden-class', null, undefined, '')
      expect(result).toBe('base-class')
    })

    it('handles Tailwind CSS conflicts', () => {
      // This assumes tailwind-merge is working correctly
      const result = cn('px-4 px-6 py-2 py-4')
      // tailwind-merge should resolve conflicts, keeping the last value
      expect(result).toBe('px-6 py-4')
    })
  })
})
