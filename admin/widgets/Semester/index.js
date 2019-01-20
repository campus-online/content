import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class SemesterControl extends Component {
	static defaultProps = {value: ''}
	static propTypes = {
		onChange: PropTypes.func.isRequired,
		forID: PropTypes.string,
		value: PropTypes.node,
		classNameWrapper: PropTypes.string.isRequired,
		setActiveStyle: PropTypes.func.isRequired,
		setInactiveStyle: PropTypes.func.isRequired,
	}

	isValid() {
		const {value, field} = this.props
		const required = field.get('required')
		const error = {
			type: 'CUSTOM',
			error: true,
			message: field.get('error') || 'precisa ser um semestre válido',
		}

		if (typeof value !== 'string') return error
		if (!required && !value) return true
		if (value.length !== 6) return error
		if (!/^\d{4}\/\d$/.test(value)) return error
		return true
	}

	render() {
		const {
			forID,
			value,
			onChange,
			classNameWrapper,
			setActiveStyle,
			setInactiveStyle,
		} = this.props

		return (
			<input
				type="text"
				id={forID}
				className={classNameWrapper}
				value={value || ''}
				onChange={e => onChange(e.target.value)}
				onFocus={setActiveStyle}
				onBlur={setInactiveStyle}
			/>
		)
	}
}
