import React, { Component } from 'react';
import axios from 'axios';
import q1 from '../../images/q1.jpg';
import './QuestionsBlock.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            question: '',
            answers: [],
            count: 1,
            sendanswer: 1,
            loadingQuestion: true,
            correctAnswer: ''

        };
    }
    componentDidMount() {
        axios.get('/questionsData.json')
            .then(response => {
                this.setState({ question: response.data.question, answers: response.data.answers });
            });
    }
    handleClick(e) {
        var answerNum = Number(e.target.dataset.id) + 1;
        e.target.classList.add('active');
        axios.get('/questionsData2.json', { question: this.state.count, answer: answerNum })
            .then(response => {
                this.setState({ question: response.data.question, answers: response.data.answers });
                this.setState({ loadingQuestion: false });
                if (response.data.correctAnswer == answerNum) {
                    this.setState({ correctAnswer: true});
                } else {
                  this.setState({ correctAnswer: false});
                 
                }
            });
    }
    // FOR BUTTON NEXT
    handleClick2(e) {
        this.setState((prevState, { count }) => ({
            count: prevState.count + 1
        }));
        axios.get('/questionsData2.json', { question: this.state.count })
            .then(response => {
                this.setState({ question: response.data.question, answers: response.data.answers });
            });
    }

    render() {
        const { question, answers, count, sendanswer, loadingQuestion, correctAnswer } = this.state
        return (
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
                  <span className='correctly'>
                    Ты абсолютно прав!
                  </span> :
                   <span className='wrong'>
                    Ты ошибся!
                  </span>
                  }
                </div> 

                <div className="question__image">
                    <img src={q1}/>
                </div>
                    <div className='question__answers'>
                    {answers.map((item, index) => 
                       <div key={index} data-id={index} className="question__answer" onClick={e => this.handleClick(e)}>
                           {item}
                        </div>
                    )
                    }
                    </div>
              </div>
        );
    }
}

export default App;