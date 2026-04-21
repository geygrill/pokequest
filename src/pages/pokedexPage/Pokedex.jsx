import './Pokedex.css'
import {useContext, useEffect, useState} from "react";
import {PokemonContext} from "../../context/PokemonContext.jsx";
import {formatPokemonName, getPokemonTypes, getTypeColor} from "../../helpers/pokemon.js";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.jsx";
import {Link} from "react-router-dom";
import PokemonCard from "../../components/pokemonCard/PokemonCard.jsx";

function Pokedex() {
    const [filter, setFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const { getCaughtPokemon, getTeam, addToTeam, removeFromTeam } = useContext(PokemonContext);
    const [allTypes, setAllTypes] = useState([]);

    const caught = getCaughtPokemon();
    const team = getTeam();

    async function loadTypes() {
        try {
            const types = await getPokemonTypes();
            setAllTypes(types);
        } catch (error) {
            console.error("Fout bij laden types:", error);
            setAllTypes([]);
        }
    }

    useEffect(() => {
        loadTypes();
    }, []);

    const filtered = caught
        .filter(p =>
            formatPokemonName(p.name).toLowerCase().includes(filter.toLowerCase()) &&
            (!typeFilter || p.types.includes(typeFilter))
        )
        .sort((a, b) => a.id - b.id);

    const availableTypes = allTypes.filter(type =>
        caught.some(p => p.types.includes(type))
    );


    function handleAddToTeam(pokemon) {
        addToTeam(pokemon);
    }

    function handleRemoveFromTeam(pokemonId) {
        removeFromTeam(pokemonId);
    }

    return (
        <main className="outer-content-container">
            <div className="inner-content-container">
                <h1 className="page-title">Mijn Pokédex</h1>

                <p className="pokedex-subtitle">
                    {caught.length === 0
                        ? 'Hier kan je al je ontdekte Pokémon zien!'
                        : `${caught.length} van de 151 Pokémon ontdekt • ${team.length}/6 in je team`
                    }
                </p>

                {caught.length > 0 && (
                    <>
                        <div className="filter-wrapper">
                            <input
                                type="text"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Zoek op naam..."
                                className="search-input"
                            />
                        </div>

                        {availableTypes.length > 0 && (
                            <div className="type-filter-wrapper">
                                <button
                                    className={`type-filter-btn ${typeFilter === '' ? 'active' : ''}`}
                                    onClick={() => setTypeFilter('')}
                                >
                                    Alle types
                                </button>
                                {availableTypes.map(type => (
                                    <button
                                        key={type}
                                        style={{ '--type-color': getTypeColor(type) }}
                                        className={`type-filter-btn ${typeFilter === type ? 'active' : ''}`}
                                        onClick={() => setTypeFilter(type)}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {caught.length === 0 && (
                    <div className="pokedex-empty">
                        <LoadingSpinner />
                        <p>Je Pokédex is nog leeg.</p>
                        <p>Raad Pokémon goed in de <Link to="/quiz">quiz</Link> om ze toe te voegen aan je Pokédex!</p>
                    </div>
                )}

                <div className="pokemon-grid">
                    {filtered.map(pokemon => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            inTeam={!!team.find(p => p.id === pokemon.id)}
                            teamIsFull={team.length >= 6}
                            handleAdd={handleAddToTeam}
                            handleRemove={handleRemoveFromTeam}
                        />
                    ))}
                </div>
            </div>

        </main>
    )
}

export default Pokedex;