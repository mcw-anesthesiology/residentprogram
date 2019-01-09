import ApolloClient from 'apollo-boost';

import { GRAPHQL_URI } from '@/modules/constants.js';
import { getCsrfToken } from '@/modules/utils.js';

const apolloClient = new ApolloClient({
	uri: GRAPHQL_URI,
	headers: {
		'X-CSRF-TOKEN': getCsrfToken()
	}
});

export default apolloClient;
