/* eslint-env node */
module.exports = {
	entry: {
		bundle: './resources/assets/js/modules',
		'vue-constructors': './resources/assets/js/vue-components/constructors.js'
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
};
