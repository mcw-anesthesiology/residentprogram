import ListQuestion from '../List/List.vue';
import props from './questions/dated-event-list.json';

export default {
	data() {
		return {
			props
		};
	},
	template: `
		<div class="container body-block">
			<div>
				<list-question v-bind="props"
					:show-errors="showErrors"
					@input="handleInput" />
			</div>
		</div>
	`,
	methods: {
		handleInput(changes) {
			this.props = Object.assign({}, props, changes);
		}
	},
	components: {
		ListQuestion
	}
};
