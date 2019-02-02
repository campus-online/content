export const getDisplayName = Component => {
	if (typeof Component === 'string') return Component
	if (!Component) return undefined
	return Component.displayName || Component.name || 'Component'
}

const isString = value => typeof value === 'string'

export const getEditUrl = ({ collection: c, entry, slug: e = entry }) => {
	const collection = isString(c) ? c : c.get('name')
	const slug = isString(e) ? e : e.get('slug')
	return `/collections/${collection}/entries/${slug}`
}
