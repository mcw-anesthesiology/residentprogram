import {
	getAllPublicationTypes as getAllPublicationTypesV1,
	getFacultyPublicationsByType as getFacultyPublicationsByTypeV1,
	getScholarlyActivity as getScholarlyActivityV1,
	getParticipatesInSimulation as getParticipatesInSimulationV1,
	getNationalBoards as getNationalBoardsV1
} from './v1.js';

import {
	getAllPublicationTypes as getAllPublicationTypesV2,
	getFacultyPublicationsByType as getFacultyPublicationsByTypeV2,
	getScholarlyActivity as getScholarlyActivityV2,
	getParticipatesInSimulation as getParticipatesInSimulationV2,
	getNationalBoards as getNationalBoardsV2
} from './v2.js';

export function getAllPublicationTypes(meritReport) {
	switch (getVersion(meritReport)) {
		case '2017-2018':
			return getAllPublicationTypesV2(meritReport);
		case '2016-2017':
		default:
			return getAllPublicationTypesV1(meritReport);
	}
}

export function getFacultyPublicationsByType(meritReport, checkedOnly = true) {
	switch (getVersion(meritReport)) {
		case '2017-2018':
			return getFacultyPublicationsByTypeV2(meritReport, checkedOnly);
		case '2016-2017':
		default:
			return getFacultyPublicationsByTypeV1(meritReport, checkedOnly);
	}
}

export function getScholarlyActivity(meritReport, fullName) {
	switch (getVersion(meritReport)) {
		case '2017-2018':
			return getScholarlyActivityV2(meritReport, fullName);
		case '2016-2017':
		default:
			return getScholarlyActivityV1(meritReport, fullName);
	}
}

export function getParticipatesInSimulation(meritReport) {
	switch (getVersion(meritReport)) {
		case '2017-2018':
			return getParticipatesInSimulationV2(meritReport);
		case '2016-2017':
		default:
			return getParticipatesInSimulationV1(meritReport);
	}
}

export function getNationalBoards(meritReport) {
	switch (getVersion(meritReport)) {
		case '2017-2018':
			return getNationalBoardsV2(meritReport);
		case '2016-2017':
		default:
			return getNationalBoardsV1(meritReport);
	}
}

function getVersion(meritReport) {
	return `${getYear(meritReport.period_start)}-${getYear(meritReport.period_end)}`;
}

function getYear(dateString) {
	return dateString.substring(0, dateString.indexOf('-'));
}
