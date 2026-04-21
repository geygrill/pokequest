import './PokemonCard.css';
import { Link } from 'react-router-dom';
import {formatPokemonName, getTypeColor} from '../../helpers/pokemon.js';
import TypeBadge from '../typeBadge/TypeBadge';
import Button from "../button/Button.jsx";

function PokemonCard({ pokemon, inTeam, teamIsFull, handleAdd, handleRemove }) {
    const typeColor = getTypeColor(pokemon.types[0]);
    const secondTypeColor = pokemon.types[1] ? getTypeColor(pokemon.types[1]) : null;
    const background = secondTypeColor
        ? `linear-gradient(90deg, ${typeColor} 0%, ${secondTypeColor} 100%)`
        : typeColor;

    return (
        <div className={`pokemon-card ${inTeam ? 'in-team' : ''}`} style={{ '--type-color': typeColor }}>

            <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card-top" style={{ background }}>
                <span className="pokemon-card-number">#{String(pokemon.id).padStart(3, '0')}</span>
                <img
                    src={pokemon.sprite}
                    alt={formatPokemonName(pokemon.name)}
                    className="pokemon-card-img"
                />
            </Link>

            <div className="pokemon-card-footer">
                <p className="pokemon-card-name">{formatPokemonName(pokemon.name)}</p>
                <div className="pokemon-types">
                    {pokemon.types.map(type => (
                        <TypeBadge key={type} type={type} />
                    ))}
                </div>

                {inTeam ? (
                    <Button variant="remove" size="sm" fullWidth onClick={() => handleRemove(pokemon.id)}>
                        Uit team verwijderen
                    </Button>
                ) : (
                    <Button variant="primary" size="sm" fullWidth onClick={() => handleAdd(pokemon)} disabled={teamIsFull}>
                        {teamIsFull ? 'Team vol' : 'Aan team toevoegen'}
                    </Button>
                )}
            </div>

        </div>
    );
}

export default PokemonCard;