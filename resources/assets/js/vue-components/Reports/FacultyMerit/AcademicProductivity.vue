<template>
	<section class="academic-productivity">
		<h2>Academic productivity</h2>
		<dl>
			<dt>Total publications</dt>
			<dd>{{ publications.length }}</dd>
			<template v-for="(items, type) of groupBy(publications, 'publicationType')">
				<dt class="sub-item" :key="`dt:${type}`">{{ type }}</dt>
				<dd class="sub-item" :key="`dd:${type}`">{{ items.length }}</dd>
			</template>

			<dt>Total grants</dt>
			<dd>{{ grants.length }}</dd>
			<template v-for="(items, type) of groupBy(grants, 'type')">
				<dt class="sub-item" :key="`dt:${type}`">{{ ucfirst(type.toLowerCase()) }}</dt>
				<dd class="sub-item" :key="`dd:${type}`">{{ items.length }}</dd>
			</template>

			<dt>Total studies</dt>
			<dd>{{ studies.length }}</dd>

			<dt>
				Leadership positions
				<info-popover>
					<ul>
						<li>Committee chair in national organization</li>
						<li>Reviewer or editorial board member for peer-reviewed journal</li>
					</ul>
				</info-popover>
			</dt>
			<dd>{{ leadershipPositions }}</dd>
		</dl>
	</section>
</template>

<style scoped>
.academic-productivity {
	border: 1px solid #888;
	border-radius: 3px;
	margin: 2em;
	padding: 2em;
}

h2 {
	margin-top: 0;
}

dl {
	display: flex;
}

dt, dd {
	flex-basis: 50%;
	border-bottom: 1px solid #ddd;
	padding: 0 0.5em;
}

dd {
	text-align: right;
	font-family: monospace;
}

.sub-item {
	opacity: 0.8;
}

dt.sub-item {
	margin-left: 2em;
}

dd.sub-item {
	margin-right: 2em;
}

@supports (display: grid) {
	dl {
		display: grid;
		grid-template-columns: 1fr 1fr;
		justify-content: center;
		grid-row-gap: 0.5em;
	}
}

ul {
	padding: 1em;
}
</style>

<script>
import groupBy from 'lodash/groupBy';

import InfoPopover from '#/InfoPopover.vue';

import { ucfirst } from '@/modules/text-utils.js';

export default {
	props: {
		reports: {
			type: Array,
			required: true,
			default() {
				return [];
			}
		}
	},
	computed: {
		publications() {
			return this.reports.flatMap(r => r.publications);
		},
		grants() {
			return this.reports.flatMap(r => r.grants);
		},
		studies() {
			return this.reports.flatMap(r => r.studies);
		},
		leadershipPositions() {
			return this.reports.reduce((sum, r) => sum + r.leadershipPositions, 0);
		}
	},
	methods: {
		groupBy,
		ucfirst
	},
	components: {
		InfoPopover
	}
};
</script>
