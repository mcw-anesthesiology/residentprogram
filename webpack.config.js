/* eslint-env node */
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
		bundle: [
			'whatwg-fetch',
			'element-dataset',
			'./resources/assets/js/modules',
		],
		'vue-deps': './resources/assets/js/vue-constructors/index.js',
		'vue-form-builder': './resources/assets/js/vue-constructors/form-builder.js',
		'vue-reports': './resources/assets/js/vue-constructors/reports.js',
		'vue-milestone-competency-lists': './resources/assets/js/vue-constructors/milestone-competency-lists.js',
		'vue-request': './resources/assets/js/vue-constructors/request.js',
		'vue-dashboard': './resources/assets/js/vue-constructors/dashboard/index.js'
	},
	output: {
		path: './public/js/',
		publicPath: '/js/',
		filename: '[name].js',
		libraryTarget: 'umd'
	},
	target: 'web',
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loaders: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /element-dataset/,
				loader: 'apply-loader'
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
				'vue-dashboard'
			]
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bundle', 'manifest']
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'disabled',
			generateStatsFile: true
		})
	],
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	},
	externals: [
		'moment'
	],
	devtool: 'source-map'
};
