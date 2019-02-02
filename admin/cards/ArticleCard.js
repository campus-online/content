import React from 'react'
import styled from 'react-emotion'
import { tint } from 'polished'
import { colors, transitions } from '../styles'
import { decorate, Wrapper } from '../components/Card'
import AsyncEntryFragment from '../components/AsyncEntryFragment'
import BaseAvatar from '../components/Avatar'
import Badge from '../components/Badge'

const identity = a => a

const FlexRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 8px;
`

const EMPTY_SVG = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>'
const coverSettings = '/-/scale_crop/240x240/-/quality/lightest/'
const getCoverImage = ({src, inView}) => {
	if(!inView) return EMPTY_SVG
	if(!src || typeof src !== 'string') return 'none'
	if(!src.includes('ucarecdn.com')) return src
	return (src + '/').replace(/\/+$/, coverSettings)
}

const CoverImage = styled.img`
	position: absolute;
	bottom: 0;
	right: 0;
	display: block;
	background-color: ${tint(0.66, colors.background)};
	width: ${p => p.size}px;
	height: ${p => p.size}px;
`

const CoverFlap = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	background-color: white;
	height: ${p => Math.SQRT2 * p.size}px;
	width: ${p => Math.SQRT2 * p.size}px;
	transform-origin: center;
	transform: rotate(-45deg) translateY(-12.5%);
	transition: transform ${transitions.main};
	&:after{
		content: '';
		height: 100%;
		width: 100%;
		position: absolute;
		top: 100%;
		box-shadow: inset 0 2px 6px 0 rgba(68, 74, 87, 0.05), inset 0 1px 3px 0 rgba(68, 74, 87, 0.1), 0 0 0 1px rgba(68, 74, 87, 0.1);
	}
	${Wrapper}:hover & {
		transform: rotate(-45deg) translateY(-25%);
	}
`

const Cover = ({isGrid, size = isGrid ? 120 : 60, ...props}) => (
	<React.Fragment>
		<CoverImage size={size} src={getCoverImage(props)}/>
		<CoverFlap size={size}/>
	</React.Fragment>
)

const Title = styled.h2`margin-bottom: 8px`

const Editorial = ({slug, inView}) => (
	<AsyncEntryFragment
		collection='editorials'
		slug={slug}
		inView={inView}
		error={() => <Badge color={colors.red}>error</Badge>}
		loading={(url) => <Badge to={url}/>}
		render={(url, {color, title}) => (
			<Badge color={color} to={url}>{title}</Badge>
		)}
	/>
)

const AuthorsWrapper = styled.div`
	display: inline-flex;
	align-self: flex-start;
	flex-direction: row;
	align-items: flex-start;
	position: relative;
	z-index: 1;
	border-radius: ${p => p.size * 0.5}px;
`

const Avatar = styled(BaseAvatar)`
	transition: transform ${transitions.main};
	${({size, index = 0}) => `
		z-index: ${99 - index};
		transform: translateX(${index * size * -0.25}px);
		html[data-whatintent="mouse"] ${AuthorsWrapper}:hover &,
		html[data-whatintent="keyboard"] ${AuthorsWrapper}:focus-within & {
			transform: translateX(${index * size * 0.125}px);
		}
	`}
`

Avatar.defaultProps = { size: 32 }

const Author = ({inView, size, slug, index = 0}) => (
	<AsyncEntryFragment
		collection='authors'
		slug={slug}
		inView={inView}
		error={() => <Avatar color={colors.red} title='error' index={index}/>}
		loading={url => <Avatar to={url} index={index}/>}
		render={(url, {image, title}) => (
			<Avatar to={url} src={image} title={title} index={index}/>
		)}
	/>
)

const Authors = ({inView, size = 32, slugs = []}) => (
	<AuthorsWrapper size={size}>
		{slugs.map((slug, index) => (
			<Author key={slug} slug={slug} index={index} size={size} inView={inView}/>
		))}
	</AuthorsWrapper>
)

const DateWrapper = styled.div`
	font-size: 0.75rem;
	opacity: 0.88;
	text-transform: uppercase;
	font-variant-numeric: tabular-nums;
	font-feature-settings: "tnum", "kern", "case";
	letter-spacing: -0.66px;
`

const DateText = ({date}) => (
	<DateWrapper>
		{new Date(`${date}T12:00:00Z`).toLocaleDateString('pt-BR').replace(/\//g, ' /\u202F')}
	</DateWrapper>
)

const TagsWrapper = styled.div`
	font-size: 0.66rem;
	text-transform: lowercase;
	opacity: 0.88;
	margin: -4px 0 16px;
`

const Tags = ({tags = []}) => (
	<TagsWrapper>
		{tags.filter(identity).map(tag => `#${tag}`).join(' ')}
	</TagsWrapper>
)

const ArticleCard = ({entry, inView, viewStyle}) => {
	const isGrid = viewStyle === 'VIEW_STYLE_GRID'
	const data = entry.get('data').toJS()
	const {title, date, editorial, authors, tags, cover} = data
	return (
		<React.Fragment>
			{cover && <Cover src={cover} isGrid={isGrid} inView={inView}/>}
			<div style={{position: 'relative'}}>
				<FlexRow>
					{editorial && <Editorial slug={editorial} inView={inView}/>}
					{date && <DateText date={date}/>}
				</FlexRow>
				{title && <Title>{title}</Title>}
				{tags && <Tags tags={tags}/>}
			</div>
			{authors && authors.length > 0 && ( /* [TODO]: remove vitor dino */
				<Authors inView={inView} slugs={[...authors, '2018-1-vitor-dino']}/>
			)}
		</React.Fragment>
	)
}

export default decorate({observer: true})(ArticleCard)

