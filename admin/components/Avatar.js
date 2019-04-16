import styled from 'react-emotion'
import { tint } from 'polished'
import { colors, focusableShadow } from '../styles'
import MaybeLink from './MaybeLink'

const wrap = src => `url("${src}")`

const getAvatarImage = ({ src, size }) => {
	if (!src || typeof src !== 'string') return 'none'
	if (!src.includes('ucarecdn.com')) return wrap(src)
	const dimensions = `${size * 2}x${size * 2}` // retina-ready
	const avatarSettings = `/-/scale_crop/${dimensions}/-/quality/lightest/`
	return wrap((src + '/').replace(/\/+$/, avatarSettings))
}

const avatarInset = [
	'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.25)',
	'inset 0px 0px 8px -1px rgba(0, 0, 0, 0.25)',
].join(', ')

const Avatar = styled(MaybeLink)`
	${props => props.to && focusableShadow({ shadow: props.src && avatarInset })}
	position: relative;
	display: block;
	overflow: hidden;
	flex: 0 0 auto;
	background-size: cover;
	background-image: ${getAvatarImage};
	${({ size, color = colors.inactive }) => `
		border-radius: ${size / 2}px;
		height: ${size}px;
		width: ${size}px;
		background-color: ${tint(0.88, color)};
	`}
`

export default Avatar
