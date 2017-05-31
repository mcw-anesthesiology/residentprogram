/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		bundle: [
			'whatwg-fetch',
			'element-dataset',
			'raf/polyfill',
			'./resources/assets/js/modules'
		],
		'vue-deps': './resources/assets/js/vue-constructors/index.js',
		'vue-form-builder': './resources/assets/js/vue-constructors/form-builder.js',
		'vue-reports': './resources/assets/js/vue-constructors/reports.js',
		'vue-milestone-competency-lists': './resources/assets/js/vue-constructors/milestone-competency-lists.js',
		'vue-request': './resources/assets/js/vue-constructors/request.js',
		'vue-dashboard': './resources/assets/js/vue-constructors/dashboard/index.js',
		'vue-manage': './resources/assets/js/vue-constructors/manage/index.js',
		'vue-faculty360': './resources/assets/js/vue-constructors/faculty360/index.js',
		'vue-merit-reports': './resources/assets/js/vue-constructors/merit-reports/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'public/build/js/'),
		publicPath: '/build/js/',
		filename: process.env.NODE_ENV === 'production'
			? '[name]-[chunkhash].js'
			: '[name].js',
		libraryTarget: 'umd'
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: {
					loader: 'vue-loader',
					options: {
						extractCSS: true
					}
				}
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /element-dataset/,
				use: 'apply-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vue-deps',
			chunks: [
				'vue-form-builder',
				'vue-reports',
				'vue-milestone-competency-lists',
				'vue-request',
				'vue-dashboard',
				'vue-manage',
				'vue-faculty360',
				'vue-merit-reports'
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bundle', 'manifest']
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true
		}),
		new ExtractTextPlugin({
			filename: process.env.NODE_ENV === 'production'
				? '../css/[name]-[contenthash].css'
				: '../css/[name].css',
			allChunks: true
		}),
		new ManifestPlugin()
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	externals: {
		moment: 'moment',
		jquery: 'jQuery'
	},
	devtool: 'source-map'
};
