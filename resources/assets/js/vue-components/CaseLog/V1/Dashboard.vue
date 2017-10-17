<template>
	<div>
		<div class="row">
			<div class="col-md-4 col-md-offset-8">
				<label class="containing-label" v-cloak>
					Report on
					<select class="form-control" id="case-log-details-report-name">
						<option v-for="subsection of subsections">
							@{{ subsection.name }}
						</option>
					</select>
				</label>
			</div>
		</div>
		<section id="case-log-stats-container"></section>
	</div>
</template>

<script>
export default {

};
</script>
