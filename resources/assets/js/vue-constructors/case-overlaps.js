import Vue from 'vue';

import moment from 'moment';

import CaseOverlap from '@/vue-components/CaseOverlaps/CaseOverlap.vue';

import StartEndDate from '@/vue-components/StartEndDate.vue';
import VueFlatpickr from '@jacobmischka/vue-flatpickr';
import 'flatpickr/dist/flatpickr.css';

import { logError } from '@/modules/errors.js';
import { isoDateString } from '@/modules/date-utils.js';
import {
	fetchConfig,
	jsonOrThrow,
	updateSearchParams
} from '@/modules/utils.js';
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
				reportDates: params.has('startDate') && params.has('endDate')
					? [
						moment(params.get('startDate')).toDate(),
						moment(params.get('endDate')).toDate()
					]
					: [
						moment().subtract(1, 'month').startOf('month').toDate(),
						moment().subtract(1, 'month').endOf('month').toDate()
					],
				pairings: null,
				subjectType: params.has('subjectType')
					? params.get('subjectType')
					: this.user && this.user.type === 'resident'
						? 'faculty'
						: 'trainee',
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
					&& this.reportDates
					&& this.reportDates.length === 2
				);
			}
		},
		mounted() {
			this.fetchPairings();
		},
		watch: {
			reportDates([startDate, endDate]) {
				this.fetchPairings();

				const params = new URLSearchParams(window.location.search);
				params.set('startDate', isoDateString(startDate));
				params.set('endDate', isoDateString(endDate));
				updateSearchParams(params);
			},
			subjectType(subjectType) {
				this.fetchPairings();

				const params = new URLSearchParams(window.location.search);
				params.set('subjectType', subjectType);
				updateSearchParams(params);
			}
		},
		methods: {
			ucfirst,
			fetchPairings() {
				if (!(
					this.subjectType
					&& this.reportDates
					&& this.reportDates.length === 2
				))
					return;

				fetch('/reports/case-overlaps/pairings', {
					...fetchConfig(),
					method: 'POST',
					body: JSON.stringify({
						startDate: this.reportDates[0],
						endDate: this.reportDates[1],
						subjectType: this.subjectType
					})
				}).then(jsonOrThrow).then(pairings => {
					this.pairings = pairings;
				}).catch(err => {
					logError(err);
				});
			},
			handleReportDatesChange([dates]) {
				this.reportDates = dates;
			}
		},
		components: {
			CaseOverlap,
			StartEndDate,
			VueFlatpickr
		}
	});
}
