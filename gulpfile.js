var gulp = require("gulp");
var uglify = require("gulp-uglify");
var cssnano = require("gulp-cssnano");
var concat = require("gulp-concat");
var elixir = require('laravel-elixir');
var size = require("gulp-size");
var gutil = require("gulp-util");
var webpack = require("webpack");

var inProduction = elixir.config.production;

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
var bowerPath = "./bower_components/";
var npmPath = "./node_modules/";
var scripts = [
	npmPath + "babel-polyfill/dist/polyfill.min.js",
    bowerPath + "jquery/dist/jquery.min.js",
    bowerPath + "bootstrap/dist/js/bootstrap.min.js",
    bowerPath + "jquery-ui/ui/minified/core.min.js",
    bowerPath + "jquery-ui/ui/minified/widget.min.js",
    bowerPath + "jquery-ui/ui/minified/core.min.js",
    bowerPath + "jquery-ui/ui/minified/mouse.min.js",
    bowerPath + "jquery-ui/ui/minified/position.min.js",
    bowerPath + "jquery-ui/ui/minified/datepicker.min.js",
    bowerPath + "datatables.net/js/jquery.dataTables.min.js",
    bowerPath + "datatables.net-bs/js/dataTables.bootstrap.min.js",
    bowerPath + "datatables.net-fixedcolumns/js/dataTables.fixedColumns.min.js",
    bowerPath + "datatables.net-fixedheader/js/dataTables.fixedHeader.min.js",
    bowerPath + "datatables.net-responsive/js/dataTables.responsive.min.js",
    bowerPath + "datatables.net-responsive-bs/js/responsive.bootstrap.js",
    bowerPath + "lodash/dist/lodash.min.js",
    bowerPath + "moment/min/moment.min.js",
    bowerPath + "multiselect/js/jquery.multi-select.js",
    bowerPath + "placeholders/dist/placeholders.min.js",
    bowerPath + "placeholders/dist/placeholders.jquery.min.js",
    bowerPath + "select2/dist/js/select2.min.js",
    bowerPath + "Chart.js/Chart.js",
    bowerPath + "bootstrap-switch/dist/js/bootstrap-switch.min.js",
    bowerPath + "marked/marked.min.js",
    bowerPath + "country-region-selector/dist/jquery.crs.min.js",
	bowerPath + "velocity/velocity.min.js",
	bowerPath + "eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"
];

var styles = [
    bowerPath + "bootstrap/dist/css/bootstrap.min.css",
    bowerPath + "jquery-ui/themes/base/core.css",
    bowerPath + "jquery-ui/themes/base/datepicker.css",
    bowerPath + "jquery-ui/themes/base/theme.css",
    bowerPath + "datatables.net-bs/css/dataTables.bootstrap.min.css",
    bowerPath + "datatables.net-fixedcolumns-bs/css/fixedColumns.bootstrap.min.css",
    bowerPath + "datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css",
    bowerPath + "datatables.net-responsive-bs/css/responsive.bootstrap.min.css",
    bowerPath + "multiselect/css/multi-select.css",
    bowerPath + "select2/dist/css/select2.min.css",
    bowerPath + "select2-bootstrap-theme/dist/select2-bootstrap.min.css",
    bowerPath + "bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css",
	bowerPath + "eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"
];

var fonts = [
    bowerPath + "bootstrap/dist/fonts/glyphicons-halflings-regular.eot",
    bowerPath + "bootstrap/dist/fonts/glyphicons-halflings-regular.svg",
    bowerPath + "bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
    bowerPath + "bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
    bowerPath + "bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"
];

var imgs = [
    bowerPath + "multiselect/img/switch.png"
];

var cssimgs = [
    bowerPath + "jquery-ui/themes/base/images/*"
];

gulp.task("vendorjs", function(){
    gulp.src(scripts)
        .pipe(size({showFiles: true}))
        .pipe(concat("vendor.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"))
        .pipe(size());
});

gulp.task("vendorcss", function(){
    gulp.src(styles)
        .pipe(size({showFiles: true}))
        .pipe(concat("vendor.css"))
        .pipe(cssnano())
        .pipe(gulp.dest("./public/css"))
        .pipe(size());
});

gulp.task("vendorfont", function(){
    gulp.src(fonts)
        .pipe(gulp.dest("./public/build/fonts"));
});

gulp.task("vendorimg", function(){
    gulp.src(imgs)
        .pipe(gulp.dest("./public/img"));

    gulp.src(cssimgs)
        .pipe(gulp.dest("./public/build/css/images"));
});

gulp.task("webpack", function(callback){
	webpack(require("./webpack.config.js"), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
		callback();
    });
});

elixir.config.registerWatcher("default", "./resources/assets/js/modules/**");

elixir(function(mix) {
	mix.task('webpack');
    mix.scripts([
			"datatables-datetime-moment.js",
			"modernizr-custom.js",
			"mdn-round.js",
			"main.js",
	        "milestone-competency-radar-chart.js",
			"evaluation-line-chart.js",
			"bundle.js" // HACK: I don't feel like refactoring all the js right now
		])
        .styles([
			"main.css",
			"milestone-competency-radar-chart.css",
			"navbar.css"
		]);
	mix.version(["css/all.css", "css/vendor.css", "js/all.js", "js/vendor.js"]);
    // if(inProduction)
    //     mix.phpUnit();
});
