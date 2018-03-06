import Vue from 'vue';

import CaseOverlap from '@/vue-components/CaseOverlaps/CaseOverlap.vue';

import StartEndDate from '@/vue-components/StartEndDate.vue';
import VueFlatpickr from '@jacobmischka/vue-flatpickr';

import { logError } from '@/modules/errors.js';
import { fetchConfig, jsonOrThrow } from '@/modules/utils.js';
import { ucfirst } from '@/modules/text-utils.js';

export default function createCaseOverlaps(el, propsData) {
	return new Vue({
		el,
		props: {
			user: {
				type: Object,
				required: false
			}
		},
		propsData,
		data() {
			const params = new URLSearchParams(window.location.search);

			return {
				reportDatesStr: [
					params.get('startDate'),
					params.get('endDate')
				].join(' to '),
				reportDates: {
					startDate: params.get('startDate'),
					endDate: params.get('endDate')
				},
				pairings: null,
				// FIXME: Set defaults for trainees
				subjectType: 'trainee',
				subjectTypes: [
					'trainee',
					'resident',
					'fellow',
					'faculty'
				]
			};
		},
		computed: {
			ready() {
				return (
					this.user
					&& this.pairings
					&& this.reportDates.startDate
					&& this.reportDates.endDate
				);
			}
		},
		mounted() {
			this.fetchPairings();
		},
		watch: {
			reportDates() {
				this.fetchPairings();
			}
		},
		methods: {
			ucfirst,
			fetchPairings() {
				if (!(
					this.subjectType
					&& this.reportDates.startDate
					&& this.reportDates.endDate
				))
					return;

				fetch('/reports/case-overlaps/pairings', {
					...fetchConfig(),
					method: 'POST',
					body: JSON.stringify({
						...this.reportDates,
						subjectType: this.subjectType
					})
				}).then(jsonOrThrow).then(pairings => {
					this.pairings = pairings;
				}).catch(err => {
					logError(err);
				});
			},
			handleReportDatesChange([dates]) {
				this.reportDates = {
					startDate: dates[0],
					endDate: dates[1]
				};
			}
		},
		components: {
			CaseOverlap,
			StartEndDate,
			VueFlatpickr
		}
	});
}
