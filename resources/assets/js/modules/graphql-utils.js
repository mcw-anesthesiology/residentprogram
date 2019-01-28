export function stripTypename(obj) {
	// eslint-disable-next-line no-unused-vars
	const { __typename, ...strippedObj } = obj;

	return strippedObj;
}
