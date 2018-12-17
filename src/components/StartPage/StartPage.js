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
        this.state = {
            question: '',
            questionImage: '',
            answers: [],
            count: 1,
            viewStartPage: false,
            numbersQuestions: [],
            idBlogger: ''
        };
    }

    // При нажатии кнопки Начать
    startQuestions(e) {
        //отправляем номер запрашиваемого вопроса 1
        axios.get('https://special.tnt-premier.ru/insta-bloggers-2018/api/v1/survey')
            .then(response => {
                const { data } = response;
                const idBlogger= data.survey;

                // загружаем номера вопросов из массива
               this.setState({ numbersQuestions: response.data.questions});
               axios.get(`https://special.tnt-premier.ru/insta-bloggers-2018/api/v1/question/${response.data.questions[0]}`)
                    .then(response => {
                        // загружаем в состояния текст, картинку вороса и тексты вариантов ответов
                        const { data } = response;
                        const {
                                question,
                                answers } = data;

                        const questionImage = data.image;


                        this.setState({
                            question,
                            questionImage,
                            answers,
                            idBlogger
                        });
                        // отправляем в App, что можно показывать вопросы
                        this.props.viewStartPage(this.state.viewStartPage, this.state.question, this.state.questionImage, this.state.answers, this.state.numbersQuestions, this.state.idBlogger);
                    });
            })
            .catch(error => {console.error(error)});
    }

    render() {
        const { question } = this.state
        return (
            <div className="question-content">
                <div className='result__title'>
                    Хочешь подписку<br/> на ТНТ-PREMIER?
                </div>
                <div className='startpage__content'>
                    <ul className='startpage__list'>
                        <li><span><img src={icon1} alt="Storage icon"/></span>Жми на кнопку ниже</li>
                        <li><span><img src={icon2} alt="Storage icon"/></span>Отвечай на 5 простых вопросов</li>
                        <li><span><img src={icon3} alt="Storage icon"/></span>Отвечай правильно!</li>
                        <li><span><img src={icon4} alt="Storage icon"/></span>Если не ошибешься ни разу, то получишь 14 дней просмотра на ТНТ-PREMIER</li>
                        <li><span><img src={icon5} alt="Storage icon"/></span>Готов? Тогда поехали!</li>
                        <li><span><img src={icon6} alt="Storage icon"/></span>Внимание! Промокод будет показан только 1 раз! Обязательно скопируй его или отправь себе на почту.</li>
                    </ul>
                    <div className='button start-button' onClick={e => this.startQuestions(e)} >
                Начать
              </div>
                </div>
            </div>
        );
    }
}

export default StartPage;