import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import football from './images/football.jpeg';
import cooking from './images/cooking.jpg';
import coding from './images/coding.jpg';


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
          <div className="Articles">
            {this.state.articles.map((article, i) => (
              <div key={i} className="Article">
                      <img src={this.loadImage(article.belongs_to)} alt={article.belongs_to}/>
                      <h3>{article.title}</h3>
                      <p className="Article-body"><Link to={`/articles/${article._id}`}>{this.shortenStr(article.body)}</Link></p>
                      <p>Author: <Link to={`/users/${article.created_by}`}>{article.created_by}</Link></p>
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
    let sliceIndex = spaces[Math.round((spaces.length - 1) / 10)];
    return str.slice(0, sliceIndex) + '...';
  }

  loadImage = topic => {
    let imgPath = '';
    if (topic === 'football') imgPath=football
    if (topic === 'cooking') imgPath=cooking
    if (topic === 'coding') imgPath=coding
    return imgPath
  }
}

export default Articles;