import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
`

const FlexColumn = styled.div`
	display: flex;
	flex-direction: column;
`

const Avatar = styled.div`
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

const Period = styled.small`
	display: block;
	font-size: 0.625rem;
`

const AuthorSuggestion = ({image, title, semester}) => (
	<Wrapper>
		<Avatar src={image} />
		<FlexColumn>
			<Period>{semester}</Period>
			<div>{title}</div>
		</FlexColumn>
	</Wrapper>
)

export default AuthorSuggestion
export const renderSuggestion = ({data}) => <AuthorSuggestion {...data} />
