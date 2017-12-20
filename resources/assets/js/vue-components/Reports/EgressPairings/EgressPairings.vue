<template>
	<div>
		<div class="container body-block">
			<form @submit="handleSubmit">
				<div class="row">
					<validated-form-group class="col-xs-12"
							:errors="errors" prop="egressFile">
						<label class="containing-label">
							Egress report file (CSV)
							<input type="file" class="form-control" accept=".csv"
								name="egressFile" />
						</label>
					</validated-form-group>
				</div>
				<div class="row">
					<validated-form-group class="col-sm-6"
							:errors="errors" prop="userType">
						<label class="containing-label">
							Group by
							<select class="form-control" name="userType"
									v-model="userType">
								<option v-for="type of userTypes" :value="type">
									{{ ucfirst(type) }}
								</option>
							</select>
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-6"
							:errors="errors" prop="maxPairs">
						<fieldset>
							<legend>
								Maximum number of pairs per user
							</legend>
							<label class="containing-label">
								Unlimited
								<input type="checkbox" :checked="maxPairs === null"
									@change="handleUnlimitedPairsChange" />
							</label>
							<input type="number" v-if="maxPairs !== null"
								class="form-control" min="0"
								v-model="maxPairs" />
						</fieldset>
					</validated-form-group>
				</div>
				<div class="row">
					<validated-form-group class="col-sm-4" :errors="errors" prop="minCases">
						<label class="containing-label">
							Minimum cases together
							<input type="number" class="form-control" min="0"
								name="minCases" v-model="minCases" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4" :errors="errors" prop="minHours">
						<label class="containing-label">
							Minimum hours together
							<input type="number" class="form-control" min="0"
								name="minHours" v-model="minHours" />
						</label>
					</validated-form-group>
					<validated-form-group class="col-sm-4" :errors="errors" prop="minMinutes">
						<label class="containing-label">
							Minimum minutes together
							<input type="number" class="form-control" min="0" max="59"
								name="minMinutes" v-model="minMinutes" />
						</label>
					</validated-form-group>
				</div>
				<div class="submit-container text-center">
					<button type="submit" class="btn btn-lg btn-primary">
						Run report
					</button>
				</div>
			</form>
		</div>

		<div v-if="overlaps" class="container body-block">
			<component-list :items="overlaps">
				<template slot-scope="item">
					<overlap-list-item :overlap="item" />
				</template>
			</component-list>
		</div>
	</div>
</template>

<script>
import ComponentList from '@/vue-components/ComponentList.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

import OverlapListItem from './OverlapListItem.vue';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import {
	fetchConfig,
	ucfirst,
	jsonOrThrow,
	simpleErrorAlert
} from '@/modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	data() {
		return {
			userType: 'faculty',
			minCases: 0,
			minHours: 0,
			minMinutes: 30,
			maxPairs: null,

			overlaps: null
		};
	},

	computed: {
		userTypes() {
			return [
				'faculty',
				'resident'
			];
		},
		errors() {
			const map = new Map();

			const numProps = [
				'minCases',
				'minHours',
				'minMinutes'
			];

			if (!this.userTypes.includes(this.userType)) {
				map.set('userType', 'Invalid selection');
			}

			for (const prop of numProps) {
				if (Number.isNaN(Number(this[prop]))) {
					map.set(prop, 'Must be a number');
				}
			}

			if (this.maxPairs !== null && Number.isNaN(Number(this.maxPairs))) {
				map.set('maxPairs', 'Must be a number or unlimited');
			}

			return map;
		}
	},

	methods: {
		ucfirst,
		handleUnlimitedPairsChange(event) {
			if (event.target.checked) {
				this.maxPairs = null;
			} else {
				this.maxPairs = 3;
			}
		},
		handleSubmit(event) {
			event.preventDefault();

			const body = new FormData(event.target);
			const quoteUnlimitedMaxPairsUnquote = 99999;

			body.set(
				'maxPairs',
				this.maxPairs === null
					? quoteUnlimitedMaxPairsUnquote
					: this.maxPairs
			);

			fetch('/reports/egress-pairings/overlaps', {
				...fetchConfig({contentType: null}),
				method: 'POST',
				body
			}).then(jsonOrThrow).then(overlaps => {
				this.overlaps = overlaps;
			}).catch(err => {
				console.error(err);
				this.alerts.push(simpleErrorAlert('There was a problem fetching the report'));
			});
		}
	},

	components: {
		ComponentList,
		ValidatedFormGroup,
		OverlapListItem
	}
};
</script>
