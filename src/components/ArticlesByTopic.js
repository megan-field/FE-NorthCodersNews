import React from 'react';
import {fetchArticles, voteArticle} from './api';
import ArticleList from './ArticleList.js';
import './HomePage.css';

class ArticlesByTopic extends React.Component {
    state = {
      articles: [],
      topic: null
    }

    componentDidMount() {   
      const topic = this.props.match.params.topic_id;
      this.fetchAriclesByTopic(topic);
    }
    
    componentWillReceiveProps(nextProps) {   
      const oldTopic = this.props.match.params.topic_id;
      const newTopic = nextProps.match.params.topic_id;
      if (oldTopic !== newTopic) {
        this.fetchAriclesByTopic(newTopic);
      }
    }

    fetchAriclesByTopic(topic) {
      fetchArticles(topic)
        .then((res) => {
          let displayTopic = topic[0].toUpperCase() + topic.slice(1);
          this.setState({
            articles: res.articles,
            topic: displayTopic
          });
        })
        .catch(console.log);
    }

voteChangeOnArticle = (articleId, vote) => {
  console.log('voteChangeOnArticle TopicArticle');
  return voteArticle(articleId, vote)
    .then(body => {
      const newArticle = body.article;
      const newArticles = this.state.articles.map(article => {
        if (article._id === newArticle._id) {
          return newArticle;
        }
        return article;
      });
      this.setState({
        articles: newArticles
      });
    });
}

render() {
  return (
    <div className="homeContainer">
      <h1 style={{padding: '4%'}}>{this.state.topic}</h1>
      <ArticleList articles={this.state.articles} voteChangeOnArticle={this.voteChangeOnArticle} topic={this.state.topic} /> 
    </div>
  );
}
}

export default ArticlesByTopic;