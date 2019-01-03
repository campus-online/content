const {readFile} = require('fs')
const onNodeCreate = require('gatsby-transformer-remark/on-node-create')
const identity = string => string

const stubNodeFromFile = file => ({
	id: file,
	absolutePath: file,
	internal: {
		type: 'File',
		mediaType: 'text/markdown',
	},
})

const loadNodeContent = node => new Promise((resolve, reject) => (
	readFile(node.absolutePath, 'utf8', (err, data) => (
		err ? reject(err) : resolve(data)
	))
))

const parser = file => new Promise((resolve, reject) => {
	onNodeCreate({
		createNodeId: identity,
		loadNodeContent,
		node: stubNodeFromFile(file),
		actions: {
			createNode: resolve,
			createParentChildLink: identity,
		},
		reporter: {panicOnBuild: reject},
	})
})

module.exports = parser