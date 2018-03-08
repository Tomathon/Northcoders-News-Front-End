import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
          <NavLink to="/">HOME</NavLink>
          {this.props.topics.map((topic, i) => {
            return (
              <a key={i} href={`/topics/${topic.slug}/articles`}>{topic.title.toUpperCase()}</a>
            )
          })}
          <NavLink to="/topics">ALL TOPICS</NavLink>
      </nav>
    )
  }
}

export default Navbar;