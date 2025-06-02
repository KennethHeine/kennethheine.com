// --- file: components/ui/icons/ArrowLeftIcon.tsx ---
interface ArrowLeftIconProps {
  className?: string
}

/**
 * Arrow Left icon component
 * Used for back navigation buttons
 */
export function ArrowLeftIcon({ className = 'h-4 w-4' }: ArrowLeftIconProps) {
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
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  )
}
