<template>
	<div>
		<div v-if="pairingData" class="container body-block">
			<h1>Detailed pairing report</h1>
			<h2>
				{{ userName }}
				<small v-if="reportDates">
					{{
						renderDateRange(
							this.reportDates.startDate,
							this.reportDates.endDate
						)
					}}
				</small>
			</h2>

			<component-list
					item-key="name"
					:fields="fields"
					:field-accessors="fieldAccessors"
					:items="pairingData.pairings"
					:paginate="false">
				<template slot-scope="pairing">
					<egress-pairing-list-item :pairing="pairing"
						:subject-type="subjectType"
						:report-dates="reportDates" />
				</template>
			</component-list>
		</div>
		<div v-else class="container body-block">
			<p v-if="encodedPairingData">
				Sorry, there was a problem decoding the report data from the link.
				Please let me know at
				<a :href="`mailto:${ADMIN_EMAIL}`">{{ ADMIN_EMAIL }}</a>.
			</p>
			<p v-else>
				Sorry, we couldn't find any pairing data in the address.
				Please double check the link you used to get here.
			</p>
		</div>
	</div>
</template>

<style scoped>
	h2 {
		margin: 1.5em 0;
	}
</style>

<script>
import * as lzstring from 'lz-string';

import ComponentList from '@/vue-components/ComponentList.vue';
import EgressPairingListItem from './EgressPairingListItem.vue';

import { logError } from '@/modules/errors.js';
import { renderDateRange, parsePhpDateInterval } from '@/modules/date-utils.js';
import { ucfirst } from '@/modules/utils.js';

import { ADMIN_EMAIL } from '@/modules/constants.js';

export default {
	data() {
		return {
			ADMIN_EMAIL
		};
	},
	computed: {
		userName() {
			if (!this.pairingData)
				return;

			return this.pairingData['user name'];
		},
		params() {
			return new URLSearchParams(window.location.search);
		},
		userType() {
			return this.params.get('userType');
		},
		subjectType() {
			return this.params.get('subjectType') || 'trainee';
		},
		reportDates() {
			const startDate = this.params.get('startDate');
			const endDate = this.params.get('endDate');

			if (startDate && endDate) {
				return {
					startDate,
					endDate
				};
			}
		},
		encodedPairingData() {
			return this.params.get('pairingData');
		},
		pairingData() {
			if (!this.encodedPairingData)
				return;

			try {
				return JSON.parse(lzstring.decompressFromEncodedURIComponent(
					this.encodedPairingData
				));
			} catch (err) {
				logError(err);
			}
		},
		fields() {
			return ['name', 'cases together', 'time together'];
		},
		fieldAccessors() {
			return {
				name: pairing => pairing[this.subjectType].full_name,
				'cases together': pairing => pairing.numCases,
				'time together': pairing =>
					parsePhpDateInterval(pairing.totalTime).asSeconds()
			};
		}
	},
	methods: {
		ucfirst,
		renderDateRange
	},
	components: {
		ComponentList,
		EgressPairingListItem
	}
};
</script>
