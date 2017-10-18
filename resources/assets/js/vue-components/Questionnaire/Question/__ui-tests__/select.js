import SelectQuestion from '../Select.vue';
import ShowHideButton from '@/vue-components/ShowHideButton.vue';
import props from './questions/select.json';

export default {
	data() {
		return {
			props,
			showErrors: false
		};
	},
	template: `
		<div class="container body-block">
			<div>
				<show-hide-button class="btn-default" v-model="showErrors">
					Errors
				</show-hide-button>
			</div>
			<div>
				<select-question v-bind="props"
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
		SelectQuestion,
		ShowHideButton
	}
};
