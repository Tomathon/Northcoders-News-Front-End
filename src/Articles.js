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
    const updatedArticles = this.state.articles
    updatedArticles.forEach(article => {
      if (article._id === article_id && vote === "up") article.votes += 1;
      else if (article._id === article_id && vote === "down") article.votes -= 1;
    });
    this.setState({
      articles: this.state.articles
    });
    fetch(`https://pure-thicket-72217.herokuapp.com/api/articles/${article_id}?vote=${vote}`, { 
      method: "PUT"
    })
  }

  render() {
    return (
      <div>
        <h2>Latest Articles</h2>
          <div className="Articles">
            {this.state.articles.map((article, i) => (
              <div key={i} className="Article">
                    <Link to={`/articles/${article._id}`}>
                      <img src={this.loadImage(article.belongs_to)} alt={article.belongs_to}/>
                      <h3>{article.title}</h3>
                      <p className="Article-body">{this.shortenStr(article.body)}</p>
                    </Link>
                      <p>Author: <Link to={`/users/${article.created_by}`}>{article.created_by}</Link></p>
                      <p>Topic: <Link to={`/topics/${article.belongs_to}/articles`}>{article.belongs_to}</Link></p>
                      <p><Link to={`/articles/${article._id}/comments`}>Comments</Link></p>
                      <i className="fa fa-thumbs-up" aria-hidden="true" onClick={() => this.updateArticleVotes(article._id, 'up')}></i>
                      <p className="Vote">Votes: {article.votes}</p>
                      <i className="fa fa-thumbs-down" aria-hidden="true" onClick={() => this.updateArticleVotes(article._id, 'down')}></i>
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