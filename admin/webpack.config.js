const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const SOURCE_FOLDER = path.resolve(__dirname)
const DIST_FOLDER = path.resolve(__dirname, '..', 'dist')
const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
	mode: PRODUCTION ? 'production' : 'development',
	context: SOURCE_FOLDER,
	entry: {
		cms: './index.js',
		identity: './identity.js',
	},
	output: {
		path: DIST_FOLDER,
		publicPath: '/',
		filename: ({ chunk = {} } = {}) =>
			chunk.name === 'cms' ? 'admin/[name].js' : '[name].js',
	},
	devtool: PRODUCTION ? false : 'source-map',
	resolve: {
		alias: {
			'netlify-cms': '@campus-online/cms',
			'@frontend': '@campus-online/frontend/src',
			gatsby: path.resolve(__dirname, 'utils', 'gatsby.js'),
		},
	},
	module: {
		noParse: [/netlify-cms/, /@campus-online\/cms/],
		rules: [
			{
				enforce: 'pre',
				test: /\.m?js$/,
				exclude: /node_modules|netlify-cms|@campus-online\/cms/,
				loader: 'eslint-loader',
				options: {
					emitWarning: true,
				},
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules|netlify-cms|@campus-online\/cms/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						cacheCompression: false,
					},
				},
			},
			{
				test: /\.m?js$/,
				include: /@campus-online\/frontend\//,
				use: {
					loader: 'babel-loader',
					options: {
						...JSON.parse(fs.readFileSync(path.resolve(__dirname, '.babelrc'))),
						cacheDirectory: true,
						cacheCompression: false,
					},
				},
			},
			{
				test: /\.css$/,
				loader: 'raw-loader',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'admin/index.html',
			chunksSortMode: 'manual',
			chunks: ['identity', 'cms'],
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			chunks: ['identity'],
		}),
		new CopyWebpackPlugin([{ from: 'config.yml', to: 'admin' }], {
			copyUnmodified: true,
		}),
		new WriteFilePlugin({ test: /config\.yml/ }),
	],
	devServer: {
		contentBase: DIST_FOLDER,
		port: process.env.PORT,
		hot: true,
		open: true,
		overlay: true,
		stats: {
			all: false,
			errors: true,
			errorDetails: true,
			warnings: true,
		},
		openPage: 'admin/',
	},
	performance: { maxEntrypointSize: 2.5e6, maxAssetSize: 2.5e6 },
	optimization: {
		splitChunks: {
			minChunks: 2,
		},
		minimizer: [
			new TerserPlugin({
				cache: false,
				parallel: true,
				sourceMap: false,
			}),
		],
	},
}
