import React, { Component } from 'react';

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

  render() {
    return (
      <div>
        <h2>Latest Articles</h2>
          <div className="articles">
            {this.state.articles.map((article, i) => (
              <div key={i}>
                      <h3>{article.title}</h3>
                      <p>Author: {article.created_by}</p>
                      <p>{this.shortenStr(article.body)}</p>
                      <p>Topic: {article.belongs_to}</p>
                      <p>Votes: {article.votes}</p>
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