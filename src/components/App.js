import React, { Component } from 'react';
import NavBar from './NavBar';
import ArticlesByTopic from './ArticlesByTopic';
import ClickedArticle from './ClickedArticle';
import UsersPage from './UsersPage';
import Home from './Home';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">NC News</h1>
            <NavBar />
          </header>
          <Route exact path="/" component={Home} />
          <Route path="/topics/:topic_id/articles" component={ArticlesByTopic} />
          <Route path="/articles/:_id" component={ClickedArticle} />
          <Route path="/users/:username" component={UsersPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;