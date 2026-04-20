import './Team.css'
import {useContext} from "react";
import TypeBadge from "../../components/typeBadge/TypeBadge.jsx";
import Pokeball from "../../components/pokeball/Pokeball.jsx";
import {PokemonContext} from "../../context/PokemonContext.jsx";
import {Link} from "react-router-dom";

function Team() {
    const { getTeam, removeFromTeam } = useContext(PokemonContext);

    const team = getTeam();

    function handleRemove(pokemonId) {
        removeFromTeam(pokemonId);
    }

    return (
        <main className="outer-content-container">
            <div className="inner-content-container">
                <h1 className="page-title">Mijn Team</h1>
                <p className="team-capacity">{team.length}/6 Pokémon</p>

                <div className="team-grid">
                    {Array.from({ length: 6 }).map((_, index) => {
                        const pokemon = team[index];

                        if (pokemon) {
                            return (
                                <div key={pokemon.id} className="team-slot">
                                    <img
                                        src={pokemon.sprite}
                                        alt={pokemon.name}
                                        className="team-pokemon-img"
                                    />
                                    <div className="team-pokemon-info">
                                        <h3>{pokemon.name}</h3>
                                        <div className="pokemon-types">
                                            {pokemon.types.map(type => (
                                                <TypeBadge key={type} type={type} />
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        className="btn-remove"
                                        onClick={() => handleRemove(pokemon.id)}
                                    >
                                        Verwijderen
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <div key={index} className="team-slot empty">
                                <Pokeball className="team-empty-pokeball" />
                                <p>Leeg</p>
                            </div>
                        );
                    })}
                </div>

                {team.length === 1 && (
                    <div className="team-empty-message">
                        <p>Je team is nog leeg!</p>
                        <p>
                            Selecteer pokémon uit je <Link to="/search">Pokédex</Link> om je team samen te stellen.
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default Team;