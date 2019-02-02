import React, { Fragment } from 'react'
import styled from 'react-emotion'
import { tint, shade } from 'polished'
import { colors, badge } from '../styles'
import MaybeLink from './MaybeLink'

const PLACEHOLDER = <Fragment>&nbsp;</Fragment>
const isEmpty = ({ children }) => !children || children === PLACEHOLDER

const Badge = styled(MaybeLink)`
	${badge};
	display: block;
	position: relative;
	z-index: 1;
	flex: 0 0 auto;
	background-color: ${props => tint(0.88, props.color)};
	color: ${props => shade(0.22, props.color)};
	min-width: ${props => (isEmpty(props) ? '92px' : 'auto')};
`

Badge.defaultProps = {
	color: colors.inactive,
	children: PLACEHOLDER,
}

export default Badge
