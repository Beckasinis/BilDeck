import './header.css';
import { Link } from 'react-router'
import LoginModal from '../loginModal'

function Header() {
  return (
    <>
      <h1>Header</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/deck">Flashcards</Link></li>
      </ul>
      <LoginModal />
    </>
  );
}

export default Header;