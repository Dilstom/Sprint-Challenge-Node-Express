import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ProjectList from './components/ProjectList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
         <Switch>
           <Route exact path='/' component={ ProjectList } />
        </Switch>
        </div>
      </div>
    );
  }
}

export default App;
