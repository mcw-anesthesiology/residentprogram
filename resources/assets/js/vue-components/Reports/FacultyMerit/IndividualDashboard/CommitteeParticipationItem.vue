<template>
	<section class="committee-participation-item">
		<h4>
			{{ organization }}
			<small>
				{{ totalParticipationCount }}
			</small>
		</h4>

		<div class="roles">
			<div v-for="role of roles" :key="role">
				<h5>{{ enumToWords(role) }}</h5>
				<ol>
					<li
						v-for="{ period, name } of committees.get(role)"
						:key="name"
					>
						{{ name }}
						<span v-if="showPeriods"> ({{ period }}) </span>
					</li>
				</ol>
			</div>
		</div>
	</section>
</template>

<style scoped>
section {
	padding: 0.25em;
}

h4 {
	font-size: 1.25em;
	margin-bottom: 0;
	border-bottom: 1px solid #888;
}

h4 small {
	display: inline-block;
	padding-left: 0.5em;
	font-size: 0.9em;
	opacity: 0.75em;
}

.roles {
	display: flex;
	flex-direction: row;
	margin: 0 -1em;
}

.roles > div {
	margin: 0.5em 1em;
}

h5 {
	font-size: 1em;
	border-bottom: 1px solid #aaa;
	margin-bottom: 0.25em;
}

ol {
	font-size: 0.875em;
	padding-left: 1.5em;
}
</style>

<script>
/** @format */

import { enumToWords } from '@/modules/text-utils.js';

export default {
	props: {
		organization: String,
		committees: Map,
		showPeriods: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		roles() {
			const roles = Array.from(this.committees.keys());
			roles.sort();

			return roles;
		},
		totalParticipationCount() {
			return Array.from(this.committees.values()).reduce((total, roleCommittees) => total + roleCommittees.length, 0);
		}
	},
	methods: {
		enumToWords
	}
};
</script>
