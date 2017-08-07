export function getAllPublicationTypes(meritReport) {
	const publicationSection = getPublicationSection(meritReport);

	let types = [];

	for (let publicationItem of publicationSection.items) {
		types.push(publicationItem.text);
	}

	return types;
}

export function getFacultyPublicationsByType(meritReport, checkedOnly = true) {
	const publicationSection = getPublicationSection(meritReport);

	let publications = new Map();

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

export function getAllPublications(meritReport) {
	const publicationSection = getPublicationSection(meritReport);

	let publications = [];

	for (let pubType of publicationSection.items) {
		if (pubType.checked) {
			for (let pubItem of pubType.questions[0].items) {
				publications.push(pubItem);
			}
		}
	}

	return publications;
}

function getPublicationSection(meritReport) {
	return meritReport.report.pages[2].items[0];
}

export function getScholarlyActivity(meritReport, fullName) {
	/*
	 * HEADER:
 	 *	Faculty Member, PMID 1, PMID 2, PMID 3, PMID 4,
 	 *	Conference Presentations (#), Other Presentations (#),
 	 *	Chapters / Textbooks (#), Grant Leadership (#),
 	 *	Leadership or Peer-Review Role (Y/N), Teaching Formal Courses (Y/N)
	 */

	return [
		fullName,
		...getPubMedIds(meritReport),
		getConferencePresentations(meritReport),
		getOtherPresentations(meritReport),
		getChaptersTextbooks(meritReport),
		getGrants(meritReport),
		getLeadershipPeerReviewRoles(meritReport),
		getTeachingFormalCourses(meritReport),
	];
}

function getPubMedIds(meritReport) {
	// FIXME: Translate links to PMIDs
	/*
	 * Pub Med Ids (assigned by PubMed) for articles published in the previous
	 * academic year. List up to 4. Pub Med ID (PMID) is an unique number
	 * assigned to each PubMed record. This is generally an 8 character numeric
	 * number. The PubMed Central reference number (PMCID) is different from the
	 * PubMed reference number (PMID). PubMed Central is an index of full-text
	 * papers, while PubMed is an index of abstracts.
	 */

	let pubMedIds = Array(4).fill('');

	try {
		const publicationsWithLinks = getAllPublications(meritReport).filter(pub =>
			getPubMedIdFromLink(pub.link)
		);
		// Up to 4 PMIDs (PubMed IDs)
		for (let i = 0; i < pubMedIds.length; i++) {
			if (publicationsWithLinks.length > i && publicationsWithLinks[i]) {
				pubMedIds[i] = publicationsWithLinks[i].link;
			}
		}
	} catch (e) {
		console.error('Error getting PubMed IDs: ', e);
	}

	return pubMedIds;
}

function getPubMedIdFromLink(link) {
	// FIXME: This isn't very good.

	const pubMedUrl = 'www.ncbi.nlm.nih.gov/pubmed/';
	if (link.includes(pubMedUrl)) {
		let pubMedId = parseInt(
			link.substring(link.indexOf(pubMedUrl) + pubMedUrl.length),
			10
		);

		if (!Number.isNaN(pubMedId))
			return pubMedId;
	}
}

function getConferencePresentations(meritReport) {
	/*
	 * Number of abstracts, posters, and presentations given at international,
	 * national, or regional meetings in the previous academic year
	 */

	let conferencePresentations = 0;

	try {
		const educationOutsideMCWSection = meritReport.report.pages[1].items[2];
		const conferenceIndexes = [
			0, // ASA refresher course
			2, // ASA panel presentation
			3, // ASA problem-based learning discussion
			4, // Other national society invited lecture
			5 // WSA lecture
		];

		for (let conferenceIndex of conferenceIndexes) {
			const conferenceSection = educationOutsideMCWSection.items[conferenceIndex];
			if (conferenceSection.checked) {
				conferencePresentations += conferenceSection.questions[0].items.length;
			}
		}
	} catch (e) {
		console.error('Error getting conference presentations: ', e);
	}

	return conferencePresentations;
}

function getOtherPresentations(meritReport) {
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
		let publicationsWithoutLinks = getAllPublications(meritReport).filter(pub =>
			!getPubMedIdFromLink(pub.link)
		);
		otherPresentations += publicationsWithoutLinks.length;

		// Education - Medical College / Hospital
		const educationInsideMCWSection = meritReport.report.pages[1].items[1];
		for (let presentationType of educationInsideMCWSection.items) {
			if (presentationType.checked)
				otherPresentations += presentationType.questions[0].items.length;
		}

		// Education - Outside MCW
		const educationOutsideMCWSection = meritReport.report.pages[1].items[2];
		const nonConferenceIndexes = [
			1, // Visiting professor
			6 // Local community group
		];

		for (let conferenceIndex of nonConferenceIndexes) {
			const conferenceSection = educationOutsideMCWSection.items[conferenceIndex];
			if (conferenceSection.checked) {
				otherPresentations += conferenceSection.questions[0].items.length;
			}
		}
	} catch (e) {
		console.error('Error getting other presentations: ', e);
	}

	return otherPresentations;
}

