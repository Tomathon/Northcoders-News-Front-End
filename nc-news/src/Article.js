import React, { Component } from 'react';

class Article extends Component {

  state = {
    title: '',
    body: '',
    created_by: '',
    belongs_to: '',
    comments: 0,
    votes: 0
  }

  componentDidMount() {
    this.getArticleById(this.props.match.params.article_id)
  }

  getArticleById = article_id => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          title: res.article.title,
          body: res.article.body,
          created_by: res.article.created_by,
          belongs_to: res.article.belongs_to,
          votes: res.article.votes
        })
      })
  }

  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>{this.state.body}</p>
        <p>Created by: {this.state.created_by}</p>
        <p>Topic: {this.state.belongs_to}</p>
        <p>Votes: {this.state.votes}</p>
        <p>Comments: {this.state.comments.length}</p> 
      </div>
    )
  }

}

export default Article;