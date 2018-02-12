import React from 'react';
import {fetchArticles} from './api'
import {Link} from 'react-router-dom'

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

    render() {
        return (
            <div>
                <h1>{this.state.topic}</h1>
                <hr />
                <br />
                <br />
                {this.state.articles &&
                this.state.articles.map((article, i) => {
                    return (
                        <div key={i}>
                        <Link to={`/articles/${article._id}`}>
                        <div>
                            <h2>{article.title}</h2>
                            <p>{article.body}</p>
                        </div>
                            </Link>
                            <p>Created by:</p>
                            <Link to={`users/${article.created_by}`}><p>{article.created_by}</p></Link>
                            <p>{article.comments} Comments</p>
                            <br />
                            <br />
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ArticlesByTopic;