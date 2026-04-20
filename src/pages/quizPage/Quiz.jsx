import './Quiz.css'
import {useContext, useEffect, useState} from "react";
import TypeBadge from "../../components/typeBadge/TypeBadge.jsx";
import {formatPokemon, getPokemon, getTypeColor} from "../../helpers/pokemon.js";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.jsx";
import {PokemonContext} from "../../context/PokemonContext.jsx";

function normalizeName(name) {
    return name.toLowerCase().trim();
}

function Quiz() {
    const { addToTeam, getTeam, addToCaught, getCaught } = useContext(PokemonContext);

    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState(null);
    const [error, setError] = useState(false);

    const [guess, setGuess] = useState('');
    const [status, setStatus] = useState('playing');
    const [isPokemonAdded, setIsPokemonAdded] = useState(false);


    function resetGame() {
        setStatus('playing');
        setGuess('');
        setIsPokemonAdded(false);
        setLoading(true);
        setError(false);
    }

    useEffect(() => {
        loadNewPokemon();
    }, []);

    async function loadNewPokemon() {
        resetGame();
        try {
            const id = Math.floor(Math.random() * 151) + 1;
            const data = await getPokemon(id);
            setPokemon(data);
        } catch(error) {
            console.error(error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    function handleGuess(e) {
        e.preventDefault();
        if (!guess.trim() || !pokemon) return;
        if (normalizeName(guess) === normalizeName(pokemon.name)) {
            setStatus('correct');
            addToCaught(formatPokemon(pokemon));
        } else {
            setStatus('wrong');
        }
        console.log(getTeam());
        console.log(getCaught());
    }

    async function handleAddToTeam() {
        const success = await addToTeam(formatPokemon(pokemon));
        if (success) setAdded(true);
    }

    if (loading) {
        return (
            <div className="quiz-wrapper">
                <LoadingSpinner tekst="Pokémon aan het laden..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="quiz-wrapper">
                <p>Er ging iets mis bij het laden van de Pokémon. Probeer het opnieuw.</p>
                <button onClick={loadNewPokemon} className="quiz-button-next">Opnieuw proberen</button>
            </div>
        );
    }

    const team = getTeam();
    const isInTeam = !!pokemon && team.some(p => p.id === pokemon.id);
    const teamIsFull = team.length >= 6;

    return (
        <div className="quiz-wrapper">
            <div className="quiz-title-wrapper">
                {status === 'playing' && (
                    <h1 className="quiz-title">Wie is deze Pokémon?!</h1>
                )}
                {status === 'correct' && (
                    <h1 className="quiz-title title-correct">
                        Het is <span>{pokemon.name}</span>!
                    </h1>
                )}
                {status === 'wrong' && (
                    <h1 className="quiz-title title-wrong">
                        Het was <span>{pokemon.name}</span>...
                    </h1>
                )}
            </div>

            <div className="quiz-pokemon-wrapper">
                <img
                    key={`${pokemon.id}-${status}`}
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={status === 'playing' ? 'Wie is deze Pokémon?' : pokemon.name}
                    className={`quiz-pokemon-img ${status === 'playing' ? 'silhouette' : 'revealed'}`}
                />
            </div>

            <div className="quiz-botom">

                {status === 'playing' && (
                    <form onSubmit={handleGuess} className="quiz-form">
                        <input
                            type="text"
                            value={guess}
                            onChange={e => setGuess(e.target.value)}
                            placeholder="Typ de naam van de Pokémon..."
                            className="quiz-input"
                            autoFocus
                        />
                        <button type="submit" className="quiz-btn-guess">Raden!</button>
                    </form>
                )}

                {status === 'correct' && (
                    <div className="quiz-result">
                        <div className="pokemon-types">
                            {pokemon.types.map(t => (
                                <TypeBadge key={t.type.name} type={t.type.name} isLarge={true} />
                            ))}
                        </div>

                        <div className="quiz-buttons">
                            {!isInTeam && !teamIsFull && (
                                <button onClick={handleAddToTeam} className="quiz-btn-add-team" disabled={isPokemonAdded || isInTeam}>
                                    {isPokemonAdded ? '✓ Toegevoegd' : '+ Aan team toevoegen'}
                                </button>
                            )}
                            {isInTeam && <span className="quiz-label-white">✓ Al in je team</span>}

                            <button onClick={loadNewPokemon} className="quiz-btn-next">
                                Volgende →
                            </button>
                        </div>
                    </div>
                )}

                {status === 'wrong' && (
                    <div className="quiz-result">
                        <div className="pokemon-types">
                            {pokemon.types.map(t => (
                                <TypeBadge key={t.type.name} type={t.type.name} isLarge={true} />
                            ))}
                        </div>
                        <p className="quiz-wrong-guess">Jij zei: "{guess}"</p>
                        <button onClick={loadNewPokemon} className="quiz-btn-next">
                            Volgende Pokémon →
                        </button>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Quiz;