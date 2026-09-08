export default function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0l2.4 7.2L21 4.5l-2.7 6.6L24 12l-5.7.9L21 19.5l-6.6-2.7L12 24l-2.4-7.2L3 19.5l2.7-6.6L0 12l5.7-.9L3 4.5l6.6 2.7z" />
    </svg>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className}`} aria-hidden="true">
      <div className="hairline flex-1" />
      <Star className="h-3 w-3 text-red" />
      <div className="hairline flex-1" />
    </div>
  );
}
