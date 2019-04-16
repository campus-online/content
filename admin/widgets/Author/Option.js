import React from 'react'
import Option from 'react-select/lib/components/Option'
import styled from 'react-emotion'

const FlexRow = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const FlexColumn = styled('div')`
	display: flex;
	flex-direction: column;
`

const Avatar = styled('div')`
	height: 2rem;
	width: 2rem;
	border-radius: 1rem;
	margin-right: 0.75rem;
	overflow: hidden;
	flex-shrink: 0;
	background: rgba(0, 0, 0, 0.11) center;
	background-size: cover;
	background-image: ${p => (p.src ? `url("${p.src}")` : 'none')};
`

const Period = styled('small')`
	display: block;
	font-size: 0.625rem;
`

const Wrapper = ({ children, ...props }) => (
	<Option {...props}>
		<FlexRow>{children}</FlexRow>
	</Option>
)

const AuthorOption = ({ data: { image, title, semester } = {}, ...props }) => (
	<Wrapper {...props}>
		<Avatar src={image} />
		<FlexColumn>
			<Period>{semester}</Period>
			<div>{title}</div>
		</FlexColumn>
	</Wrapper>
)

export default AuthorOption
