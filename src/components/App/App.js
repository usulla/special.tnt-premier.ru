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
  render() {
    return (
      <div className="App">
        <header className="tnt-premier-logo">
          <img src={logo} alt="ТНТ Premier" />
        </header>
        <StartPage/>
        <QuestionsBlock/>
      </div>
    );
  }
}

export default App;
