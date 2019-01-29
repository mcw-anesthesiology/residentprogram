export default {
	data() {
		return {
			highlighted: false
		};
	},
	watch: {
		value(value) {
			if (value != null) {
				this.highlighted = false;
			}
		}
	},
	methods: {
		highlight(scrollIntoView = true) {
			this.highlighted = true;
			if (scrollIntoView) {
				this.$el.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}
};
