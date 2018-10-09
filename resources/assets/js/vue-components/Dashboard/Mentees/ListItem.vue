<template>
	<div class="mentee-list-item list-group-item">
		<section class="mentee-details">
			<img v-if="photo_path" :src="photo_path" alt="" height="100" />
			<div class="mentee-info">
				<h3>{{ full_name }}</h3>
				<span v-if="trainingLevel" class="training-level">{{ trainingLevel }}</span>
				<span v-if="secondaryTrainingLevel" class="secondary-training-level">
					{{ secondaryTrainingLevel }}
				</span>
			</div>
			<div class="highlight-card">
				<span>{{ evaluations.length }}</span>
				<small>
					{{ evaluations.length === 1 ? 'evaluation' : 'evaluations' }}
					in selected range
				</small>
				<ShowHideButton v-if="evaluations" class="btn btn-sm btn-info" v-model="showEvaluations">
					evaluations
				</ShowHideButton>
			</div>
		</section>


		<div v-if="showEvaluations" class="evaluation-list-container">
			<evaluation-list v-if="evaluations" :evaluations="evaluations" />
		</div>
	</div>
</template>

<style scoped>
.mentee-list-item{
	padding: 1em;
}

.mentee-details {
	display: flex;
	flex-wrap: wrap;
}

.mentee-info {

}

.mentee-details .highlight-card {
	font-size: 1.25em;
	padding: 0.5em 1em;
	text-align: center;
}

h3 {
	margin-top: 0;
}

small {
	display: block;
	font-size: 0.8em;
	color: rgba(0, 0, 0, 0.65);
}

.mentee-details span {
	display: block;
}

.evaluation-list-container {
	margin-top: 1em;
	padding: 1em;
	border: 1px solid #ddd;
	border-radius: 2px;
	background-color: #fdfdfd;
}

@supports (display: grid) {
	.mentee-details {
		display: grid;
		grid-template-columns: 100px repeat(auto-fit, minmax(200px, 1fr));
		grid-template-rows: 100px;
		grid-gap: 1em;
	}
}

@media (min-width: 600px) {
	.evaluation-list-container {
		padding: 2em;
	}
}
</style>

<script>
import EvaluationList from '#/EvaluationList.vue';
import ShowHideButton from '#/ShowHideButton.vue';

import { renderTrainingLevel, renderSecondaryTrainingLevel } from '@/modules/datatable-utils.js';

export default {
	props: {
		full_name: {
			type: String,
			required: true
		},
		photo_path: {
			type: String,
			required: false
		},
		training_level: {
			type: String,
			required: false
		},
		secondary_training_level: {
			type: String,
			required: false
		},
		evaluations: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			showEvaluations: false
		};
	},
	computed: {
		trainingLevel() {
			if (!this.training_level)
				return;

			return renderTrainingLevel(this.training_level);
		},
		secondaryTrainingLevel() {
			if (!this.secondary_training_level)
				return;

			return renderSecondaryTrainingLevel(this.secondary_training_level);
		}
	},
	components: {
		EvaluationList,
		ShowHideButton
	}
};
</script>
