/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		'ui-tester': './ui-tester.js'
	},
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: '[name].js',
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
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /element-dataset/,
				use: 'apply-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'ui-tester.html',
			template: 'ui-tester.ejs'
		}),
		new webpack.HotModuleReplacementPlugin()
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
	devtool: 'source-map',
	devServer: {
		contentBase: './public'
	}
};
