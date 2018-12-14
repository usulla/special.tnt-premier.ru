import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/tnt-premier-logo2x.png';
import './App.scss';
import StartPage from '../StartPage/StartPage.js';
import QuestionsBlock from '../QuestionsBlock/QuestionsBlock.js';
library.add(faIgloo)

class App extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            questionImage: '',
            answers: [],
            count: 1,
            viewStartPage: true,
            numbersQuestions: [],
            idBlogger: 0

        };
    }
    //получаем из компонента StartPage событие старта теста, вопрос, картинку, ответы и массив с номерами вопросов и записываем в состояния
    viewStartPage = (view, question, image, answers, numbers, idBlogger) => {
        this.setState({ viewStartPage: view, question: question, questionImage:image, answers:answers, numbersQuestions:numbers, idBlogger:idBlogger});
        console.log(this.state.idBlogger, 'idBlogger');
    }
    render() {
        const { numbersQuestions, viewStartPage, question, questionImage, answers, idBlogger } = this.state;
        return (
            <div className="App">
           <header className="tnt-premier-logo">
          <a href='https://tnt-premier.ru/' target='_blank'><img src={logo} alt="ТНТ Premier" /></a>
        </header>
        {(viewStartPage) ?
        <StartPage viewStartPage={this.viewStartPage}/> :
        //  передаем в компонент с вопросами массив с номерами вопросов и контент для вопросов
        <QuestionsBlock numbersQuestions={numbersQuestions} question={question} questionImage={questionImage} answers={answers} idBlogger={idBlogger}/>
      }
      </div>
        );
    }
}

export default App;