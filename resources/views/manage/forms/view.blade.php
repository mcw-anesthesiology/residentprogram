@extends("app")

@section("body")
	{!! App\Helpers\FormReader::read($form->xml_path) !!}
@stop
