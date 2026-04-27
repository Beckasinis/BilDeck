import './header.css';
import { Link } from 'react-router'
import LoginModal from '../loginModal'

function Header() {
  return (
    <header>
      <h1>BilDeck</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/deck">Flashcards</Link></li>
        </ul>
        <LoginModal />
      </nav>
    </header>
  );
}

export default Header;