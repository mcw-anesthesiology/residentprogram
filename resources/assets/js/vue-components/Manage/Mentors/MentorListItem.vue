<template>
	<li class="mentor-item">
		<span class="name">
			{{ user.full_name }}
		</span>

		<ul class="list-group">
			<li v-for="mentorship of user.mentorships" :key="mentorship.id" class="list-group-item">
				<span>{{ mentorship.mentee.full_name }}</span>
				<confirmation-button class="btn btn-sm btn-danger"
					@click="handleDeleteMentorship(mentorship.id)"
				>
					<span class="glyphicon glyphicon-remove"></span>
					Remove
				</confirmation-button>
			</li>
		</ul>

		<form v-if="showAddMentee" @submit="handleAddMentee">
			<select-two :options="groupedTrainees" name="trainee" />
			<button type="submit" class="btn btn-success">
				Add mentee
			</button>
			<button type="button" class="btn btn-default">
				Cancel
			</button>
		</form>
	</li>
</template>

<style scoped>
.mentor-item {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
}

.mentor-item > div {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
}
</style>

<script>
import ConfirmationButton from '#/ConfirmationButton.vue';
import SelectTwo from '#/SelectTwo.vue';

export default {
	components: {
		ConfirmationButton,
		SelectTwo
	}
}
</script>
