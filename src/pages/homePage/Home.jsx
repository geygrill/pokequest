import './Home.css'
import {Link} from "react-router-dom";

function Home() {
    return (
        <>
            <header className="header outer-content-container">
                <div className="intro-inner-container">
                    <h1>Welkom bij PokéQuest!</h1>
                    <p className="intro-text">
                        Test je Pokémon-kennis, bouw je droomteam en ontdek al je favoriete Pokémon!
                    </p>

                    <div className="intro-buttons">
                        <Link to="/register" className="btn-intro-primary">Maak een account</Link>
                        <Link to="/login" className="btn-intro-secondary">Inloggen</Link>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Home;