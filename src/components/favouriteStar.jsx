import { useState } from "react";
import './favouriteStar.css';

export default function FavouriteStar({ initial = false, onToggle }) {
    const [isFavourite, setIsFavourite] = useState(initial);

    const toggle = () => {
        setIsFavourite(!isFavourite);
        if (onToggle) onToggle(!isFavourite);
    };

    return (
        <span className='favourite-star'
        onClick={toggle}
        style={{ cursor: "pointer", color: isFavourite ? "gold" : "grey" }}
        >
        ★
        </span>
    );
}