import pmids from './complete-reports/v2/pmids.json';
import conferencePresentations from './complete-reports/v2/conference-presentations.json';
import publicationWithoutPmid from './complete-reports/v2/publication-without-pmid.json';
import publicationWithPmid from './complete-reports/v2/publication-with-pmid.json';
import otherPresentations from './complete-reports/v2/other-presentations.json';
import chaptersTextbooks from './complete-reports/v2/chapters-textbooks.json';
import grants from './complete-reports/v2/grants.json';
import committeeChair from './complete-reports/v2/committee-chair.json';
import committeeMember from './complete-reports/v2/committee-member.json';
import listSpecialtyOrg from './complete-reports/v2/list-specialty-org.json';
import checkboxSpecialtyOrg from './complete-reports/v2/checkbox-specialty-org.json';
import adHocReviewer from './complete-reports/v2/ad-hoc-article-reviewer.json';
import editorialBoard from './complete-reports/v2/editorial-board.json';

import {
	getPubMedIds,
	getConferencePresentations,
	getOtherPresentations,
	getChaptersTextbooks,
	getGrants,
	getLeadershipPeerReviewRoles
} from '../v2.js';

describe('faculty merit v2 utils', () => {
	describe('getPubMedIds', () => {
		test('works in this instance', () => {
			expect(getPubMedIds({ report: pmids })).toEqual([
				12345,
				45678,
				91011,
				''
			]);
		});
	});

	describe('getConferencePresentations', () => {
		test('works in this instance', () => {
			expect(getConferencePresentations({ report: conferencePresentations })).toEqual(7);
		});
	});

	describe('getOtherPresentations', () => {
		test('counts publications without PMIDs', () => {
			expect(getOtherPresentations({ report: publicationWithoutPmid })).toEqual(1);
		});

		test("doesn't count publications with PMIDs", () => {
			expect(getOtherPresentations({ report: publicationWithPmid })).toEqual(0);
		});


		test('works in this instance', () => {
			expect(getOtherPresentations({ report: otherPresentations })).toEqual(8);
		});
	});

	describe('getChaptersTextbooks', () => {
		test('works in this instance', () => {
			expect(getChaptersTextbooks({ report: chaptersTextbooks })).toEqual(4);
		});
	});

	describe('getGrants', () => {
		test('works in this instance', () => {
			expect(getGrants({ report: grants })).toEqual(3);
		});
	});

	describe('getLeadershipPeerReviewRoles', () => {
		test('counts committee chair', () => {
			expect(getLeadershipPeerReviewRoles({ report: committeeChair })).toBe(true);
		});

		test("doesn't count committee member", () => {
			expect(getLeadershipPeerReviewRoles({ report: committeeMember })).toBe(false);
		});

		test('counts list-based specialty org', () => {
			expect(getLeadershipPeerReviewRoles({ report: listSpecialtyOrg })).toBe(true);
		});

		test('counts checkbox-based specialty org', () => {
			expect(getLeadershipPeerReviewRoles({ report: checkboxSpecialtyOrg })).toBe(true);
		});

		test('counts ad-hoc article reviews', () => {
			expect(getLeadershipPeerReviewRoles({ report: adHocReviewer })).toBe(true);
		});

		test('counts editorial board memberships', () => {
			expect(getLeadershipPeerReviewRoles({ report: editorialBoard })).toBe(true);
		});
	});
});
