<template>
	<li class="alum-list-item">
		<div class="row">
			<div class="col-sm-3">
				<img height="50" width="50" alt=""
					:src="alum.photo_path || placeholderUserImagePath" />
				{{ alum.full_name }}
			</div>
			<div class="col-sm-3">
				<a :href="`mailto:${alum.email}`">
					{{ alum.email }}
				</a>
			</div>
			<div class="col-sm-3">
				<div v-for="line of alumAddress(alum)">
					{{ line }}
				</div>
			</div>
			<div class="col-sm-1 graduation-date-cell">
				<rich-date :date="alum.graduation_date"></rich-date>
			</div>
			<div class="col-sm-2">
				<button type="button" class="btn btn-info btn-xs"
						@click="$emit('email')">
					<span class="glyphicon glyphicon-send"></span>
					Email
				</button>
				<button type="button" class="btn btn-info btn-xs"
						@click="$emit('edit')">
					<span class="glyphicon glyphicon-pencil"></span>
					Edit
				</button>
				<confirmation-button class="btn btn-xs"
						unpressed-class="btn-danger"
						pressed-class="btn-warning"
						@click="$emit('remove')">
					<span class="glyphicon glyphicon-remove"></span>
					Delete
				</confirmation-button>
			</div>
		</div>
	</li>
</template>

<script>
import moment from 'moment';

import ConfirmationButton from 'vue-components/ConfirmationButton.vue';
import RichDate from 'vue-components/RichDate.vue';

import { PLACEHOLDER_USER_IMAGE_PATH } from 'modules/constants.js';

export default {
	props: {
		alum: {
			type: Object,
			required: true
		}
	},
	data(){
		return {

		};
	},

	computed: {
		placeholderUserImagePath(){
			return PLACEHOLDER_USER_IMAGE_PATH;
		}
	},

	methods: {
		alumAddress(alum){
			const joinProps = props => {
				let pieces = [];
				props.map(prop => {
					if(alum[prop])
						pieces.push(alum[prop]);
				});
				return pieces.join(', ');
			};
			return [
				joinProps(['address', 'address_2']),
				joinProps(['city', 'state', 'zip']),
				alum.country !== 'United States'
					? alum.country
					: null,
			];
		},
		moment
	},

	components: {
		ConfirmationButton,
		RichDate
	}
};
</script>

<style scoped>
	.alum-list-item {
		border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		padding: 5px 0;
	}

	.alum-list-item:nth-child(even){
		background-color: rgba(0, 0, 0, 0.05);
	}

	.alum-list-item .row {
		margin: 0;
	}

	.alum-list-item img {
		border-radius: 100%;
		object-fit: cover;
		object-position: center;
	}

	.graduation-date-cell .full-date {
		display: none;
	}

	.graduation-date-cell:hover .short-date {
		display: none;
	}

	.graduation-date-cell:hover .full-date {
		display: block;
	}
</style>
