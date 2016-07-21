/* eslint-env node */

module.exports = {
	entry: './resources/assets/js/modules',
	output: {
		path: './resources/assets/js/',
		filename: 'bundle.js', // This is pretty gross but I don't feel like refactoring all the js right now,
		libraryTarget: 'umd'
	},
	target: 'web',
	module: {
		loaders: [
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
