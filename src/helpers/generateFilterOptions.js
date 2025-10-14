export default function generateFilterOptions(programs) {
	const locations = new Set();
	const subjects = new Set();
	const companies = new Set();

	programs.forEach((program) => {
		if (program.location) locations.add(program.location);
		if (program.subject) subjects.add(program.subject);
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
			options: Array.from(subjects).flatMap((subject) =>
				subject.split("/").map((sub) => ({
					value: sub.toLowerCase(),
					label: sub,
					count: programs.filter((p) => p.subject.split("/").includes(sub) || p.subject === "All STEM").length,
				}))
			),
		},
		{
			title: "Company",
			options: Array.from(companies).map((company) => ({
				value: company.toLowerCase(),
				label: company,
				count: programs.filter((p) => p.company === company).length,
			})),
		},
	];
}
