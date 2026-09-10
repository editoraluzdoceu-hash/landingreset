export function ResetMark({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <path d="M18 3.5 32.5 18 18 32.5 3.5 18 18 3.5Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="m18 10 8 8-8 8-8-8 8-8Z" stroke="currentColor" strokeWidth="1.1" />
      <path d="M18 14v8m-4-4h8" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}

export function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#inicio" className="brand" aria-label="Método RESET, início" onClick={onClick}>
      <span className="brand-mark" aria-hidden="true">R</span>
      <span className="brand-text">
        <strong>MÉTODO RESET</strong>
        <small>reconstrução possível</small>
      </span>
    </a>
  );
}
