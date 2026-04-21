import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';
import {getPokemon, getPokemonSpecies, formatPokemon, getTypeColor, formatPokemonName} from '../../helpers/pokemon.js';
import TypeBadge from '../../components/typeBadge/TypeBadge';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import './detailPage.css';
import Button from "../../components/button/Button.jsx";
import Popup from "../../components/popup/Popup.jsx";

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [popup, setPopup] = useState(false);


    const { getTeam, addToTeam, removeFromTeam, teamLoading } = useContext(PokemonContext);

    async function loadPokemon(controller) {
        setPopup(false)
        setLoading(true);
        setError(false);

        try {
            const [pokemonData, speciesData] = await Promise.all([
                getPokemon(id, controller.signal),
                getPokemonSpecies(id, controller.signal),
            ]);
            setPokemon(pokemonData);
            setSpecies(speciesData);
        } catch (error) {
            if (error.name === 'CanceledError') return;
            setError(true);
        } finally {
            if (!controller?.signal?.aborted) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        loadPokemon(controller);

        return () => {
            controller.abort();
        };
    }, [id]);

    useEffect(() => {
        if (!popup) return;

        const timer = setTimeout(() => {
            setPopup(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, [popup]);

    if (loading) {
        return (
            <main className="outer-content-container">
                <div className="inner-content-container">
                    <LoadingSpinner>Pokémon aan het laden...</LoadingSpinner>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="outer-content-container">
                <div className="inner-content-container">
                    <ErrorMessage>Kon deze Pokémon niet laden. Probeer het opnieuw.</ErrorMessage>
                </div>
            </main>
        );
    }

    const team = getTeam();
    const inTeam = team.some(p => p.id === pokemon.id);
    const teamIsFull = team.length >= 6;
    const types = pokemon.types.map(t => t.type.name);
    const typeColor = getTypeColor(types[0]);

    const description = species?.flavor_text_entries
        ?.find(e => e.language.name === 'en')
        ?.flavor_text
        ?.replace(/[\f\n\r]/g, ' ') ?? '';

    function handleTeamBtn() {
        if (inTeam) {
            removeFromTeam(pokemon.id);
        } else {
            addToTeam(formatPokemon(pokemon));
            setPopup(true);
        }
    }

    return (
        <main className="outer-content-container">

            {popup && pokemon && (
                <Popup>
                    {formatPokemonName(pokemon.name)} toegevoegd aan je team!
                </Popup>
            )}

            <div className="inner-content-container">

                <Button variant="text" className="detail-back-btn" onClick={() => navigate(-1)}>
                    ← Terug
                </Button>

                <article className="detail-card" style={{ '--type-color': typeColor }}>
                    <section className="detail-left">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={formatPokemonName(pokemon.name)}
                            className="detail-img"
                        />
                        <h1 className="detail-name">{formatPokemonName(pokemon.name)}</h1>
                        <p className="detail-number">#{String(pokemon.id).padStart(3, '0')}</p>

                        <ul className="pokemon-types">
                            {types.map(type => (
                                <li key={type}>
                                    <TypeBadge type={type} />
                                </li>
                            ))}
                        </ul>

                        {description && (
                            <p className="detail-description">{description}</p>
                        )}

                        <div className="detail-measurements">
                            <div className="detail-measurement">
                                <span className="detail-measurement-label">Hoogte</span>
                                <span className="detail-measurement-value">{(pokemon.height / 10).toFixed(1)} m</span>
                            </div>
                            <div className="detail-measurement">
                                <span className="detail-measurement-label">Gewicht</span>
                                <span className="detail-measurement-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                            </div>
                        </div>
                    </section>

                    <section className="detail-right">
                        <h2 className="detail-stats-title">Stats</h2>

                        <ul className="detail-stats">
                            {pokemon.stats.map(s => (
                                <li key={s.stat.name} className="stat-row">
                                    <span className="stat-name">{s.stat.name}</span>
                                    <span className="stat-value">{s.base_stat}</span>
                                    <div className="stat-bar-bg">
                                        <div
                                            className="stat-bar-fill"
                                            style={{ width: `${Math.min(s.base_stat / 255 * 100, 100)}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <section className="detail-abilities-section">
                            <h2 className="detail-stats-title">Abilities</h2>

                            <ul className="detail-abilities">
                                {pokemon.abilities.map(a => (
                                    <li key={a.ability.name}>
                                        <span className={`ability-badge ${a.is_hidden ? 'ability-hidden' : ''}`}>
                                            {a.ability.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {!teamLoading && (
                            <div className="detail-team-btn">
                               {inTeam ? (
                                   <Button variant="remove" fullWidth onClick={handleTeamBtn}>
                                      Uit team verwijderen
                                   </Button>
                               ) : (
                                   <Button variant="primary" fullWidth disabled={teamIsFull} onClick={handleTeamBtn}>
                                      {teamIsFull ? 'Team is vol (6/6)' : 'Aan team toevoegen'}
                                   </Button>
                               )}
                            </div>
                        )}
                    </section>
                </article>
            </div>
        </main>
    );
}

export default DetailPage;
