import gql from 'graphql-tag';

export const ADDITIONAL_QUESTIONS_FIELDS = gql`
	fragment ManageAdditionalQuestionsFields on AdditionalQuestion {
		id
		title
		text
	}
`;
