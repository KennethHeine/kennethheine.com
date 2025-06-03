import { 
  formatDate, 
  formatRelativeDate, 
  slugify, 
  truncate, 
  capitalize,
  pluralize,
  debounce,
  deepClone,
  isValidEmail,
  generateId,
  calculateReadingTime,
  formatReadingTime,
  cn 
} from '../lib/utils'

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
      expect(slugify('Hello    World   Test')).toBe('hello-world-test')    })

    it('removes leading and trailing hyphens', () => {
      expect(slugify('  -Hello World-  ')).toBe('hello-world')
    })
  })

  describe('truncate', () => {
    it('truncates text to specified length', () => {
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

  describe('formatRelativeDate', () => {
    beforeAll(() => {
      // Mock the Date constructor to return a fixed date
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-01-15T12:00:00Z'))
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    it('returns "just now" for recent dates', () => {
      const thirtySecondsAgo = new Date(Date.now() - 30 * 1000).toISOString()
      expect(formatRelativeDate(thirtySecondsAgo)).toBe('just now')
    })

    it('returns minutes ago for recent dates', () => {
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
      expect(formatRelativeDate(fiveMinutesAgo)).toBe('5 minutes ago')
    })

    it('returns singular minute for 1 minute ago', () => {
      const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000).toISOString()
      expect(formatRelativeDate(oneMinuteAgo)).toBe('1 minute ago')
    })

    it('returns hours ago for older dates', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      expect(formatRelativeDate(twoHoursAgo)).toBe('2 hours ago')
    })

    it('returns days ago for older dates', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      expect(formatRelativeDate(threeDaysAgo)).toBe('3 days ago')
    })

    it('returns weeks ago for older dates', () => {
      const twoWeeksAgo = new Date(Date.now() - 2 * 7 * 24 * 60 * 60 * 1000).toISOString()
      expect(formatRelativeDate(twoWeeksAgo)).toBe('2 weeks ago')
    })

    it('falls back to absolute date for very old dates', () => {
      const veryOldDate = new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
      const result = formatRelativeDate(veryOldDate)
      expect(result).toMatch(/^[A-Z][a-z]+ \d{1,2}, \d{4}$/) // Should be absolute date format
    })

    it('handles invalid dates', () => {
      const result = formatRelativeDate('invalid-date')
      expect(result).toBe('Invalid Date')
    })
  })

  describe('capitalize', () => {
    it('capitalizes first letter and lowercases rest', () => {
      expect(capitalize('hello world')).toBe('Hello world')
      expect(capitalize('HELLO WORLD')).toBe('Hello world')
      expect(capitalize('hELLO wORLD')).toBe('Hello world')
    })

    it('handles empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('handles single character', () => {
      expect(capitalize('a')).toBe('A')
      expect(capitalize('A')).toBe('A')
    })
  })

  describe('pluralize', () => {
    it('returns singular for count of 1', () => {
      expect(pluralize(1, 'item')).toBe('item')
      expect(pluralize(1, 'child', 'children')).toBe('child')
    })

    it('returns plural for count other than 1', () => {
      expect(pluralize(0, 'item')).toBe('items')
      expect(pluralize(2, 'item')).toBe('items')
      expect(pluralize(5, 'child', 'children')).toBe('children')
    })

    it('defaults to adding "s" when no plural provided', () => {
      expect(pluralize(2, 'book')).toBe('books')
    })
  })

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('delays function execution', () => {
      const func = jest.fn()
      const debouncedFunc = debounce(func, 100)

      debouncedFunc()
      expect(func).not.toHaveBeenCalled()

      jest.advanceTimersByTime(50)
      expect(func).not.toHaveBeenCalled()

      jest.advanceTimersByTime(50)
      expect(func).toHaveBeenCalledTimes(1)
    })

    it('cancels previous call when called again', () => {
      const func = jest.fn()
      const debouncedFunc = debounce(func, 100)

      debouncedFunc()
      jest.advanceTimersByTime(50)
      debouncedFunc() // Should cancel the first call

      jest.advanceTimersByTime(50)
      expect(func).not.toHaveBeenCalled()

      jest.advanceTimersByTime(50)
      expect(func).toHaveBeenCalledTimes(1)
    })
  })

  describe('deepClone', () => {
    it('clones primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('hello')).toBe('hello')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
    })

    it('clones arrays', () => {
      const original = [1, 2, { a: 3 }]
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned[2]).not.toBe(original[2])
    })

    it('clones objects', () => {
      const original = { a: 1, b: { c: 2 } }
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
      expect(cloned.b).not.toBe(original.b)
    })

    it('clones dates', () => {
      const original = new Date('2024-01-15')
      const cloned = deepClone(original)
      
      expect(cloned).toEqual(original)
      expect(cloned).not.toBe(original)
    })
  })

  describe('isValidEmail', () => {
    it('validates correct email addresses', () => {
      expect(isValidEmail('user@example.com')).toBe(true)
      expect(isValidEmail('test.email@domain.co.uk')).toBe(true)
      expect(isValidEmail('user+tag@example.org')).toBe(true)
    })

    it('rejects invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('user@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('user@domain')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('generateId', () => {
    it('generates ID of specified length', () => {
      expect(generateId(8)).toHaveLength(8)
      expect(generateId(12)).toHaveLength(12)
    })

    it('generates different IDs on multiple calls', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('uses default length when no parameter provided', () => {
      expect(generateId()).toHaveLength(8)
    })

    it('generates IDs with valid characters only', () => {
      const id = generateId(100)
      expect(id).toMatch(/^[A-Za-z0-9]+$/)
    })
  })

  describe('calculateReadingTime', () => {
    it('calculates reading time correctly', () => {
      const content = 'word '.repeat(200) // 200 words
      expect(calculateReadingTime(content)).toBe(1) // 200 words / 200 wpm = 1 minute
    })

    it('uses custom words per minute', () => {
      const content = 'word '.repeat(400) // 400 words
      expect(calculateReadingTime(content, 100)).toBe(4) // 400 words / 100 wpm = 4 minutes
    })

    it('returns minimum 1 minute', () => {
      const content = 'short text'
      expect(calculateReadingTime(content)).toBe(1)
    })

    it('rounds up reading time', () => {
      const content = 'word '.repeat(250) // 250 words
      expect(calculateReadingTime(content, 200)).toBe(2) // 250/200 = 1.25, rounded up to 2
    })
  })

  describe('formatReadingTime', () => {
    it('formats single minute correctly', () => {
      expect(formatReadingTime(1)).toBe('1 min read')
    })

    it('formats multiple minutes correctly', () => {
      expect(formatReadingTime(5)).toBe('5 min read')
      expect(formatReadingTime(15)).toBe('15 min read')
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
