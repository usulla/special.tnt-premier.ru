import React from 'react'
import ReactGA from 'react-ga';
import PropTypes from 'prop-types'
import './Sharing.scss'

import {
    TwitterShareButton,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    VKShareButton,
    VKIcon
} from 'react-share'

const Sharing = ({
    title,
    className,
    size,
    round,
    iconBgStyle,
    logoFillColor,
    surveyId,
    onChoose
}) => {
    const url = `https://special.tnt-premier.ru/insta-bloggers-2018/?survey=${surveyId}`

    return (
        <div className={className}>
            <h6 className={`${className}__title`}>
                {title}
            </h6>
            <div className={`${className}__socials`}>
                <div className={`${className}__social ${className}__socials--twitter`} onClick={onChoose}>
                    <TwitterShareButton className={`${className}__button ${className}__button--twitter`} url={url}>
                        <TwitterIcon size={size} round={round} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
                    </TwitterShareButton>
                </div>
                <div className={`${className}__social ${className}__socials--facebook`} onClick={onChoose}>
                    <FacebookShareButton className={`${className}__button ${className}__button--facebook`} url={url}>
                        <FacebookIcon size={size} round={round} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
                    </FacebookShareButton>
                </div>
                <div className={`${className}__social ${className}__socials--vk`} onClick={onChoose}>
                    <VKShareButton className={`${className}__button ${className}__button--vk`} url={url}>
                        <VKIcon size={size} round={round} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
                    </VKShareButton>
                </div>
            </div>
        </div>
    )
}

Sharing.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    round: PropTypes.bool,
    iconBgStyle: PropTypes.object,
    logoFillColor: PropTypes.string,
    url: PropTypes.string.isRequired,
    onChoose: PropTypes.func
}

Sharing.defaultProps = {
    title: '',
    className: 'sharing',
    size: 32,
    round: false,
    iconBgStyle: {},
    logoFillColor: '#000',
    url: '',
    onChoose: f => f
}

export default Sharing