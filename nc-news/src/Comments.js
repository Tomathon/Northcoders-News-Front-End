import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Comments extends Component {

  state = {
    article: {},
    comments: [],
    comment: {},
    value: ""
  }

  componentDidMount = article_id => {
    this.getArticleComments(this.props.match.params.article_id)
    this.getArticle(this.props.match.params.article_id)
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.value)
    const comment = this.state.value;
    console.log(comment)
    this.postComment(comment);
  }

  deleteComment = (comment_id, author) => {
    if (author === "northcoder") {
      fetch(`https://pure-thicket-72217.herokuapp.com/api/comments/${comment_id}`, { 
        method: "DELETE" 
      })
        .then(res => {
          console.log(res)
          if (res.ok) this.getArticleComments(this.props.match.params.article_id);
        })
    }
  }

  postComment = comment => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${this.props.match.params.article_id}/comments`, {
      method: "POST",
      body: JSON.stringify({
        comment: comment
      }),
      headers: {"Content-Type": "application/json"}
    })
    .then(body => {
        this.setState({value: ""})
        this.getArticleComments(this.props.match.params.article_id);
      });
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
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="addComment">Add your comment</label>
            <div>
              <textarea value={this.state.value} onChange={this.handleChange} placeholder="Enter Comment"></textarea>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
        {this.state.comments.map((comment, i) => {
          return (
              <article key={i}>
                <p>{comment.body}</p>
                <p>User: <Link to={`/users/${comment.created_by}`}>{comment.created_by}</Link></p>
                <p>Votes: {comment.votes}</p>
                <button onClick={this.deleteComment.bind(null, comment._id, comment.created_by)}>Delete</button>
              </article>
          )
        })}
      </div>
    )
  }

}

export default Comments;