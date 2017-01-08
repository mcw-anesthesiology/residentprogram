<template>
	<select :name="name" :id="id" :required="required" v-bind:multiple="multiple">
		<slot></slot>
		<template v-for="option of stringOptions">
			<optgroup v-if="option.children && option.children.length > 0"
					:label="option.text">
				<option v-for="child of option.children" :value="child.id">
					{{ child.text }}
				</option>
			</optgroup>
			<option v-else-if="option.id" :value="option.id">
				{{ option.text }}
			</option>
		</template>
	</select>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		value: {
			required: true
		},
		multiple: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: 'Please select'
		}
	},
	computed: {
		stringOptions(){
			if(!this.options)
				return [];

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
			if(!this.value)
				return '';

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

		$(this.$el).val(this.stringValue).select2({
			placeholder: this.placeholder,
			tags: this.multiple,
			createTag: () => undefined
		});
	},
	beforeUpdate(){
		$(this.$el).select2('destroy');
	},
	updated(){
		$(this.$el).val(this.stringValue).select2({
			placeholder: this.placeholder,
			tags: this.multiple,
			createTag: () => undefined
		});
	},
	watch: {
		multiple(multiple){
			if(this.value){
				if(multiple && !Array.isArray(this.value))
					this.$emit('input', [this.value]);
				else if(!multiple && Array.isArray(this.value))
					this.$emit('input', this.value[0]);
			}
		},
		stringValue(stringValue){
			$(this.$el).val(stringValue).trigger('change.select2');
		}
	},
	beforeDestroyed(){
		$(this.$el).off().select2('destroy');
	}
};
</script>
