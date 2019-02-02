import React from 'react'
import { StyleSheetManager } from 'styled-components'
// import {Wrapper} from '../components/Layout'
// import '../reset.css'
// import '../fonts.css'

const styleCSS = `
	.SplitPane.vertical .Resizer.vertical {width: 11px}
	.Pane2 iframe {border-radius: 0}
`

class StyleSheetWrapper extends React.Component {
	state = { $head: null }
	injectPreviewCSS() {
		const $iframe = document.querySelector('.Pane2 iframe')
		const $head = $iframe.contentDocument.head
		this.setState(state => ({ ...state, $head }))
	}
	overideCSS() {
		const $style = document.createElement('style')
		$style.appendChild(document.createTextNode(styleCSS))
		document.head.appendChild($style)
	}
	componentDidMount() {
		this.overideCSS()
		this.injectPreviewCSS()
	}
	render() {
		const { children } = this.props
		const { $head } = this.state
		if (!$head) return children
		return <StyleSheetManager target={$head}>{children}</StyleSheetManager>
	}
}

const getDisplayName = WrappedComponent =>
	WrappedComponent.displayName || WrappedComponent.name || 'Component'

const withStyleSheet = WrappedComponent => {
	return class WithStyleSheet extends React.Component {
		static displayName = `WithStyleSheet(${getDisplayName(WrappedComponent)})`
		render() {
			return (
				<StyleSheetWrapper>
					<WrappedComponent {...this.props} />
				</StyleSheetWrapper>
			)
		}
	}
}

export default withStyleSheet
