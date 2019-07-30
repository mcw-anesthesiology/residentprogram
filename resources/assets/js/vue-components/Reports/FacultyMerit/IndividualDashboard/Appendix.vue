<template>
	<section class="dashboard-appendix container body-block">
		<h2>Appendix</h2>

		<div class="lists-container">
			<publications-list :publications="publications" />
			<section>
				<h3>Grants</h3>
				<ol v-if="grants.length > 0">
					<li v-for="grant of grants" :key="grant.project">
						{{ grant.project }}
					</li>
				</ol>
				<p v-else class="no-items">
					<i>None listed</i>
				</p>
			</section>
			<section>
				<h3>Studies</h3>
				<ol v-if="studies.length > 0">
					<li v-for="study of studies" :key="study.title">
						{{ study.title }} — {{ study.role }}
					</li>
				</ol>
				<p v-else class="no-items">
					<i>None listed</i>
				</p>
			</section>
			<section>
				<h3>Lectures</h3>
				<ol v-if="lectures.length > 0">
					<li v-for="lecture of lectures" :key="lecture.title">
						{{ lecture.title }} <rich-date :date="lecture.date" />
					</li>
				</ol>
				<p v-else class="no-items">
					<i>None listed</i>
				</p>
			</section>
		</div>
	</section>
</template>

<script>
/** @format */

import PublicationsList from './Publications.vue';
import RichDate from '#/RichDate.vue';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		periods: {
			type: Set,
			required: false
		}
	},
	computed: {
		publications() {
			return this.getReportsList('publications');
		},
		grants() {
			return this.getReportsList('grants');
		},
		lectures() {
			return this.getReportsList('lectures');
		},
		studies() {
			return this.getReportsList('studies');
		}
	},
	methods: {
		getReportsList(prop) {
			return this.user.meritReports.flatMap(mr => mr[prop]);
		}
	},
	components: {
		PublicationsList,
		RichDate
	}
};
</script>

<style scoped>
.dashboard-appendix {
	page-break-before: always;
}

h3 {
	color: var(--mcw-anesth-dark-green);
}

.lists-container {
	display: flex;
	flex-wrap: wrap;
}

.lists-container >>> section {
	flex-basis: 50%;
}

.no-items {
	color: rgba(0, 0, 0, 0.5);
}

ol {
	padding-left: 1em;
}

@supports (display: grid) {
	.lists-container {
		display: grid;
		grid-gap: 1em;
		grid-template-columns: 1fr 1fr;
	}
}
</style>
