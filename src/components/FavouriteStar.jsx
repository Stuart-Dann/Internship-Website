import { useState } from "react";
import './FavouriteStar.css';

export default function FavouriteStar({ initial = false, onToggle }) {
    const [isFavourite, setIsFavourite] = useState(initial);

    const toggle = (programFavourite) => {
        setIsFavourite(!isFavourite);
        if (onToggle) onToggle(() => !isFavourite && !programFavourite);
    };

    return (
        <span className='favourite-star'
            onClick={toggle}
            role="button"
            tabIndex={0}
            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            onKeyDown={(e) => e.key === 'Enter' && toggle()}
            style={{ cursor: "pointer", color: isFavourite ? "gold" : "grey" }}
        >
            ★
        </span>
    );
}
