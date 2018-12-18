import React, { Component } from 'react';
import ReactGA from 'react-ga';
import appstore from '../../images/result/appstore2x.png';
import googleplay from '../../images/result/google-play2x.png';
import web from '../../images/result/web2x.png';
import like from '../../images/result/like2x.png';
import sadface from '../../images/result/sadface2x.png';
import './ResultPromocode.scss';
import Sharing from '../Sharing/Sharing';
import EmailForm from '../EmailForm/EmailForm';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ResultPromocode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idBlogger: this.props.idBlogger,
            subscribed: null,
            copied: false,
            copyButtonText: 'Скопировать промокод',
        };
        // this.promocodeNode = React.createRef();
        this.POSTEmail = this.POSTEmail.bind(this);
    }
    // componentDidMount() {
    //     const { promocodeNode } = this;
    //     console.log('promocodeNode: ', promocodeNode);
    //     if (promocodeNode) {
    //         const promocode = promocodeNode.current.innerText.trim();
    //         this.setState({
    //             promocode
    //         });
    //     }
    // }
    POSTEmail(event) {
        event.preventDefault();
        const { target } = event;

        fetch('https://special.tnt-premier.ru/insta-bloggers-2018/api/v1/subscribe', {
            method: 'POST',
            body: new FormData(target)
        })
        .then(response => response.json())
        .then(data => {
            const { success } = data;
            this.setState({
                subscribed: success
            });
        })
        .then(() => {
            console.log('subscribed: ', this.state);
        })
        .catch(error => {console.error(error)});
        this.shareSendGa = this.shareSendGa.bind(this);
    }
    shareSendGa(event) {
        console.log(event.currentTarget, 'current');
        if (event.currentTarget.classList.contains('sharing__socials--twitter')) {
            // SEND GA EVENT
            ReactGA.ga('send', 'event', 'Result', 'Click', 'ShareTwitter');

        } else if (event.currentTarget.classList.contains('sharing__socials--facebook')) {
             // SEND GA EVENT
            ReactGA.ga('send', 'event', 'Result', 'Click', 'ShareFacebook');

        } else if (event.currentTarget.classList.contains('sharing__socials--vk')) {
             // SEND GA EVENT
            ReactGA.ga('send', 'event', 'Result', 'Click', 'ShareVk');

        }
    }
    copyPromocode() {
        // SEND GA EVENT
        ReactGA.ga('send', 'event', 'Result', 'Click', 'CopyPromocode');
        // var promocode = document.querySelector('.result__promocode').innerText;
        // navigator.clipboard.writeText(promocode);
        //нашли наш контейнер

        // Select the email link anchor text  
        // var emailLink = document.querySelector('.result__promocode');
        // var range = document.createRange();
        // range.selectNode(emailLink);
        // window.getSelection().addRange(range);

        // try {
        //     // Now that we've selected the anchor text, execute the copy command  
        //     var successful = document.execCommand('copy');
        //     var msg = successful ? 'successful' : 'unsuccessful';
        //     console.log('Copy email command was ' + msg);
        // } catch (err) {
        //     console.log('Oops, unable to copy');
        // }

        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported  
        // window.getSelection().removeAllRanges();
    }

    render() {
        const { idBlogger, subscribed, copyButtonText } = this.state;
        const { POSTEmail, promocodeNode, shareSendGa } = this;
        const { numbersQuestions, result, givePromocode, promocode } = this.props;

        console.log('givePromocode:', givePromocode);

        if (givePromocode == true) {
            // SEND GA EVENT
            ReactGA.ga('send', 'event', 'Result', 'View', 'ViewPositiveResult');
        } else {
            // SEND GA EVENT
            ReactGA.ga('send', 'event', 'Result', 'View', 'ViewNegativeResult');
        }

        return (
            <div className="result__content">
                <div className="top-like">
                    {
                        givePromocode ?
                            <img src={like} alt="Like" /> :
                            <img src={sadface} alt="Sadface" />
                    }
                </div>
                <div className="result__title">
                    Твой результат {result} из {numbersQuestions}
                    <br />
                    {givePromocode ? (
                        <span className="title_small">
                            <span>Поздравляем! Лови</span> промокод!
                        </span>
                    ) : (
                        <span className="title_small normal">Неплохо, но недостаточно для получения промокода.</span>
                    )}
                </div>
                {givePromocode ? (
                    <div>
                        <div className="result__promocode" ref={promocode}>{promocode}</div>
                        <div className="result__attention">
                            Внимание! Промокод будет показан только 1 раз! Обязательно
                            <br /> скопируй его или отправь себе на почту.
                        </div>

                        <CopyToClipboard
                            className="button copy-button"
                            text={promocode}
                            onCopy={() => {
                                this.setState({
                                    copyButtonText: 'Промокод скопирован'
                                })
                            }}>
                            <span>{copyButtonText}</span>
                        </CopyToClipboard>

                        <EmailForm
                            className='email-form'
                            buttonText='Отправить промокод на почту'
                            submitHandler={POSTEmail}
                            subscribed={subscribed} >
                            <p className='email-form__howto'>
                                <a href='#' className='email-form__link'>
                                    Как воспользоваться промокодом?
                                </a>
                            </p>
                            <div className="result__attention">
                                *Нажимая «Отправить» вы подтверждаете, что
                                <br /> соглашаетесь получать на указанный еmail
                                <br /> рекламную и другую информацию
                            </div>
                        </EmailForm>

                        <div className="instruction">
                            <div className="instruction-content">
                                1. Скачать приложение ТНТ-PREMIER! <br />
                               <a href='https://itunes.apple.com/ru/app/tnt-premier/id1334187043' target='_blank'>
                                <img className="appstore" src={appstore} alt="App store" />
                                </a>
                                <a href='https:https://play.google.com/store/apps/details?id=gpm.tnt_premier' target='_blank'>
                                <img className="googleplay" src={googleplay} alt="Google play" />
                                </a>
                                <br />
                                <br />
                                2. Или зайти на сайт <br />
                                <a href='https://tnt-premier.ru/' target='_blank'>
                                <img className="web" src={web} alt="Web" />
                                </a>
                                <br />
                                <br />
                                3. Войти в свой аккаунт или зарегистрироваться на сервисе
                                <br />
                                4. Активировать промокод* <br />
                                - на мобильном устройстве: в разделе Моё –&gt; Промокод <br />
                                - на web версии: в разделе Профиль -&gt; Активировать промокод <br />
                                5. Приятного просмотра! <br />
                                Если возникли проблемы, пиши в нашу службу поддержки:{' '}
                                <a href="mailto:help@tnt-premier.ru">help@tnt-premier.ru</a>
                                <br />
                            </div>
                            <div className="rules">
                                * Промокод предоставляет 14 дней бесплатной подписки PREMIER на сервисе ТНT-PREMIER.
                                Датой начала действия подписки считается дата активации промокода на сервисе
                                ТНТ-PREMIER. Активировать промокод необходимо не позднее 31 декабря 2019 года.
                                <br />
                                <a href="#">Подробнее о сервисе ТНТ-PREMIER и о подписке PREMIER можно прочитать тут.</a>
                                <Sharing
                                    title='Не забудь рассказать друзьям о своей победе!'
                                    className='sharing'
                                    size={50}
                                    round={true}
                                    iconBgStyle={{
                                        fill: '#ffcd7f'
                                    }}
                                    logoFillColor='#0f1010'
                                    surveyId={idBlogger} 
                                    onChoose={shareSendGa}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="sadtext">
                            Не переживай, тебе обязательно
                            <br /> повезет в следующий раз! А чтобы
                            <br /> всегда быть в курсе наших акций,
                            <br /> введи свой еmail в поле ниже.
                        </div>

                        <EmailForm
                            className='email-form'
                            buttonText='Отправить промокод на почту'
                            submitHandler={POSTEmail}
                            subscribed={subscribed} >
                            <p className='email-form__howto'>
                                <a href='#' className='email-form__link'>
                                    Как воспользоваться промокодом?
                                </a>
                            </p>
                            <div className="result__attention">
                                *Нажимая «Отправить» вы подтверждаете, что
                                <br /> соглашаетесь получать на указанный еmail
                                <br /> рекламную и другую информацию
                            </div>
                        </EmailForm>
                    </div>
                )}
            </div>
        );
    }
}

export default ResultPromocode;