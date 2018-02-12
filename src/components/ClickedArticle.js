import React, {Component} from 'react';
import {fetchArticles, fetchComments} from './api'


class ClickedArticle extends Component {
state = {
    loading: true,
    article: [],
    articleId: null,
    comments: []
}

componentDidMount() {
    let articleId = this.props.match.params._id
    console.log(articleId, "GETTING HERE!")
Promise.all([
    fetchArticles(),
    fetchComments(articleId)
])
    .then(([articleRes, commentsRes]) => {
        let matchedArticle = articleRes.articles.filter(article => article._id === articleId)
    this.setState({
        comments: commentsRes.comments,
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
                <br />
                <br />
                <hr />
                <br />
                {this.state.comments.map((comment, i) => {
                    return (
                        <div>
                            <p key={i}>{comment.body}</p>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}
}

export default ClickedArticle