import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
import {addCaught, addTeamMember, getCaught, getPokemon, getTeamMembers, removeTeamMember} from "../helpers/pokemon.js";

export const PokemonContext = createContext({});

function PokemonContextProvider({ children }) {
    const { user, isAuth } = useContext(AuthContext);
    const [caught, setCaught] = useState([]);
    const [team, setTeam] = useState([]);
    const [teamLoading, setTeamLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (isAuth && token && user) {
            loadPokemonData(token, user.id);
        } else {
            setCaught([]);
            setTeam([]);
        }
    }, [isAuth, user, token]);

    async function loadPokemonData(token, userId) {
        setTeamLoading(true);
        try {
            const [caughtData, teamData] = await Promise.all([
                getCaught(token, userId),
                getTeamMembers(token, userId),
            ]);

            const format = async (list) => {
                const result = [];

                for (const item of list) {
                    const pokemon = await getPokemon(item.pokemonId);

                    result.push({
                        dbId: item.id,
                        id: pokemon.id,
                        name: pokemon.name,
                        sprite: pokemon.sprites.other['official-artwork'].front_default,
                        types: pokemon.types.map(t => t.type.name),
                    });
                }

                return result;
            };

            setCaught(await format(caughtData));
            setTeam(await format(teamData));
        } catch (e) {
            console.error('Fout bij laden pokemon data:', e);
        } finally {
            setTeamLoading(false);
        }
    }

    async function addToTeam(pokemon) {
        if (team.length >= 6) return false;
        if (team.find(p => p.id === pokemon.id)) return false;

        try {
            await addTeamMember(token, {
                userId: user.id,
                pokemonId: pokemon.id,
            });

            await loadPokemonData(token, user.id);

            return true;
        } catch (e) {
            console.error('Kon niet aan team toevoegen:', e);
            return false;
        }
    }

    async function removeFromTeam(pokemonId) {
        const pokemon = team.find(p => p.id === pokemonId);
        if (!pokemon) return;

        try {
            await removeTeamMember(token, pokemon.dbId);
            await loadPokemonData(token, user.id);
        } catch (e) {
            console.error('Kon niet uit team verwijderen:', e);
        }
    }

    async function addToCaught(pokemon) {
        if (caught.find(p => p.id === pokemon.id)) return;

        try {
            await addCaught(token, {
                userId: user.id,
                pokemonId: pokemon.id,
            });

            await loadPokemonData(token, user.id);

            return true;
        } catch (e) {
            console.error('Kon niet toevoegen aan gevangen:', e);
            return false;
        }
    }

    function getCaughtPokemon() {
        return caught;
    }

    function getTeam() {
        return team;
    }

    return (
        <PokemonContext.Provider value={{
            getTeam,
            addToTeam,
            removeFromTeam,
            getCaughtPokemon,
            addToCaught,
            teamLoading,
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;