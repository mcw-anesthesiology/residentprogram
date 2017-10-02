<template>
	<a ref="container"
			href="#"
			tabindex="0"
			class="btn btn-default"
			@click="handleClick">
		<slot></slot>
	</a>
</template>

<script>
export default {
	props: {
		content: {
			type: [ String, Function ],
			require: true
		},
		animation: {
			type: Boolean,
			default: true
		},
		container: {
			type: [ String, Boolean ],
			default: false
		},
		delay: {
			type: [ Number, Object ],
			default: 0
		},
		html: {
			type: Boolean,
			default: false
		},
		placement: {
			type: [ String, Function ],
			default: 'auto top'
		},
		template: {
			type: String,
			required: false
		},
		trigger: {
			type: String,
			default: 'focus'
		}
	},

	mounted() {
		$(this.$refs.container).popover({
			animation: this.animation,
			container: this.container,
			delay: this.delay,
			html: this.html,
			placement: this.placement,
			template: this.template,
			trigger: this.trigger,
			content: this.content
		});
	},

	methods: {
		handleClick(event) {
			event.preventDefault();
			this.$emit('click');
		}
	},

	destroy() {
		$(this.$refs.container).popover('destroy');
	}
};
</script>
