import AlertList from '@/vue-components/AlertList.vue';
import ComponentList from '@/vue-components/ComponentList.vue';
import UserWithMeritReportListItem from '@/vue-components/MeritCompensation/UserWithReportListItem.vue';

import { handleError } from '@/modules/errors.js';
import {
	getFetchHeaders,
	jsonOrThrow,
	isAdmin,
	usesFeature
} from '@/modules/utils.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		meritReportTypes: {
			type: Object,
			required: true
		},
		meritReportTypeForms: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			usersWithReports: null
		};
	},

	computed: {
		currentUserIsAdminOrSupervisor() {
			return isAdmin(this.user) || usesFeature(this.user, 'FACULTY_MERIT');
		}
	},

	methods: {
		fetchUsersWithReports() {
			if (!this.currentUserIsAdminOrSupervisor)
				return;

			fetch('/merits/by-user', {
				method: 'GET',
				headers: getFetchHeaders(),
				credentials: 'same-origin'
			}).then(jsonOrThrow).then(usersWithReports => {
				this.usersWithReports = usersWithReports;
			}).catch(err => {
				handleError(err, this, 'There was a problem fetching users with reports');
			});
		}
	},

	components: {
		AlertList,
		ComponentList,
		UserWithMeritReportListItem
	}
};
