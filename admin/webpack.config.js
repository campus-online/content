const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
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
	devtool: 'source-map',
	resolve: {
		alias: {
			'netlify-cms': '@leonardodino/netlify-cms',
		},
	},
	module: {
		noParse: [/netlify-cms/],
		rules: [{
			test: /\.m?js$/,
			exclude: /(node_modules|bower_components)/,
			use: {loader: 'babel-loader'},
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'admin/index.html',
			chunks: ['identity', 'cms'],
			excludeAssets: [/cms.css/],
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			chunks: ['identity'],
		}),
		new HtmlWebpackExcludeAssetsPlugin(),
		new CopyWebpackPlugin([{from: 'config.yml', to: 'admin'}], {copyUnmodified: true}),
		new WriteFilePlugin({test: /config\.yml/}),
	],
	devServer: {
		contentBase: DIST_FOLDER,
		hot: true,
		open: true,
		openPage: 'admin/',
	},
}
