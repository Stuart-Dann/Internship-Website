export default function generateFilterOptions(programs) {
	const locations = new Set();
	const subjects = new Set();
	const companies = new Set();

	programs.forEach((program) => {
		if (program.location) locations.add(program.location);
		if (program.subject) {
			program.subject.split("/").forEach((sub) => subjects.add(sub.trim()));
		}
		if (program.company) companies.add(program.company);
	});

	return [
		{
			title: "Location",
			options: Array.from(locations).map((location) => ({
				value: location.toLowerCase(),
				label: location,
				count: programs.filter((p) => p.location === location).length,
			})),
		},
		{
			title: "Subject",
			options: Array.from(subjects).map((subject) => ({
				value: subject.toLowerCase(),
				label: subject,
				count: programs.filter((p) => p.subject.split("/").includes(subject) || p.subject === "All STEM").length,
			})),
		},
		{
			title: "Company",
			options: Array.from(companies).map((company) => ({
				value: company.toLowerCase(),
				label: company,
				count: programs.filter((p) => p.company === company).length,
			})),
		},
		{
			title: "Year",
			options: [
				{ value: "1st", label: "1st", count: programs.filter((p) => p.year?.includes("1st")).length },
				{ value: "2nd", label: "2nd", count: programs.filter((p) => p.year?.includes("2nd")).length },
				{ value: "3rd", label: "3rd", count: programs.filter((p) => p.year?.includes("3rd")).length },
				{ value: "4th", label: "4th", count: programs.filter((p) => p.year?.includes("4th")).length },
			],
		},
	];
}
