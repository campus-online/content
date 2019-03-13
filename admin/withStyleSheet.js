import React from 'react'
import { StyleSheetManager as Extract } from 'styled-components'

class StyleSheetWrapper extends React.Component {
	state = { target: null }
	componentDidMount() {
		const $iframe = document.querySelector('.Pane2 iframe')
		this.setState({ target: $iframe.contentDocument.head })
	}
	render() {
		const { children } = this.props
		const { target } = this.state
		return target && <Extract target={target}>{children}</Extract>
	}
}

const getDisplayName = Base => Base.displayName || Base.name || 'Component'

const withStyleSheet = Preview => {
	const Wrapped = props => (
		<StyleSheetWrapper>
			<Preview {...props} />
		</StyleSheetWrapper>
	)
	Wrapped.displayName = `withStyleSheet(${getDisplayName(Preview)})`
	return Wrapped
}

export default withStyleSheet
