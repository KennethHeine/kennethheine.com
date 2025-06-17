'use client';

import { useState } from 'react';
import { CopyIcon } from '@/components/icons/CopyIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Enhanced code block component with syntax highlighting and copy functionality
 * Uses Prism.js for syntax highlighting via rehype-prism
 */
export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  // Extract the code content for copying
  const getCodeContent = (): string => {
    if (typeof children === 'string') {
      return children;
    }

    // Handle JSX children - extract text content
    const extractText = (node: React.ReactNode): string => {
      if (typeof node === 'string') {
        return node;
      }
      if (Array.isArray(node)) {
        return node.map(extractText).join('');
      }
      if (node && typeof node === 'object' && 'props' in node) {
        const element = node as React.ReactElement;
        if (
          element.props &&
          typeof element.props === 'object' &&
          'children' in element.props
        ) {
          return extractText(element.props.children as React.ReactNode);
        }
      }
      return '';
    };

    return extractText(children);
  };

  const handleCopy = async () => {
    try {
      const codeContent = getCodeContent();
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div className='relative group'>
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className='absolute top-3 right-3 z-10 rounded-md bg-gray-700 p-2 text-gray-300 opacity-0 transition-all hover:bg-gray-600 hover:text-white group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-900'
        aria-label={copied ? 'Code copied' : 'Copy code'}
        type='button'
      >
        {copied ? (
          <CheckIcon className='h-4 w-4' />
        ) : (
          <CopyIcon className='h-4 w-4' />
        )}
      </button>

      {/* Code block */}
      <pre className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
