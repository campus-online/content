const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const SOURCE_FOLDER = path.resolve(__dirname)
const DIST_FOLDER = path.resolve(__dirname, '..', 'dist')
const PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
	mode:  PRODUCTION ? 'production' : 'development',
	context: SOURCE_FOLDER,
	entry: {
		cms: './index.js',
		identity: './identity.js',
	},
	output: {
		path: DIST_FOLDER,
		publicPath: '/',
		filename: ({chunk = {}} = {}) => (
			chunk.name === 'cms' ? 'admin/[name].js' : '[name].js'
		),
	},
	devtool: PRODUCTION ? false : 'source-map',
	resolve: {
		alias: {
			'netlify-cms': '@campus-online/cms',
		},
	},
	module: {
		noParse: [/netlify-cms/, /@campus-online\/cms/],
		rules: [{
			test: /\.m?js$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				options: {
					cacheDirectory: true,
					cacheCompression: false,
				}
			},
		}],
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
		new CopyWebpackPlugin([{from: 'config.yml', to: 'admin'}], {copyUnmodified: true}),
		new WriteFilePlugin({test: /config\.yml/}),
	],
	devServer: {
		contentBase: DIST_FOLDER,
		hot: true,
		open: true,
		openPage: 'admin/',
	},
	performance: { maxEntrypointSize: 2.5e+6, maxAssetSize: 2.5e+6 },
	optimization: {
		minimizer: [new TerserPlugin({
			cache: true,
			parallel: true,
			sourceMap: false,
			exclude: /(campus-online\/cms|node_modules)/,
		})],
	},
}
