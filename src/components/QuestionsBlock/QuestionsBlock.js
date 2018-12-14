import React, { Component } from 'react';
import axios from 'axios';
import q1 from '../../images/q1.jpg';
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
            changeImage: true
        };
    }
    componentDidMount() {
        const { numbersQuestions } = this.props;
        this.setState({ numbersQuestions });
    }

    answerClick(e) {
        if (this.state.allowedAnswer == true) {
            this.setState({ allowedAnswer: false });
            // Номер 2-го и следующих вопросов для отправки на бэкенд
            var currentNum = this.props.numbersQuestions[(this.state.count) - 1];
            this.setState({ currentQuestions: currentNum });
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
                .then(response => {
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
                    if (correctAnswer == answerNum) {
                        this.setState({ correctAnswer: true });
                        document.querySelector('.question__answer.active').classList.add('correctly');

                    } else {
                        // если неверный ответ меняем состояние на false
                        this.setState({ correctAnswer: false });
                        //и добавляем к кнопке класс wrong
                        document.querySelector('.question__answer.active').classList.add('wrong');
                        // а к верному ответу класс correctly
                        document.querySelectorAll('.question__answer')[correctAnswer].classList.add('correctly');

                    }
                });
        }
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
        // увеличиваем номер вопроса
        this.setState((prevState, { count }) => ({
            count: prevState.count + 1
        }));
    }

    render() {
        const { count, sendanswer, loadingQuestion, correctAnswer, textStatus, changeImage } = this.state;
        const { numbersQuestions, question, questionImage, answers, idBlogger } = this.props;
        return (
            (count < 1) ?
            <div className="question-content">
                <div className="question__number-row">
                  <div className="question__number">
                    <span>{count}</span> из 5
                  </div>
                </div>
                <div className="question__title">
                  {(loadingQuestion) ?
                  <span>
                    {question}
                  </span> : 
                  (correctAnswer) ?
                  <div>
                  <span className='correctly'>
                    {textStatus}
                  </span>
                  <div className='button next-question' onClick={e => this.nextQuestion(e)}>Следующий вопрос</div>
                   </div> :
                  <div>
                   <span className='wrong'>
                    {textStatus}
                   </span>
                   <div className='button next-question' onClick={e => this.nextQuestion(e)}>Следующий вопрос</div>
                   </div>
                  }
                </div> 

                <div className="question__image">
                {(changeImage) ?
                    <img src={questionImage}/> :
                    <img src={changeImage}/>
                }
                </div>
                    <div className='question__answers'>
                    {answers.map((item, index) => 
                       <div key={index} data-id={index} className="question__answer" onClick={e => this.answerClick(e)}>
                           {item}
                        </div>
                    )
                    }
                    </div>
              </div> :
            <ResultPromocode idBlogger={idBlogger}/>
        );
    }
}

export default QuestionsBlock;