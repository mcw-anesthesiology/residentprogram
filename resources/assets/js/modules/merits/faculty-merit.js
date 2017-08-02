export function getFacultyPublicationsByType(meritReport) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getFacultyPublicationsByTypeV1(meritReport);
	}
}

function getFacultyPublicationsByTypeV1(meritReport) {
	let publications = new Map();

	let publicationSection = meritReport.report.pages[2].items[0];
	for (let publicationItem of publicationSection.items) {
		try {
			if (publicationItem.checked) {
				publications.set(
					publicationItem.text,
					JSON.parse(JSON.stringify(publicationItem.questions[0].items))
				);
			}
		} catch (e) {
			console.error('Error getting publications, ignoring: ' + e);
		}
	}

	return publications;
}
