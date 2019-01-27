import CMS, { init } from 'netlify-cms'

// import AboutPagePreview from '../templates/about/preview'
// import BlogPostPreview from '../templates/article/preview'
import AuthorWidget from './widgets/Author'
import EditorialWidget from './widgets/Editorial'
import SemesterWidget from './widgets/Semester'
import enhance from './withStyleSheet'

window.___loader = window.___loader || {enqueue: () => undefined}

// CMS.registerPreviewTemplate('about', enhance(AboutPagePreview))
// CMS.registerPreviewTemplate('article', enhance(BlogPostPreview))
CMS.registerWidget('author', AuthorWidget)
CMS.registerWidget('editorial', EditorialWidget)
CMS.registerWidget('semester', SemesterWidget)

init()
