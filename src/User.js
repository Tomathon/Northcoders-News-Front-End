import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {

  state = {
    username: "",
    name: "",
    avatar: ""
  }

  componentDidMount() {
    this.getUser(this.props.match.params.user)
  }

  getUser = user => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/users/${user}`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          username: res.user.username,
          name: res.user.name,
          avatar: res.user.avatar_url
        })
      })
  }

  render() {
    return (
      <div className="User">
        <img src={this.state.avatar} alt="profile"/>
        <h3>Username: {this.state.username}</h3>
        <h4>Name: {this.state.name}</h4>
      </div>
    )
  }

}

User.propTypes = {
  user: PropTypes.string
}

export default User;