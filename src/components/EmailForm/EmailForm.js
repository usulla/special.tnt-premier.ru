import React from 'react'
import PropTypes from 'prop-types'
import './EmailForm.scss'

const EmailForm = ({ children, subscribed, className, buttonText, submitHandler }) =>
	(subscribed === true ?
		<div className={`${className}__callout`}>
			Ваш Email успешно <span className={`${className}__callout-success`}>отправлен!</span>
		</div> :
		subscribed === false ?
			<div className={`${className}__callout`}>
				Указанный вами Email <span className={`${className}__callout-fail`}>отклонён!</span>
			</div> :
			<form className={className} onSubmit={submitHandler}>
				<input type='email' name='email' placeholder='Введи свой email, чтобы получить промокод' className={`${className}__field`} required />
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
			</form>)

EmailForm.defaultProps = {
	children: null,
	subscribed: null,
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
	subscribed: PropTypes.oneOfType([
		PropTypes.oneOf([null]),
		PropTypes.bool
	]),
	className: PropTypes.string.isRequired,
	buttonText: PropTypes.string,
	submitHandler: PropTypes.func
}

export default EmailForm
