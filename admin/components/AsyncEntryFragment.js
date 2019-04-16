import React from 'react'
import { EntryLoader } from 'netlify-cms'
import { getEditUrl } from '../utils'

const AsyncEntryFragment = ({ collection, slug, inView, ...props }) => {
	const { error, loading, render, children = render } = props
	const url = getEditUrl({ collection, slug })
	if (inView === false) return loading(url)
	return (
		<EntryLoader collection={collection} slug={slug}>
			{entry => {
				if (entry.isFetching) return loading(url)
				if (entry.error) return error(url, entry.error)
				return children(url, entry.data)
			}}
		</EntryLoader>
	)
}

export default AsyncEntryFragment
