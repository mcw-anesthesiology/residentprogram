<template>
	<div v-show="showLists" class="milestone-competency-question-lists row">
		<div v-for="(group, groupName) of groups" class="col-sm-6">
			<div class="panel panel-info milestones-panel">
				<div class="panel-heading">
					<h4 class="panel-title">
						{{ ucfirst(groupName) }}
					</h4>
					<show-hide-button class="description-button btn btn-info btn-xs"
							v-model="showDescriptions[groupName]">
						descriptions
					</show-hide-button>
				</div>
				<ul class="list-group">
					<li v-for="item of group" class="list-group-item">
						<b>{{item.title}}</b>
						<span v-show="showDescriptions[groupName]">
							— {{ item.description }}
						</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import ShowHideButton from './ShowHideButton.vue';

import { ucfirst } from '@/modules/utils.js';

export default {
	props: [
		'milestones',
		'competencies'
	],
	computed: {
		groups(){
			return {
				'milestones': this.milestones,
				'competencies': this.competencies
			};
		}
	},
	data(){
		return {
			showLists: false,
			showDescriptions: {
				milestones: false,
				competencies: false
			}
		};
	},
	methods: {
		toggleLists(){
			this.showLists = !this.showLists;
		},
		toggleDescriptions(type){
			if(this.showDescriptions.hasOwnProperty(type))
				this.showDescriptions[type] = !this.showDescriptions[type];
		},
		ucfirst(str){
			return ucfirst(str);
		}
	},
	components: {
		ShowHideButton
	}
};
</script>

<style scoped>
	.milestone-competency-question-lists {
		margin-top: 10px;
		text-align: left;
	}

	.milestone-competency-question-lists .panel-heading {
		position: relative;
	}

	.description-button {
		position: absolute;
		top: 8px;
		right: 10px;
	}
</style>
