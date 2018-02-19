<template>
	<div>
		<div v-if="pairingData" class="container body-block">

			<component-list
					item-key="name"
					:fields="fields"
					:field-accessors="fieldAccessors"
					:items="pairingData.pairings"
					:paginate="false">
				<template slot-scope="pairing">
					<egress-pairing-list-item :pairing="pairing"
						:subject-type="subjectType" />
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

		<!-- <alert-list v-model="alerts" /> -->
	</div>
</template>

<script>
import * as lzstring from 'lz-string';

// import HasAlerts from '@/vue-mixins/HasAlerts.js';
import ComponentList from '@/vue-components/ComponentList.vue';
import EgressPairingListItem from './EgressPairingListItem.vue';

import { logError } from '@/modules/errors.js';
import { ucfirst } from '@/modules/utils.js';

import { ADMIN_EMAIL } from '@/modules/constants.js';

export default {
	// mixins: [HasAlerts],
	data() {
		return {
			ADMIN_EMAIL
		};
	},
	computed: {
		params() {
			return new URLSearchParams(window.location.search);
		},
		subjectType() {
			return this.params.get('subjectType') || 'trainee';
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
				// handleError(err, this, 'There was a problem decoding the report data');
			}
		},
		fields() {
			return ['name'];
		},
		fieldAccessors() {
			return {
				name: pairing => pairing[this.subjectType].full_name
			};
		}
	},
	methods: {
		ucfirst
	},
	components: {
		ComponentList,
		EgressPairingListItem
	}
};
</script>
