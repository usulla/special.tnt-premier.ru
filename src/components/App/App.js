import React, { Component } from 'react';
import logo from '../../images/tnt-premier-logo2x.png';
import './App.scss';
import QuestionsBlock from '../QuestionsBlock/QuestionsBlock.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="tnt-premier-logo">
          <img src={logo} alt="ТНТ Premier" />
        </header>
        <QuestionsBlock/>
      </div>
    );
  }
}

export default App;
