<template>
	<li class="questionnaire-list-item">
		<div class="item-controls">
			<confirmation-button v-if="canRemove" class="btn btn-sm"
					unpressed-class="btn-warning"
					pressed-class="btn-danger"
					@click="removeItem">
				<span class="glyphicon glyphicon-remove"></span>
				Remove item
			</confirmation-button>
			<div v-if="showErrors && invalid" class="invalid-container">
				<span class="glyphicon glyphicon-warning-sign"></span>
			</div>
		</div>
		<div class="item-contents">
			<slot></slot>
		</div>
	</li>
</template>

<script>
import ConfirmationButton from '@/vue-components/ConfirmationButton.vue';
import ValidatedFormGroup from '@/vue-components/ValidatedFormGroup.vue';

export default {
	props: {
		readonly: {
			type: Boolean,
			default: false
		},
		propsReadonly: {
			type: Object,
			default() {
				return {};
			}
		},
		propsRequired: {
			type: Object,
			required: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		helpClass: {
			type: String,
			required: false
		},
		removable: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		canRemove() {
			return !this.readonly && this.removable;
		}
	},

	methods: {
		removeItem() {
			if (!this.canRemove)
				return;

			this.$emit('remove');
		},
		isReadonly(prop) {
			return this.readonly || this.propsReadonly[prop];
		}
	},

	components: {
		ConfirmationButton,
		ValidatedFormGroup
	}
};
</script>

<style scoped>
	li {
		position: relative;
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

	.invalid-container .glyphicon {
		position: absolute;
		left: 100%;
		transform: translateX(50%);
		padding: 1em;
		color: #d9534f;
		font-size: 2em;
	}
</style>

<style>
	.questionnaire-list-item {
		margin-bottom: 1em;
	}
</style>
