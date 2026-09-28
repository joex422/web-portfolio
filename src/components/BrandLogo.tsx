export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="brand-logo" aria-label="Zaw Wana home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" fill="none">
          <path d="M11 19H29L11 45H29" />
          <path d="M33 19L39 45L46 30L53 45L59 19" />
        </svg>
      </span>
      {!compact && (
        <span className="brand-wordmark">
          <span>
            Zaw Wana<span className="brand-dot">.</span>
          </span>
          <span className="brand-subtitle">Platform / SRE</span>
        </span>
      )}
    </a>
  );
}
