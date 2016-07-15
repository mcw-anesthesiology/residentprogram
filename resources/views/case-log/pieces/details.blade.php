@foreach($detailsSchema->schema as $sectionTitle => $section)
<section class="panel panel-default">
	<div class="panel-heading">
		<h4 class="panel-title">{{ $sectionTitle }}</h4>
	</div>
	<div class="panel-body">
	@foreach($section as $subsectionTitle => $subsection)
		<section>
		@if(!is_numeric($subsectionTitle))
			<h5 class="sub-header">{{ $subsectionTitle }}</h5>
		@endif
			<div class="row">
		@foreach($subsection as $inputName => $input)
			@if($input["type"] == "checkbox")
				<div class="col-md-4 checkbox">
					<label>
						<input type="hidden" name="details[{{ $sectionTitle }}][{{ $subsectionTitle }}][{{ $inputName }}][name]" value="{{ $input["name"] }}" />
						<input type="hidden" name="details[{{ $sectionTitle }}][{{ $subsectionTitle }}][{{ $inputName }}][type]" value="checkbox" />
						<input type="hidden" name="details[{{ $sectionTitle }}][{{ $subsectionTitle }}][{{ $inputName }}][value]" value="0" />
						<input type="checkbox" name="details[{{ $sectionTitle }}][{{ $subsectionTitle }}][{{ $inputName }}][value]" value="1" />
						{{ $input["name"] }}
					</label>
				</div>
			@endif
		@endforeach
			</div>
		</section>
	@endforeach
	</div>
</section>
@endforeach
