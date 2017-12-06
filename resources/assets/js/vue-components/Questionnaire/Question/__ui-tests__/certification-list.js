import ListQuestion from '../List/List.vue';
import props from './questions/certification-list.json';

export default {
	data() {
		return {
			props,
			showErrors: false
		};
	},
	template: `
		<div class="container body-block">
			<list-question v-bind="props"
				:show-errors="showErrors"
				@input="handleInput" />
		</div>
	`,
	methods: {
		handleInput(changes) {
			this.props = Object.assign({}, this.props, changes);
		}
	},
	components: {
		ListQuestion
	}
};
