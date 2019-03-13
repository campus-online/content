import React, { Suspense, lazy } from 'react'
import CMS, { init } from 'netlify-cms'
import frontendResetCSS from '@frontend/reset.css'
import AuthorWidget from './widgets/Author'
import EditorialWidget from './widgets/Editorial'
import SemesterWidget from './widgets/Semester'
import ArticleCard from './cards/ArticleCard'
import AuthorCard from './cards/AuthorCard'
import EditorialCard from './cards/EditorialCard'
import enhance from './withStyleSheet'

const LazyArticlePreview = lazy(() =>
	import(/* webpackChunkName: "ArticlePreview" */
	'@frontend/templates/article/preview'),
)

const ArticlePreview = props => (
	<Suspense fallback={<div>Loading...</div>}>
		<LazyArticlePreview {...props} />
	</Suspense>
)

CMS.registerPreviewTemplate('articles', enhance(ArticlePreview))
CMS.registerPreviewStyle('https://campus.netlify.com/fonts.css')
CMS.registerPreviewStyle(frontendResetCSS, { raw: true })
CMS.registerWidget('author', AuthorWidget)
CMS.registerWidget('editorial', EditorialWidget)
CMS.registerWidget('semester', SemesterWidget)

CMS.registerEntryCard('articles', ArticleCard)
CMS.registerEntryCard('authors', AuthorCard)
CMS.registerEntryCard('editorials', EditorialCard)

init()
