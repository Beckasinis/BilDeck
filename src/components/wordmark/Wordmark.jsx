import './wordmark.css';

/**
 * Wordmark – company name styled as a reusable brand component
 *
 * Usage:
 *   <h2><Wordmark /></h2>
 *   <p>Welcome to <Wordmark colorScheme="light" /></p>
 *
 * Behavior:
 *   "BIL"  – follows parent color by default (currentColor)
 *   "DECK" – always accent color (var(--accent)), regardless of scheme
 *
 * Props:
 *   colorScheme   string   – "adaptive" | "light" | "dark", default "adaptive"
 *                            use "light" or "dark" when background is locked
 *                            (e.g. hero sections, dark headers)
 */

const Wordmark = ({ colorScheme = 'adaptive' }) => {
  return (
    <span className={`wordmark ${colorScheme !== 'adaptive' ? `wordmark--${colorScheme}` : ''}`}>
      <span className="wordmark__bil">BIL</span>
      <span className="wordmark__deck">DECK</span>
    </span>
  );
};

export default Wordmark;
