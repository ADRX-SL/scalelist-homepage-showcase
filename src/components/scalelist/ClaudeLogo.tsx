export function ClaudeLogo({ className = "w-4 h-4" }: { className?: string }) {
  const angles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const lengths = [36, 32, 38, 34, 37, 33, 36, 32, 38, 34, 37, 33];
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {angles.map((angle, i) => (
        <rect
          key={i}
          x="45.5"
          y={50 - lengths[i] - 8}
          width="9"
          height={lengths[i]}
          rx="4.5"
          fill="#CC785C"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}
