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
            viewStartPage: true
        };
    }
    viewStartPage = (value) => {
        this.setState({ viewStartPage: value })
    }
    render() {
        const { viewStartPage } = this.state
        return (
            <div className="App">
        <header className="tnt-premier-logo">
          <img src={logo} alt="ТНТ Premier" />
        </header>
        {(viewStartPage) ?
        <StartPage viewStartPage={this.viewStartPage}/> :
        <QuestionsBlock/>
      }
      </div>
        );
    }
}

export default App;