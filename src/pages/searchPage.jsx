import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./searchPage.css";
import ResultsTable from "../components/resultsTable";
import FilterGroup from "../components/filterGroups";
import useIsMobile from "../hooks/isMobile";
import useFilteredPrograms from "../hooks/useFilteredPrograms";
import generateFilterOptions from "../helpers/generateFilterOptions";
import { useEffect, useState, useMemo } from "react";
import { getInternships } from "../services/firestore";

export default function SearchPage() {
    const isMobile = useIsMobile();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState({
        location: [],
        subject: [],
        company: [],
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [openProgramsOnly, setOpenProgramsOnly] = useState(false);

    useEffect(() => {
        setLoading(true);
        getInternships()
            .then((data) => {
                setPrograms(data);
                setError(false);
            })
            .catch((error) => {
                console.error("Failed to fetch internships:", error);
                setError("Failed to fetch internships. Please try again later.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        setFilterOptions(generateFilterOptions(programs));
    }, [programs]);

    const enrichedPrograms = useMemo(() => {
        let favsData = [];
        let appliedData = [];

        try {
            favsData = JSON.parse(localStorage.getItem("Favourites")) || [];
            appliedData = JSON.parse(localStorage.getItem("Applied")) || [];
        } catch (error) {
            console.warn("Error reading from localStorage:", error);
        }

        return programs.map((prog) => ({
            ...prog,
            isFavourite: favsData.includes(prog.id),
            status: appliedData.includes(prog.id) ? "Applied" : "Not Applied",
        }));
    }, [programs, selectedFilters, searchQuery, openProgramsOnly]);

    const filteredPrograms = useFilteredPrograms({
        programs: enrichedPrograms,
        selectedFilters,
        searchQuery,
        openProgramsOnly,
    });

    const handleFilterChange = (filterType, value, checked) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilter = checked
                ? [...prevFilters[filterType], value]
                : prevFilters[filterType].filter((item) => item !== value);
            return { ...prevFilters, [filterType]: updatedFilter };
        });
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (
        <div className="search-page">
            <Navbar />
            <div id="search-page-body">
                <div id="filter-body">
                    {isMobile ? (
                        <div className="mobile-filters">
                            {filterOptions.map((filter) => (
                                <FilterGroup
                                    key={filter.title}
                                    data={{ ...filter, isMobile }}
                                    onFilterChange={(value, checked) =>
                                        handleFilterChange(filter.title.toLowerCase(), value, checked)
                                    }
                                    selectedFilters={selectedFilters[filter.title.toLowerCase()]
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        filterOptions.map((filter) => (
                            <FilterGroup
                                key={filter.title}
                                data={{ ...filter, isMobile }}
                                onFilterChange={(value, checked) =>
                                    handleFilterChange(filter.title.toLowerCase(), value, checked)
                                }
                                selectedFilters={selectedFilters[filter.title.toLowerCase()]
                                }
                            />
                        ))
                    )}
                </div>
                <div id="search-results">
                    <div id="search-body">
                        <div className="search-field">
                            <p>Search:</p>
                            <input
                                onChange={handleSearchChange}
                                type="text"
                                id="search-input"
                                name="search"
                                placeholder="Search Program Names e.g. Analyst..."
                            />
                        </div>
                        <div id="open-program">
                            <input
                                type="checkbox"
                                id="open-programs"
                                name="open-programs"
                                value="Show Only Open Programs"
                                onChange={(e) => setOpenProgramsOnly(e.target.checked)}
                            />
                            <label htmlFor="open-programs">Show Only Open Programs</label>
                        </div>
                    </div>
                    <div id="results-container">
                        {loading && <p>Loading internships...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && !error && <ResultsTable programs={filteredPrograms} />}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}