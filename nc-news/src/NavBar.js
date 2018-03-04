import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav>
          <NavLink to="/">Home</NavLink>
          {this.props.topics.map((topic, i) => {
            return (
              <a key={i} href={`/topics/${topic.slug}/articles`}>{topic.title}</a>
            )
          })}
          <NavLink to="/topics">All Topics</NavLink>
      </nav>
    )
  }
}

export default Navbar;