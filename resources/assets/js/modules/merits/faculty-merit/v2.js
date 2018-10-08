/** @format */

import flatMap from "lodash/flatMap";

import { getPubMedIdFromLink } from "./v1.js";
import { logError } from "@/modules/errors.js";

export function getAllPublicationTypes(meritReport) {
	// TODO
}

export function getFacultyPublicationsByType(meritReport, checkedOnly) {
	// TODO
}

export function getScholarlyActivity(meritReport, fullName) {
	// TODO

	return [
		fullName,
		...getPubMedIds(meritReport),
		getConferencePresentations(meritReport),
		getOtherPresentations(meritReport),
		getChaptersTextbooks(meritReport),
		getGrants(meritReport),
		getLeadershipPeerReviewRoles(meritReport) ? "Y" : "N",
		"?"
	];
}

export function getPublicationSection(meritReport) {
	return meritReport.report.pages[2].items[0];
}

export function getPubMedIds(meritReport) {
	const pubMedIds = Array(4).fill("");

	try {
		const publicationsWithLinks = getAllPublications(meritReport).filter(pub =>
			getPubMedIdFromLink(pub.link)
		);
		// Up to 4 PMIDs (PubMed IDs)
		for (let i = 0; i < pubMedIds.length; i++) {
			if (publicationsWithLinks.length > i && publicationsWithLinks[i]) {
				pubMedIds[i] = getPubMedIdFromLink(publicationsWithLinks[i].link);
			}
		}
	} catch (e) {
		logError("Error getting PubMed IDs: ", e);
	}

	return pubMedIds;
}

export function getAllPublications(meritReport) {
	const pubSection = getPublicationSection(meritReport);

	const publications = [];

	for (const pubType of pubSection.items) {
		if (pubType.checked) {
			for (const pubItem of pubType.questions[0].items) {
				publications.push(pubItem);
			}
		}
	}

	return publications;
}

export function getConferencePresentations(meritReport) {
	/*
	 * Number of abstracts, posters, and presentations given at international,
	 * national, or regional meetings in the previous academic year
	 */

	let conferencePresentations = 0;

	try {
		const educationOutsideMCWSection = meritReport.report.pages[1].items[2];
		const conferenceIndexes = [
			1, // ASA refresher course
			2, // ASA panel presentation
			3, // ASA problem-based learning discussion
			4, // WSA lecture
			5 // Other national / international society invited lecture
		];

		for (let conferenceIndex of conferenceIndexes) {
			const conferenceSection =
				educationOutsideMCWSection.items[conferenceIndex];
			if (conferenceSection.checked) {
				conferencePresentations += conferenceSection.questions[0].items.length;
			}
		}
	} catch (e) {
		logError("Error getting conference presentations: ", e);
	}

	return conferencePresentations;
}

export function getOtherPresentations(meritReport) {
	/*
	 * Number of other presentations given (grand rounds, invited professorships),
	 * materials developed (such as computer-based modules), or work presented
	 * in non-peer review publications in the previous academic year.
	 * Articles without PMIDs should be counted in this section.
	 * This will include publication which are peer reviewed but not recognized
	 * by the National Library of Medicine.
	 */

	let otherPresentations = 0;

	try {
		// Presentations without PubMed IDs
		let publicationsWithoutLinks = getAllPublications(meritReport).filter(
			pub => !getPubMedIdFromLink(pub.link)
		);
		otherPresentations += publicationsWithoutLinks.length;

		// Education - Departmental
		const educationDepartmentalSection = meritReport.report.pages[1].items[0];
		const departmentalLecture = educationDepartmentalSection.items[0];
		if (departmentalLecture.checked) {
			otherPresentations += departmentalLecture.questions[0].items.length;
		}

		const medStudentSection = educationDepartmentalSection.items[1];
		const medStudentLectureIndexes = [
			5, // Interest group
			6, // New lecture
			7 // Repeat lecture
		];
		for (const i of medStudentLectureIndexes) {
			if (medStudentSection.items[i].checked) {
				otherPresentations +=
					medStudentSection.items[i].questions[0].items.length;
			}
		}

		const residentFellowSection = educationDepartmentalSection.items[1];
		const residentFellowLectureIndexes = [
			1, // New lecture
			2 // Repeat lecture
		];
		for (const i of residentFellowLectureIndexes) {
			if (residentFellowSection.items[i].checked) {
				otherPresentations +=
					residentFellowSection.items[i].questions[0].items.length;
			}
		}

		// Education - Medical College / Hospital
		const educationInsideMCWSection = meritReport.report.pages[1].items[1];
		for (let presentationType of educationInsideMCWSection.items) {
			if (presentationType.checked)
				otherPresentations += presentationType.questions[0].items.length;
		}

		// Education - Outside MCW
		const educationOutsideMCWSection = meritReport.report.pages[1].items[2];
		const nonConferenceIndexes = [
			0, // Visiting professor
			6 // Local community group
		];

		for (let conferenceIndex of nonConferenceIndexes) {
			const conferenceSection =
				educationOutsideMCWSection.items[conferenceIndex];
			if (conferenceSection.checked) {
				otherPresentations += conferenceSection.questions[0].items.length;
			}
		}
	} catch (e) {
		logError("Error getting other presentations: ", e);
	}

	return otherPresentations;
}

