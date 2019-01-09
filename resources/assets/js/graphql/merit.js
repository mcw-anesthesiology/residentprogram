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
			full_name
		}
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
	}
`;

export const MERIT_REPORT_QUERY = gql`
	query MeritReportByIdQuery($id: ID!) {
		meritReport(id: $id) {
			...MeritReportFields
		}
	}
	${MERIT_REPORT_FIELDS}
`;
