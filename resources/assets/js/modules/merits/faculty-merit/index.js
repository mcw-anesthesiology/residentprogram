import {
	getAllPublicationTypes as getAllPublicationTypesV1,
	getFacultyPublicationsByType as getFacultyPublicationsByTypeV1,
	getScholarlyActivity as getScholarlyActivityV1,
	getParticipatesInSimulation as getParticipatesInSimulationV1
} from './v1.js';

export function getAllPublicationTypes(meritReport) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getAllPublicationTypesV1(meritReport);
	}
}

export function getFacultyPublicationsByType(meritReport, checkedOnly = true) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getFacultyPublicationsByTypeV1(meritReport, checkedOnly);
	}
}

export function getScholarlyActivity(meritReport, fullName) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getScholarlyActivityV1(meritReport, fullName);
	}
}

export function getParticipatesInSimulation(meritReport) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return getParticipatesInSimulationV1(meritReport);
	}
}
