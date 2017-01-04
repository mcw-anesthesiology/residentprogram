/* eslint-env node */
const gulp = require('gulp');
const elixir = require('laravel-elixir');
const each = require('gulp-each');
const fc2json = require('gulp-file-contents-to-json');

const bowerPath = './bower_components/';
const npmPath = './node_modules/';
const scripts = [
	npmPath + 'babel-polyfill/dist/polyfill.min.js',
	bowerPath + 'jquery/dist/jquery.min.js',
	bowerPath + 'bootstrap/dist/js/bootstrap.min.js',
	bowerPath + 'datatables.net/js/jquery.dataTables.min.js',
	bowerPath + 'datatables.net-bs/js/dataTables.bootstrap.min.js',
	bowerPath + 'datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js',
	bowerPath + 'datatables.net-fixedheader/js/dataTables.fixedHeader.min.js',
	bowerPath + 'datatables.net-responsive/js/dataTables.responsive.min.js',
	bowerPath + 'datatables.net-responsive-bs/js/responsive.bootstrap.js',
	bowerPath + 'lodash/dist/lodash.min.js',
	bowerPath + 'moment/min/moment.min.js',
	bowerPath + 'multiselect/js/jquery.multi-select.js',
	bowerPath + 'placeholders/dist/placeholders.min.js',
	bowerPath + 'placeholders/dist/placeholders.jquery.min.js',
	bowerPath + 'select2/dist/js/select2.min.js',
	bowerPath + 'Chart.js/Chart.js',
	bowerPath + 'bootstrap-switch/dist/js/bootstrap-switch.min.js',
	bowerPath + 'marked/marked.min.js',
	bowerPath + 'country-region-selector/dist/jquery.crs.min.js',
	bowerPath + 'velocity/velocity.min.js',
	bowerPath + 'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js'
];

const styles = [
	bowerPath + 'bootstrap/dist/css/bootstrap.min.css',
	bowerPath + 'datatables.net-bs/css/dataTables.bootstrap.min.css',
	bowerPath + 'datatables.net-fixedcolumns-bs/css/fixedColumns.bootstrap.min.css',
	bowerPath + 'datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css',
	bowerPath + 'datatables.net-responsive-bs/css/responsive.bootstrap.min.css',
	bowerPath + 'multiselect/css/multi-select.css',
	bowerPath + 'select2/dist/css/select2.min.css',
	bowerPath + 'select2-bootstrap-theme/dist/select2-bootstrap.min.css',
	bowerPath + 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css',
	bowerPath + 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
];

const fonts = [
	bowerPath + 'bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
	bowerPath + 'bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
	bowerPath + 'bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
	bowerPath + 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
	bowerPath + 'bootstrap/dist/fonts/glyphicons-halflings-regular.woff2'
];

const imgs = [
	bowerPath + 'multiselect/img/switch.png'
];

const cssimgs = [
	bowerPath + 'jquery-ui/themes/base/images/*'
];

gulp.task('vendorfont', function(){
	gulp.src(fonts)
		.pipe(gulp.dest('./public/build/fonts'));
});

gulp.task('vendorimg', function(){
	gulp.src(imgs)
		.pipe(gulp.dest('./public/img'));

	gulp.src(cssimgs)
		.pipe(gulp.dest('./public/build/css/images'));
});

gulp.task('buildfonts', function(){
	return gulp.src(['./resources/assets/ttf/*'])
		.pipe(each(function (content, file, callback) {
			callback(null, new Buffer(content).toString('base64'));
		}, 'buffer'))
		.pipe(fc2json('vfs_fonts.json'))
		.pipe(each(function (content, file, callback) {
			callback(null, content);
		}, 'buffer'))
		.pipe(gulp.dest('./resources/assets/js'));
});

elixir(function(mix) {
	mix.scripts([
			...relativeToResourcesSubdir(scripts),
			'jquery-ui.min.js',
			'datatables-datetime-moment.js',
			'modernizr-custom.js',
			'mdn-round.js',
			'main.js',
			'milestone-competency-radar-chart.js',
			'evaluation-line-chart.js'
		])
		.styles([
			...relativeToResourcesSubdir(styles),
			'jquery-ui.min.css',
			'jquery-ui.structure.min.css',
			'jquery-ui.theme.min.css',
			'main.css',
			'milestone-competency-radar-chart.css',
			'navbar.css'
		]);
	mix.version([
		'css/all.css',
		'js/all.js'
	]);
});

function relativeToResourcesSubdir(arr){
	return arr.map(path => '../../../' + path);
}
