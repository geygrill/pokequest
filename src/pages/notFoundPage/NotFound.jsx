import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFoundPage() {
    return (
        <main className="outer-content-container">
            <div className="not-found-inner-container">
                <div className="not-found-psyduck-wrapper">
                    <span className="not-found-qm qm1">?</span>
                    <span className="not-found-qm qm2">?</span>
                    <span className="not-found-qm qm3">?</span>
                    <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
                        alt="Psyduck"
                        className="not-found-img"
                    />
                </div>
                <h1 className="not-found-title">Pagina niet gevonden</h1>
                <p className="not-found-text">Deze pagina bestaat niet. Of wel? Psyduck weet het niet meer.</p>
                <p className="not-found-text">Zijn hoofd doet nu pijn.</p>
                <Link to="/" className="btn-submit not-found-btn">Breng me weg van hier</Link>
            </div>
        </main>
    );
}

export default NotFoundPage;
