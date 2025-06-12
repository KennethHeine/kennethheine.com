/**
 * @fileoverview Example utility functions with comprehensive documentation
 * @author Kenneth Heine
 */

/**
 * Configuration options for text processing functions
 */
export interface TextProcessingOptions {
  /** Whether to preserve whitespace */
  preserveWhitespace?: boolean;
  /** Maximum length for truncation */
  maxLength?: number;
  /** Suffix to append when truncating */
  suffix?: string;
}

/**
 * Result of text analysis operations
 */
export interface TextAnalysisResult {
  /** Number of words in the text */
  wordCount: number;
  /** Number of characters (including spaces) */
  characterCount: number;
  /** Number of characters (excluding spaces) */
  characterCountNoSpaces: number;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Array of unique words found */
  uniqueWords: string[];
}

/**
 * Processes and analyzes text content for various metrics
 * 
 * This utility function provides comprehensive text analysis including
 * word count, character count, reading time estimation, and unique word extraction.
 * 
 * @utility
 * @param text - The text content to analyze
 * @param options - Configuration options for processing
 * @returns Analysis results containing various text metrics
 * 
 * @throws {Error} When text is not a string
 * @throws {RangeError} When maxLength is negative
 * 
 * @example
 * ```typescript
 * // Basic text analysis
 * const text = "Hello world! This is a sample text.";
 * const result = analyzeText(text);
 * console.log(result.wordCount); // 7
 * console.log(result.readingTime); // 1
 * 
 * // With custom options
 * const options = { maxLength: 20, suffix: '...' };
 * const result2 = analyzeText(text, options);
 * ```
 * 
 * @see {@link truncateText} for text truncation functionality
 * @see {@link calculateReadingTime} for reading time calculation
 * @since 1.0.0
 */
export function analyzeText(
  text: string,
  options: TextProcessingOptions = {}
): TextAnalysisResult {
  // Validate input
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }

  const { preserveWhitespace = true, maxLength = Infinity } = options;

  if (maxLength < 0) {
    throw new RangeError('maxLength must be non-negative');
  }

  // Process text based on options
  const processedText = preserveWhitespace ? text : text.replace(/\s+/g, ' ').trim();
  
  // Calculate metrics
  const words = processedText.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const characterCount = processedText.length;
  const characterCountNoSpaces = processedText.replace(/\s/g, '').length;
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));
  
  // Extract unique words (case-insensitive)
  const uniqueWords = Array.from(
    new Set(
      words.map(word => 
        word.toLowerCase().replace(/[^\w]/g, '')
      ).filter(word => word.length > 0)
    )
  );

  return {
    wordCount,
    characterCount,
    characterCountNoSpaces,
    readingTime,
    uniqueWords,
  };
}

/**
 * Truncates text to a specified length with customizable suffix
 * 
 * @utility
 * @param text - Text to truncate
 * @param maxLength - Maximum length including suffix
 * @param suffix - String to append when truncated
 * @returns Truncated text with suffix if needed
 * 
 * @throws {Error} When text is not a string
 * @throws {RangeError} When maxLength is less than suffix length
 * 
 * @example
 * ```typescript
 * truncateText("Hello world", 8); // "Hello..."
 * truncateText("Short", 10); // "Short"
 * truncateText("Long text here", 10, " (more)"); // "Lo (more)"
 * ```
 */
export function truncateText(
  text: string, 
  maxLength: number, 
  suffix: string = '...'
): string {
  if (typeof text !== 'string') {
    throw new Error('Text must be a string');
  }

  if (maxLength < suffix.length) {
    throw new RangeError('maxLength must be at least as long as suffix');
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Calculates estimated reading time for given text
 * 
 * @utility
 * @param text - Text content to analyze
 * @param wordsPerMinute - Reading speed in words per minute
 * @returns Estimated reading time in minutes (minimum 1)
 * 
 * @example
 * ```typescript
 * const blogPost = "A very long blog post...";
 * const readingTime = calculateReadingTime(blogPost); // e.g., 5
 * const fastReader = calculateReadingTime(blogPost, 300); // e.g., 3
 * ```
 */
export function calculateReadingTime(
  text: string, 
  wordsPerMinute: number = 200
): number {
  const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Extracts metadata from frontmatter-style text
 * 
 * @utility
 * @param content - Text content with potential frontmatter
 * @returns Object containing metadata and content
 * 
 * @example
 * ```typescript
 * const markdown = `---
 * title: My Post
 * date: 2024-01-15
 * ---
 * # Content here`;
 * 
 * const { metadata, content } = extractFrontmatter(markdown);
 * console.log(metadata.title); // "My Post"
 * ```
 */
export function extractFrontmatter(content: string): {
  metadata: Record<string, unknown>;
  content: string;
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content };
  }

  try {
    // Simple YAML-like parsing for basic key-value pairs
    const yamlContent = match[1];
    const metadata: Record<string, unknown> = {};
    
    yamlContent.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        
        // Remove quotes if present
        const cleanValue = value.replace(/^['"](.*)['"]$/, '$1');
        metadata[key] = cleanValue;
      }
    });

    return {
      metadata,
      content: match[2],
    };
  } catch (error) {
    console.warn('Failed to parse frontmatter:', error);
    return { metadata: {}, content };
  }
}

/**
 * Debounces function calls to limit execution frequency
 * 
 * @utility
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 * 
 * @example
 * ```typescript
 * const search = debounce((query: string) => {
 *   console.log('Searching for:', query);
 * }, 300);
 * 
 * // These calls will be debounced
 * search('a');
 * search('ab');
 * search('abc'); // Only this call will execute after 300ms
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Type guard to check if a value is a non-empty string
 * 
 * @utility
 * @param value - Value to check
 * @returns True if value is a non-empty string
 * 
 * @example
 * ```typescript
 * if (isNonEmptyString(userInput)) {
 *   // TypeScript knows userInput is string here
 *   console.log(userInput.toUpperCase());
 * }
 * ```
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

/**
 * Creates a promise that resolves after a specified delay
 * 
 * @utility
 * @param ms - Delay in milliseconds
 * @returns Promise that resolves after the delay
 * 
 * @example
 * ```typescript
 * async function example() {
 *   console.log('Starting...');
 *   await delay(1000);
 *   console.log('One second later');
 * }
 * ```
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Error class for text processing operations
 * 
 * @example
 * ```typescript
 * throw new TextProcessingError('Invalid input format', 'INVALID_FORMAT');
 * ```
 */
export class TextProcessingError extends Error {
  /**
   * Creates a new TextProcessingError
   * 
   * @param message - Error message
   * @param code - Error code for categorization
   */
  constructor(
    message: string,
    public readonly code: string = 'UNKNOWN'
  ) {
    super(message);
    this.name = 'TextProcessingError';
  }
}