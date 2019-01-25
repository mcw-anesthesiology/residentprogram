import gql from 'graphql-tag';

export const MANAGE_USER_LIST_FIELDS = gql`
	fragment ManageUserListFields on User {
		id
		first_name
		last_name
		full_name
		email
		type
		training_level
		secondary_training_level
		status
		photo_path
	}
`;

export const MANAGE_USER_FIELDS = gql`
	fragment ManageUserFields on User {
		id
		first_name
		last_name
		full_name
		email
		type
		training_level
		secondary_training_level
		photo_path
		roles {
			role
			pivot {
				additional_permissions
			}
		}
	}
`;
