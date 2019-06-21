import ApolloClient from 'apollo-boost';

import { GRAPHQL_URI, STAFF_GRAPHQL_URI } from './constants.js';
import { getCsrfToken } from './utils.js';

const apolloClient = new ApolloClient({
	uri: GRAPHQL_URI,
	headers: {
		'X-CSRF-TOKEN': getCsrfToken()
	}
});

export default apolloClient;

export const staff = new ApolloClient({
	uri: STAFF_GRAPHQL_URI
});
