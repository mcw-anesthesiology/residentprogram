import {
	getAllPublicationTypes as getAllPublicationTypesV1,
	getFacultyPublicationsByType as getFacultyPublicationsByTypeV1
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
