import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class TopicArticles extends Component {
  
  state = {
    articles: []
  }

  componentDidMount = topic => {
    this.getArticlesByTopic(this.props.match.params.topic)
  }

  getArticlesByTopic = topic => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/topics/${topic}/articles`)
      .then(buffer => buffer.json())
      .then(res => {
        this.setState({
          articles: res.articles
        })
      })
  }

  updateArticleVotes = (article_id, vote) => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}?vote=${vote}`, { 
      method: "PUT"
    })
      .then(buffer => buffer.json())
      .then(res => {
        this.state.articles.forEach(article => {
          if (article._id === article_id && vote === 'up') article.votes += 1;
          else if (article._id === article_id && vote === 'down') article.votes -=1;
        });
        this.setState({
          articles: this.state.articles
        });
      })
  }

  render() {
    return (
      <div className="Topic-articles">
        {this.state.articles.map((article, i) => {
            return (
              <div className="Topic-article" key={i}>
                <Link to={`/articles/${article._id}`}>
                  <h3>{article.title}</h3>
                  <p>{article.body}</p>
                </Link>
                  <p>Author: <Link to={`/users/${article.created_by}`}>{article.created_by}</Link></p>
                  <p><Link to={`/articles/${article._id}/comments`}>Comments</Link></p>
                  <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.updateArticleVotes(article._id, 'up')}></i>
                  <p className="Vote">Votes: {article.votes}</p>
                  <i className="fa fa-thumbs-down" aria-hidden="true" onClick={() => this.updateArticleVotes(article._id, 'down')}></i>
              </div>
            )
        })}
    </div>
    )
  }

}

TopicArticles.propTypes = {
  article_id: PropTypes.string,
  topic: PropTypes.string
};

export default TopicArticles;