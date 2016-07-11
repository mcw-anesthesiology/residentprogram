@extends("case-log.types.base")

@section("title")
	RAAPS
@stop

@section("details")
<section class="panel panel-default">
	<div class="panel-heading">
		<h4 class="panel-title">Anesthesia / Analgesia type</h4>
	</div>
	<div class="panel-body">
		<div class="row">
	@foreach($anesthesiaAnalgesiaTypes->where("type", "primary") as $aaType)
			<div class="col-md-4 checkbox">
				<label>
					<input type="checkbox" name="{{ $aaType->id }}" value="1" />
					{{ $aaType->name }}
				</label>
			</div>
		</div>
	@endforeach
		<hr />
		<h5>Peripheral</h5>
		<div class="row">
	@foreach($anesthesiaAnalgesiaTypes->where("type", "peripheral") as $aaType)
			<div class="col-md-4 checkbox">
				<label>
					<input type="checkbox" name="{{ $aaType->id }}" value="1" />
					{{ $aaType->name }}
				</label>
			</div>
	@endforeach
		</div>
	</div>
</section>

<section class="panel panel-default">
	<div class="panel-heading">
		<h4 class="panel-title">Neuraxial Blockade Site (Optional)</h4>
	</div>
	<div class="panel-body">
		<div class="row">
	@foreach($blockadeSites->where("type", "neuraxial") as $blockadeSite)
			<div class="col-md-4 checkbox">
				<label>
					<input type="checkbox" name="{{ $blockadeSite->id }}" value="1" />
					{{ $blockadeSite->name }}
				</label>
			</div>
		</div>
	@endforeach
	</div>
</section>

<section class="panel panel-default">
	<div class="panel-heading">
		<h4 class="panel-title">Peripheral Nerve Blockade Site (Optional)</h4>
	</div>
	<div class="panel-body">
		<div class="row">
	@foreach($blockadeSites->where("type", "peripheral") as $blockadeSite)
			<div class="col-md-4 checkbox">
				<label>
					<input type="checkbox" name="{{ $blockadeSite->id }}" value="1" />
					{{ $blockadeSite->name }}
				</label>
			</div>
		</div>
	@endforeach
	</div>
</section>
@stop
