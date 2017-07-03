import { isoDateString, renderDateRange } from './date-utils.js';

export function getCheckedItemCount(report) {
	if ('type' in report && report.type === 'item')
		return report.checked ? 1 : 0;

	let count = 0;

	let prop = ('type' in report && report.type === 'section')
		? 'items'
		: 'pages';

	if (prop in report) {
		for (let item of report[prop]) {
			count += getCheckedItemCount(item);
		}
	}

	return count;
}

export function sectionIsValid(section) {
	if (!('items' in section) || section.items.length === 0)
		return true;

	for (let item of section.items) {
		switch (item.type) {
			case 'section':
				if (!sectionIsValid(item))
					return false;
				break;
			case 'item':
				if (!itemIsValid(item))
					return false;
				break;
		}
	}

	return true;
}

export function itemIsValid(item) {
	if (!item.checked || !('questions' in item) || item.questions.length === 0)
		return true;

	for (let question of item.questions) {
		if (!questionIsValid(question))
			return false;
	}

	return true;
}

export function questionIsValid(question) {
	if (question.type !== 'list' && !question.required)
		return true;

	switch (question.type) {
		case 'text':
			if (!question.value)
				return false;
			break;
		case 'number':
			if (question.value == null)
				return false;
			if (question.min && question.value < question.min)
				return false;
			if (question.max && question.value > question.max)
				return false;
			break;
		case 'checkbox':
		case 'radio': {
			let optionChecked = false;
			for (let option of question.options) {
				if (option.checked)
					optionChecked = true;
			}
			if (!optionChecked)
				return false;
		}
			break;
		case 'list':
			return listQuestionIsValid(question);
	}

	return true;
}

export function listQuestionIsValid(list) {
	if (!('items' in list) || list.items.length === 0)
		return false;

	for (let listItem of list.items) {
		if ('itemProps' in list) {
			for (let [key, value] of Object.entries(list.itemProps)) {
				if (listItem[key] !== value)
					return false;
			}
		}

		if (!listItemIsValid(listItem))
			return false;
	}

	return true;
}

export function listItemIsValid(listItem) {
	switch (listItem.type) {
		case 'text':
			if (!listItem.text)
				return false;
			break;
		case 'publication':
			if (!listItem.title || !listItem.role)
				return false;
			break;
		case 'committee':
			if (!listItem.name || !listItem.role)
				return false;
			break;
		case 'study':
			if (
				!listItem.title
				|| !listItem.role
				|| !listItem.yearInitiated
				|| !listItem.approvalNumber
				|| !listItem.progress
			)
				return false;
			break;
		case 'grant':
		case 'grantOther':
			if (
				!listItem.agency
				|| !listItem.project
				|| listItem.amount == null
			)
				return false;
			break;
		case 'certification':
			if (!listItem.board || !listItem.specialty)
				return false;
			break;
		case 'editorialBoard':
			if (!listItem.journal || !listItem.role)
				return false;
			break;
		case 'review':
			if (!listItem.work || !listItem.reviews)
				return false;
			break;
		case 'lecture':
		case 'audienceLecture':
			if (!listItem.title || !listItem.date || !listItem.audience)
				return false;
			break;
		case 'mentorship':
		case 'subjectMentorship':
			if (!listItem.mentee || !listItem.subject)
				return false;
			break;
	}

	return true;
}

export function exportMeritReportPdf(meritReport) {
	Promise.all([
		import('pdfmake/build/pdfmake.js'),
		import('../../vfs_fonts.json')
	]).then(([pdfmake, vfs]) => {
		pdfmake.vfs = vfs;

		const filename = `Merit report -- ${meritReport.user.full_name} -- ${isoDateString(meritReport.period_start)} - ${isoDateString(meritReport.period_end)}`;

		let content = [
			{
				text: 'Merit report',
				style: 'h1'
			},
			{
				text: renderDateRange(meritReport.period_start, meritReport.period_end, true),
				style: 'h2'
			}
		];

		let docDefinition = {
			pageSize: 'LETTER',
			content,
			styles: {
				h1: {
					bold: true,
					fontSize: 24,
					margin: [0, 20, 0, 10]
				},
				h2: {
					bold: true,
					fontSize: 18,
					margin: [0, 10, 0, 5]
				},
				// Not sure how how this will work
				// They should get smaller as they get deeper
				sectionHeading: {
					fontSize: 16,
					margin: [0, 6, 0, 3]
				},
				tableHeader: {
					bold: true,
					fontSize: 14
				}
			}
		};

		pdfmake.createPdf(docDefinition).download(filename);
	}).catch(err => {
		console.error(err);
	});

}

export function renderMeritSectionPdfContent(section) {
	let content = [];

	if (content.length < 1) {
		return null;
	}

	if (section.title) {
		content.splice(0, 0, {
			text: section.title,
			style: 'sectionHeading'
		});
	}

	return content;
}

export function renderMeritItemPdfContent(item) {
	if (!item.checked) {
		return null;
	}
}
