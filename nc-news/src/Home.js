import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        {this.props.topics.map((topic, i) => {
          return (
            <div key={i}> 
              <Link to={`/${topic.slug}/articles`}> 
                <h2>{topic.title}</h2>
              </Link>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Home;