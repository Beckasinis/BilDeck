import { Link } from 'react-router'
import './hamburger.css'

function Hamburger() {
    return (
        <>
        <p>Hamburger</p>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/deck">Flashcards</Link></li>
            
        </ul>
        </>
    );
}

export default Hamburger;