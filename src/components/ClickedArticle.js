import React, {Component} from 'react';
import {fetchArticles, fetchComments, postingComment, deletingComment} from './api'
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


class ClickedArticle extends Component {
state = {
    loading: true,
    article: [],
    articleId: null,
    comments: []
}

componentDidMount() {
    let articleId = this.props.match.params._id
    Promise.all([
        fetchArticles(),
        fetchComments(articleId)
    ])
    .then(([articleRes, commentsRes]) => {
        let matchedArticle = articleRes.articles.filter(article => article._id === articleId)
        let filteredComments = commentsRes.comments.sort((a, b) => {
            return b.created_at - a.created_at;
        })
        this.setState({
        comments: filteredComments,
        article: matchedArticle,
        articleId: articleId
    })
    })
}

handleComment = (event) => {
    event.preventDefault()
  let comment = event.target.comment.value;
  postingComment(this.state.articleId, comment)
  .then(res => {
    this.setState({
        comments: [res.comment, ...this.state.comments]
    })
})
event.target.comment.value = '';
}

deleteComment = (commentId) => {
    deletingComment(commentId)
    .then(res => {
      if (res.status === 204)  return fetchComments(this.state.articleId)
    })
    .then(commentsRes => {
        let filteredComments = commentsRes.comments.sort((a, b) => {
            return b.created_at - a.created_at;
        })
        this.setState({
            comments: filteredComments
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
                <form onSubmit={this.handleComment}>
                <label>Post a Comment:</label>
                <input type="text" id='comment' />
                <input type="submit" value="Post" />
                </form>
                
                {this.state.comments.map((comment, i) => {
                    if (comment.created_by === "northcoder")
                    return (
                        <div key={i}>
                            <p>{comment.body}</p>
                            <Moment fromNow>{comment.created_at}</Moment>
                            <p>Created By:</p>
                       <Link to={`/users/${comment.created_by}`}><p>{comment.created_by}</p></Link>
                               <button type="submit" onClick={() => this.deleteComment(comment._id)}>Delete</button>
                        </div>
                    )
                    else 
                    return (
                        <div key={i}>
                        <p>{comment.body}</p>
                        <Moment fromNow>{comment.created_at}</Moment>
                        <p>Created By:</p>
                   <Link to={`/users/${comment.created_by}`}><p>{comment.created_by}</p></Link>
                    </div>
                    )
                })}
            </div>}
        </div>
    )
}
}

export default ClickedArticle