import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Comments extends Component {

  state = {
    article: {},
    comments: [],
    comment: {},
    value: ""
  }

  componentDidMount() {
    this.getArticleComments(this.props.match.params.article_id)
    this.getArticle(this.props.match.params.article_id)
  }

  handleChange = event => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault();
    const comment = this.state.value;
    this.postComment(comment);
  }

  deleteComment = (comment_id, author) => {
    if (author === "northcoder") {
      fetch(`https://pure-thicket-72217.herokuapp.com/api/comments/${comment_id}`, { 
        method: "DELETE" 
      })
        .then(res => {
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
          comments: res.comments.reverse()
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

  updateCommentVotes = (comment_id, vote) => {
    const updatedCommentVotes = this.state.comments
    updatedCommentVotes.forEach(comment => {
      if (comment._id === comment_id && vote === 'up') comment.votes += 1;
      else if (comment._id === comment_id && vote === 'down')comment.votes -=1;
    });
    this.setState({
      comments: this.state.comments
    });
    fetch(`https://pure-thicket-72217.herokuapp.com/api/comments/${comment_id}?vote=${vote}`, { 
      method: "PUT"
    })
  }

  render() {
    return (
      <div className="Comments">
        <div>
          <h3>{this.state.article.title}</h3>
          <p>{this.state.article.body}</p>
        </div>
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
              <article className="Comment" key={i}>
                <p>{comment.body}</p>
                <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.updateCommentVotes(comment._id, 'up')}></i>
                <p className="Vote">Votes: {comment.votes}</p>
                <i className="fa fa-thumbs-down" aria-hidden="true" onClick={() => this.updateCommentVotes(comment._id, 'down')}></i>
                <p>User: <Link className="User-link" to={`/users/${comment.created_by}`}>{comment.created_by}</Link></p>
                <i className="fa fa-trash" aria-hidden="true" onClick={this.deleteComment.bind(null, comment._id, comment.created_by)}></i>
              </article>
          )
        })}
      </div>
    )
  }

}

Comments.propTypes = {
  article_id: PropTypes.string
};

export default Comments;