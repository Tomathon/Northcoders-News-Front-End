import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import football from './images/football.jpeg';
import cooking from './images/cooking.jpg';
import coding from './images/coding.jpg';

class Article extends Component {

  state = {
    title: "",
    body: "",
    created_by: "",
    belongs_to: "",
    comments: [],
    votes: 0,
    _id: ""
  }

  componentDidMount() {
    this.getArticleById(this.props.match.params.article_id)
    this.getArticleCommentsById(this.props.match.params.article_id)
  }

  getArticleById = article_id => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          _id: res.article._id,
          title: res.article.title,
          body: res.article.body,
          created_by: res.article.created_by,
          belongs_to: res.article.belongs_to,
          votes: res.article.votes
        })
      })
  }

  getArticleCommentsById = article_id => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}/comments`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          comments: res.comments
        })
      })
  }

  updateArticleVotes = (article_id, vote) => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}?vote=${vote}`, { 
      method: "PUT"
    })
      .then(buffer => buffer.json())
      .then(res => {
        if (vote === 'up') this.setState({votes: this.state.votes + 1})
        else if (vote === 'down' ) this.setState({votes: this.state.votes - 1})
      });
  }

  render() {
    return (
      <div className="Article-single">
        <img src={this.loadImage(this.state.belongs_to)} alt={this.state.belongs_to}/>
        <h2>{this.state.title}</h2>
        <p>{this.state.body}</p>
        <p>Created by: <Link to={`/users/${this.state.created_by}`}>{this.state.created_by}</Link></p>
        <p>Topic: <Link to={`/topics/${this.state.belongs_to}/articles`}>{this.state.belongs_to}</Link></p>
        <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.updateArticleVotes(this.state._id, 'up')}></i>
        <p className="Vote">Votes: {this.state.votes}</p>
        <i className="fa fa-thumbs-down" aria-hidden="true" onClick={() => this.updateArticleVotes(this.state._id, 'down')}></i>
        <p>Comments: <Link to={`${this.state._id}/comments`}>{this.state.comments.length}</Link></p>
      </div>
    )
  }

  loadImage = topic => {
    let imgPath = '';
    if (topic === 'football') imgPath=football
    if (topic === 'cooking') imgPath=cooking
    if (topic === 'coding') imgPath=coding
    return imgPath
  }

}

export default Article;