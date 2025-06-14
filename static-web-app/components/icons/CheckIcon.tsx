import { IconProps } from '@/types';

/**
 * Check icon component for indicating successful copy operation
 */
export function CheckIcon({ className = 'h-5 w-5', ...props }: IconProps) {
  return (
    <svg
      className={className}
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...props}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
    </svg>
  );
}
