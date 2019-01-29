import React, {forwardRef} from 'react'
import CMS from 'netlify-cms'
import {renderSuggestion} from './Suggestion'

const Relation = CMS.getWidget('relation')

function isValid() {
	const {value, field} = this.props
	const required = field.get('required')
	const error = {
		type: 'CUSTOM',
		error: true,
		message: field.get('error') || 'precisa ser uma editoria válida',
	}

	if (typeof value === 'string' && value !== '') return error
	if (!required) {
		if (!value) return true
		if (!value.slug && !value.name) return true
	}
	if (!value) return error
	if (typeof value.slug !== 'string') return error
	if (value.slug.length < 1) return error
	return true
}

const methods = {
	isValid,
	renderSuggestion,
	shouldRenderSuggestions: () => true,
	getSuggestionValue: ({slug, data}) => ({
		title: data.title || '',
		slug: slug && `/editorias/${slug}/`,
	}),
	valueToFieldString: _value => {
		const value = _value.toJS ? _value.toJS() : _value
		return String((value || {}).title || value || '')
	},
}

const EditorialControl = forwardRef((props, ref) => (
	<Relation.control ref={ref} {...props} {...methods} />
))

EditorialControl.displayName = 'EditorialControl'

export default EditorialControl