export function getChaptersTextbooks(meritReport) {
	/*
	 * Number of chapters or textbooks published in the previous academic year
	 */

	let chaptersTextbooks = 0;

	try {
		const publicationSection = getPublicationSection(meritReport);
		// Book / Text, First Ed.
		if (publicationSection.items[0].checked)
			chaptersTextbooks +=
				publicationSection.items[0].questions[0].items.length;

		// Book / Text, Revised Ed.
		if (publicationSection.items[1].checked)
			chaptersTextbooks +=
				publicationSection.items[1].questions[0].items.length;

		// Book Chapter Author
		if (publicationSection.items[4].checked)
			chaptersTextbooks +=
				publicationSection.items[4].questions[0].items.length;
	} catch (e) {
		logError("Error getting chapters/textbooks: ", e);
	}

	return chaptersTextbooks;
}

export function getGrants(meritReport) {
	/*
	 * Number of grants for which faculty member had a leadership role
	 * (PI, Co-PI, or site director) in the previous academic year
	 */

	let grants = 0;

	try {
		const grantSection = meritReport.report.pages[2].items[1].items[1];
		for (let grantType of grantSection.items) {
			if (grantType.checked) grants += grantType.questions[0].items.length;
		}
	} catch (e) {
		logError("Error getting grants: ", e);
	}

	return grants;
}

export function getLeadershipPeerReviewRoles(meritReport) {
	/*
	 * Had an active leadership role (such as serving on committees or
	 * governing boards) in national medical organizations or served as
	 * reviewer or editorial board member for a peer-reviewed journal in the
	 * previous academic year
	 */

	const isCommitteeChair = question =>
		question.items.some(item => item.role === "chair");

	try {
		const specialtyOrgSection = meritReport.report.pages[3].items[0];

		const roleListOrgIndexes = [
			0, // ASA
			1, // WSA
			2, // ABA
			3, // ABA - Critical care
			4 // SEA
		];
		for (const i of roleListOrgIndexes) {
			const org = specialtyOrgSection.items[i];
			if (org.checked) {
				if (
					org.questions[0].items.length > 0 ||
					isCommitteeChair(org.questions[1])
				)
					return true;
			}
		}

		const radioIndexes = [
			5, // SCA
			6, // SPA
			7, // SOAP
			8, // MARC
			9, // SNACC
			10 // FAER
		];
		for (const i of radioIndexes) {
			const org = specialtyOrgSection.items[i];
			if (org.checked) {
				if (
					org.questions[0].options.some(o => o.checked) ||
					isCommitteeChair(org.questions[1])
				)
					return true;
			}
		}

		// Other

		// Ad-hoc Article Reviewer
		const articleReviewer = meritReport.report.pages[3].items[1].items[1];
		if (articleReviewer.checked) return true;

		// Journal Editorial Board
		const editorialBoard = meritReport.report.pages[3].items[1].items[5];
		if (editorialBoard.checked) return true;
	} catch (e) {
		logError("Error getting leadership/peer-review roles: ", e);
	}

	return false;
}

export function getTeachingFormalCourses() {
	/*
	 *  In the previous academic year, held responsibility for seminars,
	 *  conference series, or course coordination (such as arrangement of
	 *  presentations and speakers, organization of materials, assessment of
	 *  participants' performance) for any didactic training within the
	 *  sponsoring institution or program. This includes training modules for
	 *  medical students, residents, fellows and other health professionals.
	 *  This does not include single presentations such as individual lectures
	 *  or conferences.
	 */

	return false;
}

export function getParticipatesInSimulation(meritReport) {
	return Boolean(
		meritReport.report.pages[1].items[0].items[2].items[12].checked
	);
}

export function getNationalBoards(meritReport) {
	/* eslint-disable no-mixed-spaces-and-tabs */
	return flatMap(
		meritReport.report.pages[3].items[0].items.filter(
			orgItem => orgItem.checked
		),
		orgItem =>
			orgItem.text === "Other" && orgItem.questions[0].items
				? orgItem.questions[0].items.map(otherItem => ({
						name: "Other",
						role: otherItem.text
				  }))
				: {
						name: orgItem.text,
						role: getOrgRoles(orgItem.questions[0])
				  }
	);
	/* eslint-enable no-mixed-spaces-and-tabs */
}

function getOrgRoles(question) {
	switch (question.type) {
		case "list":
			return question.items.map(o => o.text).join(", ");
		case "checkbox":
			return question.options.filter(o => o.checked).map(o => o.text);
		case "text":
			return question.text;
		default:
			return "<i>Unknown</i>";
	}
}
