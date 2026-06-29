function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--surface)' }} className="px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
          © 2026 ResumeForge AI
        </span>
        <span className="text-xs font-mono" style={{ color: 'var(--text-faint)' }}>
          Built with React + FastAPI
        </span>
      </div>
    </footer>
  );
}

export default Footer;