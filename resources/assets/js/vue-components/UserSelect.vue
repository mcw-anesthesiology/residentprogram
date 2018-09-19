<template>
	<select-two v-if="groupedUsers && groupedUsers.length > 0"
		class="form-control"
		:options="groupedUsers"
		:name="name"
		:value="value"
		:multiple="multiple"
		:readonly="readonly"
		@input="handleInput"></select-two>
</template>

<script>
import { mapGetters } from 'vuex';

import SelectTwo from '@/vue-components/SelectTwo.vue';

import { logError } from '@/modules/errors.js';

export default {
	props: [
		'value',
		'name',
		'multiple',
		'readonly'
	],
	mounted() {
		this.$store.dispatch('users/fetch').catch(err => {
			logError(err, 'There was a problem fetching users');
		});
	},
	computed: mapGetters('users', [
		'groupedUsers'
	]),
	methods: {
		handleInput(...args) {
			this.$emit('input', ...args);
		}
	},
	components: {
		SelectTwo
	}
};
</script>
