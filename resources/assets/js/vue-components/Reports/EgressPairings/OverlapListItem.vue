<template>
	<div>
		<p>
			{{ user.full_name }}
		</p>
		<ol>
			<li v-for="pairing of overlap.pairings" class="row">
				<div class="col-sm-6">
					<span>
						{{ pairing[subjectType].full_name }}
					</span>
				</div>
				<div class="col-sm-3">
					<span>
						{{ pairing.numCases }} cases
					</span>
				</div>
				<div class="col-sm-3">
					<php-date-interval :value="pairing.totalTime" />
				</div>
			</li>
		</ol>
	</div>
</template>

<script>
import PhpDateInterval from '@/vue-components/PhpDateInterval.vue';

export default {
	props: {
		overlap: {
			type: Object,
			required: true
		},
		userType: {
			type: String,
			default: 'faculty'
		},
		subjectType: {
			type: String,
			default: 'resident'
		}
	},

	computed: {
		user() {
			return this.overlap[this.userType];
		}
	},

	components: {
		PhpDateInterval
	}
};
</script>
