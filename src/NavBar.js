import React from 'react';
import { NavLink } from 'react-router-dom';

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

export default Navbar;