import MERIT_REPORT from './completeReportV1.json';

import {
	getPublicationSection
} from '../v1.js';

describe('faculty merit v1 utils', () => {
	test('getPublicationSection', () => {
		expect(getPublicationSection(MERIT_REPORT)).toEqual({
			"type": "section",
			"title": "Publishing (peer reviewed unless otherwise stated)",
			"items": [
				{
					"type": "item",
					"text": "Book / Text, First Ed.",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Original Article: Prospective trial",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Book / Text, Revised Ed.",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Review article",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Book Chapter Author (new or revised)",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Editorial",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Abstract and/or Poster (Professional Society meeting)",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				},
				{
					"type": "item",
					"text": "Letter to the Editor",
					"questions": [
						{
							"type": "list",
							"listType": "publication"
						}
					]
				}
			]
		});
	});

	test('getAllPublicationTypes', () => {

	});
});
