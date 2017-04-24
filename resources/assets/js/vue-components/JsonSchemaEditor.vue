<template>
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="row">
				<div class="col-md-6">
					<div class="json-container">
						<textarea class="input-json form-control"
							v-model="newJson"></textarea>
					</div>
					
					<show-hide-button v-model="show.schema">
						schema
					</show-hide-button>
					<div v-if="show.schema" class="json-container">
						<textarea class="schema-json form-control"
							readonly :value="schema"></textarea>
					</div>
				</div>
				<div class="col-md-6">
					<div class="json-container">
						<textarea class="previous-json form-control"
							readonly :value="oldJson"></textarea>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ShowHideButton from 'vue-components/ShowHideButton.vue';

import Ajv from 'ajv';

const ajv = new Ajv();

export default {
	props: {
		schemaUrl: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			newJson: null,
			oldJson: null,
			schema: null,
			show: {
				schema: false
			}
		};
	},
	
	mounted() {
		fetch(this.schemaUrl).then(response => {
			if (response.ok)
				return response.text();
				
			throw new Error(response.statusText);
		}).then(schema => {
			this.schema = schema;
			this.schemaValidator = ajv.compile(JSON.parse(schema));
		}).catch(err => {
			console.error(err);
			// TODO: Show alert
		});
	},
	
	computed: {
		schemaErrors() {
			return this.schemaValidator.errors;
		}
	},
	
	methods: {
		isSchemaValid(merit) {
			if (this.schemaValidator)
				return this.schemaValidator(merit);
				
			return false;
		}
	},
	
	components: {
		ShowHideButton
	}
};
</script>

<style scoped>
	textarea {
		width: 100%;
		height: 400px;
		font-family: monospace;
		white-space: pre;
	}
</style>
