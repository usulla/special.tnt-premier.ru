import React from 'react'
import PropTypes from 'prop-types'
import './EmailForm.scss'

const EmailForm = ({ children, className, buttonText, submitHandler }) =>
	<form className={className} onSubmit={submitHandler}>
		<input type='email' name='email' placeholder='Email' className={`${className}__field`} required />
		<div className={`${className}__group ${className}__group--checkbox`}>
			<input
				type='checkbox'
				name='subscribe-permit'
				id='subscribe-permit'
				className={`visibility-hidden ${className}__checkbox`}
				required />
			<label htmlFor='subscribe-permit' className={`${className}__checkbox ${className}__checkbox--fake`} />
			<label htmlFor='subscribe-permit' className={`${className}__label`}>
				Согласен получать информационные рассылки, в том числе рекламные и иные материалы ООО «ГПМ РТВ» и третьих лиц
			</label>
		</div>
		<button type='submit' className={`${className}__submit`}>
			{buttonText}
		</button>
		{
			children ?
				children :
				null
		}
	</form>

EmailForm.defaultProps = {
	children: null,
	className: 'email-form',
	buttonText: '',
	submitHandler: f => f
}

EmailForm.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
		PropTypes.string
	]),
	className: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
	submitHandler: PropTypes.func
}

export default EmailForm
