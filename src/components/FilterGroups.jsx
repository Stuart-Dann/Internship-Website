import './FilterGroups.css';
import {useState} from 'react';

// components/FilterGroup.jsx
export default function FilterGroup({ data, onFilterChange, selectedFilters }) {
    const { title, options, isMobile } = data;
    const [showAll, setShowAll] = useState(false);

    const handleChange = (e) => {
        const { value, checked } = e.target;
        onFilterChange(value, checked);
    };

    const handleMobileChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
        options.forEach((opt) => {
            const isSelected = selectedOptions.includes(opt.value.toLowerCase());
            onFilterChange(opt.value.toLowerCase(), isSelected);        
        });
    };

    const toggleShowAll = () => setShowAll(!showAll);

    const displayedOptions = showAll ? options : options.slice(0, 5);

    if (isMobile) {
        return (
        <div className="mobile-filter">
            <p className="filter-name">{title}</p>
            <select
            multiple
            name={`mobile-filters-${title.toLowerCase()}`}
            className="mobile-select"
            onChange={handleMobileChange}
            >
                {options.map((opt) => (
                    <option 
                        key={opt.value} 
                        value={opt.value.toLowerCase()}
                        selected={selectedFilters.includes(opt.value.toLowerCase())}
                    >
                    {opt.label} ({opt.count})
                    </option>
                ))}
            </select>
        </div>
        );
    }

    return (
        <div>
        <p className="filter-name">{title}</p>
        <div className="filters">
            {displayedOptions.map((opt) => (
            <div className="filter" key={opt.value}>
                <div className="filter-details">
                    <input 
                        type="checkbox"
                        id={opt.value}
                        name={opt.value}
                        value={opt.value.toLowerCase()}
                        onChange={handleChange}
                        checked={selectedFilters.includes(opt.value.toLowerCase())}
                    />
                    <label htmlFor={opt.value}>{opt.label}</label>
                </div>
            <p className="filter-stats">{opt.count}</p>
            </div>
            ))}
            {options.length > 5 && (
            <button className="show-more-btn" onClick={toggleShowAll}>
            {showAll ? "Show Less" : "Show More"}
            </button>
        )}
        </div>
        </div>
    );
}

