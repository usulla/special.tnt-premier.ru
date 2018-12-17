import React from 'react'
import PropTypes from 'prop-types'
import './EmailForm.scss'

const EmailForm = ({ className, buttonText, submitHandler }) =>
	<form className={className} onSubmit={submitHandler}>
		<input type='email' placeholder='Email' className={`${className}__field`} required />
		<button type='submit' className={`${className}__submit`}>
			{buttonText}
		</button>
	</form>

EmailForm.propTypes = {
	className: PropTypes.string.isRequired,
	buttonText: PropTypes.string
}

EmailForm.defaultProps = {
	className: 'email-form',
	buttonText: ''
}

export default EmailForm
