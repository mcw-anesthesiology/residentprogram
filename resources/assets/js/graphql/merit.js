/** @format */

import gql from 'graphql-tag';

export const MERIT_FORM_FIELDS = gql`
	fragment MeritFormFields on MeritReportForm {
		id
		name
		form
	}
`;

export const MERIT_REPORT_FIELDS = gql`
	fragment MeritReportFields on MeritReport {
		id
		period_start
		period_end
		report
		status
		notes
		user_id
		form_id
		form {
			...MeritFormFields
		}
		user {
			id
			full_name
		}
		updated_at
	}
	${MERIT_FORM_FIELDS}
`;

export const MERIT_REPORT_LIST_FIELDS = gql`
	fragment MeritReportListFields on MeritReport {
		id
		period_start
		period_end
		status
		notes
		form {
			id
			name
		}
		updated_at
	}
`;

export const MERIT_REPORT_QUERY = gql`
	query MeritReportByIdQuery($id: ID!) {
		meritReport(id: $id) {
			...MeritReportListFields
			...MeritReportFields
		}
	}
	${MERIT_REPORT_FIELDS}
	${MERIT_REPORT_LIST_FIELDS}
`;

export const MY_MERIT_REPORTS_QUERY = gql`
	query {
		me {
			id
			meritReports {
				...MeritReportListFields
			}
		}
	}
	${MERIT_REPORT_LIST_FIELDS}
`;

export const MERIT_ADMINISTRATOR_STAFF_FIELDS = gql`
	fragment MeritAdministratorsStaffFields on User {
		id
		full_name
		type
		meritAdministratees {
			id
			full_name
		}
	}
`;

export const YEARLY_OVERVIEW_FIELDS = gql`
	fragment YearlyOverviewFields on MeritReport {
		id
		status
		period_start
		period_end
		leadershipPositions
		grants {
			type
			agency
			amount
		}
		publications {
			publicationType
			pmid
		}
		studies {
			yearInitiated
		}
		lectures {
			title
			lectureType
		}
	}
`;

export const INDIVIDUAL_DASHBOARD_FIELDS = gql`
	fragment IndividualDashboardFields on MeritReport {
		...YearlyOverviewFields
		committeeParticipation {
			organization
			committees {
				name
				role
			}
		}
		nihStudySectionMember
		editorialBoards {
			journal
			role
		}
		directorships {
			clinicalService
			simulationCenter
			visitingRotators
		}
		interviews {
			description
			date
		}
		publications {
			publicationType
			title
		}
		grants {
			project
		}
		studies {
			title
			role
			yearInitiated
		}
		lectures {
			lectureType
			title
			date
			audience
		}
		leadershipRoles {
			roleType
			roles
		}
	}
	${YEARLY_OVERVIEW_FIELDS}
`;

export const FCD_EXPORT_FIELDS = gql`
	fragment FcdExportFields on MeritReport {
		id
		status
		period_start
		period_end

		user {
			full_name
			email
		}

		publications {
			publicationType
			title
			author
			link
			role
			peerReviewed
			pmid
		}

		studies {
			title
			role
			primaryInvestigator
			yearInitiated
			approvalNumber
			progress
		}

		grants {
			type
			agency
			project
			amount
		}

		leadershipRoles {
			roleType
			roles
		}

		nationalBoards {
			name
			role
		}

		committees {
			name
			role
			organizationType
			organization
		}

		certifications {
			board
			specialty
			current
			recertified
		}

		organizations

		lectures {
			lectureType
			title
			date
			audience
		}

		mentorships {
			mentee
			mentorshipType
			subject
		}

		createdCourses
		aclsBclsCourses
		reviewerships {
			reviewType
			work
			reviews
		}
		nihStudySectionMember

		editorialBoards {
			journal
			role
		}

		interviews {
			description
			date
		}
		simulationSessions {
			description
			date
		}
	}
`;

export const SUMMARY_REPORT_USER_FIELDS = gql`
	fragment SummaryReportUserFields on User {
		full_name

		evaluatorEvaluations(
			after: $after
			before: $before
			type: trainee
			status: complete
		) {
			id
		}

		overallAbilities: subjectTextResponseSummary(
			after: $after
			before: $before
			formId: $subjectResponseFormId
			questionId: $overallAbilitiesQuestionId
		) {
			num
			withNumericValues(mappings: $overallAbilitiesMappings) {
				average
				stdDev
			}
		}

		continueToTrain: subjectTextResponseSummary(
			after: $after
			before: $before
			formId: $subjectResponseFormId
			questionId: $continueToTrainQuestionId
		) {
			num
			withValue(value: "yes") {
				num
				percent
			}
		}
	}
`;

export const SUMMARY_REPORT_CHECKLIST_FIELDS = gql`
	fragment SummaryReportChecklistFields on MeritReport {
		lectures {
			title
		}

		publications {
			publicationType
			title
		}

		grants {
			agencyType
		}

		studies {
			primaryInvestigator
		}

		leadershipRoles {
			roleType
			roles
		}

		committees {
			name
			role
			organizationType
		}

		certifications {
			board
			specialty
		}

		organizations
	}
`;

export const SUMMARY_REPORT_FIELDS = gql`
	fragment SummaryReportFields on MeritReport {
		id

		user {
			...SummaryReportUserFields
		}

		...SummaryReportChecklistFields
	}
	${SUMMARY_REPORT_USER_FIELDS}
	${SUMMARY_REPORT_CHECKLIST_FIELDS}
`;

export const PUBLICATION_TYPES = [
	'Original Article',
	'Review Article',
	'Book / Text',
	'Book Chapter',
	'Editorial',
	'Case Report',
	'Letter to the Editor',
	'Abstract / Poster',
	'Anesthesia Toolbox',
	'MedEd'
];

export const GRANT_TYPES = ['INDUSTRY', 'EXTRAMURAL_RESEARCH', 'INTERNAL'];

export const ORGANIZATION_TYPES = ['INTERNAL', 'REGIONAL', 'NATIONAL'];
