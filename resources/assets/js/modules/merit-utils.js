import moment from 'moment';

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

export function getUsersWithCompleteMerit(usersWithMerits) {
	if (!usersWithMerits)
		return;

	let usersWithMerit = [];

	for (let user of usersWithMerits) {
		let report = getMostRecentCompleteReport(user.merit_reports);

		if (report) {
			usersWithMerit.push(Object.assign({}, user, {report}));
		}
	}

	return usersWithMerit;
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

export function itemIsChecked(item) {
	// TODO
	switch (item.type) {
		case 'section':
			return item.items.some(item => itemIsChecked(item));
		case 'item':
			if (item.checked)
				return true;
			break;
	}

	return false;
}

export function getMostRecentCompleteReport(meritReports) {
	if (!meritReports || meritReports.length < 1)
		return;

	let mostRecent = null;

	for (let meritReport of meritReports) {
		if (
			meritReport.status === 'complete'
			&& (
				mostRecent == null
				|| moment(meritReport.period_end) >= moment(mostRecent.period_end)
			)
		)
			mostRecent = meritReport;
	}

	return mostRecent;
}
