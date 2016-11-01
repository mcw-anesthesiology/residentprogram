export const NEW_ITEM_TAG = '<span class="label label-primary">NEW</span>';

export const UNSEEN_EVALUATION_PRIORITY = 1000000;

export const STANDARD_OPTIONS = {
	RESIDENT: [
		{value: 0, text: "Not at CBY"},
		{value: 1, text: ""},
		{value: 2, text: "CBY"},
		{value: 3, text: ""},
		{value: 4, text: "CA-1"},
		{value: 5, text: ""},
		{value: 6, text: "CA-2"},
		{value: 7, text: ""},
		{value: 8, text: "CA-3"},
		{value: 9, text: ""},
		{value: 10, text: "Attending"}
	],
	FELLOW: [
		{value: 0, text: "Not at fellowship level"},
		{value: 1, text: ""},
		{value: 2, text: "Fellow - 1"},
		{value: 3, text: ""},
		{value: 4, text: "Fellow - 2"},
		{value: 5, text: ""},
		{value: 6, text: "Fellow - 3"},
		{value: 7, text: ""},
		{value: 8, text: "Fellow - 4"},
		{value: 9, text: ""},
		{value: 10, text: "Fellow - 5"}
	],
	FACULTY: [
		{value: "strongly-disagree", text: "Strongly Disagree"},
		{value: "disagree", text: "Disagree"},
		{value: "undecided", text: "Undecided"},
		{value: "agree", text: "Agree"},
		{value: "strongly-agree", text: "Strongly Agree"},
		{value: "n-a", text: "N/A"}
	]
};

export const REPORT_TYPES = {
	TRAINEE: 'trainee',
	FORM: 'form'
};
