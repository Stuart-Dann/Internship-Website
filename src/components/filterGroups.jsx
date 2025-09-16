import './filterGroups.css';

// components/FilterGroup.jsx
export default function FilterGroup({ data }) {
    const { title, options, isMobile } = data;

    if (isMobile) {
        return (
        <div className="mobile-filter">
            <p className="filter-name">{title}</p>
            <select
            multiple
            name={`mobile-filters-${title.toLowerCase()}`}
            className="mobile-select"
            >
            {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
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
            {options.map((opt) => (
            <div className="filter" key={opt.value}>
                <div className="filter-details">
                <input type="checkbox" id={opt.value} name={opt.value} value={opt.label} />
                <label htmlFor={opt.value}>{opt.label}</label>
                </div>
                <p className="filter-stats">{opt.count}</p>
            </div>
            ))}
        </div>
        </div>
    );
}

