<template>
	<div ref="modal" class="modal" tabindex="-1" role="dialog"
			aria-labelledby="" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" aria-hidden="true"
							@click="$emit('close')">
						&times;
					</button>
					<slot name="header">

					</slot>
				</div>
				<div class="modal-body">
					<slot></slot>
				</div>
				<div class="modal-footer">
					<slot name="footer">

					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		$(this.$refs.modal).modal({
			backdrop: 'static',
			show: true
		});
	},
	beforeDestroy() {
		$(this.$refs.modal).modal('hide');
	}
};
</script>
