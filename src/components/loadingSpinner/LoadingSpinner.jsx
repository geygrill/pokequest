import Pokeball from '../pokeball/Pokeball';
import './LoadingSpinner.css'

function LoadingSpinner({ children }) {
    return (
        <div className="loading-spinner">
            <div className="spinner">
                <Pokeball size="medium"/>
            </div>
            <p className="loading-text">{children}</p>
        </div>
    );
}

export default LoadingSpinner;
