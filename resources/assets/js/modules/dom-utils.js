/* @flow */

export function getHeaderHeight() {
	let navbar = document.querySelector('#main-navbar');

	if (!navbar)
		return null;

	return navbar.clientHeight;
}
