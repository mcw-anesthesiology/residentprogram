<template>
	<div class="report-status">
		<bootstrap-alert v-if="unsaved" type="warning">
			<p>
				You have unsaved changes
				<button type="button" class="btn btn-info btn-xs unsaved-button" :disabled="saving" @click="$emit('save')">
					{{ saving ? 'Saving...' : 'Save' }}
				</button>
			</p>
		</bootstrap-alert>
		<bootstrap-alert v-else type="success">
			<p>All changes saved successfully</p>
		</bootstrap-alert>
	</div>
</template>

<script>
import BootstrapAlert from '#/BootstrapAlert.vue';

export default {
	props: {
		unsaved: Boolean,
		saving: Boolean,
	},
	components: {
		BootstrapAlert
	}
};
</script>
