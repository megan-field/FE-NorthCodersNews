import React, { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
import { Route, BrowserRouter} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to NC News</h1>
          {/* <NavBar /> */}
        </header>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
