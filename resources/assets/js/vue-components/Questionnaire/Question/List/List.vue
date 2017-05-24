<template>
	<div class="form-group">
		<fieldset :title="description">
			<legend v-if="text || itemCount">
				{{ text }}
				{{ text && itemCount != null ? '-' : '' }}
				<span>
					{{ itemCount }}
					{{ itemCount === 1 ? 'item' : 'items' }}
				</span>
			</legend>

			<bootstrap-alert v-if="items.length === 0"
				type="warning" text="Please add at least one item">
			</bootstrap-alert>

			<list-items :ordered="ordered" :items="items" @change="onChange"
				:readonly="readonly"/>

			<button v-if="!readonly" type="button" class="btn btn-sm btn-info"
					@click="addItem">
				<span class="glyphicon glyphicon-plus"></span>
				Add item
			</button>
		</fieldset>
		<show-hide-button v-if="description" v-model="show.description">
			description
		</show-hide-button>
		<div v-if="description" v-show="show.description"
			v-html="markedUpDescription">
		</div>
	</div>
</template>

<script>
import ListItems from './Items.vue';
import BootstrapAlert from 'vue-components/BootstrapAlert.vue';
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

export default {
	model: {
		prop: 'items'
	},
	props: {
		type: {
			type: String,
			required: true,
			validator(type) {
				return type === 'list';
			}
		},
		listType: {
			type: String,
			required: true,
			validator(type) {
				return [
					'text',
					'publication',
					'committee',
					'study',
					'grant',
					'grantOther',
					'certification',
					'editorialBoard'
				].includes(type);
			}
		},
		text: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		itemProps: {
			type: Object,
			required: false
		},
		items: {
			type: Array,
			default() {
				return [];
			}
		},
		ordered: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			show: {
				description: false
			}
		};
	},

	computed: {
		itemCount() {
			return this.items.length;
		},
		markedUpDescription() {
			if (this.description)
				return snarkdown(this.description);
		}
	},

	methods: {
		addItem() {
			if (this.readonly)
				return;

			let items = Array.slice(this.items);

			const newItem = {
				type: this.listType
			};

			if (this.itemProps) {
				Object.assign(newItem, this.itemProps);
			}

			items.push(newItem);

			this.$emit('input', {items});
		},
		onChange(items) {
			if (this.readonly)
				return;

			this.$emit('input', {items});
		},
		snarkdown
	},

	components: {
		ListItems,
		BootstrapAlert,
		ShowHideButton
	}
};
</script>
