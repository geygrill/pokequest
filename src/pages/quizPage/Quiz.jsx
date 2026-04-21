import './Quiz.css'
import {useContext, useEffect, useState} from "react";
import TypeBadge from "../../components/typeBadge/TypeBadge.jsx";
import {formatPokemon, formatPokemonName, getPokemon, getTypeColor} from "../../helpers/pokemon.js";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner.jsx";
import {PokemonContext} from "../../context/PokemonContext.jsx";
import Button from "../../components/button/Button.jsx";
import Popup from "../../components/popup/Popup.jsx";

function normalizeName(name) {
    return name.toLowerCase().trim();
}

function Quiz() {
    const { addToTeam, getTeam, addToCaught } = useContext(PokemonContext);

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
        const controller = new AbortController();

        loadNewPokemon(controller);

        return () => {
            controller.abort();
        };
    }, []);

    async function loadNewPokemon(controller) {
        resetGame()
        try {
            const id = Math.floor(Math.random() * 151) + 1;
            const data = await getPokemon(id, controller?.signal);
            setPokemon(formatPokemon(data));
        } catch(error) {
            if (error.name === 'CanceledError') return;
            console.error(error);
            setError(true);
        } finally {
            if (!controller?.signal?.aborted) {
                setLoading(false);
            }
        }
    }

    function handleGuess(e) {
        e.preventDefault();
        if (!guess.trim() || !pokemon) return;
        if (normalizeName(guess) === normalizeName(formatPokemonName(pokemon.name))) {
            setStatus('correct');
            addToCaught(pokemon);
        } else {
            setStatus('wrong');
        }
    }

    async function handleAddToTeam() {
        const success = await addToTeam(pokemon);
        if (success) setIsPokemonAdded(true);
    }

    if (loading) {
        return (
            <main className="quiz-wrapper">
                <LoadingSpinner>Pokémon aan het laden...</LoadingSpinner>
            </main>
        );
    }

    if (error) {
        return (
            <main className="quiz-wrapper">
                <p>Er ging iets mis bij het laden van de Pokémon. Probeer het opnieuw.</p>
                <Button variant="outline" size="md" rounded onClick={() => loadNewPokemon()}>Opnieuw proberen</Button>
            </main>
        );
    }

    const team = getTeam();
    const isInTeam = !!pokemon && team.some(p => p.id === pokemon.id);
    const teamIsFull = team.length >= 6;
    const typeColor = pokemon ? getTypeColor(pokemon.types[0]) : '#6890F0';

    return (
        <main className="quiz-wrapper">

            {isPokemonAdded && (
                <Popup>{formatPokemonName(pokemon.name)} toegevoegd aan je team!</Popup>
            )}

            {status !== 'playing' && (
                <div
                    className="quiz-pokemon-bg-color"
                    style={{ background: `radial-gradient(ellipse at 50% 45%, ${typeColor}50 0%, transparent 80%)` }}
                />
            )}

            <div className="quiz-title-wrapper">
                {status === 'playing' && (
                    <h1 className="quiz-title">Wie is deze Pokémon?!</h1>
                )}
                {status === 'correct' && (
                    <h1 className="quiz-title title-correct">
                        Het is <span>{formatPokemonName(pokemon.name)}</span>!
                    </h1>
                )}
                {status === 'wrong' && (
                    <h1 className="quiz-title title-wrong">
                        Het was <span>{formatPokemonName(pokemon.name)}</span>...
                    </h1>
                )}
            </div>

            <div className="quiz-pokemon-wrapper">
                <img
                    key={`${pokemon.dbId}-${status}`}
                    src={pokemon.sprite}
                    alt={status === 'playing' ? 'Wie is deze Pokémon?' : pokemon.name}
                    className={`quiz-pokemon-img ${status === 'playing' ? 'silhouette' : 'revealed'}`}
                />
            </div>

            <div className="quiz-bottom">

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
                        <Button type="submit" variant="primary" size="md" rounded className="btn--hover-scale">Raden!</Button>
                    </form>
                )}

                {status === 'correct' && (
                    <div className="quiz-result">
                        <div className="pokemon-types">
                            {pokemon.types.map(t => (
                                <TypeBadge key={t} type={t} isLarge={true} />
                            ))}
                        </div>

                        <div className="quiz-buttons">
                            {!isInTeam && !teamIsFull && (
                                <Button variant="primary" size="sm" rounded className="btn--hover-scale" onClick={handleAddToTeam} disabled={isPokemonAdded || isInTeam}>
                                    {isPokemonAdded ? '✓ Toegevoegd' : '+ Aan team toevoegen'}
                                </Button>
                            )}
                            {isInTeam && !isPokemonAdded && (
                                <span className="quiz-label-white">✓ Al in je team</span>
                            )}

                            {!isInTeam && teamIsFull && (
                                <span className="quiz-label-white">Team is vol!</span>
                            )}

                            <Button variant="outline" size="sm" rounded onClick={() => loadNewPokemon()}>
                                Volgende →
                            </Button>
                        </div>
                    </div>
                )}

                {status === 'wrong' && (
                    <div className="quiz-result">
                        <div className="pokemon-types">
                            {pokemon.types.map(t => (
                                <TypeBadge key={t} type={t} isLarge={true} />
                            ))}
                        </div>
                        <p className="quiz-wrong-guess">Jij zei: "{guess}"</p>
                        <Button variant="outline" size="sm" rounded onClick={() => loadNewPokemon()}>
                            Volgende Pokémon →
                        </Button>
                    </div>
                )}

            </div>
        </main>
    )
}

export default Quiz;