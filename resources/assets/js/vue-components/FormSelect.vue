<template>
	<select-two :options="options" :value="value" @input="handleInput"></select-two>
</template>

<script>
import gql from 'graphql-tag';

import SelectTwo from './SelectTwo.vue';

import { ucfirst } from '@/modules/text-utils.js';

export default {
	props: {
		value: {
			type: [String, Number]
		}
	},
	data() {
		return {
			formGroups: []
		};
	},
	apollo: {
		formGroups: gql`
			query FormSelect {
				formGroups {
					type
					forms {
						id
						title
					}
				}
			}
		`
	},
	computed: {
		options() {
			return this.formGroups.map(group => ({
				text: ucfirst(group.type),
				children: group.forms.map(form => ({
					id: form.id,
					text: form.title
				}))
			}));
		}
	},
	methods: {
		handleInput(value) {
			this.$emit('input', value);
		}
	},
	components: {
		SelectTwo
	}
};
</script>
