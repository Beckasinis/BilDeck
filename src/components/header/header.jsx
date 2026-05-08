import './header.css';
import useModalStore from '../../stores/useModalStore';
import { Link } from 'react-router'
import LoginModal from '../loginModal';
import Dropdown from '../dropdown/Dropdown';

/**
 * Header Component
 * Main navigation header with logo, flashcard categories dropdown and login button
 */
function Header() {
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useModalStore();

  return (
    <header>
      <div className="logo">
        <img src="/img/apple-touch-icon.png" alt="logo BilDeck" />
        <div>
          <h1>
            <span className="logo-part1">Bil</span>
            <span className="logo-part2">Deck</span>
          </h1>
          <p className="logo-part3">Trimma Teorin</p>
        </div>
      </div>

      <nav>
        <Dropdown />
      </nav>

      <div className="auth-button">
        <button onClick={openLoginModal}>Login</button>
      </div>

      {isLoginModalOpen && (
        <LoginModal onClose={closeLoginModal} />
      )}

    </header>
  );
}

export default Header;