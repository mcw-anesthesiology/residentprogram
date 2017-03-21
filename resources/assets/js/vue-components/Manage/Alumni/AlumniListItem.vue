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
			<div class="col-sm-2 graduation-date-cell">
				<span class="short-date">
					{{
						alum.graduation_date
							? moment(alum.graduation_date).format('Y')
							: ''
					}}
				</span>
				<span class="full-date">
					{{
						alum.graduation_date
							? moment(alum.graduation_date).calendar()
							: ''
					}}
				</span>
			</div>
			<div class="col-sm-2">
				<button type="button" class="btn btn-info btn-sm"
						@click="sendAlumEmail(alum.id)">
					<span class="glyphicon glyphicon-send"></span>
					Email
				</button>
				<button type="button" class="btn btn-info btn-sm"
						@click="isBeingEdited = true">
					<span class="glyphicon glyphicon-pencil"></span>
					Edit
				</button>
			</div>
		</div>
		
	</li>
</template>

<script>
import moment from 'moment';

import { PLACEHOLDER_USER_IMAGE_PATH } from '../../../modules/constants.js';

export default {
	props: {
		alum: {
			type: Object,
			required: true
		}
	},
	data(){
		return {
			isBeingEdited: false
		};
	},
	
	computed: {
		placeholderUserImagePath(){
			return PLACEHOLDER_USER_IMAGE_PATH;
		},
		years: {
			
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
