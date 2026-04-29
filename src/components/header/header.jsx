import './header.css';
import { Link } from 'react-router'
import LoginModal from '../loginModal'
import Dropdown from '../dropdown/Dropdown';

function Header() {
  return (
    <header>
      <h1>BilDeck</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/deck">Flashcards</Link></li>
        </ul>
        <Dropdown />
        <LoginModal />
      </nav>
    </header>
  );
}

export default Header;