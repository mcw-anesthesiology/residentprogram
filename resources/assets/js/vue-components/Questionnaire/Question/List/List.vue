<template>
	<div class="form-group">
		<fieldset :title="description">
			<legend>
				{{ text }}
			</legend>
			<list-items :ordered="ordered" :items="items" @change="onChange" />
		</fieldset>
		<show-hide-button v-model="show.description">
			description
		</show-hide-button>
		<div v-show="show.description" class="question-description">
			{{ markedUpDescription }}
		</div>
	</div>
</template>

<script>
import ListItems from './Items.vue';
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

export default {
	model: {
		prop: 'items',
		event: 'change'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'checkbox';
			}
		},
		text: {
			type: String
		},
		description: {
			type: String,
			required: false
		},
		items: {
			type: Array,
			required: true
		},
		ordered: {
			type: Boolean,
			default: false
		}
	},
	
	computed: {
		markedUpDescription() {
			return snarkdown(this.description);
		}
	},
	
	methods: {
		onChange(items) {
			this.$emit('change', {items});
		},
		snarkdown
	},
	
	components: {
		ListItems,
		ShowHideButton
	}
};
</script>
