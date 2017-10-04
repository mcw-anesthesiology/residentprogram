<template>
	<div>
		<div v-for="[category, scoreValue] of score.entries()">
			{{ category }}: {{ scoreValue }}
		</div>
	</div>
</template>

<script>
import { scoreChecklist } from 'modules/merits/scoring.js';

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
			return scoreChecklist(this.checklist);
		}
	}
};
</script>
