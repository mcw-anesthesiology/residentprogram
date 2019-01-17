import gql from 'graphql-tag';

export const SCENARIOS_FIELDS = gql`
	fragment ManageScenariosFields on Scenario {
		id
		scenario_type
		scenario_difficulty
		title
		text

		forms {
			id
			title
		}
	}
`;
