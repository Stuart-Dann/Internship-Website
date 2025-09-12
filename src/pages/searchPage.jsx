import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './searchPage.css';
import ResultsTable from '../components/resultsTable';
import FilterGroup from '../components/filterGroups';
import useIsMobile from '../hooks/isMobile.js';
import { useEffect, useState } from 'react';
import { getInternships, subscribeToItems } from '../services/firestore';

export default function SearchPage() {
    const isMobile = useIsMobile();

    const [programs, setPrograms] = useState([]);

    useEffect(() => {
    // One-time fetch
        getInternships().then(setPrograms);

        // Real-time updates
        const unsubscribe = subscribeToItems(setPrograms);
        return unsubscribe;
    }, []);

    const favs = JSON.parse(localStorage.getItem('favourites')) || [];
    programs.forEach(prog => {
        if (favs.includes(prog.id)) {
            prog.isFavourite = true;
        }
    });
    const applied = JSON.parse(localStorage.getItem('Applied')) || [];
    programs.forEach(prog => {
        if (applied.includes(prog.id)) {
            prog.status = "Applied";
        } else {
            prog.status = "Not Applied";
        }
    });

    const filters = [
        {
            title: "Location",
            options: [
            { value: "usa", label: "USA", count: 20 },
            { value: "uk", label: "UK", count: 8 },
            ],
        },
        {
            title: "Subject",
            options: [
            { value: "physics", label: "Physics", count: 20 },
            { value: "chemistry", label: "Chemistry", count: 8 },
            ],
        },
        {
            title: "Company",
            options: [
            { value: "ukaea", label: "UKAEA", count: 20 },
            { value: "lidl", label: "Lidl", count: 8 },
            ],
        },
        ];
    
    return (
        <div className='search-page'>
            <Navbar />
            <div id='search-page-body'>
                <div id="filter-body">
                    {isMobile ? (
                        <div className="mobile-filters">
                        {filters.map((filter) => (
                            <FilterGroup key={filter.title} data={{ ...filter, isMobile }} />
                        ))}
                        </div>
                    ) : (
                        filters.map((filter) => (
                        <FilterGroup key={filter.title} data={{ ...filter, isMobile }} />
                        ))
                    )}
                </div>
                <div id='search-results'>
                    <div id='search-body'>
                        <div className='search-field'>
                            <p>Search:</p>
                            <input type="text" id="search-input" name="search" placeholder='Search Program Names e.g. Analyst...' />
                        </div>
                        <div className='search-field'>
                            <p>Filter By Status:</p>
                            <select name="status" id="status-select">
                                <option value="all">Any Status</option>
                                <option value="true">Applied</option>
                                <option value="false">No Applied</option>
                            </select>
                        </div>
                        <div id='open-program'>
                            <input type='checkbox' id='open-programs' name='open-programs' value='Show Only Open Programs'/>
                            <label htmlFor='open-programs'>Show Only Open Programs</label>
                        </div>
                    </div>
                    <div id="results-container">
                        <ResultsTable programs={programs} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}