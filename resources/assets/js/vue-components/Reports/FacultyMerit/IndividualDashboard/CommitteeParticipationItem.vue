<template>
	<li class="committee-participation-item">
		<span> {{ organization }} committees </span>

		<ul>
			<li v-for="{ period, name, role } of committees" :key="name">
				<b>
					{{ name }}
				</b>
				—
				{{ enumToWords(role) }} ({{ period }})
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
}
</style>

<script>
/** @format */

import { enumToWords } from '@/modules/text-utils.js';

export default {
	props: {
		organization: String,
		committees: Array
	},
	methods: {
		enumToWords
	}
};
</script>
