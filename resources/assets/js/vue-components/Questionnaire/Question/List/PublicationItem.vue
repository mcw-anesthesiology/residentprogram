<template>
	<li>
		<div class="form-group">
			<label class="containing-label">
				Title
				<input type="text" class="form-control" :value="title"
					@input="$emit({title: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Author
				<input type="text" class="form-control" :value="author"
					@input="$emit({author: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Link
				<input type="text" class="form-control" :value="link"
					@input="$emit({link: $event.target.value})" />
			</label>
		</div>
		<div class="form-group">
			<label class="containing-label">
				Role
				<input type="text" class="form-control" :value="role"
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
	}
};
</script>
