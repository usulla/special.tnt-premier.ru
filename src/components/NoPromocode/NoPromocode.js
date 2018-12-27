import React, { Component } from 'react';
import hourglass from '../../images/result/hourglass.svg';

class NoPromocode extends Component {

    render() {
        return (
            <div className="result__content">
                <div className="top-like">{<img src={hourglass} alt="ТНТ-PREMIER" />}</div>
                <div className="result__title">
                    Увы, но ты опоздал <br/>Конкурс завершен!
                    <br /><br/>
                        <span className="title_small normal">
                        Но не расстраивайся, мы обязательно<br/> придумаем что-то новенькое!
                        </span>
                </div>
            </div>
        );
    }
}

export default NoPromocode;