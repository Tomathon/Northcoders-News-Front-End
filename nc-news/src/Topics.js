import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Topics extends Component {
  
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
      <div>
        {this.state.topics.map((topic, i) => {
          return (
            <div key={i}> 
              <Link to={`/${topic._id}/articles`}> 
                <h2>{topic.title}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Topics;