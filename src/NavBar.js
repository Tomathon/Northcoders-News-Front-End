import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

 const Navbar = ({topics}) => {

    return (
      <nav className="navbar">
          <NavLink to="/">HOME</NavLink>
          {topics.map((topic, i) => {
            return (
              <a key={i} href={`/topics/${topic.slug}/articles`}>{topic.title.toUpperCase()}</a>
            )
          })}
      </nav>
    )
  
}

Navbar.propTypes = {
  topics: PropTypes.array
};

export default Navbar;