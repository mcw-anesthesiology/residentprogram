/* eslint-env node */
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const RollbarSourceMapPlugin = require('rollbar-sourcemap-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const gitRev = require('git-rev-sync');
const dotenv = require('dotenv');

dotenv.config();
const { APP_URL, ROLLBAR_ACCESS_TOKEN } = process.env;

const GIT_REV = gitRev.long();

module.exports = (env, argv) => {

	return {
		entry: {
			bundle: './resources/assets/js/modules/index.js',
			'vue-global': './resources/assets/js/vue-constructors/global.js',
			'vue-programs': './resources/assets/js/vue-constructors/programs.js',
			'vue-form-builder': './resources/assets/js/vue-constructors/form-builder.js',
			'vue-reports': './resources/assets/js/vue-constructors/reports.js',
			'vue-milestone-competency-lists': './resources/assets/js/vue-constructors/milestone-competency-lists.js',
			'vue-request': './resources/assets/js/vue-constructors/request.js',
			'vue-dashboard': './resources/assets/js/vue-constructors/dashboard/index.js',
			'vue-manage': './resources/assets/js/vue-constructors/manage/index.js',
			'vue-faculty360': './resources/assets/js/vue-constructors/faculty360/index.js',
			'vue-merit-reports': './resources/assets/js/vue-constructors/merit-reports/index.js',
			'vue-alumni': './resources/assets/js/vue-constructors/alumni.js',
			'vue-case-log': './resources/assets/js/vue-constructors/case-log.js',
			'vue-user': './resources/assets/js/vue-constructors/user.js',
			'vue-evaluation': './resources/assets/js/vue-constructors/evaluation.js'
		},
		output: {
			path: path.resolve(__dirname, 'public/build/'),
			publicPath: '/build/',
			filename: argv.mode === 'production'
				? 'js/[name]-[chunkhash].js'
				: 'js/[name].js',
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
					use: 'babel-loader'
				},
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				},
				{
					test: /\.svg$/,
					use: 'raw-loader'
				}
			]
		},
		plugins: [
			new webpack.EnvironmentPlugin({
				NODE_ENV: 'development',
				ROLLBAR_ACCESS_TOKEN: '',
				ADMIN_EMAIL: 'jmischka@mcw.edu'
			}),
			new CleanWebpackPlugin([
				// 'public/js',
				// 'public/css/*.css',
				// 'public/css/*.map',
				'public/build/js',
				'public/build/css/*.css',
				'public/build/css/*.map'
			]),
			new BundleAnalyzerPlugin({
				analyzerMode: argv.watch
					? 'server'
					: 'disabled',
				analyzerPort: 8088,
				openAnalyzer: false,
				generateStatsFile: true
			}),
			new MiniCssExtractPlugin({
				filename: argv.mode === 'production'
					? 'css/[name]-[contenthash].css'
					: 'css/[name].css',
				allChunks: true
			}),
			new ManifestPlugin(),
			new VueLoaderPlugin(),
			argv.mode === 'production' && new RollbarSourceMapPlugin({
				accessToken: ROLLBAR_ACCESS_TOKEN,
				publicPath: `${APP_URL}/build/`,
				version: GIT_REV
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
		devtool: 'source-map',
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
		}
	};
};
