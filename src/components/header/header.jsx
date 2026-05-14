import './header.css';
import useModalStore from '../../stores/useModalStore';
import useSessionStore from '../../stores/useSessionStore';
import { Link } from 'react-router';
import LoginModal from '../loginModal';
import Dropdown from '../dropdown';
import Wordmark from '../wordmark';
import Button from '../button';

/**
 * Header Component
 * Main navigation header with logo, flashcard categories dropdown and login button
 */
function Header() {
  const { isLoginModalOpen, openLoginModal, closeLoginModal } = useModalStore();
  const { user, logout } = useSessionStore();

  return (
    <>
      <header>
        <Link to="/" className="logo-link">
          <div className="logo">
            <img src="/img/apple-touch-icon.png" alt="logo BilDeck" />
            <div>
              <Wordmark colorScheme="light" />
              <p className="logo-slogan">Trimma Teorin</p>
            </div>
          </div>
        </Link>

        <nav>
          <Dropdown />
        </nav>

        <div className="auth-button">
          {user ? (
            <Button variant="primary" onClick={logout}>Logga ut</Button>
          ) : (
            <Button variant="primary" onClick={openLoginModal}>Login</Button>
          )}
        </div>
      </header>

      {isLoginModalOpen && (
        <LoginModal
          onClose={closeLoginModal}
          description=""
        />
      )}
    </>
  );
}

export default Header;
