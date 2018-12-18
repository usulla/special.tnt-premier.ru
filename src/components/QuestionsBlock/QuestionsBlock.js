import React, { Component } from 'react';
import ReactGA from 'react-ga';
import axios from 'axios';
import arrow_right from '../../images/arrow-right2x.png';
import negative from '../../images/negative.svg';
import check from '../../images/check.svg';
import './QuestionsBlock.scss';
import ResultPromocode from '../ResultPromocode/ResultPromocode.js';

class QuestionsBlock extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            questionImage: '',
            answers: [],
            count: 1,
            sendanswer: 1,
            loadingQuestion: true,
            correctAnswer: '',
            allowedAnswer: true,
            numbersQuestions: [],
            currentQuestions: 2,
            textStatus: 'Ты абсолютно прав!',
            imageChange: '',
            changeImage: true,
            result: 0,
            promocode: ''
        };
    }
    componentDidMount() {
        const { numbersQuestions } = this.props;
        this.setState({
            numbersQuestions,
            question: this.props.question,
            answers: this.props.answers,
            questionImage: this.props.questionImage
        });
    }

    answerClick(e) {
        if (this.state.allowedAnswer === true) {
            this.setState({ allowedAnswer: false });
            // Номер 2-го и следующих вопросов для отправки на бэкенд
            var currentNum = this.props.numbersQuestions[this.state.count - 1];
            this.setState({ currentQuestions: currentNum });
            // EVENT SEND TO GA
            ReactGA.ga('send', 'event', 'Questions', 'Click', `AnsweredToQuestion-${this.state.count}`);
            // Номер выбранного овтета
            var answerNum = Number(e.target.dataset.id) + 1;
            e.target.classList.add('active');
            // отправляем номер текущего вопроса и номер выбранного ответа
            var formData = new FormData();
            formData.append('question', currentNum);
            formData.append('answer', answerNum);
            fetch(`https://special.tnt-premier.ru/insta-bloggers-2018/api/v1/question/${currentNum}`, {
                method: 'POST',
                body: formData
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // номер верного ответа
                    var correctAnswer = Number(data.correctAnswer);
                    var textStatus = data.text;

                    // картинка, которая меняется при ответе на вопрос
                    if (data.image) {
                        this.setState({ imageChange: data.image, changeImage: false });
                    }
                    // убираем вопрос и выводим результат
                    this.setState({ loadingQuestion: false, textStatus: textStatus });
                    // если верный ответ меняем состояние на true и добавляем к кнопке класс correctly
                    if (correctAnswer === answerNum) {
                        this.setState({ correctAnswer: true });
                        document.querySelector('.question__answer.active').classList.add('correctly');
                    } else {
                        // если неверный ответ меняем состояние на false
                        this.setState({ correctAnswer: false });
                        //и добавляем к кнопке класс wrong
                        document.querySelector('.question__answer.active').classList.add('wrong');
                        // а к верному ответу класс correctly
                        document.querySelectorAll('.question__answer')[correctAnswer - 1].classList.add('correctly');
                    }
                });
        }
    }
    // При нажатии кнопки Следующий вопрос
    nextQuestion(e) {
        const { count } = this.state;
        const newVal = count + 1;
        // увеличиваем номер вопроса
        this.setState({ count: newVal });
        if (newVal < 6) {
            //отправляем номер следующего вопроса
            var currentNum = this.props.numbersQuestions[newVal - 1];
            axios
                .get(`https://special.tnt-premier.ru/insta-bloggers-2018/api/v1/question/${currentNum}`, {
                    question: currentNum
                })
                .then((response) => {
                    // удаляем все дополнительные классы у кнопок
                    document.querySelector('.question__answer.active').classList.remove('active');
                    document.querySelector('.question__answer.correctly').classList.remove('correctly');

                    if (document.querySelector('.question__answer.wrong')) {
                        document.querySelector('.question__answer.wrong').classList.remove('wrong');
                    }
                    //и в ответ получаем текст вопроса, картинку, варианты ответов
                    // убираем вопрос и выводим результат
                    // разерешаем выбирать ответ (нажимать на кнопки)
                    this.setState({
                        question: response.data.question,
                        questionImage: response.data.image,
                        answers: response.data.answers,
                        loadingQuestion: true,
                        allowedAnswer: true,
                        changeImage: true
                    });
                });
        } else {
            axios.get('https://special.tnt-premier.ru/insta-bloggers-2018/api/v1/complete').then((response) => {
                //и в ответ получаем текст вопроса, картинку, варианты ответов
                this.setState({ result: response.data.validCount, promocode: response.data.promoCode });
            });
        }
    }

    render() {
        const {
            count,
            question,
            answers,
            questionImage,
            loadingQuestion,
            correctAnswer,
            textStatus,
            changeImage,
            imageChange,
            result,
            promocode
        } = this.state;

        const { numbersQuestions, idBlogger } = this.props;
        const givePromocode = Number(result) < numbersQuestions.length ? false : true;

        return count < 6 ? (
            <div className="question-content">
                <div className="question__number-row">
                    <div className="question__number">
                        <span>{count}</span> из 5
                    </div>
                </div>
                <div className="question__title">
                    {loadingQuestion ? (
                        <span>{question}</span>
                    ) : correctAnswer ? (
                        <div>
                            <span className="correctly">
                                <img src={check} alt='check' />
                                {textStatus}
                            </span>
                            <div className="button next-question" onClick={(e) => this.nextQuestion(e)}>
                                Следующий вопрос <img src={arrow_right} alt="Следующий вопрос" />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span className="wrong">
                                <img src={negative} alt='negative' />
                                {textStatus}
                            </span>
                            <div className="button next-question" onClick={(e) => this.nextQuestion(e)}>
                                Следующий вопрос <img src={arrow_right} alt="Следующий вопрос" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="question__image">
                    {changeImage ? <img src={questionImage} alt='Question icon' /> : <img src={imageChange} alt='Chane icon' />}
                </div>
                <div className="question__answers">
                    {answers.map((item, index) => (
                        <div
                            key={index}
                            data-id={index}
                            className="question__answer"
                            onClick={(e) => this.answerClick(e)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <ResultPromocode
                idBlogger={idBlogger}
                result={result}
                promocode={promocode}
                givePromocode={givePromocode}
                numbersQuestions={this.state.numbersQuestions.length}
            />
        );
    }
}

export default QuestionsBlock;
