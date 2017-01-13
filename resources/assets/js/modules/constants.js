export const ADMIN_EMAIL = 'jmischka@mcw.edu';

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

export const RESIDENT_VALUE_MAP = new Map([
	[2, 'CBY'],
	[4, 'CA-1'],
	[6, 'CA-2'],
	[8, 'CA-3'],
	[10, 'Attending']
]);

export const FELLOWSHIP_VALUE_MAPS = new Map([
	[null, new Map([
		[0, 'Not yet at Resident Level'],
		[1, 'Resident Level'],
		[2, '1st Quarter Fellow'],
		[3, 'Mid-year Fellow'],
		[4, 'Advanced Fellow'],
		[5, 'Attending'],
	])],
	['Critical Care', new Map([
		[0, 'Unacceptable'],
		[3, 'Needs Improvement'],
		[5, 'Meets Expectations'],
		[7, 'Exceeds Expectations'],
		[10, 'Outstanding']
	])],
	['Pediatric', new Map([
		[0, 'Bellow fellow level'],
		[3, 'Developing, Not consistent'],
		[5, 'Acceptable, Not yet secure'],
		[7, 'Secure, Consistent'],
		[10, 'Outstanding, Autonomous']
	])],
	['Pain', new Map([
		[0, 'Not yet at Resident Level'],
		[1, 'Resident Level'],
		[2, '1st Quarter Fellow'],
		[3, 'Mid-year Fellow'],
		[4, 'Advanced Fellow'],
		[5, 'Attending'],
	])],
	['Cardio', new Map([
		[0, 'Unacceptable'],
		[3, 'Needs Improvement'],
		[5, 'Meets Expectations'],
		[7, 'Exceeds Expectations'],
		[10, 'Outstanding']
	])],
	['OB', new Map([
		[0, 'Not at Fellowship Level'],
		[2, 'Fellow - 1'],
		[4, 'Fellow - 2'],
		[6, 'Fellow - 3'],
		[8, 'Fellow - 4'],
		[10, 'Fellow - 5']
	])],
]);


export const REPORT_TYPES = {
	TRAINEE: 'trainee',
	FORM: 'form',
	// NEEDS: 'needs'
};

export const CHART_TYPES = [
	'line',
	'bar',
	'horizontalBar',
	'radar',
	'polarArea',
	'pie',
	'doughnut',
	'bubble'
];

export const CHART_COLORS = {
	AVERAGE: '#ffce56',
	SUBJECT: '#ff6384',
	OTHER: [
		'#7fdbff',
		'#2ecc40',
		'#ffdc00',
		'#f012be',
		'#0074d9',
		'#01ff70',
		'#ff851b',
		'#001f3f',
		'#3d9970',
		'#ff4136',
		'#85144b',
		'#39cccc',
		'#b10dc9'
	]
};
