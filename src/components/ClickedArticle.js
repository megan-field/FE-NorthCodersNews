import React, {Component} from 'react';
import {fetchOneArticle, fetchComments, postingComment, deletingComment, voteComment} from './api'
import CommentList from './CommentVotes';
import Moment from 'react-moment';
import { Link } from 'react-router-dom'


class ClickedArticle extends Component {
state = {
    loading: true,
    article: [],
    articleId: null,
    comments: [],
    current: 1
}

componentDidMount() {
    let articleId = this.props.match.params._id
    Promise.all([
        fetchOneArticle(articleId),
        fetchComments(articleId)
    ])
    .then(([articleRes, commentsRes]) => {
        this.setState({
        comments: commentsRes.comments,
        article: articleRes.article,
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
        comments: [res.newComment, ...this.state.comments]
    })
})
event.target.comment.value = '';
}

deleteComment = (commentId) => {
    deletingComment(commentId)
    .then(res => {
      if (res.status === 202)  return fetchComments(this.state.articleId)
    })
    .then(commentsRes => {
        this.setState({
            comments: commentsRes.comments
        })
    })
}

// voteChangeOnComment = (commentId, vote) => {
//     return voteComment(commentId, vote)
//         .then(body => {
//             const newComment = body;
//             const newComments = this.state.comments.map(comment => {
//                 if (comment._id === newComment._id) {
//                     return newComment
//                 }
//                 return comment;
//             })
//             this.setState({
//                 comments: newComments
//             })
//         })
// }

fetchNextComments = (event) => {
    let currentPage = this.state.current;
    let nextPage = 0;

    if (event.target.value === 'next') nextPage = +currentPage + 1;
    if (event.target.value === 'previous') nextPage = +currentPage - 1;

    if (nextPage < 0) nextPage = 0;
    if (nextPage > 4) nextPage = 4;

    return fetchComments(this.state.articleId, nextPage)
        .then((res) => {
            this.setState({
                comments: res.comments,
                current: nextPage
            })
        })
        .catch(console.log);
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
                        {/* <CommentList comments={this.state.comments} voteChangeOnComment={this.voteChangeOnComment} />  */}
                    </div>
                    )
                })}
            </div>}
            <div className="buttons">
                 <button type="submit" value="previous" onClick={this.fetchNextComments} disabled={this.state.current < 2 ? true : false}>Previous</button>
                 <button type="submit" value="next" onClick={this.fetchNextComments} disabled={this.state.comments.length < 5 ? true : false}>Next</button>
        </div>
        </div>
    )
}
}

export default ClickedArticle