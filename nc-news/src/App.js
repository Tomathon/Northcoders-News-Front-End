import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './app.css';
import Navbar from './NavBar';
import Topics from './Topics';
import TopicArticles from './TopicArticles';
import Article from './Article';
import Articles from './Articles';
import User from './User';
import Comments from './Comments';

class App extends Component {
  
  state = {
    topics: []
  }

  componentDidMount() {
    this.getTopics()
  }

  getTopics = () => {
    fetch('https://pure-thicket-72217.herokuapp.com/api/topics')
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          topics: res.topics
        })
      })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Northcoders News</h1>
          </header>
          <Navbar topics={this.state.topics}/>
          <div>
            <Route exact path='/' component={Articles}/>
            <Route exact path='/articles' component={Articles}/>
            <Route exact path='/topics' component={Topics}/>
            <Route exact path='/topics/:topic/articles' component={TopicArticles}/>
            <Route exact path='/articles/:article_id' component={Article}/>
            <Route exact path='/users/:user' component={User}/>
            <Route exact path='/articles/:article_id/comments' component={Comments}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

export default App;