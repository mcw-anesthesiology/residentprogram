<template>
	<li class="questionnaire-list-item">
		<div class="item-controls">
			<confirmation-button v-if="!readonly" class="btn btn-sm"
					unpressed-class="btn-danger"
					pressed-class="btn-warning"
					@click="$emit('remove')">
				<span class="glyphicon glyphicon-remove"></span>
				Remove item
			</confirmation-button>
		</div>
		<div class="item-contents">
			<slot></slot>
		</div>
	</li>
</template>

<script>
import ConfirmationButton from 'vue-components/ConfirmationButton.vue';

export default {
	props: {
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		ConfirmationButton
	}
};
</script>

<style scoped>
	li {
		display: flex;
		flex-wrap: wrap;
	}

	.item-controls {
		flex-shrink: 0;
		padding: 1em 1em 1em 0;
	}

	.item-contents {
		flex-grow: 1;
	}
</style>

<style>
	.questionnaire-list-item {
		margin-bottom: 1em;
	}
</style>
