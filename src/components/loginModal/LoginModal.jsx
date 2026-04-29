import { Link } from 'react-router'
import './loginModal.css'

/**
 * LoginModal Component
 * Modal popup for user authentication with login and sign up options
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback to close the modal
 */
function LoginModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <h1>Login</h1>
        <p>Här kommer inloggningen</p>

        <p>Inget konto? <Link to="/signup" onClick={onClose}>Registrera dig</Link></p>
      </div>
    </div>
  );
}

export default LoginModal;