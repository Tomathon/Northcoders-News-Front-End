import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import TopicArticles from './TopicArticles';

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
          <div>
            <Route exact path='/' render={() => <Home topics={this.state.topics}/>}/>
            <Route exact path='/:topic_id/articles' component={TopicArticles}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;