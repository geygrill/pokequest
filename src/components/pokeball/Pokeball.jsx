import './Pokeball.css';

function Pokeball({ size }) {
    return (
        <div className={`pokeball-icon ${size ? `pokeball-${size}` : ''}`} aria-hidden="true" />
    );
}

export default Pokeball;
