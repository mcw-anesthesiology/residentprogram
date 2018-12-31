import ApolloClient from 'apollo-boost';

import { GRAPHQL_URI } from '@/modules/constants.js';

const apolloClient = new ApolloClient({
	uri: GRAPHQL_URI
});

export default apolloClient;
