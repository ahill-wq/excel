const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
	mode: 'development',
	devServer: {
		port: 3000,
	},
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: isDev ? 'source-map' : '',
	plugins: [
		new HTMLWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: 'styles.css',
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/img'),
					to: path.resolve(__dirname, 'dist/img'),
				},
			],
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
	],
	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							// eslint-disable-next-line global-require
							plugins: [require('autoprefixer')],
						},
					},
					'sass-loader',
				],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
		],
	},
};
