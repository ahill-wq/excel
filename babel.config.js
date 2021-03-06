module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: { version: 3, proposals: true },
				targets: {
					node: 'current',
				},
			},
		],
	],
	plugins: ['@babel/plugin-proposal-class-properties'],
};
