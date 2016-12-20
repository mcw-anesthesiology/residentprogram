<template>
	<li class="evaluation-list-item">
		<input type="checkbox" :value="user.id" />
		<a :href="`/profile/${user.id}`">{{ user.full_name }}</a>
		{{ user.subject_evaluations.length }}
		<button type="button" class="btn btn-xs">
			Send reminder
		</button>
	</li>
</template>

<script>
export default {
	props: {
		user: Object
	}
};
</script>
