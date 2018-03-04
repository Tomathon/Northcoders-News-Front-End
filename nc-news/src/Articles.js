import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Articles extends Component {

  state = {
    articles: []
  }

  componentDidMount() {
    this.getArticles()
  }

  componentWillUpdate() {
    this.getArticles()
  }

  getArticles = () => {
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles`)
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
        const updatedArticles = this.state.articles.map(article => {
          if (article._id === res._id) return res;
          else return article;
        });
        this.setState({
          articles: updatedArticles
        });
      })
  }

  render() {
    return (
      <div>
        <h2>Latest Articles</h2>
          <div className="articles">
            {this.state.articles.map((article, i) => (
              <div key={i}>
                      <h3>{article.title}</h3>
                      <p>Author: <Link to={`/users/${article.created_by}`}>{article.created_by}</Link></p>
                      <p><Link to={`/articles/${article._id}`}>{this.shortenStr(article.body)}</Link></p>
                      <p>Topic: <Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p>
                      <p><Link to={`/articles/${article._id}/comments`}>Comments</Link></p>
                      <button onClick={() => this.updateArticleVotes(article._id, 'up')}>Up</button>
                      <p>Votes: {article.votes}</p>
                      <button onClick={() => this.updateArticleVotes(article._id, 'down')}>Down</button>
              </div>
            ))}
          </div>
      </div>
    )
  }

  shortenStr = str => {
    let spaces = []
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') spaces.push(i);
    }
    let sliceIndex = spaces[Math.round((spaces.length - 1) / 2)];
    return str.slice(0, sliceIndex) + '...';
  }

}

export default Articles;