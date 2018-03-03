import React, { Component } from 'react';

class Comments extends Component {

  state = {
    comments: []
  }

  componentDidMount = article_id => {
    this.getArticleComments(this.props.match.params.article_id)
  }

  getArticleComments = article_id => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}/comments`)
      .then(buffer => buffer.json())
      .then(res => {
        console.log(res)
        this.setState({
          comments: res.comments
        })
      })
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment, i) => {
          return (
              <article key={i}>
              <p>{comment.body}</p>
              <p>User: {comment.created_by}</p>
              <p>Votes: {comment.votes}</p>
              </article>
          )
        })}
      </div>
    )
  }

}

export default Comments;