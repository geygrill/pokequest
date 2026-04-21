import axios from "axios";

const POKE_BASE_URL = 'https://pokeapi.co/api/v2';
const NOVI_BASE_URL = 'https://novi-backend-api-wgsgz.ondigitalocean.app';
const PROJECT_ID = '15434519-3993-48e6-93d6-56bf22754409';
const projectHeader = { 'novi-education-project-id': PROJECT_ID };
function authHeader(token) {
    return {
        ...projectHeader,
        Authorization: `Bearer ${token}`,
    };
}

export async function getPokemon(nameOrId) {
    const response = await axios.get(`${POKE_BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`);
    return response.data;
}

export function formatPokemon(pokemon) {
    return {
        id: pokemon.id,
        name: pokemon.name,
        sprite: pokemon.sprites.other['official-artwork'].front_default,
        types: pokemon.types.map(t => t.type.name),
    };
}

export async function getPokemonTypes() {
    const response = await axios.get(`${POKE_BASE_URL}/type`);
    return response.data.results
        .map(t => t.name)
        .filter(name => name !== 'unknown');
}

export function formatPokemonName(name) {
    return name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export async function getPokemonSpecies(id) {
    const response = await axios.get(`${POKE_BASE_URL}/pokemon-species/${id}`);
    return response.data;
}

export async function getCaught(token, userId) {
    const response = await axios.get(`${NOVI_BASE_URL}/api/catches?userId=${userId}`, { headers: authHeader(token) });
    return response.data;
}

export async function addCaught(token, item) {
    const response = await axios.post(`${NOVI_BASE_URL}/api/catches`, item, { headers: authHeader(token) });
    return response.data;
}

export async function getTeamMembers(token, userId) {
    const response = await axios.get(`${NOVI_BASE_URL}/api/team_members?userId=${userId}`, { headers: authHeader(token) });
    return response.data;
}

export async function addTeamMember(token, item) {
    const response = await axios.post(`${NOVI_BASE_URL}/api/team_members`, item, { headers: authHeader(token) });
    return response.data;
}

export async function removeTeamMember(token, memberId) {
    await axios.delete(`${NOVI_BASE_URL}/api/team_members/${memberId}`, { headers: authHeader(token) });
}

export function getTypeColor(type) {
    const colors = {
        normal: '#A8A878',
        fire: '#F08030',
        water: '#6890F0',
        electric: '#F8D030',
        grass: '#78C850',
        ice: '#98D8D8',
        fighting: '#C03028',
        poison: '#A040A0',
        ground: '#E0C068',
        flying: '#A890F0',
        psychic: '#F85888',
        bug: '#A8B820',
        rock: '#B8A038',
        ghost: '#705898',
        dragon: '#7038F8',
        dark: '#705848',
        steel: '#B8B8D0',
        fairy: '#EE99AC',
    };
    return colors[type] || '#A8A878';
}