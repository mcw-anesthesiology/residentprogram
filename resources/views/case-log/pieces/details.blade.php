<input type="hidden" name="details_type" value="{{ $detailsSchema->details_type }}" />
<input type="hidden" name="version" value="{{ $detailsSchema->version }}" />
@foreach($detailsSchema->schema as $sectionIndex => $section)
<section class="panel panel-default">
	@if(!empty($section["title"]))
	<div class="panel-heading">
		<h4 class="panel-title">{{ $section["title"] }}</h4>
		<input type="hidden" name="details[{{ $sectionIndex }}][title]" value="{{ $section["title"] }}" />
	</div>
	@endif
	<div class="panel-body">
	@foreach($section["subsections"] as $subsectionIndex => $subsection)
		<section>
		@if(!empty($subsection["title"]))
			<h5 class="sub-header">{{ $subsection["title"] }}</h5>
			<input type="hidden" name="details[{{ $sectionIndex }}][subsections][{{ $subsectionIndex }}][title]" value="{{ $subsection["title"] }}" />
		@endif
			<div class="row">
		@foreach($subsection["inputs"] as $inputIndex => $input)
			@if($input["type"] == "checkbox")
				<div class="col-md-4 checkbox">
					<label>
						<input type="hidden" name="details[{{ $sectionIndex }}][subsections][{{ $subsectionIndex }}][inputs][{{ $inputIndex }}][label]" value="{{ $input["label"] }}" />
						<input type="hidden" name="details[{{ $sectionIndex }}][subsections][{{ $subsectionIndex }}][inputs][{{ $inputIndex }}][type]" value="checkbox" />
						<input type="hidden" name="details[{{ $sectionIndex }}][subsections][{{ $subsectionIndex }}][inputs][{{ $inputIndex }}][value]" value="0" />
						<input type="checkbox" name="details[{{ $sectionIndex }}][subsections][{{ $subsectionIndex }}][inputs][{{ $inputIndex }}][value]" value="1" />
						{{ $input["label"] }}
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
