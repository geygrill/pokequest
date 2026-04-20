import './Pokedex.css'
import {useContext} from "react";
import {PokemonContext} from "../../context/PokemonContext.jsx";

function Pokedex() {
    const { getCaughtPokemon, getTeam } = useContext(PokemonContext);

    const caught = getCaughtPokemon();
    const team = getTeam();

    return (
        <main className="outer-content-container">
            <div className="inner-content-container">
                <h1 className="page-title">Mijn Pokédex</h1>

                <p className="pokedex-subtitle">
                    {caught.length === 0
                        ? 'Doe de quiz om Pokémon te vangen!'
                        : `${caught.length} van de 151 Pokémon gevangen • ${team.length}/6 in je team`
                    }
                </p>
            </div>
        </main>
    )
}

export default Pokedex;