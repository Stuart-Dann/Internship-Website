import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./SearchPage.css";
import ResultsTable from "../components/ResultsTable";
import FilterGroup from "../components/FilterGroups";
import useIsMobile from "../hooks/isMobile";
import useFilteredPrograms from "../hooks/useFilteredPrograms";
import generateFilterOptions from "../helpers/generateFilterOptions";
import { useEffect, useState, useMemo } from "react";
import { getInternships } from "../services/firestore";
import { useSearchParams } from 'react-router-dom';
import AnimatedContent from "../components/AnimatedContent";

export default function SearchPage() {
    const isMobile = useIsMobile();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState([]);
    const [filterOptions, setFilterOptions] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState({
        location: searchParams.get("location")?.split(",") || [],
        subject: searchParams.get("subject")?.split(",") || [],
        company: searchParams.get("company")?.split(",") || [],
    });
    const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
    );
    const [openProgramsOnly, setOpenProgramsOnly] = useState(searchParams.get("openProgramsOnly") === "true");

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

    const handleShowOnlyOpenChange = (e) => {
        setOpenProgramsOnly(e.target.checked);
    }

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries());

        if (searchQuery) {
        params.search = searchQuery;
        } else {
            delete params.search;
        }
        if (selectedFilters.location.length)
            params.location = selectedFilters.location.join(",");
        else{
            delete params.location;
        }
        if (selectedFilters.subject.length)
            params.subject = selectedFilters.subject.join(",");
        else{
            delete params.subject;
        }
        if (selectedFilters.company.length)
            params.company = selectedFilters.company.join(",");
        else{
            delete params.company;
        }
        if (openProgramsOnly) {
            params.openProgramsOnly = "true";
        } else {
            delete params.openProgramsOnly;
        }

        setSearchParams(params);
    }, [searchQuery, selectedFilters, openProgramsOnly, setSearchParams]);

    return (
        <div className="search-page">
            <Navbar />
            <div id="search-page-body">
                <div id="filter-body">
                    {isMobile ? (
                        <AnimatedContent>
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
                        </AnimatedContent>
                    ) : (
                        <AnimatedContent
                            delay={0.2}
                            direction='horizontal'
                            reverse={true}
                            >
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
                    </AnimatedContent>
                    )}
                </div>
                <div id="search-results">
                    <AnimatedContent>
                    <div id="search-body">
                        <div className="search-field">
                            <p>Search:</p>
                            <input
                                onChange={handleSearchChange}
                                type="text"
                                id="search-input"
                                name="search"
                                placeholder="Search Program Names e.g. Analyst..."
                                value={searchQuery}
                            />
                        </div>
                        <div id="open-program">
                            <input
                                type="checkbox"
                                id="open-programs"
                                name="open-programs"
                                value="Show Only Open Programs"
                                onChange={handleShowOnlyOpenChange}
                                checked={openProgramsOnly}
                            />
                            <label htmlFor="open-programs">Show Only Open Programs</label>
                        </div>
                    </div>
                    </AnimatedContent>
                    <div id="results-container">
                        {loading && <p>Loading internships...</p>}
                        {error && <p className="error-message">{error}</p>}
                        {!loading && !error && 
                        <AnimatedContent
                        delay={0.2}>
                        <ResultsTable programs={filteredPrograms} />
                        </AnimatedContent>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}