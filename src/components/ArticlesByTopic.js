import React from 'react';
import {fetchArticles, voteArticle} from './api'
import ArticleList from './Votes.js'

class ArticlesByTopic extends React.Component {
    state = {
        articles: [],
        topic: null
    }

    componentDidMount() {           // triggers the load
        const topic = this.props.match.params.topic_id
        this.fetchAriclesByTopic(topic);
    }

    componentWillReceiveProps(nextProps) {   // triggers a reload when clicking another topic
        const oldTopic = this.props.match.params.topic_id
        const newTopic = nextProps.match.params.topic_id
        if (oldTopic !== newTopic) {
            this.fetchAriclesByTopic(newTopic);
        }
    }

    fetchAriclesByTopic(topic) {
        fetchArticles(topic)
            .then((res) => {
                this.setState({
                    articles: res.articles,
                    topic: topic
                })
            })
            .catch(console.log);
    }

voteChangeOnArticle = (articleId, vote) => {
        console.log('voteChangeOnArticle TopicArticle')
        return voteArticle(articleId, vote)
            .then(body => {
                const newArticle = body;
                const newArticles = this.state.articles.map(article => {
                    if (article._id === newArticle._id) {
                        return newArticle
                    }
                    return article;
                })
                this.setState({
                    articles: newArticles
                })
            })
    }

    render() {
        return (
            <div>
                <h1>{this.state.topic}</h1>
                <hr />
                <br />
                <br />
                        <div className="container">        
                        <ArticleList articles={this.state.articles} voteChangeOnArticle={this.voteChangeOnArticle} /> 
                                   </div>
            </div>
        )
    }
}

export default ArticlesByTopic;