import {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.jsx";
import {addCaught, addTeamMember, getCaught, getPokemon, getTeamMembers, removeTeamMember} from "../helpers/pokemon.js";

export const PokemonContext = createContext({});

function PokemonContextProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [caught, setCaught] = useState([]);
    const [team, setTeam] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && user) {
            loadPokemonData(token, user.id);
        } else {
            setCaught([]);
            setTeam([]);
        }
    }, [user, token]);

    async function loadPokemonData(token, userId) {
        try {
            const [caughtData, teamData] = await Promise.all([
                getCaught(token),
                getTeamMembers(token),
            ]);

            const myCaughtRaw = caughtData.filter(item => Number(item.userId) === Number(userId));
            const myTeamRaw = teamData.filter(item => Number(item.userId) === Number(userId));

            const myCaught = await Promise.all(
                myCaughtRaw.map(async (item) => {
                    const pokemon = await getPokemon(item.pokemonId);
                    return {
                        dbId: item.id,
                        id: pokemon.id,
                        name: pokemon.name,
                        sprite: pokemon.sprite,
                        types: pokemon.types,
                    };
                })
            );

            const myTeam = await Promise.all(
                myTeamRaw.map(async (item) => {
                    const pokemon = await getPokemon(item.pokemonId);
                    return {
                        dbId: item.id,
                        id: pokemon.id,
                        name: pokemon.name,
                        sprite: pokemon.sprite,
                        types: pokemon.types,
                    };
                })
            );

            setCaught(myCaught);
            setTeam(myTeam);
        } catch (e) {
            console.error('Fout bij laden pokemon data:', e);
        }
    }

    function getTeam() {
        return team;
    }

    async function addToTeam(pokemon) {
        if (team.length >= 6) return false;
        if (team.find(p => p.id === pokemon.id)) return false;

        const tempId = Date.now();

        const newItem = {
            dbId: tempId,
            ...pokemon,
        };

        setTeam(prev => [...prev, newItem]);

        try {
            await addTeamMember(token, {
                id: tempId,
                userId: user.id,
                pokemonId: pokemon.id,
            });

            return true;

        } catch (e) {
            setTeam(prev => prev.filter(p => p.dbId !== tempId));
            console.error('Kon niet aan team toevoegen:', e);
            return false;
        }
    }

    async function removeFromTeam(pokemonId) {
        const item = team.find(p => p.id === pokemonId);
        if (!item) return;

        setTeam(prev => prev.filter(p => p.id !== pokemonId));

        try {
            await removeTeamMember(token, item.dbId);
        } catch (e) {
            setTeam(prev => [...prev, item]);
            console.error('Kon niet uit team verwijderen:', e);
        }
    }

    function getCaught() {
        return caught;
    }

    async function addToCaught(pokemon) {
        if (caught.find(p => p.id === pokemon.id)) return;

        const tempId = Date.now();

        const newItem = {
            dbId: tempId,
            ...pokemon,
        };

        setCaught(prev => [...prev, newItem]);

        try {
            await addCaught(token, {
                id: tempId,
                userId: user.id,
                pokemonId: pokemon.id,
            });

            return true;

        } catch (e) {
            setCaught(prev => prev.filter(p => p.dbId !== tempId));

            console.error('Kon niet toevoegen aan gevangen:', e);
            return false;
        }
    }

    return (
        <PokemonContext.Provider value={{
            getTeam,
            addToTeam,
            removeFromTeam,
            getCaught,
            addToCaught,
        }}>
            {children}
        </PokemonContext.Provider>
    );
}

export default PokemonContextProvider;

