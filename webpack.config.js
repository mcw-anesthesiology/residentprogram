/* eslint-env node */
module.exports = {
	entry: {
		bundle: [
			'es6-promise',
			'whatwg-fetch',
			'element-dataset',
			'./resources/assets/js/modules',
		],
		'vue-constructors': [
			'./resources/assets/js/vue-components/constructors.js'
		]
	},
	output: {
		path: './resources/assets/js/',
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
				test: /element-dataset/,
				loader: 'apply-loader'
			}
		]
	},
	externals: [
		'moment'
	],
	devtool: 'source-map'
};
