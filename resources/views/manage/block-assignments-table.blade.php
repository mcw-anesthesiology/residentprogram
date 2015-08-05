<table class="table table-striped datatable" width="100%">
	<thead>
		<tr>
			<th>Person</th>
			@foreach($blocks as $block)
				<th>{{ $block->block_name }}</th>
			@endforeach
		</tr>
	</thead>
</table>
