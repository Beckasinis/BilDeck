import './wordmark.css';

const Wordmark = ({ colorScheme = 'adaptive' }) => {
  return (
    <span className={`wordmark ${colorScheme !== 'adaptive' ? `wordmark--${colorScheme}` : ''}`}>
      <span className="wordmark__bil">BIL</span>
      <span className="wordmark__deck">DECK</span>
    </span>
  );
};

export default Wordmark;
