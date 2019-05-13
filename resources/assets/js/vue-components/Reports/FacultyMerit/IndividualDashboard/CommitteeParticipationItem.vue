<template>
	<li class="committee-participation-item">
		<span> {{ organization }} committees </span>

		<ul>
			<li v-for="{ period, name, role } of committees" :key="name">
				<b>
					{{ name }}
				</b>
				—
				{{ enumToWords(role) }}
				<span v-if="showPeriods"> ({{ period }}) </span>
			</li>
		</ul>
	</li>
</template>

<style scoped>
.committee-participation-item > span {
	font-size: 1.1em;
}

ul {
	font-size: 0.9em;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
}

li {
	list-style-position: inside;
	margin: 0.25em;
	margin-left: 1.5em;
}
</style>

<script>
/** @format */

import { enumToWords } from '@/modules/text-utils.js';

export default {
	props: {
		organization: String,
		committees: Array,
		showPeriods: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		enumToWords
	}
};
</script>
