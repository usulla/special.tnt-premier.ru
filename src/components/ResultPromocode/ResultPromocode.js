import React, { Component } from 'react';
// import axios from 'axios';
import appstore from '../../images/result/appstore2x.png';
import googleplay from '../../images/result/google-play2x.png';
import web from '../../images/result/web2x.png';
import like from '../../images/result/like2x.png';
import sadface from '../../images/result/sadface2x.png';
import './ResultPromocode.scss';
import Sharing from '../Sharing/Sharing'

class ResultPromocode extends Component {
    constructor() {
        super();
        this.state = {
            givePromocode: true
        };
    }
    componentDidMount() {}
    copyPromocode(e) {
        var promocode = document.querySelector('.result__promocode').innerText;
        navigator.clipboard.writeText(promocode);
    }

    render() {
        const { givePromocode } = this.state;
        return (
            <div className="result__content">
                <div className="top-like">{givePromocode ? <img src={like} alt="Like" /> : <img src={sadface} alt="Sadface" />}</div>
                <div className="result__title">
                    Твой результат ХХХ из ХХХ
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
                        <div className="result__promocode">BG3200</div>
                        <div className="result__attention">
                            Внимание! Промокод будет показан только 1 раз! Обязательно
                            <br /> скопируй его или отправь себе на почту.
                        </div>
                        <div className="button copy-button" onClick={(e) => this.copyPromocode(e)}>
                            Скопировать промокод
                        </div>
                        <div className="button send-button" onClick={(e) => this.copyPromocode(e)}>
                            Отправить промокод на почту
                        </div>

                        <div className="title_small title_small__bottom">Как воспользоваться промокодом?</div>
                        <div className="instruction">
                            <div className="instruction-content">
                                1. Скачать приложение ТНТ-PREMIER! <br />
                                <img className="appstore" src={appstore} alt="App store" />
                                <img className="googleplay" src={googleplay} alt="Google play" />
                                <br />
                                <br />
                                2. Или зайти на сайт <br />
                                <img className="web" src={web} alt="Web" />
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
                                    logoFillColor='#0f1010'/>
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
                        <div className="button send-button" onClick={(e) => this.copyPromocode(e)}>
                            Отправить
                        </div>
                        <div className="result__attention">
                            *Нажимая «Отправить» вы подтверждаете, что
                            <br /> соглашаетесь получать на указанный еmail
                            <br /> рекламную и другую информацию
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default ResultPromocode;
