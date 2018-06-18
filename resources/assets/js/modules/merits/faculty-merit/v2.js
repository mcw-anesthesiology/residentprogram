import flatMap from 'lodash/flatMap';

export function getAllPublicationTypes(meritReport) {
	// TODO
}

export function getFacultyPublicationsByType(meritReport, checkedOnly) {
	// TODO
}

export function getScholarlyActivity(meritReport, fullName) {
	// TODO
}

export function getParticipatesInSimulation(meritReport) {
	return Boolean(meritReport.report.pages[1].items[0].items[2].items[12].checked);
}

export function getNationalBoards(meritReport) {
	return flatMap(meritReport.report.pages[3].items[0].items
		.filter(orgItem =>
			orgItem.checked
		), orgItem =>
			orgItem.text === 'Other'
				? orgItem.questions[0].items.map(otherItem => ({
					name: 'Other',
					role: otherItem.text
				}))
				: {
					name: orgItem.text,
					role: getOrgRoles(orgItem.questions[0])
				}
		);
}

function getOrgRoles(question) {
	switch (question.type) {
		case 'list':
			return question.items.map(o => o.text).join(', ');
		case 'checkbox':
			return question.options.filter(o => o.checked).map(o => o.text);
		case 'text':
			return question.text;
		default:
			return '<i>Unknown</i>';
	}
}
