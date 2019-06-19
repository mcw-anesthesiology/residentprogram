<template>
	<section class="committee-participation-item">
		<h4>
			{{ organization }}
			<small>
				{{ totalParticipationCount }}
			</small>
		</h4>

		<ol>
			<li
				v-for="{ period, name } of committees"
				:key="name"
			>
				{{ name }}
				<span v-if="showPeriods"> ({{ period }}) </span>
			</li>
		</ol>
	</section>
</template>

<style scoped>
h4 {
	font-size: 1.25em;
	margin-bottom: 0;
	border-bottom: 1px solid #888;
}

h4 small {
	display: inline-block;
	padding-left: 0.5em;
	font-size: 1em;
	opacity: 0.75em;
}

.roles {
	display: flex;
	flex-direction: row;
	margin: 0 -0.5em;
}

.roles > div {
	margin: 0.5em 0.5em 0;
}

h5 {
	font-size: 1em;
	border-bottom: 1px solid #aaa;
	margin-bottom: 0.25em;
}

ol {
	font-size: 0.875em;
	padding-left: 1.5em;
	margin: 0;
}

li {
	line-height: 1;
}

li + li {
	margin-top: 0.25em;
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
	computed: {
		totalParticipationCount() {
			return this.committees.length;
		}
	},
	methods: {
		enumToWords
	}
};
</script>
