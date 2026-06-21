export function ChromeLogo({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="40" fill="#fff" stroke="#e0e0e0" strokeWidth="2" />
      <circle cx="50" cy="50" r="16" fill="#4285F4" />
      <path d="M50 18A32 32 0 0 1 78 50H50V18Z" fill="#EA4335" />
      <path d="M28 72A32 32 0 0 1 18 50l32 0-10 22z" fill="#34A853" />
      <path d="M78 50A32 32 0 0 1 28 72l22-22H78Z" fill="#FBBC05" />
    </svg>
  );
}
