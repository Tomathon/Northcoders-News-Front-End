import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comments extends Component {

  state = {
    article: {},
    comments: []
  }

  componentDidMount = article_id => {
    this.getArticleComments(this.props.match.params.article_id)
    this.getArticle(this.props.match.params.article_id)
  }

  getArticleComments = article_id => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}/comments`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          comments: res.comments
        })
      })
  }

  getArticle = article_id => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          article: res.article
        })
      })
  }

  render() {
    return (
      <div>
        <p><Link to={`/articles/${this.state.article._id}`}>Back to Article</Link></p>
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