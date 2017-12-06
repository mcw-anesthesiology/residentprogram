<template>
	<div v-if="score && score.size > 0" class="panel panel-info">
		<div class="panel-heading">
			<h2 class="panel-title">Score</h2>
		</div>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Category</th>
					<th>Score</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="[category, scoreValue] of Array.from(score.entries())">
					<td>{{ category }}</td>
					<td>{{ scoreValue }}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr class="total-row">
					<th>Total</th>
					<td>{{ totalScore }}</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
import { scoreChecklist } from '@/modules/merits/scoring.js';

export default {
	props: {
		checklist: {
			type: Object,
			required: true
		},
		title: {
			type: String,
			required: false
		}
	},

	computed: {
		score() {
			try {
				return scoreChecklist(this.checklist);
			} catch (err) {
				console.error(err);
			}
		},
		totalScore() {
			if (!this.score)
				return 0;

			return Array.from(this.score.entries())
				.reduce((acc, [_, catScore]) => acc + catScore, 0);
		}
	}
};
</script>

<style scoped>
	.total-row {
		font-size: 1.25em;
	}
</style>
