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

        <form>
          <div className="form-group">
            <label htmlFor="username">Användarnamn</label>
            <input
              type="text"
              id="username"
              placeholder="Ditt användarnamn"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Lösenord</label>
            <input
              type="password"
              id="password"
              placeholder="Ditt lösenord"
            />
          </div>

          <button type="submit" className="submit-button">Logga in</button>
        </form>

        <p className="signup-link">Inget konto? <Link to="/signup" onClick={onClose}>Registrera dig</Link></p>
      </div>
    </div>
  );
}

export default LoginModal;