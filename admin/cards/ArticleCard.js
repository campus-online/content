import React from 'react'
import styled, { css } from 'react-emotion'
import { tint, shade, rgba } from 'polished'
import { Link } from 'react-router-dom'
import { EntryLoader } from 'netlify-cms'
import { getEditUrl } from '../utils'
import { colors, focusableShadow, focusableBadge, transitions } from '../styles'
import { decorate, Wrapper } from '../components/Card'

const identity = a => a

const MaybeLink = props => props.to ? <Link {...props}/> : <span {...props}/>

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


const placeholder = <React.Fragment>&nbsp;</React.Fragment>
const Badge = styled(MaybeLink)`
	${focusableBadge};
	display: block;
	position: relative;
	z-index: 1;
	flex: 0 0 auto;
	background-color: ${props => tint(0.88, props.color)};
	color: ${props => shade(0.22, props.color)};
	min-width: ${props => props.children === placeholder ? '92px' : 'auto'};
`

Badge.defaultProps = {
	color: colors.inactive,
	children: placeholder,
}

const Title = styled.h2`margin-bottom: 8px`

const Editorial = ({slug, collection = 'editorials', inView}) => {
	const url = getEditUrl({collection, slug})

	if (!inView) return <Badge to={url}/>

	return (
		<EntryLoader
			collection={collection}
			slug={slug}
			render={({isFetching, error, data}) => {
				if (isFetching) return <Badge to={url}/>
				if (error) return <Badge color={colors.red}>error</Badge>
				return <Badge color={data.color} to={url}>{data.title}</Badge>
			}}
		/>
	)
}

const AuthorsWrapper = styled.div`
	display: inline-flex;
	align-self: flex-start;
	flex-direction: row;
	align-items: flex-start;
	position: relative;
	z-index: 1;
`

const wrap = src => `url("${src}")`
const avatarSettings = '/-/scale_crop/64x64/-/quality/lightest/'
const getAvatarImage = ({src}) => {
	if(!src || typeof src !== 'string') return 'none'
	if(!src.includes('ucarecdn.com')) return wrap(src)
	return wrap((src + '/').replace(/\/+$/, avatarSettings))
}

const avatarInset = [
	'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.25)',
	'inset 0px 0px 8px -1px rgba(0, 0, 0, 0.25)',
].join(', ')

const Avatar = styled(MaybeLink)`
	${props => props.to && focusableShadow({shadow: props.src && avatarInset})}
	position: relative;
	display: block;
	height: 32px;
	width: 32px;
	border-radius: 16px;
	overflow: hidden;
	flex: 0 0 auto;
	background-size: cover;
	transition: transform ${transitions.main};
	background-color: ${props => tint(0.88, props.color)};
	background-image: ${getAvatarImage};
	${({index = 0}) => css`
		z-index: ${99 - index};
		transform: translateX(${index * -8}px);
		html[data-whatintent="mouse"] ${AuthorsWrapper}:hover &,
		html[data-whatintent="keyboard"] ${AuthorsWrapper}:focus-within & {
			transform: translateX(${index * 4}px);
		}
	`}
`

Avatar.defaultProps = {
	color: colors.inactive,
}


const Author = ({inView, slug, collection = 'authors', index = 0}) => {
	const url = getEditUrl({collection, slug})

	if(!inView) return <Avatar to={url} index={index}/>

	return (
		<EntryLoader
			collection={collection}
			slug={slug}
			render={({isFetching, error, data}) => {
				if (isFetching) return <Avatar to={url} index={index}/>
				if (error) return <Avatar color={colors.red} title='error' index={index}/>
				return <Avatar to={url} src={data.image} title={data.title} index={index} />
			}}
		/>
	)
}

const Authors = ({inView, slugs = []}) => (
	<AuthorsWrapper>
		{slugs.map((slug, index) => (
			<Author key={slug} slug={slug} index={index} inView={inView}/>
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
	text-transform: lowecase;
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
	const {title, date, editorial, authors, tags, featured, cover} = data
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
			{authors && authors.length > 0 && (
				<Authors inView={inView} slugs={[...authors, '2018-1-vitor-dino']}/>
			)}
		</React.Fragment>
	)
}

export default decorate()(ArticleCard)

