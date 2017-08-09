<template>
	<div class="user-with-publications-list-item">
		<div class="panel panel-default">
			<div class="panel-body">
				<div class="row">
					<div class="col-sm-4">
						<h2>{{ full_name }}</h2>
						<div class="report-summary">
							<div class="total">
								<small>Publications</small>
								{{ totalFacultyPublications }}
							</div>
						</div>
					</div>
					<div class="col-sm-8">
						<ul class="publication-list">
							<li v-for="[pubType, publications] of facultyPublicationsByType"
									class="publication-list-item">
								<h3 class="publication-title row">
									<span class="publication-type col-sm-10">
										{{ pubType }}
									</span>
									<span class="publication-count col-sm-2 text-right">
										{{ publications.length }}
									</span>
								</h3>
								<ol>
									<li v-for="publication of publications">
										{{ publication.title }}
									</li>
								</ol>
							</li>
						</ul>
						<div class="total-row row">
							<div class="total-cell col-sm-offset-10 col-sm-2 text-right">
								{{ totalFacultyPublications }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getFacultyPublicationsByType } from 'modules/merits/faculty-merit/index.js';

export default {
	props: {
		full_name: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	},
	data() {
		return {

		};
	},

	computed: {
		facultyPublicationsByType() {
			return Array.from(getFacultyPublicationsByType(this.report).entries());
		},
		totalFacultyPublications() {
			// eslint-disable-next-line no-unused-vars
			return this.facultyPublicationsByType.reduce((acc, [_, publications]) =>
				acc + publications.length
			, 0);
		}
	},

	methods: {
		getCsvRow() {
			return [this.full_name].concat(
				// eslint-disable-next-line no-unused-vars
				this.facultyPublicationsByType.map(([_, publications]) =>
					publications.length
				)
			).concat([this.totalFacultyPublications]);
		}
	}
};
</script>

<style scoped>
	.report-summary {
		display: flex;
		justify-content: space-around;
	}

	.total {
		display: block;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		border: 1px solid rgba(0, 0, 0, 0.15);
		margin: 2em 0;
		padding: 2em;
		font-size: 2.5em;
		border-radius: 1px;
	}

	.total small {
		display: block;
		color: rgba(0, 0, 0, 0.35);
		font-size: 0.5em;
	}

	.publication-list {
		margin: 0;
		padding: 0;
	}

	.publication-list-item {
		list-style: none;
		padding: 1em;
	}

	.publication-list-item ol {
		margin-left: 2em;
	}

	.publication-list-item:nth-child(even) {
		background-color: rgba(0, 0, 0, 0.05);
	}

	.publication-title {
		margin: 0 0 0.25em 0;
		font-size: 1.5em;
	}

	.publication-count {
		font-family: monospace;
		padding-right: 1em;
	}

	.total-cell {
		font-family: monospace;
		border-top: 1px solid black;
		font-size: 1.5em;
		padding: 0.75em 1.5em;
	}
</style>
