<template>
	<section class="dashboard-appendix container body-block">
		<h2>Appendix</h2>

		<div class="lists-container">
			<publications-list :publications="publications" />
			<section>
				<h3>Grants</h3>
				<p v-if="grants.length === 0">No grants listed.</p>
				<ol v-else>
					<li v-for="grant of grants" :key="grant.project">
						{{ grant.project }}
					</li>
				</ol>
			</section>
			<section>
				<h3>Studies</h3>
				<p v-if="studies.length === 0">No studies listed.</p>
				<ol v-else>
					<li v-for="study of studies" :key="study.title">
						{{ study.title }} — {{ study.role }}
					</li>
				</ol>
			</section>
			<section>
				<h3>Lectures</h3>
				<p v-if="lectures.length === 0">No studies listed.</p>
				<ol v-else>
					<li v-for="lecture of lectures" :key="lecture.title">
						{{ lecture.title }} <rich-date :date="lecture.date" />
					</li>
				</ol>
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

.lists-container {
	display: flex;
	flex-wrap: wrap;
}

.lists-container >>> section {
	flex-basis: 50%;
}

@supports (display: grid) {
	.lists-container {
		display: grid;
		grid-gap: 1em;
		grid-template-columns: 1fr 1fr;
	}
}
</style>