function getChaptersTextbooks(meritReport) {
	/*
	 * Number of chapters or textbooks published in the previous academic year
	 */

	let chaptersTextbooks = 0;

	try {
		const publicationSection = getPublicationSection(meritReport);
		// Book / Text, First Ed.
		if (publicationSection.items[0].checked)
			chaptersTextbooks += publicationSection.items[0].questions[0].items.length;

		// Book / Text, Revised Ed.
		if (publicationSection.items[2].checked)
			chaptersTextbooks += publicationSection.items[2].questions[0].items.length;

		// Book Chapter Author
		if (publicationSection.items[4].checked)
			chaptersTextbooks += publicationSection.items[4].questions[0].items.length;
	} catch (e) {
		console.error('Error getting chapters/textbooks: ', e);
	}

	return chaptersTextbooks;
}

function getGrants(meritReport) {
	/*
	 * Number of grants for which faculty member had a leadership role
	 * (PI, Co-PI, or site director) in the previous academic year
	 */

	let grants = 0;

	try {
		const grantSection = meritReport.report.pages[2].items[1].items[1];
		for (let grantType of grantSection.items) {
			if (grantType.checked)
				grants += grantType.questions[0].items.length;
		}
	} catch (e) {
		console.error('Error getting grants: ', e);
	}

	return grants;
}

function getLeadershipPeerReviewRoles(meritReport) {
	/*
	 * Had an active leadership role (such as serving on committees or
	 * governing boards) in national medical organizations or served as
	 * reviewer or editorial board member for a peer-reviewed journal in the
	 * previous academic year
	 */

	let leadershipPeerReviewRoles = 0;

	try {
		const specialtyOrgSection = meritReport.report.pages[3].items[0];

		// ASA
		const asa = specialtyOrgSection.items[0];
		if (asa.checked && asa.questions[0].options.some(option =>
			option.checked && [
				'board-of-directors',
				'committee-chair',
				'committee-member'
			].includes(option.value)
		))
			leadershipPeerReviewRoles++;

		// WSA
		const wsa = specialtyOrgSection.items[1];
		if (wsa.checked && wsa.questions[0].options.some(option =>
			option.checked && [
				'board-of-directors',
				'officer',
				'committee-chair',
				'committee-member'
			].includes(option.value)
		))
			leadershipPeerReviewRoles++;

		// ABA
		// I'm not sure if this counts

		// SEA
		const sea = specialtyOrgSection.items[3];
		// Only options are committee chair and member
		if (sea.checked)
			leadershipPeerReviewRoles++;

		// SCA
		const sca = specialtyOrgSection.items[4];
		// Only options are committee chair and member
		if (sca.checked)
			leadershipPeerReviewRoles++;

		// SOAP
		const soap = specialtyOrgSection.items[5];
		// Only options are committee chair and member
		if (soap.checked)
			leadershipPeerReviewRoles++;

		// Other
		const other = specialtyOrgSection.items[6];
		if (other.checked) {
			leadershipPeerReviewRoles += other.questions[0].items.length;
		}


		// Ad-hoc Article Reviewer
		const articleReviewer = meritReport.report.pages[3].items[1].items[1];
		if (articleReviewer.checked)
			leadershipPeerReviewRoles += articleReviewer.questions[0].items.length;

		// Journal Editorial Board
		const editorialBoard = meritReport.report.pages[3].items[1].items[9];
		if (editorialBoard.checked)
			leadershipPeerReviewRoles += editorialBoard.questions[0].items.length;
	} catch (e) {
		console.error('Error getting leadership/peer-review roles: ', e);
	}

	return leadershipPeerReviewRoles > 0
		? 'Y'
		: 'N';
}

function getTeachingFormalCourses(meritReport) {
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

	let teachingFormalCourses = 'N';

	try {
		// TODO
	} catch (e) {
		console.error('Error getting teaching formal courses: ', e);
	}

	return teachingFormalCourses;
}
