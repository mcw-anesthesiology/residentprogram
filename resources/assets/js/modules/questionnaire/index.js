import type {
	ScoringDefinition,
	ValueScoringDefinition
} from './scoring.js';

export type QuestionnaireQuestion =
	| QuestionnaireTextQuestion
	| QuestionnaireNumberQuestion
	| QuestionnaireCheckboxQuestion
	| QuestionnaireRadioQuestion
	| QuestionnaireListQuestion;

export type QuestionnaireTextQuestion = {
	type: 'text' | 'textarea',
	text: string,
	description?: string,
	placeholder?: string,
	value?: string,
	required?: boolean,
	scoring?: ValueScoringDefinition
};

export type QuestionnaireNumberQuestion = {
	type: 'number',
	text: string,
	description?: ?string,
	placeholder?: ?string,
	min?: number,
	max?: number,
	value?: number,
	scoring?: ScoringDefinition
};

export type QuestionnaireCheckboxQuestion = {
	type: 'checkbox',
	text: string,
	description?: string,
	required?: boolean,
	options: Array<QuestionnaireOption>,
	scoring?: ScoringDefinition
};

export type QuestionnaireRadioQuestion = {
	type: 'radio',
	text: string,
	description?: string,
	required?: string,
	options: Array<QuestionnaireOption>,
	scoring?: ScoringDefinition
};

export type QuestionnaireOption = {
	text: string,
	description?: string,
	value: string | number,
	editable?: boolean,
	checked?: boolean,
	scoring?: ScoringDefinition
};

export type QuestionnaireListQuestion = {
	type: 'list',
	listType:
		| 'text'
		| 'publication'
		| 'committee'
		| 'study'
		| 'grant'
		| 'grantOther'
		| 'certification'
		| 'editorialBoard'
		| 'review'
		| 'lecture'
		| 'audienceLecture'
		| 'mentorship'
		| 'subjectMentorship',
	text?: string,
	description?: string,
	ordered?: boolean,
	itemProps?: Object, // FIXME
	itemLabels?: Object, // FIXME
	items?: Array<QuestionnaireListItem>,
	scoring?: ValueScoringDefinition
};

export type QuestionnaireListItem =
	| QuestionnaireTextListItem
	| QuestionnairePublicationListItem
	| QuestionnaireCommitteeListItem
	| QuestionnaireStudyListItem
	| QuestionnaireGrantListItem
	| QuestionnaireCertificationListItem
	| QuestionnaireEditorialBoardListItem
	| QuestionnaireReviewListItem
	| QuestionnaireLectureListItem
	| QuestionnaireMentorshipListItem;

export type QuestionnaireTextListItem = {
	type: 'text',
	text?: string
};

export type QuestionnairePublicationListItem = {
	type: 'publication',
	title: string,
	author: string,
	link: string,
	role: string
};

export type QuestionnaireCommitteeListItem = {
	type: 'committee',
	name: string,
	role: 'chair' | 'member'
};

export type QuestionnaireStudyListItem = {
	type: 'study',
	title: string,
	role: string,
	yearInitiated: string,
	approvalNumber: string,
	progress: string
};

export type QuestionnaireGrantListItem = {
	type: 'grant' | 'grantOther',
	agency: string,
	project: string,
	amount: number
};

export type QuestionnaireCertificationListItem = {
	type: 'certification',
	board: string,
	specialty: string
};

export type QuestionnaireEditorialBoardListItem = {
	type: 'editorialBoard',
	journal: string,
	role: string
};

export type QuestionnaireReviewListItem = {
	type: 'review',
	work: string,
	reviews: number
};

export type QuestionnaireLectureListItem = {
	type: 'lecture' | 'audienceLecture',
	title: string,
	date: string,
	audience: string
};

export type QuestionnaireMentorshipListItem = {
	type: 'mentorship' | 'subjectMentorship',
	mentee: string,
	subject: string
};

export type QuestionnaireInstruction = {
	type: 'instruction',
	text: string
};
