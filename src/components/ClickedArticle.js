import React, {Component} from 'react';
import {fetchArticles, fetchComments, postingComment, deletingComment} from './api'
// import PostComment from './PostComment'
// import postingComment from './api'
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
    this.setState({
        comments: commentsRes.comments,
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
        comments: [...this.state.comments, res.comment]
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
        this.setState({
            comments: commentsRes.comments
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
                            <p>Created By:</p>
                       <Link to={`/users/${comment.created_by}`}><p>{comment.created_by}</p></Link>
                               <button type="submit" onClick={() => this.deleteComment(comment._id)}>Delete</button>
                        </div>
                    )
                    else 
                    return (
                        <div key={i}>
                        <p>{comment.body}</p>
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