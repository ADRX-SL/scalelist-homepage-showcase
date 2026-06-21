export function ClaudeLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="claude-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#E8956D" />
          <stop offset="100%" stop-color="#C5623E" />
        </linearGradient>
      </defs>
      {/* Gradient circle background */}
      <rect width="40" height="40" rx="10" fill="url(#claude-bg)" />
      {/* White "A" lettermark centred inside */}
      <path
        d="M10.5 29L15.8 15h3.4l5.3 14h-3l-1.15-3.2H14.6L13.5 29h-3zm5-6.3h4.2L17.5 17l-2.0 5.7z"
        fill="white"
      />
    </svg>
  );
}
