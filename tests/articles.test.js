const {resolve} = require('path')
const {readdirSync} = require('fs')
const parser = require('../utils/parser')

const DOCS_DIRECTORY = resolve(`${__dirname}/../docs`)
const ARTICLES_DIRECTORY = resolve(DOCS_DIRECTORY, 'articles')

const plural = string => string.replace(/([^s])$/, '$1s')
const castArray = value => Array.isArray(value) ? value : [value]
const isString = value => typeof value === 'string'
const prefixWith = slug => title => `[${slug}]: ${title}`
const isRelation = ([key, value]) => {
	if(key === 'authors' && Array.isArray(value)) return value.every(isString)
	if(key === 'editorial') return isString(value)
	return false
}

const isMarkdown = entry => entry.isFile() && entry.name.endsWith('.md')
const getArticlePath = article => resolve(ARTICLES_DIRECTORY, article)
const getRelationPath = collection => slug => `${plural(collection)}/${slug}.md`

const unpackRelations = (acc, [key, value]) => {
	if(!isRelation([key, value])) return acc
	return [...acc, ...castArray(value).map(getRelationPath(key))]
}

const articles = readdirSync(
	ARTICLES_DIRECTORY,
	{encoding: 'utf8', withFileTypes: true},
).filter(isMarkdown).map(entry => entry.name)

test.each(articles)('relations are valid: "%s"', async article => {
	const absolutePath = getArticlePath(article)
	const {frontmatter} = await parser(absolutePath)
	const relations = Object.entries(frontmatter).reduce(unpackRelations, [])

	await Promise.all(relations.map(async relativePath => (
		expect(relativePath).toExistIn(DOCS_DIRECTORY)
	)))
})
