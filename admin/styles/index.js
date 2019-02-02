import { styles } from 'netlify-cms'
const { colors, lengths, components, shadows, transitions } = styles
export { colors, lengths, transitions }

const identity = a => a
export const focusShadow = `0 0 0 2px ${colors.active}`

export const focusableShadow = ({ shadow } = {}) => `
	appearance: none;
	overflow: hidden;
	box-shadow: ${shadow || 'none'};
	html[data-whatintent="keyboard"] &:focus {
		outline: none;
		box-shadow: ${[focusShadow, shadow].filter(identity).join(', ')};
	};
`

export const card = components.card
export const badge = components.badge

export const focusableCard = `
	${components.card};
	${focusableShadow({ shadow: shadows.dropMain })};
`
