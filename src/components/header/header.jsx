import './header.css';
import useModalStore from '../../stores/useModalStore';
import useSessionStore from '../../stores/useSessionStore';
import { Link } from 'react-router'
import LoginModal from '../loginModal';
import Dropdown from '../dropdown/Dropdown';

/**
 * Header Component
 * Main navigation header with logo, flashcard categories dropdown and login button
 */
function Header() {
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useModalStore();
  const { user, logout } = useSessionStore()

  return (
    <>
      <header>
        <a href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}></a>
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
          {user ? (
            <button onClick={logout}>Logga ut</button>
          ) : (
            <button onClick={openLoginModal}>Login</button>
          )}
        </div>
      </header>
      {
        isLoginModalOpen && (
          <LoginModal onClose={closeLoginModal} description="Logga in för att spara dina resultat." />
        )
      }
    </>

  );
}

export default Header;