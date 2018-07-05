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
		case 'mcw-anesth-faculty-merit-2017-2018':
			return getAllPublicationTypesV2(meritReport);
		case 'mcw-anesth-faculty-merit-2016-2017':
			return getAllPublicationTypesV1(meritReport);
		default:
			throw new Error('Unsupported merit form');
	}
}

export function getFacultyPublicationsByType(meritReport, checkedOnly = true) {
	switch (getVersion(meritReport)) {
		case 'mcw-anesth-faculty-merit-2017-2018':
			return getFacultyPublicationsByTypeV2(meritReport, checkedOnly);
		case 'mcw-anesth-faculty-merit-2016-2017':
			return getFacultyPublicationsByTypeV1(meritReport, checkedOnly);
		default:
			throw new Error('Unsupported merit form');
	}
}

export function getScholarlyActivity(meritReport, fullName) {
	switch (getVersion(meritReport)) {
		case 'mcw-anesth-faculty-merit-2017-2018':
			return getScholarlyActivityV2(meritReport, fullName);
		case 'mcw-anesth-faculty-merit-2016-2017':
			return getScholarlyActivityV1(meritReport, fullName);
		default:
			throw new Error('Unsupported merit form');
	}
}

export function getParticipatesInSimulation(meritReport) {
	switch (getVersion(meritReport)) {
		case 'mcw-anesth-faculty-merit-2017-2018':
			return getParticipatesInSimulationV2(meritReport);
		case 'mcw-anesth-faculty-merit-2016-2017':
			return getParticipatesInSimulationV1(meritReport);
		default:
			throw new Error('Unsupported merit form');
	}
}

export function getNationalBoards(meritReport) {
	switch (getVersion(meritReport)) {
		case 'mcw-anesth-faculty-merit-2017-2018':
			return getNationalBoardsV2(meritReport);
		case 'mcw-anesth-faculty-merit-2016-2017':
			return getNationalBoardsV1(meritReport);
		default:
			throw new Error('Unsupported merit form');
	}
}

function getVersion(meritReport) {
	return meritReport.form.report_slug;
}
