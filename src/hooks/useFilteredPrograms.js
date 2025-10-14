import { useEffect, useState } from "react";

export default function useFilteredPrograms({ programs, selectedFilters, searchQuery, filterByStatus, openProgramsOnly }) {
	const [filteredPrograms, setFilteredPrograms] = useState([]);

	useEffect(() => {
		const filtered = programs.filter((program) => {
			const matchesLocation = selectedFilters.location.length === 0 || (program.location && selectedFilters.location.includes(program.location.toLowerCase()));

			const matchesSubject =
				selectedFilters.subject.length === 0 ||
				(program.subject.split("/") &&
					selectedFilters.subject.some((sub) =>
						program.subject
							.split("/")
							.map((s) => s.trim().toLowerCase())
							.includes(sub)
					)) ||
				program.subject.includes("All STEM");

			const matchesCompany = selectedFilters.company.length === 0 || (program.company && selectedFilters.company.includes(program.company.toLowerCase()));

			const matchesSearchQuery = searchQuery === "" || program.program.toLowerCase().includes(searchQuery);

			const matchesOpenPrograms =
				!openProgramsOnly ||
				(() => {
					const openDate = new Date(program.openDate);
					const closingDate = new Date(program.closingDate);
					const currentDate = new Date();
					return !isNaN(openDate.getTime()) && !isNaN(closingDate.getTime()) && openDate <= currentDate && closingDate >= currentDate;
				})();
			return matchesLocation && matchesSubject && matchesCompany && matchesSearchQuery && matchesOpenPrograms;
		});
		const sorted = filtered.sort((a, b) => {
			if (a.isFavourite && !b.isFavourite) return -1;
			if (!a.isFavourite && b.isFavourite) return 1;
			return 0;
		});

		setFilteredPrograms(sorted);
	}, [programs, selectedFilters, searchQuery, filterByStatus, openProgramsOnly]);

	return filteredPrograms;
}
