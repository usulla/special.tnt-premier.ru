import React, { Component } from 'react';
import hourglass from '../../images/result/hourglass.svg';

class ComeTomorrow extends Component {

    render() {
        return (
            <div className="result__content">
                <div className="top-like">{<img src={hourglass} alt="ТНТ-PREMIER" />}</div>
                <div className="result__title">
                    Черезмерное умственное <br/>перенапряжение опасно для<br/> здоровья! 
                    <br /><br/>
                        <span className="title_small normal">Но мы заботимся о тебе, поэтому<br/> ограничили доступ на сегодня. <br/>
                            Отдохни и заглядывай к нам завтра!
                        </span>
                </div>
            </div>
        );
    }
}

export default ComeTomorrow;