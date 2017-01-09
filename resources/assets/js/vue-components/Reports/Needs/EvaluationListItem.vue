<template>
	<li class="evaluation-list-item">
		<div class="main">
			<input type="checkbox" :value="user.id" />
			<img v-if="user.photo_path" height="150" width="100" :src="user.photo_path" alt="" />
			<a :href="`/profile/${user.id}`">{{ user.full_name }}</a>

			<section>
				<span>{{ user.subject_evaluations.length }}</span>
				Evaluations
				<button type="button" class="btn btn-xs btn-info"
						v-if="user.subject_evaluations.length > 0"
						@click="show.evaluations = !show.evaluations">
					Show evaluations
				</button>
			</section>

			<button type="button" class="btn btn-xs">
				Send reminder
			</button>
		</div>
		<section class="details well" v-show="show.evaluations">
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

export default {
	props: {
		user: Object
	},
	data(){
		return {
			show: {
				evaluations: false
			}
		};
	},
	components: {
		EvaluationDetailsListItem
	}
};
</script>

<style scoped>
.evaluation-list-item {
	border-bottom: 1px solid grey;
}

.evaluation-list-item .main section {
	display: inline-block;
}

.evaluation-list-item .details {

}
</style>
