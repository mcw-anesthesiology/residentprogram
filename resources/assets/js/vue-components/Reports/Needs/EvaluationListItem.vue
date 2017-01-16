<template>
	<li class="evaluation-list-item">
		<div class="row">
			<div class="col-sm-4">
				<img height="50" width="50" alt=""
					:src="user.photo_path || placeholderUserImagePath" />
				<a class="name" :href="`/profile/${user.id}`">
					{{ user.full_name }}
				</a>
			</div>
			
			<div class="col-sm-2">
				{{ renderTrainingLevel(user.training_level) }}
			</div>

			<section class="col-sm-2">
				<b>
					<span>{{ user.subject_evaluations.length }}</span>
					evaluations
				</b>
			</section>

			<div class="col-sm-4 text-right">		
				<show-hide-button class="btn btn-xs btn-info"
						v-if="user.subject_evaluations.length > 0"
						v-model="show.evaluations">
					evaluations
				</show-hide-button>
			</div>
		</div>
		<section class="details" v-show="show.evaluations">
			<h4>Evaluations</h4>
			<ul class="list-group">
				<evaluation-details-list-item v-for="eval of user.subject_evaluations"
				 	:evaluation="eval" />
			</ul>
		</section>
	</li>
</template>

<script>
import EvaluationDetailsListItem from './EvaluationDetailsListItem.vue';
import ShowHideButton from '../../ShowHideButton.vue';

import { renderTrainingLevel } from '../../../modules/datatable-utils.js';
import { PLACEHOLDER_USER_IMAGE_PATH } from '../../../modules/constants.js';

export default {
	props: {
		user: {
			type: Object,
			required: true
		},
		placeholderUserImagePath: {
			type: String,
			default: PLACEHOLDER_USER_IMAGE_PATH
		}
	},
	data(){
		return {
			show: {
				evaluations: false
			}
		};
	},
	methods: {
		renderTrainingLevel
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

.evaluation-list-item:nth-child(even){
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
