import React from 'react'
import { EntryLoader } from 'netlify-cms'

const Wrapper = ({ innerProps, text }) => <div {...innerProps}>{text}</div>

const AsyncWrapper = ({ entry, ...props }) => (
	<EntryLoader collection={entry.collection} slug={entry.slug}>
		{({ isFetching, error, data }) => {
			if (isFetching) return <Wrapper {...props} text='...' />
			if (error) return <Wrapper {...props} text='error (1)' />
			return <Wrapper {...props} text={data.title || 'unknown'} />
		}}
	</EntryLoader>
)

const MultiValueLabel = ({ children, data, ...props }) => {
	if (typeof children === 'string')
		return <Wrapper {...props} text={children} />
	if (typeof data.title === 'string')
		return <Wrapper {...props} text={data.title} />
	if (children && children.entry && typeof children.entry.title === 'string')
		return <Wrapper {...props} text={children.entry.title} />
	if (children && typeof children.title === 'string')
		return <Wrapper {...props} text={children.title} />
	if (children.collection && children.slug)
		return <AsyncWrapper {...props} entry={children} />
	return <Wrapper {...props} text='error (2)' />
}

export default MultiValueLabel
