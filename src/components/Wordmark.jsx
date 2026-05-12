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
  const part1Color =
    colorScheme === 'light' ? 'var(--light-text)' :
    colorScheme === 'dark'  ? 'var(--dark-text)'  :
    'currentColor';

  return (
    <span style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 400, textTransform: 'uppercase' }}>
      <span style={{ color: part1Color }}>BIL</span>
      <span style={{ color: 'var(--accent)' }}>DECK</span>
    </span>
  );
};