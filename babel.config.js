/* eslint-env node */

module.exports = api => {
	api.cache.forever();

	return {
		presets: [
			'@babel/preset-flow',
			['@babel/preset-env', {
				'targets': {
					'browsers': [
						'> 1%',
						'last 2 versions',
						'ie >= 9'
					]
				},
				useBuiltIns: 'entry',
				debug: false,
				modules: false
			}]
		],
		plugins: [
			['module-resolver', {
				alias: {
					'vue-flatpickr': '@jacobmischka/vue-flatpickr',
					'@': './resources/assets/js',
					'#': './resources/assets/js/vue-components'
				},
				extensions: [
					'.js',
					'.vue',
					'.mjs'
				]
			}],
			'@babel/plugin-syntax-dynamic-import',
			['@babel/plugin-proposal-object-rest-spread', {
				useBuiltIns: true
			}],
			'transform-vue-jsx'
		],
		env: {
			test: {
				presets: [
					'@babel/preset-flow',
					['@babel/preset-env', {
						targets: {
							'node': 'current'
						},
						useBuiltIns: 'entry',
						debug: false
					}]
				],
				plugins: [
					'dynamic-import-node',
					['@babel/plugin-proposal-object-rest-spread', {
						useBuiltIns: true
					}],
					'transform-vue-jsx'
				]
			}
		}
	};
};
