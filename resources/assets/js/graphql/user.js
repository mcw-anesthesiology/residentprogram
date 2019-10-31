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

export const GROUP_USER_FIELDS = gql`
	fragment SelectTwoGroupFields on User {
		id
		full_name
		type
		training_level
		status
	}
`;

export const USER_GROUP_FIELDS = gql`
	fragment UserGroupFields on UserGroup {
		id
		name
		users {
			id
			full_name
		}
	}
`;

export const USER_GROUPS_QUERY = gql`
	query UserGroupsQuery {
		userGroups {
			...UserGroupFields
		}
	}
	${USER_GROUP_FIELDS}
`;

