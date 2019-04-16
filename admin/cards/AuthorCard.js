import React from 'react'
import styled from 'react-emotion'
import { decorate } from '../components/Card'
import BaseAvatar from '../components/Avatar'

const Avatar = styled(BaseAvatar)`
	margin-left: -4px;
	margin-right: 10px;
`

const Wrapper = styled('div')`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
`

const Semester = styled('div')`
	font-size: 0.75rem;
	opacity: 0.88;
	text-transform: uppercase;
	font-variant-numeric: tabular-nums;
	font-feature-settings: 'tnum', 'kern', 'case';
	letter-spacing: -0.66px;
	line-height: 18px;
`

const Title = styled('h2')`
	margin: 0px;
	line-height: 20px;
`

const Description = styled('p')`
	margin: 0px;
	font-size: 0.75rem;
	margin-top: 16px;
	&:after {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 22px;
		background: linear-gradient(#fff0, #ffff);
	}
`

const AuthorCard = ({ entry, viewStyle }) => {
	const isGrid = viewStyle === 'VIEW_STYLE_GRID'
	const { title, semester, image, body } = entry.get('data').toJS()
	const description = isGrid && (body || '').replace(/(?:^\s+|\s$)/g, '')
	return (
		<Wrapper>
			<Avatar src={image} size={40} />
			<div style={{ flex: 1 }}>
				{semester && <Semester>{semester}</Semester>}
				{title && <Title>{title}</Title>}
			</div>
			{description && <Description>{description}</Description>}
		</Wrapper>
	)
}

export default decorate({ gridHeight: '160px' })(AuthorCard)
