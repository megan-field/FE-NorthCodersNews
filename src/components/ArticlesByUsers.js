import React, {Component} from 'react';
import {fetchArticles} from './api'


class ClickedArticle extends Component {
state = {
    loading: true,
    article: [],
    articleId: null
}

componentDidMount() {
    let articleId = this.props.match.params._id

    fetchArticles()
    .then(res => {
        let matchedArticle = res.articles.filter(article => article._id === articleId)
    this.setState({
        article: matchedArticle,
        articleId: articleId
    })
    })
}

render() {
    return (
        <div>
            {this.state.article[0] &&
            <div>
                <h1>{this.state.article[0].title}</h1>
                <br />
                <p>{this.state.article[0].body}</p>
            </div>}
        </div>
    )
}
}

export default ClickedArticle