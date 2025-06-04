// --- file: components/Container.tsx ---
import { ReactNode, ElementType } from 'react';
import { cn } from '../lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Container component for consistent page layout
 * Provides responsive max-width and horizontal padding
 */
export default function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
    >
      {children}
    </Component>
  );
}
