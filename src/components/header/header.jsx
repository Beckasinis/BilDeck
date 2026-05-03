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
        <img src="/img/apple-touch-icon.png" alt="logo BilDeck" />
        <div>
          <h1>
            <span className="logo-part1">BIL</span>
            <span className="logo-part2">DECK</span>
          </h1>
          <p className="logo-part3">TRIMMA TEORIN</p>
        </div>
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