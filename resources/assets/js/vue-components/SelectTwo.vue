<template>
	<select v-bind:multiple="multiple">
		<slot></slot>
	</select>
</template>

<script>
export default {
	props: {
		'options': {
			type: Array,
			required: true
		},
		'value': {
			required: true
		},
		'multiple': {
			type: Boolean,
			default: false
		}
	},
	computed: {
		stringOptions(){
			let options = this.options.slice();
			for(let option of options){
				if(option.id)
					option.id = option.id.toString();
				if(option.children){
					for(let child of option.children){
						if(child.id)
							child.id = child.id.toString();
					}
				}
			}

			return options;
		},
		stringValue(){
			if(Array.isArray(this.value)){
				return this.value.slice().map(value => value.toString());
			}
			else {
				return this.value.toString();
			}
		}
	},
	mounted(){
		$(this.$el).on('change', () => {
			this.$emit('input', $(this.$el).val());
		});

		if(this.stringOptions && this.stringOptions.length > 0){
			$(this.$el).select2({
				data: this.stringOptions,
				tags: this.multiple,
				createTag: () => undefined
			}).val(this.stringValue).trigger('change.select2');
		}
	},
	watch: {
		stringValue(stringValue){
			$(this.$el).val(stringValue).trigger('change.select2');
		},
		stringOptions(stringOptions){
			$(this.$el).select2({
				data: stringOptions,
				tags: this.multiple,
				createTag: () => undefined
			}).val(this.stringValue).trigger('change.select2');
		}
	},
	destroyed(){
		$(this.$el).off().select2('destroy');
	}
};
</script>
