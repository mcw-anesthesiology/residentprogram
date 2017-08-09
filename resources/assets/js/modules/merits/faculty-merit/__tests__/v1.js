import reportWithPubMedId from './complete-reports/v1/pub-med-id.json';
import reportWithManyPubMedIds from './complete-reports/v1/many-pub-med-ids.json';
import reportWithNationalSocietyLectures from './complete-reports/v1/national-society-lectures.json';
import reportWithPublicationsWithoutPubMedIds from './complete-reports/v1/publication-without-pub-med-id.json';
import reportWithOtherLectures from './complete-reports/v1/other-lectures.json';
import reportWithBooksAndChapters from './complete-reports/v1/books-and-chapters.json';
import reportWithGrants from './complete-reports/v1/grants.json';

import reportWithAsaCommitteeChair from './complete-reports/v1/asa-committee-chair.json';
import reportWithAsaMember from './complete-reports/v1/asa-member.json';
import reportWithWsaBoardOfDirectors from './complete-reports/v1/wsa-board-of-directors.json';
import reportWithSeaCommitteeMember from './complete-reports/v1/sea-committee-member.json';
import reportWithScaCommitteeChair from './complete-reports/v1/sca-committee-chair.json';
import reportWithSoapCommitteeMember from './complete-reports/v1/soap-committee-member.json';
import reportWithOtherCommitteeChair from './complete-reports/v1/other-committee-chair.json';

import {
	getPubMedIds,
	getConferencePresentations,
	getOtherPresentations,
	getChaptersTextbooks,
	getGrants,
	getLeadershipPeerReviewRoles,
	getTeachingFormalCourses,

	getPubMedIdFromLink
} from '../v1.js';

describe('faculty merit v1 utils', () => {

	describe('getPubMedIds', () => {

		test('gets one PubMed ID', () => {
			expect(getPubMedIds({report: reportWithPubMedId})).toEqual([
				3234232351,
				'',
				'',
				''
			]);
		});

		test('gets first four PubMed IDs', () => {
			expect(getPubMedIds({report: reportWithManyPubMedIds})).toEqual([
				1,
				2,
				3,
				4
			]);
		});
	});

	describe('getPubMedIdFromLink', () => {

		test('gets PubMed ID from valid PubMed URL', () => {
			expect(
				getPubMedIdFromLink('https://www.ncbi.nlm.nih.gov/pubmed/28284926/')
			).toBe(28284926);
		});

		test("doesn't get ID from a text citation", () => {
			expect(
				getPubMedIdFromLink('Some random citation')
			).toBeUndefined();
		});

		test("doesn't get ID from another URL", () => {
			expect(
				getPubMedIdFromLink('https://fcd.mcw.edu/?module=search&func=showPublication&id=689657')
			).toBeUndefined();
		});
	});

	describe('getConferencePresentations', () => {
		test('works in this one particular instance', () => {
			expect(
				getConferencePresentations({report: reportWithNationalSocietyLectures})
			).toBe(8);
		});
	});

	describe('getOtherPresentations', () => {
		test('counts reports without PubMed IDs', () => {
			expect(
				getOtherPresentations({report: reportWithPublicationsWithoutPubMedIds})
			).toBe(2);
		});

		test('works in this one particular instance', () => {
			expect(
				getOtherPresentations({report: reportWithOtherLectures})
			).toBe(5);
		});
	});

	describe('getChaptersTextbooks', () => {
		test('works in this one particular instance', () => {
			expect(
				getChaptersTextbooks({report: reportWithBooksAndChapters})
			).toBe(4);
		});
	});

	describe('getGrants', () => {
		test('works in this one particular instance', () => {
			expect(
				getGrants({report: reportWithGrants})
			).toBe(5);
		});
	});

	describe('getLeadershipPeerReviewRoles', () => {
		test('ASA committee chair', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithAsaCommitteeChair})
			).toBe('Y');
		});

		test('ASA member', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithAsaMember})
			).toBe('N');
		});

		test('WSA board of directors', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithWsaBoardOfDirectors})
			).toBe('Y');
		});

		test('SEA committee member', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithSeaCommitteeMember})
			).toBe('Y');
		});

		test('SCA committee member', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithScaCommitteeChair})
			).toBe('Y');
		});

		test('SOAP committee member', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithSoapCommitteeMember})
			).toBe('Y');
		});

		test('Other committee chair', () => {
			expect(
				getLeadershipPeerReviewRoles({report: reportWithOtherCommitteeChair})
			).toBe('Y');
		});
	});

	describe('getTeachingFormalCourses', () => {
		test('always returns N for now', () => {
			expect(getTeachingFormalCourses()).toBe('N');
		});
	});
});
