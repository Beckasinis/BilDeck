    import { Link } from 'react-router'
    import './loginModal.css'

    function LoginModal(){
        return (
            <>
            <h1>Login</h1>
            <p>Här kommer inloggningen</p>
            <p>Inget konto? <Link to="/signup">Registrera dig</Link></p>
            </>
        );
    }

    export default LoginModal;