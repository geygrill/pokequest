import './Navigation.css'
import {Link} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Pokeball from "../pokeball/Pokeball.jsx";
import Button from "../button/Button.jsx";

function Navigation() {
    const { isAuth, logout, user } = useContext(AuthContext);

    return (
            <nav className="main-navigation">
                <div className="inner-nav-container">

                    <Link to="/" className="navbar-logo">
                        <Pokeball />
                        PokéQuest
                    </Link>

                    <ul className="main-navigation-links">
                        <li><Link to="/pokedex">Pokédex</Link></li>
                        <li><Link to="/quiz">Quiz</Link></li>
                        <li><Link to="/team">Mijn Team</Link></li>
                    </ul>

                        <div className="navbar-auth">
                            {isAuth ? (
                                <>
                                    <span className="navbar-username">Hoi, {user.email.split('@')[0]}!</span>
                                    <Button variant="light" size="sm" onClick={logout}>Uitloggen</Button>
                                </>
                                ) : (
                                <>
                                    <Link to="/login" className="btn btn--light btn--sm">Inloggen</Link>
                                    <Link to="/register" className="btn btn--primary btn--sm">Registreren</Link>
                                </>)}
                        </div>
                </div>
            </nav>
    )
}

export default Navigation;