interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="error-banner" style={{
      background: 'var(--err-bg)',
      border: '1px solid var(--err-line)',
      borderRadius: '8px',
      padding: '14px 18px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--err)'
    }}>
      <svg className="ic" style={{ flex: '0 0 auto' }}>
        <use href="#i-info" />
      </svg>
      <span>{message}</span>
    </div>
  );
}
