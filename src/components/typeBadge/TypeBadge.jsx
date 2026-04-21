import {getTypeColor} from "../../helpers/pokemon.js";
import './TypeBadge.css'

function TypeBadge({ type, isLarge }) {
    return (
        <span
            className={`type-badge${isLarge ? ' type-badge-large' : ''}`}
            style={{ backgroundColor: getTypeColor(type) }}
        >
      {type}
    </span>
    );
}

export default TypeBadge;
