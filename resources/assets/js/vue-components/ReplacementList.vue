<template>
	<aside>
		<show-hide-button v-model="show.replacements"
				class="btn btn-default btn-xs">
			Replacements:
		</show-hide-button>
		<ul v-show="show.replacements">
			<li v-for="replacement of replacements">
				[[{{ replacement }}]]
			</li>
		</ul>
	</aside>
</template>

<script>
import ShowHideButton from './ShowHideButton.vue';

export default {
	props: {
		replacements: {
			type: Array,
			required: true
		}
	},
	data(){
		return {
			show: {
				replacements: false
			}
		};
	},
	components: {
		ShowHideButton
	}
};
</script>

<style scoped>
	.btn {
		margin-top: 1px;
	}

	aside {
		font-size: 0.8em;
	}
</style>
