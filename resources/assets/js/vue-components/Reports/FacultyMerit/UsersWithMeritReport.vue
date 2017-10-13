<script>
import AcademicYearSelector from '@/vue-components/AcademicYearSelector.vue';
import ComponentList from '@/vue-components/ComponentList.vue';

import HasAlerts from '@/vue-mixins/HasAlerts.js';

import { FEATURE_RELEASE_DATES } from '@/modules/constants.js';
import { isoDateStringObject, lastYear } from '@/modules/date-utils.js';
import {
	getUsersWithCompleteMerit
} from '@/modules/merit-utils.js';
import { getFetchHeaders, jsonOrThrow } from '@/modules/utils.js';

export default {
	mixins: [
		HasAlerts
	],
	data() {
		return {
			dates: isoDateStringObject(lastYear()),
			usersWithMerits: null
		};
	},

	mounted() {
		this.fetchUsersWithMerits();
	},

	computed: {
		meritsReleaseDate() {
			return FEATURE_RELEASE_DATES.FACULTY_MERIT;
		},
		usersWithMerit() {
			return getUsersWithCompleteMerit(this.usersWithMerits);
		}
	},

	watch: {
		dates() {
			this.fetchUsersWithMerits();
		}
	},

	methods: {
		fetchUsersWithMerits() {
			let q = $.param(this.dates);

			fetch(`/merits/by-user?${q}`, {
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(usersWithMerits => {
				this.usersWithMerits = usersWithMerits;
			}).catch(err => {
				console.error(err);
				this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching merits'
				});
			});
		}
	},

	components: {
		AcademicYearSelector,
		ComponentList
	}
};
</script>

<style scoped>
	.controls-row {
		margin-bottom: 3em;
	}

	.containing-label {
		width: 100%;
	}
</style>
