import Pokeball from '../pokeball/Pokeball';
import './LoadingSpinner.css'

function LoadingSpinner({ tekst }) {
    return (
        <div className="loading spinner">
            <Pokeball size="medium" />
            <p>{tekst}</p>
        </div>
    );
}

export default LoadingSpinner;
