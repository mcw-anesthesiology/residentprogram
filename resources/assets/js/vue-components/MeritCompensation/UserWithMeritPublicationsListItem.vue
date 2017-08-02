<template>
	<div class="user-with-publications-list-item">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-2">
						<h3>{{ full_name }}</h3>
					</div>
					<div class="col-sm-10">
						<span class="total">
							{{ totalFacultyPublications }}
						</span>
						<ul>
							<li v-for="[pubType, publications] of facultyPublicationsByType">
								<div class="panel panel-default">
									<div class="panel-heading">
										<span class="panel-title">
											{{ pubType }}
										</span>
										{{ publications.length }}
									</div>
									<div class="panel-body">
										<ol>
											<li v-for="publication of publications">
												{{ publication.title }}
											</li>
										</ol>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';

import { getFacultyPublicationsByType } from 'modules/merits/faculty-merit.js';

export default {
	props: {
		full_name: {
			type: String,
			required: true
		},
		merit_reports: {
			type: Array,
			required: true
		}
	},
	data() {
		return {

		};
	},

	computed: {
		mostRecentCompleteReport() {
			if (!this.merit_reports || this.merit_reports.length < 1)
				return;

			let mostRecent = null;

			for (let meritReport of this.merit_reports) {
				if (
					meritReport.status === 'complete'
					&& (
						mostRecent == null
						|| moment(meritReport.period_end) >= moment(mostRecent.period_end)
					)
				)
					mostRecent = meritReport;
			}

			return mostRecent;
		},
		facultyPublicationsByType() {
			return Array.from(getFacultyPublicationsByType(this.mostRecentCompleteReport).entries());
		},
		totalFacultyPublications() {
			// eslint-disable-next-line no-unused-vars
			return this.facultyPublicationsByType.reduce((acc, [pubType, publications]) =>
				acc + publications.length
			, 0);
		}
	}
};
</script>

<style scoped>
	.total {
		font-size: 1.5em;
	}
</style>
