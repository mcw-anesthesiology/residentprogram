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
		<div class="list-container">
			<evaluation-list v-if="showList && evaluations.length > 0" :evaluations="evaluations" pageSize="5" />
		</div>
	</section>
</template>

<style scoped>
	.evaluation-type-container {
		box-sizing: border-box;
		background-color: #f3f3f3;
	}

	aside {
		padding: 1em;
		text-align: center;
	}

	.list-container {
		padding: 1em 0;
		background-color: #fafafa;
		border-color: #dedede;
		border-style: solid;
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

	@supports (display: grid) {

		.evaluation-type-container {
			display: grid;
			grid-template-columns: 1fr;
		}

		.list-container {
			border-width: 1px 0 0;
		}

		@media (min-width: 768px) {

			.evaluation-type-container {
				grid-template-columns: 8em 1fr;
			}

			.list-container {
				border-width: 0 0 0 1px;
			}
		}
	}
</style>

<script>

import EvaluationList from '#/EvaluationList.vue';
import ShowHideButton from '#/ShowHideButton.vue';

const DESKTOP_BREAKPOINT = 768;

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
			default() {
				return window.innerWidth >= DESKTOP_BREAKPOINT;
			}
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
