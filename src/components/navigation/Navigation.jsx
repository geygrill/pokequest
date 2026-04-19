import './Navigation.css'
import {Link} from 'react-router-dom';
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Navigation() {
    const { isAuth, logout } = useContext(AuthContext);

    return (
            <nav className="main-navigation outer-content-container">
                <div className="inner-nav-container">

                    <Link to="/" className="navbar-logo">
                        <span className="pokeball-icon" aria-hidden="true"></span>
                        PokéQuest
                    </Link>

                    <ul className="main-navigation-links">
                        <li><Link to="/pokedex">Pokédex</Link></li>
                        <li><Link to="/quiz">Quiz</Link></li>
                        <li><Link to="/team">Mijn Team</Link></li>

                        <div className="navbar-auth">
                            {isAuth ? (
                                <>
                                    <li><span className="navbar-username">Hoi, Vera!</span></li>
                                    <li><button onClick={logout} className="btn-logout">Uitloggen</button></li>
                                </>
                                ) : (
                                <>
                                    <li><Link to="/login" className="btn-login">Inloggen</Link></li>
                                    <li><Link to="/register" className="btn-register">Registreren</Link></li>
                                </>)
                            }

                        </div>
                    </ul>
                </div>
            </nav>
    )
}

export default Navigation;