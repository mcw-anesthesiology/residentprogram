import type {
	ScoringDefinition,
	ValueScoringDefinition
} from './scoring.js';

export type QuestionaireSection = {
	title?: string,
	items: QuestionnaireQuestion | QuestionnaireInstruction
};

export type QuestionnaireQuestion =
	| QuestionnaireTextQuestion
	| QuestionnaireNumberQuestion
	| QuestionnaireCheckboxQuestion
	| QuestionnaireRadioQuestion
	| QuestionnaireListQuestion;

type QuestionnaireQuestionBase = {
	text: string,
	description?: string,
	required?: boolean,
	required?: boolean,
	scoring?: ValueScoringDefinition,
	condition?: QuestionnaireQuestionCondition
};

type QuestionnaireQuestionCondition = {
	questionId: string,
	questionValue: boolean | string | number
};

export type QuestionnaireTextQuestion = QuestionnaireQuestionBase & {
	type: 'text' | 'textarea',
	placeholder?: string,
	value?: string,
};

export type QuestionnaireNumberQuestion = QuestionnaireQuestionBase & {
	type: 'number',
	text: string,
	description?: ?string,
	placeholder?: ?string,
	min?: number,
	max?: number,
	value?: number,
	scoring?: ScoringDefinition
};

export type QuestionnaireCheckboxQuestion = QuestionnaireQuestionBase & {
	type: 'checkbox',
	text: string,
	description?: string,
	required?: boolean,
	options: Array<QuestionnaireOption>,
	scoring?: ScoringDefinition
};

export type QuestionnaireRadioQuestion = QuestionnaireQuestionBase & {
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

export type QuestionnaireListQuestion = QuestionnaireQuestionBase & {
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
		| 'subjectMentorship'
		| 'project',
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
	| QuestionnaireMentorshipListItem
	| QuestionnaireProjectListItem;

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

export type QuestionnaireProjectListItem = {
	type: 'project',
	description: string,
	hours: number
};

export type QuestionnaireInstruction = {
	type: 'instruction',
	text: string
};

// export function getQuestionConditionChecker(questionnaire: QuestionaireSection):
// 		(string, boolean | string | number) => boolean {
// 	return (questionId, questionValue) =>
// }
//
// export function getQuestionById(
// 	questionnaire: QuestionaireSection,
// 	questionId: string
// ): QuestionnaireQuestion {
//
// }
