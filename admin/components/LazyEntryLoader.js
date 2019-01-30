import React from 'react'
import Observer from 'react-intersection-observer'
import { EntryLoader } from 'netlify-cms'

const LazyEntryLoader = ({render, children = render, ...props}) => (
	<Observer triggerOnce rootMargin='100% 0px'>
		{({inView, ref}) => inView
			? <EntryLoader {...props} render={children}/>
			: children({isFetching: true, ref})
		}
	</Observer>
)

export default LazyEntryLoader
