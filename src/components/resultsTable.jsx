// components/ResultsTable.jsx
import FavouriteStar from "./favouriteStar";
import './resultsTable.css';
import { addToFavourites } from "../services/favourite";
import { useState, useEffect } from "react";
import openInNew from '../assets/open-in-new.svg';
import useFilteredPrograms from '../hooks/useFilteredPrograms';

export default function ResultsTable({ programs: initialPrograms }) {
    const [programs, setPrograms] = useState(initialPrograms || []);

    useEffect(() => {
    if (initialPrograms) {
        setPrograms(initialPrograms);
        }
    }, [initialPrograms]);

    // const updateStatus = (id) => {
    //     setPrograms(programs.map(prog =>
    //         prog.id === id ? { ...prog, status: "Applied" } : prog
    //     ));
    //     let applied = JSON.parse(localStorage.getItem('Applied')) || [];
    //     if (!applied.includes(id)) {
    //         applied.push(id);
    //         localStorage.setItem('Applied', JSON.stringify(applied));
    //     }
    // };

    const toggleFavorite = (program) => {
        const updatedPrograms = programs.map((prog) =>
            prog.id === program.id ? { ...prog, isFavourite: !prog.isFavourite } : prog
        );
        updatedPrograms.sort((a, b) => {
            if (a.isFavourite && !b.isFavourite) return -1;
            if (!a.isFavourite && b.isFavourite) return 1;
            return 0;
        });
        setPrograms(updatedPrograms);

        addToFavourites(program.id);
    };

    return (
        <div className="results-inner">
            <table className="results-table">
                <thead>
                <tr>
                    <th></th>
                    {/* <th>Status</th> */}
                    <th>Program Name</th>
                    <th>Company Name</th>
                    <th>Location</th>
                    <th>Subject</th>
                    <th>Open Date</th>
                    <th>Closing Date</th>
                    <th>Pay</th>
                </tr>
                </thead>
                <tbody>
                    {programs.length === 0 ? (
                        <tr>
                        <td colSpan="7" style={{ textAlign: 'center' }}>No programs available</td>
                        </tr>
                    ) : (
                        programs.map((program) => (
                        <tr key={program.id}>
                            <td>
                            <FavouriteStar
                                initial={program.isFavourite}
                                onToggle={() => toggleFavorite(program)}
                            />
                            </td>
                            {/* <td>{program.status}</td> */}
                            <td>
                            <a href={program.href} target="_blank" rel="noopener noreferrer">
                                {program.program}<img src={openInNew} alt="Open in new" style={{ width: '1em', height: '1em', verticalAlign: 'middle' }} />
                            </a>
                            </td>
                            <td>{program.company}</td>
                            <td>{program.location}</td>
                            <td>{program.subject}</td>
                            <td>{new Date(program.openDate).toLocaleDateString("en-GB")}</td>
                            <td>{new Date(program.closingDate).toLocaleDateString("en-GB")}</td>
                            <td>{program.pay}</td>
                        </tr>
                        ))
                    )}
                </tbody>        
            </table>
        </div>
    );
}