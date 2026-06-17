interface OrnamentalDividerProps {
  className?: string;
  symbol?: string;
}

export function OrnamentalDivider({ className = "", symbol = "✦" }: OrnamentalDividerProps) {
  return (
    <div className={`ornament-line text-xs ${className}`} aria-hidden="true">
      <span className="text-[#B8943F] opacity-70">{symbol}</span>
    </div>
  );
}

export function IslamicGeometryLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`w-full ${className}`}
      height="24"
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="0" y1="12" x2="160" y2="12" stroke="#D4B96A" strokeWidth="0.5" strokeOpacity="0.5" />
      <path
        d="M180 4 L188 12 L180 20 L172 12 Z"
        stroke="#B8943F"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.6"
      />
      <path
        d="M200 2 L204 12 L200 22 L196 12 Z"
        stroke="#B8943F"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.8"
      />
      <path
        d="M220 4 L228 12 L220 20 L212 12 Z"
        stroke="#B8943F"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.6"
      />
      <line x1="240" y1="12" x2="400" y2="12" stroke="#D4B96A" strokeWidth="0.5" strokeOpacity="0.5" />
    </svg>
  );
}
