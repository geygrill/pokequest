import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonContext } from '../../context/PokemonContext';
import {getPokemon, getPokemonSpecies, formatPokemon, getTypeColor, formatPokemonName} from '../../helpers/pokemon.js';
import TypeBadge from '../../components/typeBadge/TypeBadge';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import './detailPage.css';

function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pokemon, setPokemon] = useState(null);
    const [species, setSpecies] = useState(null);
    const [loading, toggleLoading] = useState(true);
    const [error, toggleError] = useState(false);

    const { getTeam, addToTeam, removeFromTeam } = useContext(PokemonContext);

    async function loadPokemon() {
        toggleLoading(true);
        toggleError(false);
        try {
            const [pokemonData, speciesData] = await Promise.all([
                getPokemon(id),
                getPokemonSpecies(id),
            ]);
            setPokemon(pokemonData);
            setSpecies(speciesData);
        } catch {
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {
        loadPokemon();
    }, [id]);

    if (loading) {
        return (
            <div className="outer-content-container">
                <div className="inner-content-container">
                    <LoadingSpinner>Pokémon aan het laden...</LoadingSpinner>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="outer-content-container">
                <div className="inner-content-container">
                    <ErrorMessage>Kon deze Pokémon niet laden. Probeer het opnieuw.</ErrorMessage>
                </div>
            </div>
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

    const statNames = {
        hp: 'HP',
        attack: 'Aanval',
        defense: 'Verdediging',
        'special-attack': 'Sp. Aanval',
        'special-defense': 'Sp. Verdediging',
        speed: 'Snelheid',
    };

    function handleTeamBtn() {
        if (inTeam) {
            removeFromTeam(pokemon.id);
        } else {
            addToTeam(formatPokemon(pokemon));
        }
    }

    return (
        <div className="outer-content-container">
            <div className="inner-content-container">

                <button className="detail-back-btn" onClick={() => navigate(-1)}>
                    ← Terug
                </button>

                <div className="detail-card" style={{ '--type-color': typeColor }}>

                    <div className="detail-left">
                        <img
                            src={pokemon.sprites.other['official-artwork'].front_default}
                            alt={formatPokemonName(pokemon.name)}
                            className="detail-img"
                        />
                        <h1 className="detail-name">{formatPokemonName(pokemon.name)}</h1>
                        <p className="detail-number">#{String(pokemon.id).padStart(3, '0')}</p>

                        <div className="pokemon-types">
                            {types.map(type => (
                                <TypeBadge key={type} type={type} />
                            ))}
                        </div>

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
                    </div>

                    <div className="detail-right">
                        <h2 className="detail-stats-title">Stats</h2>
                        <div className="detail-stats">
                            {pokemon.stats.map(s => (
                                <div key={s.stat.name} className="stat-row">
                                    <span className="stat-name">{statNames[s.stat.name] ?? s.stat.name}</span>
                                    <span className="stat-value">{s.base_stat}</span>
                                    <div className="stat-bar-bg">
                                        <div
                                            className="stat-bar-fill"
                                            style={{ width: `${Math.min(s.base_stat / 255 * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2 className="detail-stats-title">Abilities</h2>
                        <div className="detail-abilities">
                            {pokemon.abilities.map(a => (
                                <span key={a.ability.name} className={`ability-badge ${a.is_hidden ? 'ability-hidden' : ''}`}>
                                    {a.ability.name}
                                </span>
                            ))}
                        </div>

                        <div className="detail-team-action">
                            {inTeam ? (
                                <button onClick={handleTeamBtn}
                                        className="btn-remove"
                                >
                                    Uit team verwijderen
                                </button>
                            ) : (
                                <button
                                    onClick={handleTeamBtn}
                                    className="btn-add-team"
                                    disabled={teamIsFull}
                                >
                                    {teamIsFull ? 'Team is vol (6/6)' : 'Aan team toevoegen'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
