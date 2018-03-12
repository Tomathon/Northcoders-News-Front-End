import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import football from './images/football.jpeg';
import cooking from './images/cooking.jpg';
import coding from './images/coding.jpg';

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
      <div className="Topics">
        {this.state.topics.map((topic, i) => {
          return (
            <div className="Topic" key={i}>
              <img className="Topic-image" src={this.loadImage(topic.slug)} alt={topic.title}/>
              <Link to={`topics/${topic.slug}/articles`}> 
                <h2>{topic.title}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }

  loadImage = topic => {
    let imgPath = '';
    if (topic === 'football') imgPath=football
    if (topic === 'cooking') imgPath=cooking
    if (topic === 'coding') imgPath=coding
    return imgPath
  }

}

export default Topics;