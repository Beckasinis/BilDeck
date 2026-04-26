import './header.css';
import Hamburger from './Hamburger'
import LoginModal from '../loginModal'

function Header(){
    return (
        <>
        <h1>Header</h1>
        <Hamburger />
        <LoginModal />
        </>
    );
}

export default Header;