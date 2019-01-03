const {resolve} = require('path')
const {readdirSync} = require('fs')
const parser = require('../lib/parser')

const DOCS_DIRECTORY = resolve(`${__dirname}/../docs`)
const ARTICLES_DIRECTORY = resolve(DOCS_DIRECTORY, 'articles')

const prefixWith = slug => title => `[${slug}]: ${title}`
const isRelation = value => (value && typeof value.slug === 'string')
const isMarkdown = entry => entry.isFile && entry.name.endsWith('.md')
const getAbsolutePath = article => resolve(ARTICLES_DIRECTORY, article)

const articles = readdirSync(
	ARTICLES_DIRECTORY,
	{encoding: 'utf8', withFileTypes: true},
).filter(isMarkdown).map(entry => entry.name)

test.each(articles)('relations are valid: "%s"', async article => {
	const absolutePath = getAbsolutePath(article)
	const {frontmatter} = await parser(absolutePath)
	const relations = Object.values(frontmatter).filter(isRelation)

	await Promise.all(relations.map(async ({slug, title}) => {
		const relativePath = slug.replace(/\/$/, '.md').replace(/^\//, '')
		expect(relativePath).toExistIn(DOCS_DIRECTORY)
		const format = prefixWith(slug)
		const absolutePath = resolve(DOCS_DIRECTORY, relativePath)
		const {frontmatter} = await parser(absolutePath)
		expect(format(frontmatter.title)).toEqual(format(title))
	}))
})
