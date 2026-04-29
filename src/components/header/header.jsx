import './header.css';
import { useState } from 'react';
import { Link } from 'react-router'
import LoginModal from '../loginModal';
import Dropdown from '../dropdown/Dropdown';

/**
 * Header Component
 * Main navigation header with logo, flashcard categories dropdown and login button
 */
function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  /**Opens the login modal */
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  /** Close the login modal */
  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <header>
      <div className="logo">
        <h1>BilDeck</h1>
      </div>

      <nav>
        <Dropdown />
      </nav>

      <div className="auth-button">
        <button onClick={handleLoginClick}>Login</button>
      </div>

      {isLoginModalOpen && (
        <LoginModal onClose={handleCloseLoginModal} />
      )}

    </header>
  );
}

export default Header;