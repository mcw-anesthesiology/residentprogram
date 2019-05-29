/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ConcatPlugin = require('webpack-concat-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const gitRev = require('git-rev-sync');
const dotenv = require('dotenv');

dotenv.config();
const { APP_URL, ROLLBAR_ACCESS_TOKEN } = process.env;

const GIT_REV = gitRev.long();

const scripts = [
	'jquery/dist/jquery.js',
	'bootstrap/dist/js/bootstrap.js',
	'datatables.net/js/jquery.dataTables.js',
	'datatables.net-bs/js/dataTables.bootstrap.js',
	'datatables.net-fixedcolumns/js/dataTables.fixedColumns.js',
	'datatables.net-fixedheader/js/dataTables.fixedHeader.js',
	'datatables.net-responsive/js/dataTables.responsive.js',
	'datatables.net-responsive-bs/js/responsive.bootstrap.js',
	'moment/moment.js',
	'multiselect/js/jquery.multi-select.js',
	'select2/dist/js/select2.js',
	'bootstrap-switch/dist/js/bootstrap-switch.js',
	'country-region-selector/dist/jquery.crs.js',
	'eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
	'velocity-animate/velocity.min.js'
];

const styles = [
	'./resources/assets/css/bootstrap.css',
	'datatables.net-bs/css/dataTables.bootstrap.css',
	'datatables.net-fixedcolumns-bs/css/fixedColumns.bootstrap.css',
	'datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.css',
	'datatables.net-responsive-bs/css/responsive.bootstrap.css',
	'multiselect/css/multi-select.css',
	'select2/dist/css/select2.css',
	'select2-bootstrap-theme/dist/select2-bootstrap.css',
	'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css',
	'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css'
];

const DEV_SERVER_HOST = 'localhost';
const DEV_SERVER_PORT = 8000;

module.exports = (env, argv) => {
	const runningDevServer = argv.$0.includes('webpack-dev-server');

	return {
		entry: {
			polyfills: './resources/assets/js/modules/polyfills.js',
			app: './resources/assets/js/modules/index.js',
			dashboard: './resources/assets/js/entry/dashboard.js',
			createExternalEvaluation: './resources/assets/js/entry/createExternalEvaluation.js',
			'vendor-styles': styles,
			'global-styles': [
				'vars.css',
				'main.css',
				'navbar.css'
			].map(p => `./resources/assets/css/${p}`),
			iframeResizer: 'iframe-resizer'
		},
		output: {
			path: path.resolve(__dirname, 'public/build/'),
			publicPath: runningDevServer
				? `//${DEV_SERVER_HOST}:${DEV_SERVER_PORT}/build/`
				: '/build/',
			filename: argv.mode === 'production'
				? '[name].[chunkhash].js'
				: '[name].js',
			libraryTarget: 'umd'
		},
		target: 'web',
		module: {
			rules: [
				{
					test: /\.vue$/,
					use: {
						loader: 'vue-loader'
					}
				},
				{
					test: /\.js$/,
					use: 'babel-loader'
				},
				{
					issuer: path.join(__dirname, 'resources/assets/js/modules/global/index.js'),
					use: 'script-loader',
					sideEffects: true
				},
				{
					test: /\.css$/,
					use: [
						ExtractCssChunks.loader,
						'css-loader'
					],
					sideEffects: true
				},
				{
					test: /\.(jpg|jpeg|png|eot|svg|ttf|woff|woff2)(\?.*)?$/,
					use: {
						loader: 'url-loader',
						options: {
							name: '[name].[ext]'
						}
					}
				}
			]
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				NODE_ENV: 'development',
				ROLLBAR_ACCESS_TOKEN: '',
				ADMIN_EMAIL: 'jmischka@mcw.edu',
				APP_URL: ''
			}),
			new CleanWebpackPlugin([
				'public/mix-manifest.json',
				'public/build'
			]),
			new BundleAnalyzerPlugin({
				analyzerMode: argv.watch
					? 'server'
					: 'disabled',
				analyzerPort: 8088,
				openAnalyzer: false,
				generateStatsFile: true
			}),
			new ExtractCssChunks({
				filename: argv.mode === 'production'
					? '[name].[contenthash].css'
					: '[name].css',
				hot: argv.mode !== 'production',
				allChunks: true
			}),
			new ManifestPlugin({
				fileName: '../mix-manifest.json',
				basePath: '/'
			}),
			new VueLoaderPlugin(),
			argv.mode === 'production' && new RollbarSourceMapPlugin({
				accessToken: ROLLBAR_ACCESS_TOKEN,
				publicPath: `${APP_URL}/build/`,
				version: GIT_REV
			}),
			new ConcatPlugin({
				name: 'vendor',
				fileName: argv.mode === 'production'
					? 'vendor.[hash].js'
					: 'vendor.js',
				filesToConcat: scripts
			})
		].filter(Boolean),
		resolve: {
			alias: {
				'vue$': 'vue/dist/vue.common.js'
			}
		},
		externals: {
			moment: 'moment',
			jquery: 'jQuery'
		},
		devtool: argv.mode === 'production'
			? 'source-map'
			: 'cheap-eval-source-map',
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						name: 'common',
						chunks: 'initial',
						minChunks: 3
					}
				}
			}
		},
		devServer: {
			host: DEV_SERVER_HOST,
			port: DEV_SERVER_PORT,
			https: false,
			hot: true,
			inline: true,
			index: '',
			contentBase: path.join(__dirname, 'public'),
			disableHostCheck: true,
			allowedHosts: [
				'*'
			],
			headers: { 'Access-Control-Allow-Origin': '*' },
			proxy: {
				context: () => true,
				target: APP_URL,
				changeOrigin: true,
				secure: false,
			},
			writeToDisk: true,
			watchOptions: {
				poll: true
			}
		}
	};
};
