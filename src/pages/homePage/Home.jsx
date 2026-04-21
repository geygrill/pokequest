import './Home.css'
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import Pokeball from "../../components/pokeball/Pokeball.jsx";

function Home() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            <header className="header outer-content-container">
                <section className="intro-inner-container">
                    <h1>Welkom bij PokéQuest!</h1>
                    <p className="intro-text">
                        Test je Pokémon-kennis, bouw je droomteam en ontdek al je favoriete Pokémon!
                    </p>

                    <div className="intro-buttons">
                        {isAuth ? (
                            <>
                                <Link to="/quiz" className="btn btn--primary btn--lg btn--hover-lift">Speel de Quiz</Link>
                                <Link to="/team" className="btn btn--secondary btn--lg">Mijn Team</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="btn btn--primary btn--lg btn--hover-lift">Maak een account</Link>
                                <Link to="/login" className="btn btn--secondary btn--lg">Inloggen</Link>
                            </>
                        )}
                    </div>
                </section>
            </header>

            <div className="pokeball-wrapper" aria-hidden="true">
                <Pokeball size="large" />
            </div>

            <main className="outer-content-container features-section">
                <div className="inner-content-container">
                    <h2 className="feature-title">Wat kun je doen?</h2>
                    <ul className="feature-cards">
                        <li className="feature-card">
                            <h3>Wie is deze Pokémon?!</h3>
                            <p>Zie een silhouet en raad welke Pokémon het is. Raad je het goed? Dan kun je deze toevoegen aan je team!</p>
                            <Link to="/quiz" className="feature-link">Speel nu →</Link>
                        </li>

                        <li className="feature-card">
                            <h3>Mijn Pokédex</h3>
                            <p>Bekijk alle Pokémon die je ooit goed hebt geraden. Filter op naam en beheer welke pokémon er in je team zitten.</p>
                            <Link to="/pokedex" className="feature-link">Open Pokédex →</Link>
                        </li>

                        <li className="feature-card">
                            <h3>Mijn Team</h3>
                            <p>Kies je favoriete Pokémon en stel je perfecte team samen voor de ideale line-up.</p>
                            <Link to="/team" className="feature-link">Mijn team →</Link>
                        </li>

                    </ul>
                </div>
            </main>
        </>
    )
}

export default Home;