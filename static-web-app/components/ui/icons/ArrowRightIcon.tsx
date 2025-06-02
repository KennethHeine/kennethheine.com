// --- file: components/ui/icons/ArrowRightIcon.tsx ---
interface ArrowRightIconProps {
  className?: string
}

/**
 * Arrow Right icon component
 * Used for call-to-action buttons and navigation links
 */
export function ArrowRightIcon({ className = 'h-4 w-4' }: ArrowRightIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  )
}
