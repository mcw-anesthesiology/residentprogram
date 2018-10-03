<template>
	<section class="evaluation-type-container">
		<aside>
			<span class="type-count">
				{{ evaluations.length }}
				<small>{{ label }}</small>
			</span>
			<show-hide-button v-if="evaluations.length > 0" v-model="showList" class="btn btn-sm btn-info">
				list
			</show-hide-button>
		</aside>
		<div class="list-container" v-if="showList && evaluations.length > 0">
			<evaluation-list :evaluations="evaluations" pageSize="5" />
		</div>
	</section>
</template>

<style scoped>
.evaluation-type-container {
	box-sizing: border-box;
	background-color: #f3f3f3;
}

@supports (display: grid) {

	.evaluation-type-container {
		display: grid;
		grid-template-columns: 1fr;
	}

	@media (min-width: 768px) {

		.evaluation-type-container {
			grid-template-columns: 8em 1fr;
		}
	}
}

aside {
	padding: 1em;
	text-align: center;
}

.list-container {
	padding: 1em 0;
	background-color: #fafafa;
	border: 1px solid #dedede;
}

.list-container :global(.evaluation-list fieldset) {
	margin: 2em;
}

.type-count {
	display: block;
	font-size: 2em;
	text-align: center;
}

.type-count small {
	display: block;
	font-size: 0.5em;
	opacity: 0.75;
}

</style>

<script>

import EvaluationList from '#/EvaluationList.vue';
import ShowHideButton from '#/ShowHideButton.vue';

export default {
	props: {
		evaluations: {
			type: Array,
			required: true
		},
		label: {
			type: String,
			required: true
		},
		show: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			showList: this.show
		};
	},
	computed: {
	},
	components: {
		EvaluationList,
		ShowHideButton
	}
};
</script>
