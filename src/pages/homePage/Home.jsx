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

            <div className="pokeball-wrapper" aria-hidden="true">
                <div className="pokeball-icon pokeball-large"></div>
            </div>

            <section className="outer-content-container">
                <div className="inner-content-container">
                    <h2 className="feature-title">Wat kun je doen?</h2>
                    <div className="feature-cards">
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Wie is deze Pokémon?!</h3>
                            <p>Zie een silhouet en raad welke Pokémon het is. Raad je het goed? Dan vang je hem en kun je hem toevoegen aan je team!</p>
                            <Link to="/quiz" className="feature-link">Speel nu →</Link>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Mijn Pokédex</h3>
                            <p>Bekijk alle Pokémon die je ooit goed hebt geraden. Filter op naam en beheer wie er in je team zit.</p>
                            <Link to="/search" className="feature-link">Open Pokédex →</Link>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Mijn Team</h3>
                            <p>Bouw je eigen team van maximaal 6 Pokémon. Wissel, verwijder en stel de perfecte lineup samen!</p>
                            <Link to="/team" className="feature-link">Mijn team →</Link>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;