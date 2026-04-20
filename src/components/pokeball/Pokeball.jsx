import './Pokeball.css';

function Pokeball({ size, className }) {
    return (
        <div className={`pokeball-icon ${size ? `pokeball-${size}` : ''} ${className ?? ''}`} aria-hidden="true" />
    );
}

export default Pokeball;
