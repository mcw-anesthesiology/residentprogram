<template>
	<div v-if="user && reportDates && pairings">
		<h2>
			{{ user.full_name }}
			<small>
				<rich-date-range :dates="reportDates" :start="0" :end="1" />
			</small>
		</h2>

		<component-list
				item-key="name"
				:fields="fields"
				:field-accessors="fieldAccessors"
				:items="pairings"
				:paginate="false">
			<template slot-scope="pairing">
				<pairing-list-item :key="pairing.name"
					:pairing="pairing"
					:user="user"
					:subject-type="subjectType"
					:report-dates="reportDates" />
			</template>
		</component-list>
	</div>

</template>

<style scoped>
	h2 {
		margin: 1.5em 0;
	}
</style>

<script>
import PairingListItem from './PairingListItem.vue';

import ComponentList from '@/vue-components/ComponentList.vue';
import RichDateRange from '@/vue-components/RichDateRange.vue';

import { parsePhpDateInterval } from '@/modules/date-utils.js';
import { ucfirst } from '@/modules/utils.js';

import { ADMIN_EMAIL } from '@/modules/constants.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		pairings: {
			type: Array,
			required: true
		},
		subjectType: {
			type: String,
			required: true
		},
		reportDates: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			ADMIN_EMAIL
		};
	},
	computed: {
		params() {
			return new URLSearchParams(window.location.search);
		},
		fields() {
			return ['name', 'cases together', 'time together'];
		},
		fieldAccessors() {
			return {
				name: pairing => pairing.partner.full_name,
				'cases together': pairing => pairing.numCases,
				'time together': pairing =>
					parsePhpDateInterval(pairing.totalTime).asSeconds()
			};
		}
	},
	methods: {
		ucfirst
	},
	components: {
		ComponentList,
		PairingListItem,
		RichDateRange
	}
};
</script>
