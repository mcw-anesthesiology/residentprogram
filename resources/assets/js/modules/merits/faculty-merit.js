export function getAllPublicationTypes(meritReport) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getAllPublicationTypesV1(meritReport);
	}
}

function getAllPublicationTypesV1(meritReport) {
	let types = [];

	let publicationSection = meritReport.report.pages[2].items[0];
	for (let publicationItem of publicationSection.items) {
		types.push(publicationItem.text);
	}

	return types;
}

export function getFacultyPublicationsByType(meritReport, checkedOnly = true) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getFacultyPublicationsByTypeV1(meritReport, checkedOnly);
	}
}

function getFacultyPublicationsByTypeV1(meritReport, checkedOnly = true) {
	let publications = new Map();

	let publicationSection = meritReport.report.pages[2].items[0];
	for (let publicationItem of publicationSection.items) {
		try {
			if (checkedOnly && !publicationItem.checked)
				continue;

			let items = 'items' in publicationItem.questions[0]
				? publicationItem.questions[0].items
				: [];

			publications.set(
				publicationItem.text,
				JSON.parse(JSON.stringify(items))
			);
		} catch (e) {
			console.error('Error getting publications, ignoring: ', publicationItem, e);
		}
	}

	return publications;
}
