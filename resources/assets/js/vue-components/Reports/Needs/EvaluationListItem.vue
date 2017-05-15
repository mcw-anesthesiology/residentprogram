<template>
	<li class="evaluation-list-item">
		<div class="row">
			<div class="col-sm-4">
				<img height="50" width="50" alt=""
					:src="user.photo_path || placeholderUserImagePath" />
				<a class="name" :href="`/profile/${user.id}`" target="_blank">
					{{ user.full_name }}
				</a>
			</div>

			<div class="col-sm-2">
				{{
					user.type === 'resident'
						? renderTrainingLevel(user.training_level)
						: ucfirst(user.type)
				}}
			</div>

			<section v-if="user.type === 'resident'" class="col-sm-2">
				<div>
					<b>
						{{ completeEvals.length }}
						complete evaluations
					</b>
				</div>
				<div>
					{{ pendingEvals.length }}
					pending evaluations
				</div>
			</section>
			<section v-else class="col-sm-2">
				<div>
					<b>
						{{ pendingEvals.length }}
						pending evaluations
					</b>
				</div>
				<div>
					{{ completeEvals.length }}
					complete evaluations
				</div>
			</section>

			<div class="col-sm-4 text-right">
				<show-hide-button class="btn btn-xs btn-info"
						v-if="user[evals].length > 0"
						v-model="show.evaluations">
					evaluations
				</show-hide-button>
			</div>
		</div>
		<section class="details" v-show="show.evaluations">
			<h4>Evaluations</h4>
			<label>
				<input type="checkbox" v-model="show.canceled" />
				Show disabled and canceled
			</label>
			<ul class="list-group">
				<evaluation-details-list-item v-for="detailsEval of detailsEvals"
				 	:evaluation="detailsEval" />
			</ul>
		</section>
	</li>
</template>

<script>
import EvaluationDetailsListItem from './EvaluationDetailsListItem.vue';
import ShowHideButton from '../../ShowHideButton.vue';

import { PLACEHOLDER_USER_IMAGE_PATH } from 'modules/constants.js';
import { ucfirst } from 'modules/utils.js';
import { renderTrainingLevel } from 'modules/datatable-utils.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		evals: {
			type: String,
			default: 'subject_evaluations'
		},
		placeholderUserImagePath: {
			type: String,
			default: PLACEHOLDER_USER_IMAGE_PATH
		}
	},
	data(){
		return {
			show: {
				evaluations: false,
				canceled: false
			}
		};
	},
	computed: {
		completeEvals(){
			return this.user[this.evals]
				.filter(evaluation => evaluation.status === 'complete');
		},
		pendingEvals(){
			return this.user[this.evals]
				.filter(evaluation => evaluation.status === 'pending');
		},
		detailsEvals(){
			return this.show.canceled
				? this.user[this.evals]
				: this.user[this.evals]
					.filter(evaluation =>
						['complete', 'pending'].includes(evaluation.status));
		}
	},
	methods: {
		renderTrainingLevel,
		ucfirst
	},
	components: {
		EvaluationDetailsListItem,
		ShowHideButton
	}
};
</script>

<style scoped>
.evaluation-list-item {
	border-bottom: 1px solid rgba(0, 0, 0, 0.25);
	padding: 5px 0;
}

.evaluation-list-item:nth-child(even) {
	background-color: rgba(0, 0, 0, 0.05);
}

.evaluation-list-item .row {
	margin: 0;
}

.name {
	font-size: 1.15em;
}

.evaluation-list-item div section {
	display: inline-block;
}

.evaluation-list-item .details {
	padding: 10px 20px 0;
}

img {
	border-radius: 100%;
	object-fit: cover;
	object-position: center;
}
</style>
