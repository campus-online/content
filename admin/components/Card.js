import React from 'react'
import styled from 'react-emotion'
import Observer from 'react-intersection-observer'
import { getDisplayName, getEditUrl } from '../utils'
import { card, lengths } from '../styles'
import MaybeLink from './MaybeLink'

export const Wrapper = styled('li')`
	${card};
	margin-left: 12px;
	margin-bottom: 16px;
	position: relative;
	${({ gridHeight }) =>
		gridHeight
			? `flex: 0 0 335px; height: ${gridHeight};`
			: `width: ${lengths.topCardWidth};`}
`

const AbsoluteLink = styled(MaybeLink)`
	border-radius: ${lengths.borderRadius};
	position: absolute;
	color: currentColor;
	display: block;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;
`

const Spacing = styled('div')`
	position: relative;
	overflow: hidden;
	border-radius: ${lengths.borderRadius};
	padding: 16px 22px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: stretch;
	height: 100%;
`

const EntryCard = ({ collection, entry, gridHeight, children, ...props }) => {
	const url = getEditUrl({ collection, entry })
	const isGrid = props.viewStyle === 'VIEW_STYLE_GRID'
	return (
		<Wrapper gridHeight={isGrid && gridHeight} {...props}>
			<AbsoluteLink to={url} />
			<Spacing>{children}</Spacing>
		</Wrapper>
	)
}
EntryCard.defaultProps = { gridHeight: '240px' }

export const decorate = (options = {}) => BaseComponent => {
	const WrappedComponent = props => {
		const render = ({ inView, ref } = {}) => (
			<EntryCard {...options} {...props} innerRef={ref}>
				<BaseComponent {...props} inView={inView} />
			</EntryCard>
		)
		if (!options.observer) return render()
		return <Observer triggerOnce rootMargin='100% 0px' children={render} />
	}

	WrappedComponent.displayName = `decorate(${getDisplayName(BaseComponent)})`
	return WrappedComponent
}

export default EntryCard
