import gql from 'graphql-tag';

export const PROFESSIONALISM_QUESTIONS_FIELDS = gql`
	fragment ManageProfessionalismQuestionsFields on ProfessionalismQuestion {
		id
		title
		text
	}
`;
