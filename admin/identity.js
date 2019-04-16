// source: https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-netlify-cms/src/cms-identity.js

const __PATH_PREFIX__ = ''
const CMS_PUBLIC_PATH = 'admin'
// eslint-disable-next-line import/first
import netlifyIdentityWidget from 'netlify-identity-widget'

window.netlifyIdentity = netlifyIdentityWidget

const addLoginListener = () =>
	netlifyIdentityWidget.on('login', () => {
		document.location.href = `${__PATH_PREFIX__}/${CMS_PUBLIC_PATH}/`
	})

netlifyIdentityWidget.on('init', user => {
	if (!user) {
		addLoginListener()
	} else {
		netlifyIdentityWidget.on('logout', () => {
			addLoginListener()
		})
	}
})

netlifyIdentityWidget.init()
