import React from 'react'
import PropTypes from 'prop-types'
import './Sharing.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    TwitterShareButton,
    TwitterIcon,
    FacebookShareButton,
    FacebookIcon,
    VKShareButton,
    VKIcon
} from 'react-share'

import {
    TWITTER_URL,
    TWITTER_TITLE
} from './SharingData.json'

const Sharing = ({
    title,
    className,
    size,
    round,
    iconBgStyle,
    logoFillColor
}) =>
    <div className={className}>
        <h6 className={`${className}__title`}>
            {title}
        </h6>
        <div className={`${className}__socials`}>
            <div className={`${className}__social`}>
                <TwitterShareButton className={`${className}__button ${className}__button--twitter`} url={TWITTER_URL}>
                    <TwitterIcon size={size} round={round} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
                </TwitterShareButton>
            </div>
            <div className={`${className}__social`}>
                <FacebookShareButton className={`${className}__button ${className}__button--facebook`} url={TWITTER_URL}>
                    <FacebookIcon size={size} round={round} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
                </FacebookShareButton>
            </div>
            <div className={`${className}__social`}>
                <VKShareButton className={`${className}__button ${className}__button--vk`} url={TWITTER_URL}>
                    <VKIcon size={size} round={round} iconBgStyle={iconBgStyle} logoFillColor={logoFillColor} />
                </VKShareButton>
            </div>
        </div>
    </div>

Sharing.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    round: PropTypes.bool,
    iconBgStyle: PropTypes.object,
    logoFillColor: PropTypes.string
}

Sharing.defaultProps = {
    title: '',
    className: 'sharing',
    size: 32,
    round: false,
    iconBgStyle: {},
    logoFillColor: '#000'
}

export default Sharing
