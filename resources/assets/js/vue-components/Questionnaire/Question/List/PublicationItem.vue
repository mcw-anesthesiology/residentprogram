<template>
	<li>
		<div class="form-group">
			<label class="containing-label">
				Title
				<input type="text" class="form-control appear-not-readonly"
					:value="title" :readonly="readonly"
					@input="$emit({title: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Author
				<input type="text" class="form-control appear-not-readonly"
					:value="author" :readonly="readonly"
					@input="$emit({author: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Link
				<input type="text" class="form-control appear-not-readonly"
					:value="link" :readonly="readonly"
					@input="$emit({link: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Role
				<input type="text" class="form-control appear-not-readonly"
					:value="role" :readonly="readonly"
					@input="$emit({role: $event.target.value})" />
			</label>
		</div>
	</li>
</template>

<script>
export default {
	model: {
		prop: 'text'
	},
	props: {
		type: {
			type: String,
			validator(type) {
				return type === 'publication';
			}
		},
		title: {
			type: String,
			default: ''
		},
		author: {
			type: String,
			default: ''
		},
		link: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	}
};
</script>
