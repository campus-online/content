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

const Color = styled.div`
	height: 2rem;
	width: 2rem;
	border-radius: 1rem;
	margin-right: 0.75rem;
	overflow: hidden;
	flex-shrink: 0;
	background: rgba(0, 0, 0, 0.11) center;
`

const Period = styled.small`
	display: block;
	font-size: 0.625rem;
`

const EditorialSuggestion = ({title, semester, color}) => (
	<Wrapper>
		<Color style={{backgroundColor: color}} />
		<FlexColumn>
			<Period>{semester}</Period>
			<div>{title}</div>
		</FlexColumn>
	</Wrapper>
)

export default EditorialSuggestion
export const renderSuggestion = ({data}) => <EditorialSuggestion {...data} />
