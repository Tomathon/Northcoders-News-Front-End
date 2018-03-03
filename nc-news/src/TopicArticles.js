import React, { Component } from 'react';

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

  render() {
    return (
      <div>
        {this.state.articles.map((article, i) => {
            return (
              <div className="articles" key={i}>
                  <h3>{article.title}</h3>
                  <p>Author: {article.created_by}</p>
                  <p>{article.body}</p>
              </div>
            )
        })}
    </div>
    )
  }

}

export default TopicArticles;