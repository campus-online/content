import {css} from 'react-emotion'
import { styles } from 'netlify-cms'
const { colors, lengths, components, buttons, shadows, borders, transitions } = styles
export { colors, lengths, transitions}

const identity = a => a
export const focusShadow = `0 0 0 2px ${colors.active}`

export const focusableShadow = ({shadow} = {}) => css`
	appearance: none;
	overflow: hidden;
	box-shadow: ${shadow || 'none'};
	html[data-whatintent="keyboard"] &:focus {
		outline: none;
		box-shadow: ${[focusShadow, shadow].filter(identity).join(', ')};
	}
`

// focusableShadow.toString = () => focusableShadow()
// focusableShadow.valueOf = () => focusableShadow()
// focusableShadow[Symbol.toPrimitive] = () => focusableShadow()

export const focusableBadge = css`
	${components.badge};
	${focusableShadow()};
`

export const card = components.card

export const focusableCard = css`
	${components.card};
	${focusableShadow({shadow: shadows.dropMain})};
`
