import React, { Component } from 'react';
import axios from 'axios';
import icon1 from '../../images/start/path2x.png';
import icon2 from '../../images/start/question2x.png';
import icon3 from '../../images/start/correct2x.png';
import icon4 from '../../images/start/play2x.png';
import icon5 from '../../images/start/flags2x.png';
import icon6 from '../../images/start/warning2x.png';
import './StartPage.scss';

class StartPage extends Component {
    constructor() {
        super();
        this.state = {};
    }

    // При нажатии кнопки Следующий вопрос
    nextQuestion(e) {
        //отправляем номер следующего вопроса
        axios.get('/questionsData3.json', { question: this.state.count })
            .then(response => {
                // удаляем все дополнительные классы у кнопок
                document.querySelector('.question__answer.active').classList.remove('active');
                document.querySelector('.question__answer.correctly').classList.remove('correctly');
                if (document.querySelector('.question__answer.wrong')) {
                    document.querySelector('.question__answer.wrong').classList.remove('wrong');
                }
                //и в ответ получаем текст вопроса, картинку, варианты ответов
                this.setState({ question: response.data.question, questionImage: response.data.questionImage, answers: response.data.answers });
                // убираем вопрос и выводим результат 
                this.setState({ loadingQuestion: true });
                // разерешаем выбирать ответ (нажимать на кнопки)
                this.setState({ allowedAnswer: true });
            });
    }

    render() {
        const { question } = this.state
        return (
            <div className="question-content">
                <div className='result__title'>
                    Хочешь подписку на ТНТ-PREMIER?
                </div>
                <div className='startpage__content'>
                    <ul className='startpage__list'>
                        <li><span><img src={icon1}/></span>Жми на кнопку ниже</li>
                        <li><span><img src={icon2}/></span>Отвечай на 5 простых вопросов</li>
                        <li><span><img src={icon3}/></span>Отвечай правильно!</li>
                        <li><span><img src={icon4}/></span>Если не ошибешься ни разу, то получишь 14 дней просмотра на ТНТ-PREMIER</li>
                        <li><span><img src={icon5}/></span>Готов? Тогда поехали!</li>
                        <li><span><img src={icon6}/></span>Внимание! Промокод будет показан только 1 раз! Обязательно скопируй его или отправь себе на почту.</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default StartPage;