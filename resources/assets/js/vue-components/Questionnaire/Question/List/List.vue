<template>
	<div class="form-group">
		<fieldset :title="description">
			<legend v-if="text || (fixedLength == null && itemCount)">
				{{ text }}
				{{ text && itemCount != null ? '-' : '' }}
				<span v-if="!previewing && fixedLength == null">
					{{ itemCount }}
					{{ itemCount === 1 ? 'item' : 'items' }}
				</span>
			</legend>

			<bootstrap-alert v-if="!readonly && required && items.length === 0"
				class="invalid-container"
				type="error"
				text="Please add at least one item">
			</bootstrap-alert>

			<div v-if="previewing" class="previewing-info-container">
				<div v-if="scoring" class="panel panel-default">
					<div class="panel-heading">
						<span class="panel-title">
							Scoring information
						</span>
					</div>
					<table class="table">
						<tbody>
							<tr v-for="(val, key) of scoring">
								<th>{{ ucfirst(key) }}</th>
								<td>{{ val }}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<list-items :ordered="ordered"
				:items="items"
				:suggestions="suggestions"
				:readonly="readonly"
				:prop-labels="itemLabels"
				:props-required="itemRequired"
				:props-readonly="propsReadonly"
				:show-errors="showErrors"
				:help-class="helpClass"
				:items-removable="canEditItems"
				@change="onChange" />

			<button v-if="canEditItems" type="button" class="btn btn-sm btn-info"
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
import BootstrapAlert from '@/vue-components/BootstrapAlert.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';

import snarkdown from 'snarkdown';

import { ucfirst } from '@/modules/utils.js';

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
					'editorialBoard',
					'review',
					'lecture',
					'audienceLecture',
					'mentorship',
					'subjectMentorship',
					'datedEvent'
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
		itemLabels: {
			type: Object,
			required: false
		},
		itemRequired: {
			type: Object,
			required: false
		},
		suggestions: {
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
		fixedLength: {
			type: Number,
			required: false
		},
		required: {
			type: Boolean,
			default: false
		},
		readonly: {
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
		previewing: {
			type: Boolean,
			default: false
		},
		scoring: {
			type: Object,
			required: false
		}
	},
	data() {
		return {
			show: {
				description: false
			}
		};
	},

	mounted() {
		this.ensureFixedLength();
	},

	computed: {
		itemCount() {
			return this.items.length;
		},
		markedUpDescription() {
			if (this.description)
				return snarkdown(this.description);
		},
		propsReadonly() {
			const propsReadonly = {};

			if (this.itemProps) {
				for (const prop of Object.keys(this.itemProps)) {
					propsReadonly[prop] = true;
				}
			}

			return propsReadonly;
		},
		canEditItems() {
			return !this.readonly && this.fixedLength == null;
		}
	},

	methods: {
		ucfirst,
		ensureFixedLength() {
			if (this.fixedLength == null)
				return;

			if (this.itemCount > this.fixedLength) {
				let items = Array.slice(this.items);
				while (this.itemCount > this.fixedLength) {
					items.pop();
				}
				this.$emit('input', {items});
			} else if (this.itemCount < this.fixedLength) {
				let newItems = [];
				for (let i = 0; i < (this.fixedLength - this.itemCount); i++) {
					newItems.push(this.getNewItem());
				}
				this.addItems(newItems);
			}
		},
		addItem() {
			if (!this.canEditItems)
				return;

			this.addItems([this.getNewItem()]);
		},
		addItems(newItems) {
			if (this.readonly)
				return;

			let items = Array.slice(this.items);
			items.push(...newItems);

			this.$emit('input', {items});
		},
		getNewItem() {
			const newItem = {
				type: this.listType
			};

			if (this.itemProps) {
				Object.assign(newItem, this.itemProps);
			}

			return newItem;
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

<style>
	.previewing-info-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
