import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../images/tnt-premier-logo2x.png';
import './App.scss';
import StartPage from '../StartPage/StartPage.js';
import QuestionsBlock from '../QuestionsBlock/QuestionsBlock.js';
import ComeTomorrow from '../ComeTomorrow/ComeTomorrow.js';

ReactGA.initialize('UA-000000-01');
ReactGA.pageview(window.location.pathname + window.location.search);

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
            idBlogger: 0,
            comeTomorrow: false
        };
    }
    //получаем из компонента StartPage событие старта теста, вопрос, картинку, ответы и массив с номерами вопросов и записываем в состояния
    viewStartPage = (view, question, image, answers, numbers, idBlogger, comeTomorrow) => {
        this.setState({ viewStartPage: view, question: question, questionImage: image, answers: answers, numbersQuestions: numbers, idBlogger: idBlogger, comeTomorrow: comeTomorrow });
    }
    gaSendEvent(e){
      // SEND GA EVENT
      ReactGA.ga('send', 'event', 'Logo', 'Click', 'LogoTransition');
    }
    render() {
        const { numbersQuestions, viewStartPage, question, questionImage, answers, idBlogger, comeTomorrow } = this.state;
        return (
            <div className="App">
        <header className="tnt-premier-logo">
          <a href='https://tnt-premier.ru/' target='_blank' onClick={e => this.gaSendEvent(e)} ><img src={logo} alt="ТНТ Premier" /></a>
        </header>
        {(viewStartPage) ?
        <StartPage viewStartPage={this.viewStartPage}/> :
        <div>
        {(comeTomorrow) ?
        //  передаем в компонент с вопросами массив с номерами вопросов и контент для вопросов
        <ComeTomorrow/> :
        <QuestionsBlock numbersQuestions={numbersQuestions} question={question} questionImage={questionImage} answers={answers} idBlogger={idBlogger}/>
      }
      </div>
      }
      </div>
        );
    }
}

export default App;