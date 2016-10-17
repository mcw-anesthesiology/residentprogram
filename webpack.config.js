/* eslint-env node */
const path = require('path');

module.exports = {
	entry: {
		bundle: './resources/assets/js/modules',
		'form-builder': './resources/assets/js/vue-components/form-builder.js'
	},
	output: {
		path: './resources/assets/js/',
		filename: '[name].js',
		libraryTarget: 'umd'
	},
	target: 'web',
	module: {
		loaders: [
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
				test: /\.json$/,
				loader: 'json-loader'
			}
		]
	},
	externals: [
		'moment'
	],
	devtool: 'source-map'
}
